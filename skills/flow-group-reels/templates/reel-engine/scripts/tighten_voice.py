#!/usr/bin/env python3
"""Enxuga as pausas da narração e ajusta o andamento sem mudar o tom.

Uso:
  python3 -I tighten_voice.py entrada.mp3 palavras.json saida.wav [--pause 0.22] [--tempo 1.12] [--keep "percebe.:0.32"]

- palavras.json: saída do align_words.py (lista "words" com w/s/e em segundos) feita sobre a ENTRADA.
- Cada pausa entre palavras maior que --pause vira --pause (ou o valor de --keep para a palavra indicada),
  cortando só o miolo silencioso (detectado por energia) com microfades de 12 ms.
- Depois aplica rubberband (tempo > 1 acelera) preservando formantes. Rode o align de novo na saída.
Requer: numpy, soundfile, ffmpeg com o filtro rubberband.
"""
import argparse, json, subprocess, tempfile, os
import numpy as np, soundfile as sf

ap = argparse.ArgumentParser()
ap.add_argument('inp'); ap.add_argument('words'); ap.add_argument('out')
ap.add_argument('--pause', type=float, default=0.22)
ap.add_argument('--tempo', type=float, default=1.0)
ap.add_argument('--keep', default='', help='palavra:pausa separados por vírgula, ex. "percebe.:0.32,melhor?:0.3"')
ap.add_argument('--sr', type=int, default=48000)
a = ap.parse_args()

keep = {}
for kv in filter(None, a.keep.split(',')):
    k, v = kv.rsplit(':', 1); keep[k.strip().lower()] = float(v)

tmp = tempfile.mkdtemp()
wav = os.path.join(tmp, 'in.wav')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', a.inp, '-ac', '1', '-ar', str(a.sr), wav], check=True)
y, sr = sf.read(wav, dtype='float32')
W = json.load(open(a.words, encoding='utf-8'))['words']

def rms_db(seg):
    return 20 * np.log10(np.sqrt(np.mean(seg ** 2)) + 1e-9) if len(seg) else -120

cuts = []  # (ini, fim) em amostras a remover
for i in range(len(W) - 1):
    e, s = W[i]['e'], W[i + 1]['s']
    target = keep.get(W[i]['w'].strip().lower(), a.pause)
    if s - e <= target + 0.03:
        continue
    # refina a região silenciosa por energia (janelas de 10 ms)
    lo, hi = int(max(0, e - 0.06) * sr), int(min(len(y) / sr, s + 0.06) * sr)
    hop = int(0.01 * sr)
    quiet = [j for j in range(lo, hi - hop, hop) if rms_db(y[j:j + hop]) < -42]
    if len(quiet) < 3:
        continue
    q0, q1 = quiet[0], quiet[-1] + hop
    have = (q1 - q0) / sr
    total_gap = s - e
    remove = min(have - 0.06, total_gap - target)
    if remove <= 0.02:
        continue
    mid = (q0 + q1) // 2
    r0 = int(mid - remove * sr / 2); r1 = int(mid + remove * sr / 2)
    cuts.append((r0, r1))

fade = int(0.012 * sr)
out, pos = [], 0
for r0, r1 in cuts:
    seg = y[pos:r0].copy()
    if len(seg) > fade: seg[-fade:] *= np.linspace(1, 0, fade)
    out.append(seg)
    pos = r1
    nxt = y[pos:pos + fade].copy()
    if len(nxt) == fade: y[pos:pos + fade] = nxt * np.linspace(0, 1, fade)
out.append(y[pos:])
z = np.concatenate(out)
mid_wav = os.path.join(tmp, 'mid.wav')
sf.write(mid_wav, z, sr)
removed = (len(y) - len(z)) / sr
af = f'rubberband=tempo={a.tempo}:formant=preserved:transients=mixed:pitchq=quality' if abs(a.tempo - 1) > 1e-3 else 'anull'
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', mid_wav, '-af', af, '-ar', str(sr), a.out], check=True)
print(f'pausas encurtadas: {len(cuts)} | removido {removed:.2f}s | {len(y)/sr:.2f}s -> {len(z)/sr:.2f}s -> ~{len(z)/sr/a.tempo:.2f}s (tempo {a.tempo})')
