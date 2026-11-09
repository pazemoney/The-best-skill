#!/usr/bin/env python3
"""Tempo de cada palavra da narração (Whisper large-v3-turbo, CPU) → palavras.json.

Uso:  python3 -I align_words.py narracao.wav palavras.json [--model large-v3-turbo]
Instalar (uma vez, num venv): pip install faster-whisper soundfile numpy
Saída: {"words": [{"w": "Toda", "s": 0.0, "e": 0.24, "p": 0.98}, ...], "lines": [...]}
Também serve para conferir a narração: compare o texto transcrito com o roteiro.
"""
import argparse, json, subprocess, tempfile, os
import numpy as np, soundfile as sf
from faster_whisper import WhisperModel

ap = argparse.ArgumentParser()
ap.add_argument('audio'); ap.add_argument('out'); ap.add_argument('--model', default='large-v3-turbo')
ap.add_argument('--prompt', default='Flow Group, WhatsApp, Pix, cardápio, robô, painel.')
a = ap.parse_args()
tmp = os.path.join(tempfile.mkdtemp(), 'a16.wav')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', a.audio, '-ac', '1', '-ar', '16000', tmp], check=True)
y, sr = sf.read(tmp, dtype='float32')
m = WhisperModel(a.model, device='cpu', compute_type='int8', cpu_threads=os.cpu_count() or 4)
segs, info = m.transcribe(y, language='pt', word_timestamps=True, beam_size=5, initial_prompt=a.prompt)
words, lines = [], []
for s in segs:
    lines.append(f'[{s.start:6.2f}-{s.end:6.2f}] {s.text.strip()}')
    for w in s.words:
        words.append(dict(w=w.word.strip(), s=round(w.start, 3), e=round(w.end, 3), p=round(w.probability, 3)))
json.dump(dict(words=words, lines=lines), open(a.out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
dur = words[-1]['e'] - words[0]['s'] if words else 0
print('\n'.join(lines)); print(f'{len(words)} palavras · {len(words)/max(dur,1e-6):.2f} palavras/s · {a.out}')
