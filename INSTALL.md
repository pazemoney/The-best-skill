# Instruções para o Claude: instalar o The-best-skill

Se o usuário mandou este repositório e pediu para adicionar as skills em você, faça assim.

## 1) Baixar
```bash
git clone --depth 1 https://github.com/pazemoney/The-best-skill ~/the-best-skill
cd ~/the-best-skill
```
(Se já estiver clonado, use a pasta existente.)

## 2) Instalar (padrão recomendado)
```bash
./install.sh
```
Isso instala o **conjunto essencial** (cerca de 40 skills de maior impacto, incluindo o guia `the-best-skill-guide`).
As demais (mais de 2.000) ficam disponíveis **sob demanda** pelo guia, sem pesar no contexto.

Por que não instalar tudo de uma vez: o Claude Code tem um limite de espaço para listar as descrições das skills. Com milhares instaladas, muitas deixam de aparecer e o custo de tokens sobe a cada sessão.

## 3) Se o usuário pediu áreas específicas
Adicione perfis (veja `./install.sh --list`):
```bash
./install.sh --profile 3d-e-scroll,economia-de-tokens,humanizacao,sites-perfeitos
```
Perfis disponíveis incluem: `3d-e-scroll`, `economia-de-tokens`, `humanizacao`, `sites-perfeitos`, `engenharia`, `marketing-e-vendas`, `cloud-e-dados`, `mobile`, `video-e-midia`, `agentes-e-mcp`, `docs-e-produtividade`, `seguranca`.
Use poucos por vez (2 a 3) e confira o espaço com `/context`.

## 4) Se o usuário insistir em TUDO
```bash
./install.sh --all
```
Avise que o Claude Code pode não listar todas as skills por causa do limite, e que o modo recomendado entrega o mesmo alcance com menos custo.

## 5) Uso offline ou sem acesso ao GitHub
```bash
./install.sh --library     # copia a biblioteca inteira para ~/.claude/the-best-skill-library
```

## 6) Depois de instalar
- Diga ao usuário quantas skills foram instaladas e quantas já existiam (o instalador nunca sobrescreve).
- Avise que as skills valem em uma **nova sessão** do Claude Code.
- Explique em uma linha: "Quando precisar de algo fora do essencial, eu busco no catálogo do guia e trago a skill certa."

## Regras
- Peça confirmação antes de instalar fora da pasta de skills do usuário.
- **Não edite o conteúdo das skills.** Para ampliar algo, crie uma skill nova ao lado.
- Skills de terceiros com scripts: passe por `skill-auditor` antes de rodar os scripts.
- Sem shell? Copie cada pasta de `skills/<nome>/` para `~/.claude/skills/<nome>/`.
