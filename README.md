# The Best Skill

**703 skills** das melhores do [skills.sh](https://skills.sh), de todas as áreas, num só repositório.
Em vez de instalar uma por uma, você instala tudo de uma vez.

## Como usar (o jeito fácil)

Mande o link deste repositório para o Claude e escreva:

> Adicione as skills desse repositório em você mesmo: https://github.com/pazemoney/The-best-skill

O Claude vai ler o [`INSTALL.md`](INSTALL.md) e instalar tudo.

## Instalar na mão

```bash
git clone https://github.com/pazemoney/The-best-skill
cd The-best-skill
./install.sh              # para você (~/.claude/skills)
./install.sh --project    # só no projeto atual
./install.sh --only humanizer,tdd,frontend-design   # só algumas
```

Ou como plugin do Claude Code:

```
/plugin marketplace add pazemoney/The-best-skill
/plugin install the-best-skill@the-best-skill
```

O instalador nunca sobrescreve uma skill que você já tem.

## O que tem aqui

- Lista completa com origem e instalações: [`INDEX.md`](INDEX.md)
- Guia para escolher a skill certa: `skills/the-best-skill-guide`
- Principais áreas: design e UI, front-end e React, engenharia de software, testes, marketing e vendas, vídeo e avatar (todas as skills da HeyGen e do Hyperframes), escrita (Humanizer), agentes e MCP, cloud (Azure, AWS, Cloudflare, Firebase, Supabase), mobile (Expo, Flutter, React Native), dados e documentos.
- Para achar e criar skills: `find-skills` e `skill-creator`.

## Regras da coleção

- As skills são copiadas **sem alteração** dos repositórios originais. Melhorias entram só **adicionando** (ex.: o guia), nunca editando o que já existe.
- Cada skill mantém o autor original. As licenças estão em `licenses/`.
- Ficaram de fora `docx`, `pdf`, `pptx` e `xlsx` da Anthropic (licença proíbe redistribuir) e clones de repositórios já incluídos.
- Arquivos acima de 1 MB e vídeos, fontes e fotos de banco de imagem foram omitidos para manter o repositório leve.
- São instruções de terceiros: revise antes de usar em projeto sensível.
