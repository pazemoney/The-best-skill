#!/usr/bin/env bash
# Auditoria rápida de "peso fixo" do Claude Code: CLAUDE.md, skills, MCP e arquivos grandes.
# Uso: bash token-audit.sh [diretório-do-projeto]   (somente leitura)
P="${1:-.}"
est(){ echo $(( ($1 + 3) / 4 )); }   # ~4 caracteres por token (estimativa)
echo "== CLAUDE.md (estimativa de tokens) =="
for f in "$HOME/.claude/CLAUDE.md" "$P/CLAUDE.md" "$P/.claude/CLAUDE.md"; do
  [ -f "$f" ] && { c=$(wc -c <"$f"); echo "$(est "$c") tok  $(wc -l <"$f") linhas  $f"; }
done
echo; echo "== Skills instaladas (custo fixo das descrições) =="
for d in "$HOME/.claude/skills" "$P/.claude/skills"; do
  [ -d "$d" ] || continue
  n=0; chars=0
  for s in "$d"/*/SKILL.md; do
    [ -f "$s" ] || continue
    n=$((n+1))
    c=$(awk '/^description:/{f=1} f{print} /^---$/&&NR>1&&f{exit}' "$s" | head -c 1200 | wc -c)
    chars=$((chars+c))
  done
  echo "$n skills em $d  ~$(est $chars) tokens só em descrições"
done
echo; echo "== MCP configurado =="
for f in "$P/.mcp.json" "$HOME/.claude.json" "$P/.claude/settings.json" "$HOME/.claude/settings.json"; do
  [ -f "$f" ] && { n=$(grep -c '"command"\|"url"' "$f" 2>/dev/null); echo "$n entradas (command/url) em $f"; }
done
echo; echo "== Regras deny de leitura =="
grep -h '"Read(' "$P/.claude/settings.json" "$HOME/.claude/settings.json" 2>/dev/null | head -5 || true
[ -z "$(grep -h '"Read(' "$P/.claude/settings.json" "$HOME/.claude/settings.json" 2>/dev/null)" ] && echo "nenhuma (considere bloquear node_modules/dist/lockfiles)"
echo; echo "== 10 maiores arquivos do projeto (ignora node_modules/.git) =="
find "$P" \( -name node_modules -o -name .git -o -name .next -o -name dist \) -prune -o -type f -printf '%s %p\n' 2>/dev/null | sort -rn | head -10 | awk '{printf "%.1f MB  %s\n",$1/1048576,$2}'
