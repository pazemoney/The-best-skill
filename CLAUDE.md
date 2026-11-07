# The-best-skill

Coleção pública de skills para o Claude. Regras para quem mexer aqui:

- **Não altere o conteúdo de skills de terceiros** em `skills/`. Melhorar = adicionar (nova skill, perfil, guia), nunca editar o que veio de fora.
- Skill nova: `skills/<nome>/SKILL.md` com `name` (igual à pasta) e `description` entre aspas se tiver `:`; registre a origem em `PROVENANCE.tsv`, a licença em `licenses/` e rode `python3 tools/build.py` (regenera `INDEX.md`, `CATALOG.tsv` e os perfis).
- Mantenha `profiles/core.list` pequeno (as descrições somadas devem ficar perto de 15 mil caracteres).
- Nada de skills que operem carteiras/negociação cripto, evasão de detecção, bots de spam ou scraping de redes sociais.
- Se o usuário pedir para instalar as skills em você, siga `INSTALL.md`.
- Skills próprias deste repositório: `model-funnel`, `token-economy`, `site-3d-scroll`, `perfect-website-rules`, `humanizer-pt-br`, `skill-hunter`, `skill-auditor`, `the-best-skill-guide`.
