#!/usr/bin/env bash
# Scanner de padrões de risco em uma skill (somente leitura). Uso: vet-skill.sh <pasta>
d="${1:?uso: vet-skill.sh <pasta-da-skill>}"; [ -d "$d" ] || { echo "pasta não encontrada: $d" >&2; exit 2; }
score=0
check(){ # titulo regex
  local out; out=$(grep -rInE --exclude='LICENSE*' --exclude='*.lock' --exclude-dir=.git --exclude-dir=node_modules -e "$2" "$d" 2>/dev/null | head -8)
  if [ -n "$out" ]; then echo "[!] $1"; echo "$out" | sed 's/^/    /' | cut -c1-200; score=$((score+1)); fi
}
echo "== Vet: $d =="
echo "arquivos: $(find "$d" -type f | wc -l)  tamanho: $(du -sh "$d" | cut -f1)"
echo "executáveis/scripts:"; find "$d" -type f \( -perm -u+x -o -name '*.sh' -o -name '*.py' -o -name '*.js' -o -name '*.mjs' -o -name '*.ts' -o -name '*.ps1' \) 2>/dev/null | head -15 | sed 's/^/    /'
echo "binários:"; find "$d" -type f \( -name '*.exe' -o -name '*.dll' -o -name '*.so' -o -name '*.bin' -o -name '*.pyc' -o -name '*.wasm' \) | head -5 | sed 's/^/    /'
check "Execução remota (pipe para shell, eval, base64)" '(curl|wget)[^|]*\|[[:space:]]*(sudo[[:space:]]+)?(ba|z)?sh|base64[[:space:]]+(-d|--decode)|\beval[[:space:]]*[\(\$"]|\bexec[[:space:]]*\('
check "Credenciais e segredos" '~/\.ssh|\.aws/credentials|\.config/gh|id_rsa|id_ed25519|keychain|login data|\.npmrc|PRIVATE KEY|AWS_SECRET|ANTHROPIC_API_KEY|OPENAI_API_KEY'
check "Envio de dados para fora" 'curl[^#]*(-d|--data|-F|--upload-file|-X[[:space:]]*POST)|requests\.post|fetch\([^)]*method:[[:space:]]*.POST|nc[[:space:]]+-[a-z]|discord(app)?\.com/api/webhooks|pastebin'
check "Persistência/alteração de configuração" '\.bashrc|\.zshrc|\.profile|crontab|launchctl|git config --global|\.git/hooks|settings(\.local)?\.json|permissions\.allow|\"permissions\"|dangerously|--no-verify'
check "Ações destrutivas" 'rm[[:space:]]+-[a-zA-Z]*r[a-zA-Z]*f[[:space:]]+(/|~|\$HOME)|git push[^#]*--force|git reset --hard|DROP[[:space:]]+(TABLE|DATABASE)|mkfs|dd[[:space:]]+if='
check "Injeção de prompt" 'ignore (all |any )?(previous|prior|above) instructions|disregard (the )?(system|previous)|do not (tell|inform|reveal)[^.]{0,40}user|without (telling|informing) the user|you must not mention'
check "Gatilho abusivo" 'INVOKE FOR EVERY|use (this|em) (skill )?(on|para) (every|TODA|todas)|ALWAYS (invoke|use) this skill|without exception'
if grep -rIlP '[\x{200B}-\x{200F}\x{202A}-\x{202E}\x{2060}-\x{2064}\x{FEFF}]' --exclude-dir=.git "$d" >/dev/null 2>&1; then echo "[!] Caracteres Unicode invisíveis"; grep -rIlP '[\x{200B}-\x{200F}\x{202A}-\x{202E}\x{2060}-\x{2064}\x{FEFF}]' --exclude-dir=.git "$d" | head -5 | sed 's/^/    /'; score=$((score+1)); fi
ls "$d"/LICENSE* "$d"/../LICENSE* 2>/dev/null | head -1 | grep -q . && echo "licença: encontrada" || echo "licença: NÃO encontrada na pasta (confira o repositório de origem)"
echo; if [ "$score" -eq 0 ]; then echo "Resultado: nenhum padrão de risco encontrado (ainda leia o SKILL.md e os scripts)."; else echo "Resultado: $score categoria(s) de risco para revisar manualmente (podem ser falsos positivos)."; fi
