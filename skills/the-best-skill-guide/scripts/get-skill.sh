#!/usr/bin/env bash
# Traz uma skill do The-best-skill sob demanda.
#   get-skill.sh <nome> [--install] [--project]
# Procura nesta ordem: biblioteca local -> clone local do repositório -> GitHub (checkout parcial).
set -euo pipefail
name="${1:?uso: get-skill.sh <nome> [--install] [--project]}"; shift || true
INSTALL=0; DEST="$HOME/.claude/skills"
for a in "$@"; do case "$a" in --install) INSTALL=1;; --project) DEST="$PWD/.claude/skills";; esac; done
REPO="${BEST_SKILL_REPO:-https://github.com/pazemoney/The-best-skill}"
CACHE="${BEST_SKILL_CACHE:-$HOME/.claude/the-best-skill-cache}"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
found=""
REPOPTR=""; [ -f "$HOME/.claude/the-best-skill-repo" ] && REPOPTR="$(cat "$HOME/.claude/the-best-skill-repo")/skills"
for base in "${BEST_SKILL_LIBRARY:-}" "$REPOPTR" "$HOME/.claude/the-best-skill-library/skills" "$HERE/../.." "$CACHE/repo/skills"; do
  [ -n "$base" ] && [ -d "$base/$name" ] && { found="$base/$name"; break; }
done
if [ -z "$found" ]; then
  mkdir -p "$CACHE"
  if [ ! -d "$CACHE/repo/.git" ]; then
    git clone -q --depth 1 --filter=blob:none --sparse "$REPO" "$CACHE/repo" 2>/dev/null \
      || { rm -rf "$CACHE/repo"; git clone -q --depth 1 "$REPO" "$CACHE/repo"; }
  fi
  ( cd "$CACHE/repo" && git sparse-checkout set "skills/$name" 2>/dev/null || true )
  [ -d "$CACHE/repo/skills/$name" ] && found="$CACHE/repo/skills/$name"
fi
[ -n "$found" ] || { echo "skill não encontrada: $name (veja CATALOG.tsv)" >&2; exit 1; }
echo "SKILL: $found/SKILL.md"
if [ "$INSTALL" = 1 ]; then
  mkdir -p "$DEST"
  if [ -e "$DEST/$name" ]; then echo "já instalada em $DEST/$name (não sobrescrevi)"; else cp -R "$found" "$DEST/$name"; echo "instalada em $DEST/$name (vale em nova sessão)"; fi
fi
