---
name: flow-group-reels
description: "Reels virais da Flow Group: roteiro, vídeo, voz ElevenLabs, descrição, horário e métricas. Use em qualquer pedido de Reels, vídeo curto, ideia de conteúdo, legenda/descrição de post, horário de publicação ou análise de desempenho da Flow Group (@flowgroup.br). Metodologia tirada da engenharia reversa de um Reels viral, com motor de vídeo 1080x1920 pronto."
---

# Reels virais da Flow Group

Sistema permanente de criação de Reels para a **Flow Group** (@flowgroup.br, "Tecnologia que profissionaliza o seu negócio").
Base: engenharia reversa completa de um Reels viral (caso 01, @igao.ia, 07/11/2026) + identidade da Flow + o primeiro Reels produzido com o método (Reel 01, pizzaria).

**Prioridade: alcance sem perder a marca.** Atenção primeiro, valor depois, conversão quando fizer sentido. Nada de anúncio tradicional; nada de viralizar com assunto sem ligação com a Flow.

## Regras permanentes

1. **Pediram roteiro** → leia `references/02-formula-e-roteiro.md` e `08-marca-flow-group.md`. Escolha o assunto pela nota (≥ 13/18), escreva 3 ganchos, monte a tabela fala | legenda | tela | som na **Fórmula FLOW** (Fisgar → Localizar → Operar → Wow), 35–55 s, ~3,3 palavras/s. Entregue o roteiro + palavra do CTA + recompensa real.
2. **Pediram vídeo** → faça o roteiro (regra 1) e produza com `references/03-edicao-e-motion.md`, `04-narracao-elevenlabs.md` e o motor `templates/reel-engine/` (exemplo completo em `projects/reel-01-pizzaria/`). Entregue MP4 1080×1920 + descrição + capa sugerida + horário + mensagem do Direct. Confira os quadros antes de dizer "pronto".
3. **Pediram descrição/legenda** → use **sempre** o modelo de `references/05-descricao-legenda.md` (rótulo ↓, cena do gancho, o que é, "E o mais interessante", 4–7 recursos com emoji-marcador, limite honesto, imagem do resultado, reenquadramento, CTA palavra-chave, CTA seguir; 0 hashtags). Nada de descrição genérica.
4. **Pediram ideias** → `references/09-banco-de-ideias.md` + critérios da regra 1: priorize curiosidade, identificação e compartilhamento, sempre ligados a um serviço real da Flow. Entregue gancho, cena-chave, serviço e CTA de cada ideia.
5. **Mandaram resultados/métricas** → `references/07-metricas-e-evolucao.md`: lance em `data/historico.tsv`, rode `python3 scripts/score_reel.py data/historico.tsv --id <id>`, responda (funcionou · não funcionou · manter · mudar · testar · entra na skill?) e atualize `data/aprendizados.md`. Regra nova só com 3 Reels de evidência.
6. **Horário** → `references/06-publicacao-e-horarios.md` (hipóteses A/B/C/D; nunca regra absoluta).
7. **Detalhe técnico não especificado** → decida pela metodologia e siga; não pergunte o que dá para decidir.
8. **Honestidade sempre**: nada de clientes, depoimentos, números de resultado ou contagens de comentários inventados. Negócio de demonstração é fictício e marcado "exemplo ilustrativo"; números de painel fictícios, "dados ilustrativos". CTA só com recompensa que existe.

## O que torna o método forte (resumo do caso 01)

1. Gancho com dor/ganho concreto + lacuna, imagem do gancho no 1º quadro.
2. **Cada frase vira uma tela** que prova o que é dito, no mesmo instante da palavra.
3. Micro-história com hora, personagem e conflito → solução em passos → número → regancho aos ~70% → resultado → CTA visualizado.
4. Ritmo: cena a cada ~3,4 s, evento a cada ~0,8 s, voz a ~200 palavras/min, sem silêncio, corte seco no fim (loop).
5. Legenda palavra por palavra com palavra-chave destacada; voz enérgica e natural; quase sem música.

Detalhes, linha do tempo e medições: `references/01-estudo-de-caso-igao-clinica.md`.

## Números padrão (mudam só com evidência; ver `07`)

| Item | Padrão |
|---|---|
| Duração | 35–55 s (fim 0,3 s após a última palavra) |
| Fala | 3,0–3,5 palavras/s, pausas ≤ 0,3 s |
| Cena / evento | 2–4,5 s por cena (uma por frase) · um evento a cada 0,5–1 s |
| Transições | corte ~40% · chicote ~30% · desfoque ~20% · subida ~10% (0,35–0,45 s) |
| Legenda | Montserrat 600 60 px + palavra-chave Anton 76 px em caixa de seleção; topo em y 1262; 1–4 palavras |
| Voz | Nassif – Natural Brazilian Podcast (`ulzsiMeCbfKyTPCNhCD5`), eleven_v4, depois 1,10–1,15× sem mudar o tom |
| Som | −14 LUFS, pico ≤ −1,5 dBTP, efeitos 25–35 dB abaixo da voz, leito −38 dB ou nada |
| Visual | monocromático Flow (preto/grafite/branco), verde/vermelho só semântica, Inter nas interfaces |
| Arquivo | MP4 H.264 1080×1920 30 fps, AAC 48 kHz |

## Produzir um vídeo (passo a passo)

1. Roteiro (regra 1) → `projects/<video>/roteiro.md`.
2. Narração no ElevenLabs (`creative_list_voices` / `creative_generate_speech`, voz acima, texto inteiro de uma vez). Plano gratuito pode responder "busy": espere 1–3 min e tente de novo (só se a chamada **não** começou; repetir uma geração iniciada cobra de novo).
3. `make_reel.sh projects/<video> narracao.mp3` faz: tempo das palavras → enxugar pausas/andamento → legendas e marcas → efeitos → mixagem → render → mux. Antes, escreva `legendas.txt` (um grupo por linha, `[destaque]`, `@marca`, `{falado=>exibido}`), `project.js` (uma cena por frase, eventos em `REEL.cue('marca')`) e `sfx_plan.json`. Copie a pasta do Reel 01 como ponto de partida.
4. Confira: `node render.cjs --p projects/<video> --sheet 0.5` e `--snap t1,t2` → legibilidade, nada cortado, nenhuma tela vazia num corte, legenda limpa, sincronia.
5. Entregue o MP4 (fora do repositório: vídeos são pesados), a descrição (modelo `05`), capa, horário sugerido e a resposta do Direct. Registre o Reel em `data/historico.tsv` com status `produzido`.

Requisitos do ambiente: Node + Playwright (já vêm nas sessões em nuvem), ffmpeg com rubberband, Python com `faster-whisper soundfile numpy` (crie um venv). Sem acesso ao ElevenLabs: avise e use a melhor alternativa disponível, sem fingir que gerou.

## Evolução da metodologia

- Versão atual em `VERSION`; histórico em `CHANGELOG.md`; hipóteses e regras provadas em `data/aprendizados.md`.
- Para valer em novas sessões, a mudança precisa estar no repositório `pazemoney/The-best-skill`, na **branch padrão**: edite `skills/flow-group-reels/`, rode `python3 tools/build.py`, commit e push (PR/merge para a branch padrão).
- Nunca mude a metodologia por um resultado isolado.

## Mapa

```
references/01-estudo-de-caso-igao-clinica.md   engenharia reversa completa (roteiro, cenas, edição, voz, descrição, horário, ranking)
references/02-formula-e-roteiro.md             Fórmula FLOW, assunto, ganchos, narrativa, retenção, marca, CTA, modelo de roteiro
references/03-edicao-e-motion.md               números de edição, transições, legendas, som, pipeline e conferência
references/04-narracao-elevenlabs.md           voz escolhida (teste A/B), configuração, texto para TTS
references/05-descricao-legenda.md             modelo permanente de descrição + exemplo + resposta do Direct
references/06-publicacao-e-horarios.md         horário (hipóteses e teste), checklist, primeira hora
references/07-metricas-e-evolucao.md           métricas, taxas, notas, diagnóstico, regras de evolução
references/08-marca-flow-group.md              identidade, serviços, tom, cuidados
references/09-banco-de-ideias.md               20 ideias prontas
data/historico.tsv · data/aprendizados.md · data/referencias/
scripts/score_reel.py · scripts/publish_time.py
templates/reel-engine/                         motor de vídeo (engine, render.cjs, scripts, projects/reel-01-pizzaria)
```
