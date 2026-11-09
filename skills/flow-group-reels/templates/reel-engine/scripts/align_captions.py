#!/usr/bin/env python3
"""Gera as legendas palavra por palavra (e as marcas de tempo das cenas) a partir da narração.

Uso:
  python3 -I align_captions.py palavras.json legendas.txt saida/captions.js

palavras.json: saída do align_words.py (Whisper com tempo por palavra) da narração FINAL.
legendas.txt: um grupo de legenda por linha (1 a 4 palavras), na ordem da fala:
  [palavra-chave]          destaque (pode ter várias palavras: [sem resposta])
  @nome                    marca o instante da PRÓXIMA palavra (usado pelas cenas: REEL.cue('nome'))
  {falado=>exibido}        casa com o que foi dito e mostra outra grafia ({nove e trinta e sete=>21h37})
  # comentário             linha ignorada
Saída: window.CAPTIONS = { groups, cues, end }  (carregado como <script>, funciona em file://)
"""
import json, re, sys, unicodedata, difflib

def norm(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]', '', s)

words_path, txt_path, out_path = sys.argv[1:4]
W = json.load(open(words_path, encoding='utf-8'))['words']
spoken = [(norm(w['w']), w['s'], w['e']) for w in W]
spoken = [x for x in spoken if x[0]]

# ---- lê o roteiro de legendas ----
toks = []  # dict(match, show, g, key, cue)
groups_src = []
key_id = 0
for line in open(txt_path, encoding='utf-8'):
    line = line.strip()
    if not line or line.startswith('#'):
        continue
    g = len(groups_src); groups_src.append(line)
    pending_cue = None
    for m in re.finditer(r'\[[^\]]*\]|\{[^}]*\}|\S+', line):
        unit = m.group(0)
        if unit.startswith('@'):
            pending_cue = unit[1:]; continue
        key = None
        inner = unit
        if unit.startswith('['):
            key_id += 1; key = key_id; inner = unit[1:-1]
        for sub in re.finditer(r'\{[^}]*\}|\S+', inner):
            u = sub.group(0)
            if u.startswith('@'):
                pending_cue = u[1:]; continue
            if u.startswith('{'):
                a, b = u[1:-1].split('=>')
                parts = [p for p in a.split() if norm(p)]
                for i, p in enumerate(parts):
                    toks.append(dict(match=norm(p), show=(b if i == 0 else ''), g=g, key=key, cue=pending_cue if i == 0 else None))
                    pending_cue = None
            else:
                toks.append(dict(match=norm(u), show=u, g=g, key=key, cue=pending_cue))
                pending_cue = None

# ---- alinha com o que foi dito ----
A = [t['match'] for t in toks]; B = [s[0] for s in spoken]
sm = difflib.SequenceMatcher(a=A, b=B, autojunk=False)
for blk in sm.get_matching_blocks():
    for k in range(blk.size):
        t = toks[blk.a + k]; s = spoken[blk.b + k]
        t['s'], t['e'] = s[1], s[2]
# interpola o que não casou
known = [i for i, t in enumerate(toks) if 's' in t]
if not known:
    sys.exit('nada casou: confira se legendas.txt segue a narração')
for i, t in enumerate(toks):
    if 's' in t:
        continue
    prev = max([k for k in known if k < i], default=None)
    nxt = min([k for k in known if k > i], default=None)
    t0 = toks[prev]['e'] if prev is not None else 0.0
    t1 = toks[nxt]['s'] if nxt is not None else t0 + 0.4
    lo = prev if prev is not None else -1
    hi = nxt if nxt is not None else len(toks)
    frac = (i - lo) / (hi - lo)
    t['s'] = round(t0 + (t1 - t0) * frac, 3); t['e'] = round(t['s'] + 0.2, 3)
unmatched = [t['show'] or t['match'] for t in toks if t['match'] not in B]

def clean(s):
    return re.sub(r'[.,;:!…]+$', '', s.replace('…', '')).strip()

groups = []
for g, src in enumerate(groups_src):
    gt = [t for t in toks if t['g'] == g]
    ws = []
    for t in gt:
        if not t['show']:
            if ws: ws[-1]['e'] = t['e']
            continue
        if t['key'] and ws and ws[-1].get('kid') == t['key']:
            ws[-1]['t'] += ' ' + clean(t['show']); ws[-1]['e'] = t['e']; continue
        ws.append(dict(t=clean(t['show']), s=t['s'], e=t['e'], k=bool(t['key']), kid=t['key']))
    for w in ws: w.pop('kid', None)
    groups.append(dict(s=ws[0]['s'] if ws else gt[0]['s'], words=ws, last=gt[-1]['e']))
for i, G in enumerate(groups):
    nxt = groups[i + 1]['s'] if i + 1 < len(groups) else None
    if nxt is None:
        G['e'] = round(G['last'] + 0.5, 3)
    else:
        G['e'] = round(min(nxt - 0.02, G['last'] + 0.55), 3)
    del G['last']
cues = {t['cue']: t['s'] for t in toks if t.get('cue')}
end = spoken[-1][2]
with open(out_path, 'w', encoding='utf-8') as f:
    f.write('window.CAPTIONS = ' + json.dumps(dict(groups=groups, cues=cues, end=end), ensure_ascii=False) + ';\n')
print(f'{len(groups)} grupos | {sum(len(g["words"]) for g in groups)} palavras na tela | {len(cues)} marcas | fim da fala {end:.2f}s')
if unmatched:
    print('não casaram (tempo interpolado):', ', '.join(unmatched[:20]))
for G in groups:
    print(f"{G['s']:6.2f}-{G['e']:6.2f}  " + ' '.join(('[' + w['t'] + ']') if w['k'] else w['t'] for w in G['words']))
