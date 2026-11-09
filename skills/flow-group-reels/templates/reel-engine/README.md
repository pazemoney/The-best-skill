# Reel engine (Flow Group)

Motor de vídeo vertical 1080×1920 feito de cenas HTML conduzidas pelo tempo. Cada quadro é fotografado pelo Chromium (Playwright) e vira vídeo no ffmpeg. Tudo é determinístico: o mesmo projeto gera sempre o mesmo vídeo.

## Começo rápido

```bash
cd templates/reel-engine
python3 -m venv .venv && .venv/bin/pip install faster-whisper soundfile numpy     # uma vez
node render.cjs --p projects/reel-01-pizzaria --snap 0,10,25,45                   # olhar quadros
node render.cjs --p projects/reel-01-pizzaria --sheet 0.5                         # folha de contato
PY=.venv/bin/python ./make_reel.sh projects/reel-01-pizzaria projects/reel-01-pizzaria/audio/narracao_original.mp3
```
Resultado: `projects/reel-01-pizzaria/build/reel_final.mp4` (o render leva ~2,5 min para 50 s com 4 workers).

## Novo vídeo

1. `cp -r projects/reel-01-pizzaria projects/reel-02-<nome>` e apague `audio/*` e `captions.js`.
2. Gere a narração (ElevenLabs, voz e regras em `references/04`).
3. Escreva `legendas.txt` (um grupo de 1–4 palavras por linha; `[destaque]`; `@marca` antes da palavra que dispara um evento; `{falado=>exibido}`).
4. Reescreva `project.js`: uma `R.scene({...})` por frase, com `start/end` nas marcas (`q('marca')`), `enter` (`cut`, `whip`, `blur`, `fade`, `rise`) e eventos com `appear(el, t, q('marca'))`.
5. Ajuste `sfx_plan.json` (efeito em cada evento: whoosh, tick, ticks, pop, ding, success, error, thud, hit, toggle, typing, shutter).
6. `make_reel.sh` → confira com `--sheet` → entregue.

## Peças

| Arquivo | Função |
|---|---|
| `engine/engine.js` | `REEL.scene`, transições, câmera, `appear`, `punch`, `typed`, `count`, fundo do palco, legendas palavra a palavra, assinatura |
| `engine/components.js` | `UI.phone`, `UI.waChat`, `UI.bubble`, `UI.notif`, `UI.panel`, `UI.pill`, `UI.toggle`, `UI.icon`, `UI.logo` |
| `engine/stage.css` | tokens Flow (monocromático), legendas, componentes |
| `engine/fonts/` | Anton, Montserrat, Permanent Marker, Inter (licenças em `fonts/LICENSES.md`) |
| `engine/img/logo-flow.jpg` | logo oficial (não recriar) |
| `render.cjs` | `--snap`, `--sheet`, `--out` (1 navegador por worker, JPEG 95 → H.264 CRF 16) |
| `scripts/` | `align_words.py`, `tighten_voice.py`, `align_captions.py`, `sfx_synth.py`, `mix.py` |

## Regras do motor

- Nada de CSS `transition/animation`, `Date.now()` ou `Math.random()` sem semente: tudo é função de `t`.
- Elemento posicionado com `transform` (ex.: o aparelho do celular) fica dentro de um invólucro; anime o invólucro.
- Num corte, a nova cena já mostra o primeiro elemento (entra ~0,2 s antes do corte). Nunca deixar o palco vazio.
- Texto de interface com ≥ 28 px efetivos. Legenda e conteúdo não se sobrepõem (use `fadeAt` no celular).
