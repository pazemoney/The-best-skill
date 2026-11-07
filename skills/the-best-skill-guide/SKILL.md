---
name: the-best-skill-guide
description: Guia e catálogo do The-best-skill (mais de 2.000 skills). Use quando não souber qual skill usar, quando pedirem a melhor skill para algo, ou quando a tarefa for de uma área sem skill instalada. Busca no CATALOG.tsv e traz a skill certa sob demanda, sem instalar tudo.
---

# Guia do The-best-skill

O repositório tem **milhares de skills**, mas só um **conjunto essencial** fica instalado (o Claude Code tem limite de espaço para listar descrições). O resto você alcança **sob demanda** por aqui.

## Fluxo (siga sempre que a tarefa tocar uma área nova)
1. **Procure no catálogo** (arquivo `CATALOG.tsv` desta pasta; colunas: skill, categoria, instalações, origem, descrição):
   ```bash
   grep -i "scroll\|3d" CATALOG.tsv | sort -t$'\t' -k3 -nr | head -15
   ```
2. **Escolha** pela descrição e por instalações (mais instaladas, de origem oficial, têm prioridade).
3. **Traga a skill**:
   ```bash
   bash scripts/get-skill.sh <nome>              # baixa para o cache e mostra o caminho (usa já, sem instalar)
   bash scripts/get-skill.sh <nome> --install    # além disso instala em ~/.claude/skills (peça permissão antes)
   ```
   Para **usar agora**, leia o `SKILL.md` do caminho mostrado e siga as instruções dele (e os arquivos `references/` que ele citar).
4. **Aplique** a skill como está. **Nunca edite** o conteúdo de uma skill para "melhorá-la"; amplie criando outra skill ao lado.
5. Skills de terceiros com **scripts**: passe pelo `skill-auditor` antes de rodar qualquer script.

## Atalhos (já instalados ou a um comando)
| Tarefa | Skill |
|---|---|
| Site 3D / animação de rolagem sem tremor | `site-3d-scroll`, `gsap-scrolltrigger`, `threejs-fundamentals` |
| Criar site perfeito (design, SEO, a11y, entrega) | `perfect-website-rules`, `frontend-design`, `design-taste-frontend` |
| Texto com cara de gente | `humanizer-pt-br` (português), `humanizer` (inglês) |
| Economizar tokens / limite de uso | `token-economy`, `caveman`, `paleo`, `token-saver-claude-code` |
| Funil Haiku → Sonnet → Opus | `model-funnel`, `model-routing` |
| Bugs, testes, revisão, arquitetura | `diagnosing-bugs`, `tdd`, `code-review`, `improve-codebase-architecture` |
| Achar/criar/auditar skills | `skill-hunter`, `skill-creator`, `skill-auditor`, `find-skills` |

## Perfis de instalação (para o usuário)
`./install.sh --list` mostra os perfis; `./install.sh --profile 3d-e-scroll,economia-de-tokens` adiciona grupos inteiros. Cada grupo soma descrições ao contexto: use poucos por vez e confira com `/context`.

## Regras
- Nada de instalar sem o usuário saber; nunca sobrescrever skill existente.
- Skill grande ou de área pouco comum: traga só quando precisar.
- Se não achar no catálogo, use `skill-hunter` para buscar no skills.sh.
