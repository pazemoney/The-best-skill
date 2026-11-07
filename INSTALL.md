# Instruções para o Claude: instalar as skills deste repositório

Se o usuário pediu para adicionar essas skills em você, faça o seguinte:

1. Clone o repositório (se ainda não estiver no disco):
   `git clone --depth 1 https://github.com/pazemoney/The-best-skill`
2. Dentro da pasta clonada, rode `./install.sh` (instala em `~/.claude/skills`).
   - Se o usuário quiser só no projeto atual: `./install.sh --project`.
   - Se quiser só algumas skills: `./install.sh --only nome1,nome2`.
3. O script não sobrescreve skills que já existem. Avise o usuário quantas foram instaladas e quantas foram puladas.
4. Diga que as skills passam a valer ao abrir uma nova sessão do Claude Code.
5. Não edite o conteúdo das skills. Se quiser ampliar algo, crie uma skill nova ao lado.

Sem acesso a shell? Copie cada pasta de `skills/<nome>/` para `~/.claude/skills/<nome>/`.
