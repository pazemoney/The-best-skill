#!/usr/bin/env python3
"""Estima quando um post foi publicado a partir de um print.

Uso:
  python3 publish_time.py "2026-11-08 11:50" "14 h"
  python3 publish_time.py "2026-11-08 11:50:31" "Há 14 horas"
  python3 publish_time.py "2026-11-08 11:50" "3 d"

O horário do print vem da barra de status ou do EXIF do PNG (iPhone grava DateCreated):
  python3 -c "from PIL import Image; print(Image.open('print.png').getexif().get(306))"
O Instagram trunca ("14 h" = entre 14h00 e 14h59 atrás); a janela "arredondada" vai como margem extra.
"""
import re, sys
from datetime import datetime, timedelta

DIAS = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo']

def parse_ago(s):
    s = s.lower().replace('há', '').strip()
    m = re.match(r'(\d+)\s*(s|seg|min|m|h|hora|horas|d|dia|dias|sem|semana|semanas)\b', s)
    if not m: raise SystemExit('não entendi o "há X": use "45 min", "14 h", "3 d", "2 sem"')
    n, u = int(m.group(1)), m.group(2)
    unit = {'s': 1, 'seg': 1, 'min': 60, 'm': 60, 'h': 3600, 'hora': 3600, 'horas': 3600,
            'd': 86400, 'dia': 86400, 'dias': 86400, 'sem': 604800, 'semana': 604800, 'semanas': 604800}[u]
    return n, unit

def main():
    if len(sys.argv) < 3: sys.exit(__doc__)
    shot = datetime.fromisoformat(sys.argv[1].replace('/', '-'))
    n, unit = parse_ago(sys.argv[2])
    lo, hi = shot - timedelta(seconds=(n + 1) * unit), shot - timedelta(seconds=n * unit)
    rlo, rhi = shot - timedelta(seconds=(n + 0.5) * unit), shot - timedelta(seconds=(n - 0.5) * unit)
    mid = lo + (hi - lo) / 2
    f = lambda d: f"{DIAS[d.weekday()]} {d:%d/%m/%Y %H:%M}"
    print(f'Print: {f(shot)} · "{sys.argv[2]}"')
    print(f'Publicação (truncamento do Instagram): entre {f(lo)} e {f(hi)} · centro {f(mid)}')
    print(f'Se o app arredondar: entre {f(rlo)} e {f(rhi)}')
    print(f'Janela segura: {f(min(lo, rlo))} a {f(max(hi, rhi))}')

if __name__ == '__main__':
    main()
