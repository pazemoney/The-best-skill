#!/usr/bin/env bash
# Busca skills no skills.sh. Uso: search-skills.sh "termo" [quantidade=15]
q="${1:?uso: search-skills.sh \"termo\" [quantidade]}"; n="${2:-15}"
enc=$(python3 -c 'import sys,urllib.parse;print(urllib.parse.quote(sys.argv[1]))' "$q" 2>/dev/null || printf '%s' "$q" | sed 's/ /%20/g')
json=$(curl -fsSL -m 30 "https://www.skills.sh/api/search?q=${enc}&limit=${n}") || { echo "Falha ao acessar www.skills.sh (rede bloqueada ou rota mudou). Use https://www.skills.sh ou 'npx skills find'." >&2; exit 1; }
if command -v jq >/dev/null 2>&1; then
  echo "$json" | jq -r '.skills|sort_by(-.installs)[]|"\(.installs)\t\(.id)"' | head -n "$n" | awk -F'\t' '{printf "%10s  %s\n",$1,$2}'
else
  echo "$json" | python3 -c 'import sys,json
for s in sorted(json.load(sys.stdin)["skills"],key=lambda s:-s["installs"]): print("%10d  %s"%(s["installs"],s["id"]))' | head -n "$n"
fi
