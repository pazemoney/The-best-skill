#!/usr/bin/env bash
# Instalador do The-best-skill. Nunca sobrescreve uma skill que você já tem.
#
#   ./install.sh                         recomendado: conjunto essencial (profiles/core.list) + guia com catálogo de todas
#   ./install.sh --profile a,b           essencial + perfis extras (veja --list)
#   ./install.sh --all                   TODAS as skills (pode estourar o limite de descrições do Claude Code)
#   ./install.sh --only nome1,nome2      só estas (o guia vem junto, se não usar --no-guide)
#   ./install.sh --project               instala em ./.claude/skills (só neste projeto)
#   ./install.sh --library               copia a biblioteca completa para ~/.claude/the-best-skill-library (uso sob demanda/offline)
#   ./install.sh --list                  lista os perfis
#   ./install.sh --dry-run               mostra o que faria
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="$HOME/.claude/skills"; PROFILES=""; ONLY=""; ALL=0; LIB=0; DRY=0; NOCORE=0
while [ $# -gt 0 ]; do
  case "$1" in
    --project) DEST="$PWD/.claude/skills" ;;
    --profile) PROFILES="$2"; shift ;;
    --only) ONLY="$2"; shift ;;
    --all) ALL=1 ;;
    --library) LIB=1 ;;
    --no-core) NOCORE=1 ;;
    --dry-run) DRY=1 ;;
    --list) for f in "$HERE"/profiles/*.list; do n=$(basename "$f" .list); printf '%-24s %3d skills  %s\n' "$n" "$(grep -vc '^#' "$f")" "$(head -1 "$f" | sed 's/^# *//' | cut -c1-80)"; done; exit 0 ;;
    -h|--help) sed -n '2,12p' "$0"; exit 0 ;;
    *) echo "opção desconhecida: $1 (use --help)" >&2; exit 1 ;;
  esac; shift
done

names=()
add_list(){ while IFS= read -r l; do l="${l%%#*}"; l="$(echo "$l" | xargs)"; [ -n "$l" ] && names+=("$l"); done < "$1"; }
if [ "$ALL" = 1 ]; then
  for d in "$HERE"/skills/*/; do names+=("$(basename "$d")"); done
elif [ -n "$ONLY" ]; then
  IFS=',' read -ra arr <<< "$ONLY"; names+=("${arr[@]}"); names+=("the-best-skill-guide")
else
  [ "$NOCORE" = 1 ] || add_list "$HERE/profiles/core.list"
  if [ -n "$PROFILES" ]; then
    IFS=',' read -ra ps <<< "$PROFILES"
    for p in "${ps[@]}"; do [ -f "$HERE/profiles/$p.list" ] || { echo "perfil não existe: $p (use --list)" >&2; exit 1; }; add_list "$HERE/profiles/$p.list"; done
  fi
fi

mkdir -p "$DEST"; added=0; skipped=0; missing=0
declare -A seen=()
for n in "${names[@]}"; do
  [ -n "${seen[$n]:-}" ] && continue; seen[$n]=1
  src="$HERE/skills/$n"
  if [ ! -d "$src" ]; then echo "  (não encontrada: $n)"; missing=$((missing+1)); continue; fi
  if [ -e "$DEST/$n" ]; then skipped=$((skipped+1)); continue; fi
  if [ "$DRY" = 1 ]; then echo "  instalaria: $n"; else cp -R "$src" "$DEST/$n"; fi
  added=$((added+1))
done
echo "Instaladas: $added | já existiam (puladas): $skipped | não encontradas: $missing | destino: $DEST"

if [ "$DRY" = 0 ]; then mkdir -p "$HOME/.claude" && printf "%s\n" "$HERE" > "$HOME/.claude/the-best-skill-repo"; fi   # o guia usa este caminho para buscar skills sob demanda
if [ "$LIB" = 1 ] && [ "$DRY" = 0 ]; then
  LIBDIR="$HOME/.claude/the-best-skill-library"; mkdir -p "$LIBDIR"
  cp -R "$HERE/skills" "$LIBDIR/" 2>/dev/null || true
  cp "$HERE/INDEX.md" "$LIBDIR/" 2>/dev/null || true
  echo "Biblioteca completa copiada para $LIBDIR"
fi
if [ "$ALL" = 1 ]; then
  echo "Aviso: com milhares de skills o Claude Code pode não listar todas (há limite de espaço para descrições). Rode /context para conferir."
else
  echo "O guia (the-best-skill-guide) acessa as demais skills sob demanda. Abra uma NOVA sessão do Claude Code para as skills valerem."
fi
