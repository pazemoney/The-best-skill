# Métricas e evolução contínua da metodologia

Objetivo: descobrir o que **traz alcance** e o que **traz cliente**, sem mudar a metodologia por causa de um vídeo só.

## 1. O que coletar (Instagram › Insights do Reel)

Colete em **24 h, 72 h e 7 dias** e anote em `data/historico.tsv` (uma linha por Reel, uma coluna por métrica; deixe vazio o que não existir):

| Grupo | Métricas |
|---|---|
| Alcance | visualizações, contas alcançadas, % de não seguidores |
| Atenção | tempo médio assistido (s), % que passou de 3 s (ou taxa de "pulo"), duração do vídeo |
| Ressonância | compartilhamentos (envios), salvamentos, comentários, curtidas |
| Marca | novos seguidores, visitas ao perfil, cliques no link |
| Negócio | comentários com a palavra-chave, conversas no Direct, orçamentos pedidos, **leads qualificados** (dono de negócio com necessidade real), vendas |

Também: data, dia, horário, janela (A/B/C/D), formato, nicho, serviço, tipo de gancho, duração, voz, palavra do CTA, hashtags (sim/não), observações.

## 2. Taxas (sempre por alcance, nunca números soltos)

| Taxa | Fórmula | Lê o quê |
|---|---|---|
| Retenção média | tempo médio ÷ duração | se o vídeo prende |
| Gancho | % que passou de 3 s | se o começo funciona |
| Envios por mil | compartilhamentos ÷ alcance × 1000 | vontade de mandar para alguém (principal sinal de alcance para não seguidores, segundo o próprio Instagram) |
| Salvamentos por mil | salvamentos ÷ alcance × 1000 | utilidade |
| Comentários por mil | comentários ÷ alcance × 1000 | conversa/CTA |
| Seguidores por mil | novos seguidores ÷ alcance × 1000 | marca ficou clara? |
| Visitas por mil | visitas ao perfil ÷ alcance × 1000 | curiosidade pela Flow |
| Leads por mil | leads qualificados ÷ alcance × 1000 | resultado comercial |

## 3. Notas de 0 a 100 (`scripts/score_reel.py` calcula)

Cada taxa é comparada com a **mediana dos últimos 10 Reels** da Flow (enquanto houver menos de 3, compara com metas iniciais abaixo). Nota da dimensão = 50 × (valor ÷ mediana), limitada a 100.

| Dimensão | Peso | Taxas |
|---|---|---|
| Alcance | 25% | alcance, % não seguidores |
| Atenção | 25% | retenção média, gancho |
| Ressonância | 20% | envios, salvamentos, comentários (por mil) |
| Marca | 10% | seguidores e visitas por mil |
| Negócio | 20% | leads por mil (e vendas, quando houver) |

Metas iniciais (até ter histórico; ajuste depois): retenção ≥ 45%, gancho ≥ 60%, envios ≥ 5/mil, salvamentos ≥ 5/mil, comentários ≥ 3/mil, seguidores ≥ 2/mil, leads ≥ 0,5/mil.

## 4. Diagnóstico (o que o número está dizendo)

| Sinal | Provável causa | O que mudar no próximo |
|---|---|---|
| Gancho baixo | 1º quadro parado, promessa fraca, tema sem dor | testar 3 ganchos; dor mais concreta; movimento no quadro 0 |
| Gancho bom, retenção baixa | meio arrastado, passos repetidos, narração lenta | cortar 15–20%, trocar tipo de tela a cada passo, regancho aos 70% |
| Muita visualização, poucos envios | divertido mas não útil/identificável | ponto de vista do cliente, situação que alguém "conhece" |
| Muitos envios, poucos seguidores | marca invisível | frase de marca no clímax, assinatura, perfil no CTA |
| Muitos comentários, poucos leads | recompensa genérica ou público errado | recompensa que só dono de negócio quer; DM com pergunta de qualificação |
| Poucos comentários | CTA fraco, sem visualizar | palavra curta, recompensa clara, mostrar o comentário "você · agora" |
| Alcance baixo com boas taxas | distribuição inicial/horário | testar outra janela; repostar no TikTok/Shorts; Reels de teste |
| Leads bons, alcance baixo | ótimo para vendas | manter tema; trabalhar só gancho e formato |

Quadrante final: **Ouro** (alcance e negócio acima da mediana) · **Vitrine** (alcance alto, negócio baixo) · **Nicho** (alcance baixo, negócio alto) · **Revisar** (ambos baixos).

## 5. Regras de evolução (não mudar tudo por um resultado)

1. Toda observação nova vira **hipótese** em `data/aprendizados.md` (com o Reel de origem).
2. Uma hipótese vira **regra** só com **3 Reels** apontando para o mesmo lado (ou 2 + diferença > 50%), comparando vídeos parecidos.
3. Uma regra pode ser **revogada** do mesmo jeito (3 evidências contra).
4. Ao mudar regra: atualizar a referência certa (`02`–`06`), subir a versão em `VERSION` e registrar em `CHANGELOG.md` (o que mudou, por quê, quais Reels provaram).
5. Mudança de metodologia vai para o repositório (`pazemoney/The-best-skill`): commit, push e PR/merge para a branch padrão; só assim vale nas novas sessões.

## 6. Rotina de análise (quando o usuário mandar resultados)

1. Lançar os números no `historico.tsv` (aceite prints: leia os números e confirme a data/horário).
2. `python3 scripts/score_reel.py data/historico.tsv --id <id>` → notas, comparação e diagnóstico.
3. Responder: o que funcionou · o que não funcionou · manter · mudar · hipóteses a testar · o que entra (ou não) na skill.
4. Atualizar `aprendizados.md` e, se uma regra foi provada, o resto (passo 5.4).
