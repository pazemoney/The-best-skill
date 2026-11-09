# The Best Skill

**2130 skills** das mais usadas do mundo ([skills.sh](https://skills.sh)), de todas as áreas, num só repositório. Em vez de baixar uma skill de cada vez, você instala tudo de uma vez e o Claude passa a ter o melhor de cada área.

## Como usar (o jeito fácil)

Mande o link deste repositório para o Claude (Claude Code) e escreva:

> Adicione as skills desse repositório em você mesmo: https://github.com/pazemoney/The-best-skill

O Claude lê o [`INSTALL.md`](INSTALL.md) e instala.

## Como funciona (e por que não instala tudo "chapado")

O Claude Code mostra ao modelo o nome e a descrição de cada skill instalada, e há limite de espaço para isso. Com milhares de skills, muitas ficariam invisíveis e o gasto de tokens subiria em toda sessão. Por isso o instalador faz o seguinte:

1. **Instala o conjunto essencial** (~40 skills de maior impacto, em [`profiles/core.list`](profiles/core.list)) e o **guia** `the-best-skill-guide`.
2. O guia traz um **catálogo** de todas as 2130 skills. Quando uma tarefa precisa de uma skill fora do essencial, o Claude a **busca e traz sob demanda**.
3. Quem quiser pode adicionar **perfis** por assunto ou instalar **tudo** (`--all`).

## Instalar na mão

```bash
git clone https://github.com/pazemoney/The-best-skill && cd The-best-skill
./install.sh                                            # recomendado (essencial + guia)
./install.sh --profile 3d-e-scroll,economia-de-tokens   # adiciona grupos
./install.sh --list                                     # lista os perfis
./install.sh --all                                      # tudo (pode estourar o limite de descrições)
./install.sh --only humanizer-pt-br,tdd                 # só algumas
./install.sh --project                                  # só no projeto atual (.claude/skills)
./install.sh --library                                  # copia a biblioteca completa (offline)
```
O instalador **nunca sobrescreve** uma skill que você já tem.

## Skills originais deste repositório

| Skill | Para quê |
|---|---|
| `model-funnel` | **Funil de modelos**: tarefa fácil para o Haiku, média para o Sonnet, difícil para o Opus, com subagentes prontos, verificação e escalada |
| `token-economy` | **Economia de tokens**: medir, ler menos, cortar saída, delegar, enxugar CLAUDE.md/MCP/skills (com script de auditoria) |
| `site-3d-scroll` | **Sites 3D e animação de rolagem sem tremor** (three.js + GSAP), com modelo pronto e medidor de tremor nos quadros reais |
| `perfect-website-rules` | **Regras para sites perfeitos**: estratégia, design system, copy honesta, movimento, acessibilidade, SEO, desempenho, entrega |
| `humanizer-pt-br` | **Humanizador em português do Brasil** (tira a cara de texto de IA sem mudar fatos) |
| `skill-hunter` | Acha skills no skills.sh/GitHub, avalia e instala sem sobrescrever |
| `skill-auditor` | Auditoria de segurança de skills de terceiros (scanner + checklist) |
| `the-best-skill-guide` | Catálogo e entrega sob demanda de todas as skills |
| `flow-group-reels` | **Reels virais da Flow Group**: engenharia reversa de um viral, Fórmula FLOW de roteiro, edição e voz ElevenLabs com números, modelo de descrição, horários a testar, métricas com notas e um motor de vídeo 1080×1920 pronto (com o primeiro Reels como exemplo) |

O modelo 3D de `site-3d-scroll` foi testado em Chromium emulando desktop, Pixel 7 e iPhone 12: **0 px de desvio do palco em cerca de 900 quadros reais**, sem erros de console, sem rolagem lateral, com plano B sem WebGL e com "reduzir animações". Ainda falta conferir em iPhone físico.

## O que mais tem aqui

- **Perfis curados:** `3d-e-scroll`, `economia-de-tokens`, `humanizacao`, `sites-perfeitos`.
- **Perfis por área:** `engenharia`, `marketing-e-vendas`, `cloud-e-dados`, `mobile`, `video-e-midia`, `agentes-e-mcp`, `docs-e-produtividade`, `seguranca`.
- Destaques de terceiros: Humanizer, todas as skills da HeyGen e do Hyperframes, GSAP (oficial), three.js e R3F, Remotion, obra/superpowers, Matt Pocock, Vercel, Anthropic, Microsoft Azure, Google, Cloudflare, Firebase, Supabase, Expo, Flutter, marketing, SEO e muito mais.
- Lista completa com origem e instalações: [`INDEX.md`](INDEX.md). Origem de cada skill: [`PROVENANCE.tsv`](PROVENANCE.tsv).

## Regras e avisos

- As skills de terceiros são copiadas **sem alteração** dos repositórios originais. Melhorias entram só **adicionando** (guia, perfis, skills novas).
- Cada skill mantém o autor original. As licenças estão em [`licenses/`](licenses/); repositórios sem arquivo de licença estão listados em `licenses/SEM-ARQUIVO-DE-LICENCA.txt`.
- Ficaram de fora: `docx`, `pdf`, `pptx` e `xlsx` da Anthropic (licença proíbe redistribuir), clones de repositórios já incluídos, skills que operam carteiras/negociação cripto, evasão de detecção, bots de spam e scrapers de redes sociais.
- Arquivos acima de 1 MB, vídeos, fontes e fotos de banco de imagem foram omitidos para manter o repositório leve (algumas skills de design podem ficar sem alguns recursos visuais).
- Foi feita uma varredura automática por padrões de risco (execução remota, exfiltração, injeção de prompt, caracteres invisíveis); os achados eram texto defensivo ou instaladores oficiais. Mesmo assim, são instruções de terceiros: **revise antes de usar em projeto sensível** (`skill-auditor`).
- Manutenção: `python3 tools/build.py` regenera `INDEX.md`, o catálogo e os perfis.
