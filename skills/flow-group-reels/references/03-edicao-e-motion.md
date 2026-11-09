# Edição, motion e som: o padrão Flow (com números)

Derivado do estudo de caso 01 e implementado em `templates/reel-engine/` (cenas em HTML conduzidas pelo tempo, renderizadas quadro a quadro). Vale também para quem editar em CapCut/Premiere/After Effects: os números são os mesmos.

## 1. Formato de entrega

| Item | Valor |
|---|---|
| Quadro | 1080×1920 (9:16), 30 fps, H.264 High, yuv420p, CRF 16, `+faststart` |
| Áudio | AAC 48 kHz estéreo 192 kb/s, **−14 LUFS integrado**, pico ≤ −1,5 dBTP, LRA ~1,5 LU (voz comprimida, constante) |
| Duração | 35–55 s (a referência tem 53,8 s; o Reel 01 tem 50 s) |
| Área segura | topo 220 px (interface do Instagram), base 380 px (legenda do post e @), direita 150 px (botões). Conteúdo principal entre y 240 e 1200; **legenda com linha de base em ~y 1262–1300 (≈ 66–68% da altura)** |
| Primeiro quadro | já com o gancho visível e em movimento (nada de tela preta, logo ou fade-in) |
| Último quadro | corte seco ~0,3 s depois da última palavra (vira loop) |

## 2. Ritmo

- **Uma cena por frase** da narração. Troca sempre no começo de uma frase (nunca no meio).
- Cena: 2 a 4,5 s (média ~3,4 s). Dentro dela, **um acontecimento a cada 0,5–1 s** (algo entra, marca, conta, carimba, digita, acende).
- **Sincronia palavra → evento**: o objeto da palavra aparece no instante em que ela é dita (tolerância ±0,15 s). No motor isso é automático: no `legendas.txt` marque `@nome` antes da palavra e use `REEL.cue('nome')` na cena.
- Nada parado: aproximação lenta contínua da câmera (escala 1,00 → 1,035 a 1,07 na cena).

## 3. Transições (todas curtas)

| Tipo | Duração | Uso | Mistura no vídeo |
|---|---|---|---|
| Corte seco | 0 | continuidade (mesmo assunto, nova informação) | ~40% |
| Chicote (`whip`) | 0,35–0,45 s | mudança de lugar/assunto; deslize lateral de 62% da largura + desfoque de movimento horizontal (até 46 px) + giro leve em Y | ~30% |
| Desfoque (`blur`) | 0,3–0,4 s | passagem de tempo, virada de clima, número grande | ~20% |
| Subida (`rise`) | 0,4 s | entrar no CTA | ~10% |

Proibido: giro 360°, glitch, zoom de apresentação, cortina, "cubo", transição com som alto.

## 4. Movimento dos elementos (sistema único)

- Entrada padrão: desfoque 10 → 0 px, subida 28 px, escala 0,94 → 1, opacidade 0 → 1, **0,38 s, easing expo-out**. Itens em lista entram com 60–100 ms de intervalo.
- Saída: 0,16 s (rápida, sem chamar atenção).
- **Soco de impacto** (número, carimbo, chave): escala +5 a +8% em 0,1 s e volta em 0,3 s, junto de um efeito sonoro.
- Contadores (0 → 47, R$ 0 → R$ 3.284,50) em 0,6–0,7 s, easing cubic-out.
- Texto digitado a ~28 caracteres/s.
- Só `transform`, `opacity` e `filter`. Nunca animar `left/top/width/height`.

## 5. Cenário visual (identidade Flow)

- Palco: fundo quase preto (#050506) com luz radial no centro, **grade de piso em perspectiva** na metade de baixo (linhas brancas a 7–8%), partículas desfocadas (bokeh) e vinheta. Grão leve (5%).
- Superfícies: #111113 / #161618 / #1c1c1f, borda 1 px branca a 6–10%, cantos 24–34 px, sombras longas.
- Texto: #f4f4f2 (principal), #c4c5c8, #9b9ca1 (secundário).
- **Monocromático.** Cor só com função: verde (#3ccf7a) = resolvido, vermelho (#ff4d5e) = problema. Cores de marcas reais (verde do WhatsApp, Pix) **só dentro de mockups de apps reais**, para reconhecimento imediato.
- Fontes: **Montserrat** (legendas e textos da Flow), **Anton** (palavra-chave, números grandes, marca), **Inter** (dentro de interfaces de app, para parecer iOS/Android), **Permanent Marker** (letreiro neon, anotações à mão; pontual).
- Interfaces: realistas, com dados específicos e verossímeis (nomes, horários, valores, endereço). Negócio fictício leva "exemplo ilustrativo" discreto; números de painel fictícios levam "dados ilustrativos".
- Fotos: só reais e licenciadas (Unsplash, fotos do cliente). Nada de imagem gerada por IA no lugar de produto real.

## 6. Legendas

| Item | Valor |
|---|---|
| Posição | centralizada, topo da caixa em y 1262 (linha de base ~y 1300), largura máx. 940 px |
| Fonte normal | Montserrat 600, 60 px, branca, entreletra −0,012 em, sombra 0 4 18 px preta a 65% |
| Palavra-chave | **Anton, 76 px, CAIXA ALTA, dentro de caixa de seleção** (borda branca 2,5 px, fundo branco a 9%, 4 alças quadradas de 13 px nos cantos, brilho suave) — a "seleção do designer" é a assinatura visual |
| Grupo | 1 a 4 palavras por tela (máx. ~26 caracteres), separado por sentido, sem pontuação final (só "?") |
| Entrada | **palavra por palavra no instante em que é dita**: desfoque 10 → 0, sobe 16 px, escala 0,96 → 1 em 0,18 s; a caixa da palavra-chave se desenha em 0,22 s |
| Saída do grupo | desfoque + fade em 0,16 s quando o próximo começa |
| Palavra-chave | 1 por grupo no máximo; ~1 a cada 1,5–2 s; substantivo ou número que carrega o sentido |

O primeiro grupo já aparece no quadro 0 (o vídeo pode ser visto pausado).

## 7. Som

| Camada | Padrão |
|---|---|
| Voz | seca, na frente: passa-altas 75 Hz, −2 dB em 250 Hz, +2,5 dB em 3,5 kHz, de-esser leve, compressor 3:1 (−21 dB), loudness final −14 LUFS |
| Efeitos | **25 a 35 dB abaixo da voz** (sentidos, não ouvidos), sempre presos a um evento visual: estalo em seleção, bolha em mensagem, "ding" em notificação, acorde curto em sucesso, grave em carimbo/número, chicote em transição lateral, digitação em texto, contador em números |
| Música | a referência **não usa música perceptível**. Padrão Flow: leito grave quase imperceptível (−38 dB, com ducking sob a voz) ou nada. Se quiser música do acervo do Instagram para descoberta por áudio, use a 5–10% do volume (hipótese a testar) |
| Silêncio | nenhum buraco > 0,3 s; o vídeo acaba no fim da fala |

Kit pronto e sem custo: `templates/reel-engine/scripts/sfx_synth.py` (whoosh, tick, ticks, pop, ding, success, error, thud, hit, toggle, typing, shutter, bed). Se quiser efeitos mais ricos, gere no ElevenLabs (`eleven_text_to_sound_v2`) e mantenha os mesmos níveis.

## 8. Pipeline do motor (como produzir)

```
templates/reel-engine/
  index.html               carrega engine + projeto (?p=projects/<video>)
  engine/engine.js         tempo, cenas, transições, câmera, fundo, legendas, assinatura
  engine/components.js     iPhone, WhatsApp, notificação iOS, painéis, ícones, pílulas, chave
  engine/stage.css         tokens Flow + componentes; fontes em engine/fonts (licenças OFL/Apache)
  render.cjs               Playwright quadro a quadro → ffmpeg (paralelo); --snap e --sheet para conferir
  scripts/tighten_voice.py encurta pausas e acelera sem mudar o tom (rubberband)
  scripts/align_words.py   tempo por palavra (Whisper) da narração
  scripts/align_captions.py legendas + marcas @ a partir de legendas.txt
  scripts/sfx_synth.py     kit de efeitos
  scripts/mix.py           voz + efeitos + leito → −14 LUFS
  make_reel.sh             faz tudo em sequência
  projects/reel-01-pizzaria/  exemplo completo (roteiro, legendas, cenas, plano de efeitos)
```

Fluxo: roteiro → narração (ElevenLabs) → `tighten_voice` → `align_words` → `legendas.txt` → `align_captions` → `project.js` (cenas com `REEL.cue`) → `render.cjs --snap/--sheet` (olhar!) → `render.cjs --out` → `mix.py` → mux final → conferir quadros e áudio.

## 9. Conferência obrigatória antes de entregar

1. `--sheet 0.5` e olhar a folha inteira: texto legível no celular (≥ 28 px efetivos em interface), nada cortado, nada saindo da área segura, legenda nunca em cima de texto importante.
2. Quadro 0: gancho visível. Último quadro: logo após a última palavra.
3. Sincronia: conferir 5 eventos-chave contra o tempo das palavras (±0,15 s).
4. Áudio: −14 LUFS ±0,5, pico ≤ −1 dBTP, efeitos baixos, sem estalos nos cortes de pausa.
5. `ffprobe`: 1080×1920, 30 fps, duração = duração planejada, áudio presente.
