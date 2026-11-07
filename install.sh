#!/usr/bin/env bash
# Instala todas as skills do The-best-skill.
# Uso:
#   ./install.sh              -> instala para o seu usuário (~/.claude/skills)
#   ./install.sh --project    -> instala só no projeto atual (./.claude/skills)
#   ./install.sh --only a,b   -> instala só as skills listadas
# Nunca sobrescreve uma skill que você já tem: se a pasta existir, ela é pulada.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="$HOME/.claude/skills"; ONLY=""
while [ $# -gt 0 ]; do
  case "$1" in
    --project) DEST="$PWD/.claude/skills" ;;
    --only) ONLY="$2"; shift ;;
    *) echo "opção desconhecida: $1" >&2; exit 1 ;;
  esac; shift
done
mkdir -p "$DEST"; added=0; skipped=0
for dir in "$HERE"/skills/*/; do
  name="$(basename "$dir")"
  if [ -n "$ONLY" ] && ! echo ",$ONLY," | grep -q ",$name,"; then continue; fi
  if [ -e "$DEST/$name" ]; then skipped=$((skipped+1)); continue; fi
  cp -R "$dir" "$DEST/$name"; added=$((added+1))
done
echo "Instaladas: $added | já existiam (puladas): $skipped | destino: $DEST"
