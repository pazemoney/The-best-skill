#!/usr/bin/env bash
# Pipeline completo de um Reels (a partir da narração já gerada no ElevenLabs).
#
#   ./make_reel.sh projects/<video> narracao_original.mp3 [tempo=1.14]
#
# Pré-requisitos: node + playwright (require('playwright')), ffmpeg com rubberband,
# python3 com: faster-whisper soundfile numpy (sugestão: python3 -m venv .venv && .venv/bin/pip install ...).
# O projeto precisa ter: legendas.txt, project.js, sfx_plan.json (e img/ se usar imagens).
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJ="$1"; RAW="$2"; TEMPO="${3:-1.14}"
PY="${PY:-python3}"
cd "$HERE"
mkdir -p "$PROJ/audio" "$PROJ/build"
echo "1/7 tempo das palavras (original)";      $PY -I scripts/align_words.py "$RAW" "$PROJ/audio/palavras_original.json" >/dev/null
echo "2/7 pausas + andamento ($TEMPO x)";     $PY -I scripts/tighten_voice.py "$RAW" "$PROJ/audio/palavras_original.json" "$PROJ/audio/narracao_final.wav" --pause 0.2 --tempo "$TEMPO"
echo "3/7 tempo das palavras (final)";        $PY -I scripts/align_words.py "$PROJ/audio/narracao_final.wav" "$PROJ/audio/narracao_palavras.json"
echo "4/7 legendas e marcas";                  $PY -I scripts/align_captions.py "$PROJ/audio/narracao_palavras.json" "$PROJ/legendas.txt" "$PROJ/captions.js"
DUR=$($PY -c "import json,re;t=open('$PROJ/captions.js').read();print(round(json.loads(re.sub(r'^window.CAPTIONS = ','',t).rstrip().rstrip(';'))['end']+0.3,2))")
echo "   duração do vídeo: ${DUR}s (ajuste R.duration no project.js se necessário)"
echo "5/7 kit de efeitos";                     [ -d build/sfx ] || $PY -I scripts/sfx_synth.py build/sfx >/dev/null
echo "6/7 mixagem";                            $PY -I scripts/mix.py --voice "$PROJ/audio/narracao_final.wav" --captions "$PROJ/captions.js" --plan "$PROJ/sfx_plan.json" --kit build/sfx --dur "$DUR" --out "$PROJ/audio/audio_final.wav" --bed -38 --sfx-gain -4
echo "7/7 render + mux";                       node render.cjs --p "$PROJ" --out "$PROJ/build/video_sem_som.mp4" --workers 4
ffmpeg -v error -y -i "$PROJ/build/video_sem_som.mp4" -i "$PROJ/audio/audio_final.wav" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "$PROJ/build/reel_final.mp4"
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate:format=duration -of compact "$PROJ/build/reel_final.mp4"
echo "Pronto: $PROJ/build/reel_final.mp4  (confira com: node render.cjs --p $PROJ --sheet 0.5)"
