#!/usr/bin/env python3
"""Mixagem do Reels: voz tratada + efeitos nos instantes das cenas + leito opcional → -14 LUFS.

Uso:
  python3 -I mix.py --voice narracao.wav --captions captions.js --plan sfx_plan.json --kit pasta_sfx \
                    --dur 50.0 --out audio_final.wav [--bed -34]

sfx_plan.json: lista de {"cue": "nome" | "t": segundos, "off": 0.0, "sfx": "whoosh", "db": -18}
  - "cue" usa as marcas @nome do legendas.txt (mesmo tempo das cenas), "off" desloca (s).
Padrão da referência: voz na frente e seca; efeitos 25–35 dB abaixo; sem música chamando atenção.
"""
import argparse, json, os, re, subprocess, tempfile
import numpy as np, soundfile as sf

ap = argparse.ArgumentParser()
ap.add_argument('--voice', required=True); ap.add_argument('--captions', required=True)
ap.add_argument('--plan', required=True); ap.add_argument('--kit', required=True)
ap.add_argument('--dur', type=float, required=True); ap.add_argument('--out', required=True)
ap.add_argument('--bed', type=float, default=None, help='ganho do leito em dB (ex.: -34); omita para sem leito')
ap.add_argument('--lufs', type=float, default=-14.0)
ap.add_argument('--sfx-gain', type=float, default=0.0, help='ajuste global dos efeitos em dB')
a = ap.parse_args()
SR = 48000
tmp = tempfile.mkdtemp()

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0: raise SystemExit(r.stderr[-2000:])
    return r

# 1) voz: limpa graves, tira "embolado", dá presença, controla sibilância, comprime (a referência tem LRA 1,4 LU)
vproc = os.path.join(tmp, 'voz.wav')
run(['ffmpeg', '-v', 'error', '-y', '-i', a.voice, '-ac', '1', '-ar', str(SR), '-af',
     'highpass=f=75,equalizer=f=250:t=q:w=1.0:g=-2,equalizer=f=3500:t=q:w=1.2:g=2.5,deesser=i=0.4,'
     'acompressor=threshold=-21dB:ratio=3:attack=5:release=90:makeup=2', vproc])
voice, _ = sf.read(vproc, dtype='float32')

N = int(a.dur * SR)
mix = np.zeros((N, 2), dtype=np.float32)
v = voice[:N]
mix[:len(v), 0] += v; mix[:len(v), 1] += v

# 2) marcas de tempo das cenas
txt = open(a.captions, encoding='utf-8').read()
cap = json.loads(re.sub(r'^\s*window\.CAPTIONS\s*=\s*', '', txt).rstrip().rstrip(';'))
cues = cap['cues']

def load(name):
    x, sr = sf.read(os.path.join(a.kit, name + '.wav'), dtype='float32')
    if x.ndim == 1: x = np.stack([x, x], 1)
    assert sr == SR, f'{name}: esperava {SR} Hz'
    return x

placed = 0
for it in json.load(open(a.plan, encoding='utf-8')):
    t = it['t'] if 't' in it else cues.get(it['cue'])
    if t is None:
        print('aviso: marca não encontrada:', it.get('cue')); continue
    t += it.get('off', 0.0)
    x = load(it['sfx']) * (10 ** ((it.get('db', -20) + a.sfx_gain) / 20))
    i = max(0, int(t * SR)); j = min(N, i + len(x))
    if j > i: mix[i:j] += x[: j - i]; placed += 1

# 3) leito opcional com "ducking" sob a voz
if a.bed is not None:
    bed = load('bed')
    reps = int(np.ceil(N / len(bed))); bed = np.tile(bed, (reps, 1))[:N] * (10 ** (a.bed / 20))
    hop = int(0.05 * SR); env = np.zeros(N)
    for i in range(0, len(v), hop):
        env[i:i + hop] = np.sqrt(np.mean(v[i:i + hop] ** 2) + 1e-12)
    k = np.convolve(env, np.ones(hop * 4) / (hop * 4), mode='same')
    duck = 1 - 0.5 * np.clip(k / (k.max() + 1e-9) * 3, 0, 1)
    fade = np.minimum(1, (N - np.arange(N)) / (0.25 * SR))
    mix += bed * (duck * fade)[:, None]

pre = os.path.join(tmp, 'pre.wav'); sf.write(pre, mix, SR)
# 4) master: limitador + loudness em duas passadas
meas = run(['ffmpeg', '-hide_banner', '-y', '-i', pre, '-af', f'alimiter=limit=0.89,loudnorm=I={a.lufs}:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-']).stderr
m = json.loads(meas[meas.rindex('{'):meas.rindex('}') + 1])
af = (f"alimiter=limit=0.89,loudnorm=I={a.lufs}:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:"
      f"measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true")
run(['ffmpeg', '-v', 'error', '-y', '-i', pre, '-af', af, '-ar', str(SR), '-ac', '2', a.out])
chk = run(['ffmpeg', '-hide_banner', '-i', a.out, '-af', 'ebur128=peak=true', '-f', 'null', '-']).stderr
I = re.findall(r'I:\s+(-?[\d.]+) LUFS', chk)[-1]; LRA = re.findall(r'LRA:\s+([\d.]+) LU', chk)[-1]
TP = re.findall(r'Peak:\s+(-?[\d.]+) dBFS', chk)
print(f'efeitos colocados: {placed} | integrado {I} LUFS | LRA {LRA} LU | pico {TP[-1] if TP else "?"} dBTP | {a.out}')
