#!/usr/bin/env python3
"""Kit de efeitos sonoros de interface, sintetizado (determinístico, sem custo e sem licença de terceiros).

Uso:  python3 -I sfx_synth.py pasta_saida/
Gera WAV 48 kHz estéreo: whoosh, whoosh_rev, tick, ticks, pop, ding, success, thud, hit, toggle, typing, shutter, error, bed.
Na referência os efeitos ficam 25–35 dB abaixo da voz: são "sentidos", não "ouvidos". Mantenha assim.
"""
import os, sys
import numpy as np
import soundfile as sf

SR = 48000
rng = np.random.default_rng(42)
out = sys.argv[1] if len(sys.argv) > 1 else 'sfx'
os.makedirs(out, exist_ok=True)

def t_(d): return np.arange(int(SR * d)) / SR
def env(n, a, d, curve=4.0):
    a = max(1, int(a * SR)); x = np.ones(n)
    x[:a] = np.linspace(0, 1, a) ** 2
    rest = n - a
    if rest > 0: x[a:] = np.exp(-curve * np.linspace(0, 1, rest))
    return x
def bandpass(x, lo, hi):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    X[(f < lo) | (f > hi)] = 0
    return np.fft.irfft(X, len(x))
def sweep_noise(d, f0, f1, bw=0.7):
    """ruído filtrado com centro de frequência variando de f0 a f1 (STFT simples)"""
    n = int(SR * d); nfft, hop = 1024, 256
    x = rng.standard_normal(n + nfft); win = np.hanning(nfft)
    y = np.zeros(len(x)); wsum = np.zeros(len(x)); fr = np.fft.rfftfreq(nfft, 1 / SR)
    for i in range(0, len(x) - nfft, hop):
        fc = f0 * (f1 / f0) ** min(1.0, i / n)
        mask = np.exp(-0.5 * ((np.log(fr + 1) - np.log(fc)) / max(bw * 0.5, 1e-3)) ** 2)
        y[i:i + nfft] += np.fft.irfft(np.fft.rfft(x[i:i + nfft] * win) * mask, nfft) * win
        wsum[i:i + nfft] += win ** 2
    return (y / np.maximum(wsum, 1e-6))[:n]
def stereo(x, pan=0.0):
    l = np.cos((pan + 1) * np.pi / 4); r = np.sin((pan + 1) * np.pi / 4)
    return np.stack([x * l, x * r], 1)
def norm(x, peak_db=-3.0):
    m = np.max(np.abs(x)) + 1e-9
    return x / m * 10 ** (peak_db / 20)
def save(name, x, pan=0.0):
    if x.ndim == 1: x = stereo(x, pan)
    sf.write(os.path.join(out, name + '.wav'), x.astype(np.float32), SR)

def reverb(x, decay=0.35, mix=0.18):
    n = int(SR * decay * 3); ir = rng.standard_normal(n) * np.exp(-np.linspace(0, 9, n))
    ir = bandpass(ir, 300, 9000); ir /= np.max(np.abs(ir)) + 1e-9
    wet = np.convolve(x, ir) * 0.08
    y = np.concatenate([x, np.zeros(len(wet) - len(x))]); return y * (1 - mix) + wet * mix * 6

# whoosh (chicote): ruído varrendo 350 → 2600 Hz, sobe e desce, atravessa da esquerda para a direita
d = 0.5; n = int(SR * d)
w = sweep_noise(d, 350, 2600, 0.9) * np.sin(np.linspace(0, np.pi, n)) ** 2
pan = np.linspace(-0.7, 0.7, n)
save('whoosh', norm(np.stack([w * np.cos((pan + 1) * np.pi / 4), w * np.sin((pan + 1) * np.pi / 4)], 1), -4))
w2 = sweep_noise(d, 2400, 400, 0.9) * np.sin(np.linspace(0, np.pi, n)) ** 2
save('whoosh_rev', norm(np.stack([w2 * np.cos((-pan + 1) * np.pi / 4), w2 * np.sin((-pan + 1) * np.pi / 4)], 1), -4))

# tick: clique curto e seco
tk = bandpass(rng.standard_normal(int(SR * 0.03)), 2500, 9000) * env(int(SR * 0.03), 0.001, 0.03, 9)
save('tick', norm(tk, -6))
# ticks: contador rodando (0,7 s)
tt = np.zeros(int(SR * 0.8))
for k, at in enumerate(np.linspace(0, 0.7, 14)):
    i = int(at * SR); seg = norm(tk, -6 - k * 0.4); tt[i:i + len(seg)] += seg[: len(tt) - i]
save('ticks', norm(tt, -6))

# pop: bolha de mensagem (seno com queda de altura)
tp = t_(0.14); f = 980 * np.exp(-tp * 9) + 420
pp = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(tp), 0.002, 0.14, 7)
save('pop', norm(reverb(pp, 0.2, 0.12), -5))

# ding: notificação de dois tons (C6 → G6)
dg = np.zeros(int(SR * 0.9))
for at, fq in [(0.0, 1046.5), (0.085, 1568.0)]:
    tt_ = t_(0.75); tone = (np.sin(2 * np.pi * fq * tt_) + 0.25 * np.sin(2 * np.pi * fq * 2 * tt_)) * env(len(tt_), 0.003, 0.75, 6)
    i = int(at * SR); dg[i:i + len(tone)] += tone[: len(dg) - i]
save('ding', norm(reverb(dg, 0.3, 0.15), -6))

# success: arpejo suave C6–E6–G6
sc = np.zeros(int(SR * 1.0))
for k, fq in enumerate([1046.5, 1318.5, 1568.0]):
    tt_ = t_(0.7); tone = np.sin(2 * np.pi * fq * tt_) * env(len(tt_), 0.004, 0.7, 5)
    i = int(k * 0.07 * SR); sc[i:i + len(tone)] += tone[: len(sc) - i]
save('success', norm(reverb(sc, 0.35, 0.18), -6))

# error: dois tons descendentes graves (problema)
er = np.zeros(int(SR * 0.6))
for at, fq in [(0.0, 392.0), (0.12, 311.1)]:
    tt_ = t_(0.4); tone = (np.sin(2 * np.pi * fq * tt_) + 0.3 * np.sin(2 * np.pi * fq * 3 * tt_)) * env(len(tt_), 0.003, 0.4, 6)
    i = int(at * SR); er[i:i + len(tone)] += tone[: len(er) - i]
save('error', norm(er, -6))

# thud / carimbo: grave com transiente
th_t = t_(0.45); fth = 95 * np.exp(-th_t * 6) + 48
th = np.sin(2 * np.pi * np.cumsum(fth) / SR) * env(len(th_t), 0.002, 0.45, 6)
th[: int(SR * 0.012)] += bandpass(rng.standard_normal(int(SR * 0.012)), 800, 6000) * 0.6
save('thud', norm(th, -3))

# hit: impacto de abertura/marca (sub + ar + cauda)
ht = t_(1.4); fh = 70 * np.exp(-ht * 3) + 38
sub = np.sin(2 * np.pi * np.cumsum(fh) / SR) * env(len(ht), 0.004, 1.4, 4)
air = bandpass(rng.standard_normal(len(ht)), 1500, 12000) * env(len(ht), 0.001, 1.4, 14) * 0.35
save('hit', norm(reverb(sub + air, 0.6, 0.2), -3))

# toggle: dois cliques (liga)
tg = np.zeros(int(SR * 0.12)); c = norm(bandpass(rng.standard_normal(int(SR * 0.012)), 1500, 7000) * env(int(SR * 0.012), 0.0005, 0.012, 8), -6)
tg[: len(c)] += c; tg[int(SR * 0.055): int(SR * 0.055) + len(c)] += c * 0.8
save('toggle', norm(tg, -5))

# typing: teclas
ty = np.zeros(int(SR * 0.9))
for at in np.cumsum(rng.uniform(0.06, 0.12, 9)):
    if at > 0.85: break
    k = norm(bandpass(rng.standard_normal(int(SR * 0.02)), 1800, 8000) * env(int(SR * 0.02), 0.0005, 0.02, 10), -8 - rng.uniform(0, 4))
    i = int(at * SR); ty[i:i + len(k)] += k[: len(ty) - i]
save('typing', norm(ty, -6))

# shutter: porta de enrolar descendo (chocalho + baque)
sh = sweep_noise(0.7, 1800, 600, 1.2) * (0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 26 * t_(0.7)))) * np.linspace(0.6, 1, int(SR * 0.7))
sh = np.concatenate([sh, np.zeros(int(SR * 0.25))]); i = int(SR * 0.66); sh[i:i + len(th)] += th[: len(sh) - i] * 0.8
save('shutter', norm(sh, -4))

# bed: leito grave quase imperceptível (A1/E2/A2 com variação lenta), 60 s
bt = t_(60.0)
bed = sum(a * np.sin(2 * np.pi * f * bt + p) for a, f, p in [(1.0, 55.0, 0), (0.5, 82.41, 1.1), (0.35, 110.0, 2.3), (0.12, 164.8, 0.4)])
bed *= 0.75 + 0.25 * np.sin(2 * np.pi * 0.07 * bt)
hiss = bandpass(rng.standard_normal(len(bt)), 2000, 8000) * 0.015
fade = np.minimum(1, np.minimum(bt / 1.5, (60 - bt) / 2.0))
save('bed', norm((bed + hiss) * fade, -12))
print('kit gerado em', out, sorted(os.listdir(out)))
