# Narração com ElevenLabs: voz, texto e configuração

## 1. O que a referência faz (medido)

Masculina, energia de conversa animada, **F0 ~153 Hz**, variação de **9,5 semitons** (expressiva), **≈200 palavras/min** (3,4 palavras/s), pausas de 0,12–0,28 s só entre frases, sem respirações nem vícios, registro informal ("tá", "pra", "olha só"), voz seca e muito comprimida.

## 2. Voz padrão da Flow Group

**Nassif – Natural Brazilian Podcast** · `voice_id: ulzsiMeCbfKyTPCNhCD5` (biblioteca do ElevenLabs).

Por quê (teste A/B com o mesmo trecho, em 09/11/2026):

| Voz | F0 mediana | Variação (st) | Desvio de entonação | Observação |
|---|---|---|---|---|
| Referência (@igao.ia) | 153 Hz | 9,5 | 4,0 | alvo |
| **Nassif Natural Podcast** | 145 Hz no teste / 162 Hz no Reel 01 | 13,7 | 5,3 | mais próxima no tom; calorosa, natural; **mesma voz do Reels "A Chave"** (continuidade de marca) |
| Marcio Viral Hook Narrator (`plASsyS7JE6GCAvx9uIc`) | 142 Hz | 12,0 | 4,6 | boa reserva; um pouco mais "locutor" |
| Enzo Professional and Warm (`b95tap8KE0pQivmClQRQ`) | 133 Hz (prévia) | 10,2 | 3,7 | jovem e clara; o teste não rodou (servidor ocupado) |

Outras analisadas pela prévia: Thales, Lotus, Davi Leão, Yuri, Diego, Túlio, Willian, Isaias, Rômulo e as variações Nassif (Sales, News, Hype). Descartadas por serem lentas/planas demais ou "locutor de rádio".

**Reserva:** Marcio. Para personagem (cliente, dono) em diálogo: "João Pedro" (`7u8qsX4HQsSHJ0f8xsQZ`, usado no "A Chave").

## 3. Configuração

| Item | Padrão |
|---|---|
| Modelo | `eleven_v4` (mais natural). Se o plano gratuito disser "busy", espere 1–3 min e tente de novo; alternativa `eleven_v3` |
| Ajustes de voz | **padrão do modelo** (stability 0,5). Só mexa se o take sair instável: stability 0,6 e similarity 0,85 |
| Velocidade | o v4/v3 não tem "speed". Gere natural e depois **encurte pausas + acelere 1,10–1,15× sem mudar o tom** (`tighten_voice.py`). O Reel 01: 59,3 s → 49,7 s, 3,26 palavras/s, transcrição idêntica antes e depois (0 erros) |
| Takes | 2 por geração (padrão). Escolha pelo número de palavras certas (Whisper), ritmo e ausência de ruído |
| Custo | ~1 crédito por caractere (~900 créditos por um Reel de 50 s, por take) |

## 4. Como escrever o texto para a voz

- **Gere a narração inteira de uma vez** (prosódia contínua); nada de frase por frase.
- Vírgulas e pontos dão as pausas certas. Reticências (…) só no gancho, para um suspense curto.
- Números que podem ser lidos errado: por extenso no texto falado ("nove e trinta e sete", "catorze"); na tela, escreva como número (21h37, 14) com `{falado=>exibido}` no `legendas.txt`.
- **CAIXA ALTA** com moderação para ênfase (ex.: "Comenta CARDÁPIO").
- Marcas e estrangeirismos: "Flow Group", "WhatsApp" e "Pix" saíram corretos no v4. Se errar, use IPA entre barras (v4/v3), ex.: `/floʊ ɡɹuːp/`.
- Tags de áudio (`[curious]`, `[excited]`) só se a leitura sair sem vida; elas mudam o tom até a próxima tag.
- Linguagem falada: "tá", "pra", "olha só", "sabe o melhor?".

## 5. Pós-processamento (já no `mix.py`)

Passa-altas 75 Hz → −2 dB em 250 Hz → +2,5 dB em 3,5 kHz → de-esser → compressor 3:1 → limitador → −14 LUFS (duas passadas). Voz seca, sem reverberação.

## 6. Checagem da narração

1. `align_words.py` na narração final: compare o texto transcrito com o roteiro (palavras trocadas/omitidas → gere de novo só se mudar sentido).
2. Ritmo: 3,0–3,5 palavras/s no total.
3. Tom: F0 da voz escolhida estável entre takes (variação > 2 semitons entre takes = take estranho).
4. Ouça (ou peça para ouvirem) o começo: os 3 primeiros segundos decidem.
