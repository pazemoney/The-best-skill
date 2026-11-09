#!/usr/bin/env python3
"""Notas e diagnóstico de um Reels a partir do histórico (data/historico.tsv).

Uso:
  python3 score_reel.py data/historico.tsv                 # tabela de todos os Reels com notas
  python3 score_reel.py data/historico.tsv --id reel-01    # diagnóstico detalhado de um Reels

Cada linha do TSV é um Reels (preencha o que tiver; vazio = sem dado). Colunas usadas:
  id, alcance, nao_seguidores_pct, tempo_medio_s, duracao_s, gancho_3s_pct, compartilhamentos,
  salvamentos, comentarios, novos_seguidores, visitas_perfil, leads_qualificados
Compara com a mediana dos últimos 10 Reels publicados (ou com metas iniciais se houver < 3).
Só usa a biblioteca padrão do Python.
"""
import csv, sys, statistics, argparse

META = dict(retencao=0.45, gancho=0.60, envios=5.0, salvos=5.0, coment=3.0, seguid=2.0, visitas=8.0, leads=0.5)
PESOS = dict(alcance=0.25, atencao=0.25, ressonancia=0.20, marca=0.10, negocio=0.20)

def f(x):
    try:
        return float(str(x).replace(',', '.').replace('%', '')) if str(x).strip() not in ('', '-') else None
    except ValueError:
        return None

def taxas(r):
    a = f(r.get('alcance'))
    per_mil = lambda k: (f(r.get(k)) / a * 1000) if a and f(r.get(k)) is not None else None
    tm, du = f(r.get('tempo_medio_s')), f(r.get('duracao_s'))
    g = f(r.get('gancho_3s_pct'))
    ns = f(r.get('nao_seguidores_pct'))
    return dict(
        alcance=a, nao_seg=ns / 100 if ns is not None else None,
        retencao=(tm / du) if tm and du else None, gancho=(g / 100) if g is not None else None,
        envios=per_mil('compartilhamentos'), salvos=per_mil('salvamentos'), coment=per_mil('comentarios'),
        seguid=per_mil('novos_seguidores'), visitas=per_mil('visitas_perfil'), leads=per_mil('leads_qualificados'))

def nota(v, ref):
    if v is None or not ref:
        return None
    return max(0.0, min(100.0, 50.0 * v / ref))

def fmt(v, pct=False):
    if v is None:
        return '—'
    return f'{v * 100:.0f}%' if pct else f'{v:.1f}'

def quadrante(alcance, negocio):
    if alcance >= 50 and negocio >= 50:
        return 'Ouro'
    if alcance >= 50:
        return 'Vitrine'
    if negocio >= 50:
        return 'Nicho'
    return 'Revisar'

def media(xs):
    xs = [x for x in xs if x is not None]
    return sum(xs) / len(xs) if xs else None

def avaliar(r, base):
    T = taxas(r)
    ref = {}
    for k in ['alcance', 'nao_seg', 'retencao', 'gancho', 'envios', 'salvos', 'coment', 'seguid', 'visitas', 'leads']:
        vals = [taxas(b)[k] for b in base]
        vals = [v for v in vals if v]
        ref[k] = statistics.median(vals) if len(vals) >= 3 else META.get(k)
    N = {k: nota(T[k], ref[k]) for k in T}
    dims = dict(
        alcance=media([N['alcance'], N['nao_seg']]),
        atencao=media([N['retencao'], N['gancho']]),
        ressonancia=media([N['envios'], N['salvos'], N['coment']]),
        marca=media([N['seguid'], N['visitas']]),
        negocio=N['leads'])
    have = {k: v for k, v in dims.items() if v is not None}
    total = sum(v * PESOS[k] for k, v in have.items()) / sum(PESOS[k] for k in have) if have else None
    return T, ref, dims, total

def diagnostico(T, ref, dims):
    out = []
    lo = lambda k: T[k] is not None and ref.get(k) and T[k] < 0.8 * ref[k]
    hi = lambda k: T[k] is not None and ref.get(k) and T[k] > 1.2 * ref[k]
    if lo('gancho'): out.append('Gancho fraco: 1º quadro parado ou promessa sem dor. Teste 3 ganchos; movimento no quadro 0.')
    if not lo('gancho') and lo('retencao'): out.append('Começo bom, meio arrastado: corte 15–20%, troque o tipo de tela a cada passo, regancho aos 70%.')
    if hi('alcance') and lo('envios'): out.append('Muita gente viu, pouca mandou: aproxime de uma situação que alguém "conhece" (ponto de vista do cliente).')
    if hi('envios') and lo('seguid'): out.append('Compartilhado mas a marca não ficou: frase de marca no clímax, perfil no CTA.')
    if hi('coment') and lo('leads'): out.append('Comentários sem lead: recompensa genérica ou público errado; DM com pergunta de qualificação.')
    if lo('coment'): out.append('Poucos comentários: palavra curta, recompensa clara, mostrar o "você · agora" comentando.')
    if lo('alcance') and not lo('retencao') and not lo('envios'): out.append('Bom vídeo com pouca distribuição: teste outra janela de horário e Reels de teste.')
    if hi('leads') and lo('alcance'): out.append('Ótimo para vendas: mantenha o tema e trabalhe só gancho/formato.')
    a = dims.get('alcance'); n = dims.get('negocio')
    if a is not None and n is not None:
        out.append(f'Quadrante: {quadrante(a, n)} (alcance {a:.0f} · negócio {n:.0f}).')
    return out or ['Sem sinal forte: mantenha e acumule dados (regra: 3 Reels antes de mudar).']

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('tsv'); ap.add_argument('--id'); a = ap.parse_args()
    rows = list(csv.DictReader(open(a.tsv, encoding='utf-8'), delimiter='\t'))
    pub = [r for r in rows if r.get('status', '').strip() == 'publicado']
    if a.id:
        r = next((x for x in rows if x['id'] == a.id), None)
        if not r: sys.exit('id não encontrado')
        base = [x for x in pub if x['id'] != a.id][-10:]
        T, ref, dims, total = avaliar(r, base)
        print(f"== {r['id']} · {r.get('titulo','')} ==")
        for k, lab, p in [('alcance', 'alcance', False), ('nao_seg', '% não seguidores', True), ('retencao', 'retenção média', True), ('gancho', 'passou de 3 s', True), ('envios', 'envios/mil', False), ('salvos', 'salvamentos/mil', False), ('coment', 'comentários/mil', False), ('seguid', 'seguidores/mil', False), ('visitas', 'visitas/mil', False), ('leads', 'leads/mil', False)]:
            print(f'  {lab:<18} {fmt(T[k], p):>8}   referência {fmt(ref.get(k), p):>8}')
        print('  notas: ' + ' · '.join(f'{k} {v:.0f}' for k, v in dims.items() if v is not None) + (f' · TOTAL {total:.0f}' if total is not None else ''))
        print('  base de comparação: ' + (f'mediana de {len(base)} Reels' if len(base) >= 3 else 'metas iniciais (menos de 3 Reels publicados)'))
        for d in diagnostico(T, ref, dims): print('  - ' + d)
    else:
        print(f"{'id':<14}{'status':<12}{'alcance':>9}{'ret.':>7}{'envios/mil':>11}{'leads/mil':>10}{'TOTAL':>7}")
        for r in rows:
            base = [x for x in pub if x['id'] != r['id']][-10:]
            T, ref, dims, total = avaliar(r, base)
            tot = '—' if total is None else f'{total:.0f}'
            print(f"{r['id']:<14}{r.get('status',''):<12}{fmt(T['alcance']):>9}{fmt(T['retencao'], True):>7}{fmt(T['envios']):>11}{fmt(T['leads']):>10}{tot:>7}")

if __name__ == '__main__':
    main()
