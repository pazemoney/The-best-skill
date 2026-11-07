---
name: skill-hunter
description: Encontra, avalia e instala skills do skills.sh e do GitHub. Use quando o usuário perguntar "existe skill para X?", pedir mais skills, quando a tarefa tiver uma área sem skill instalada, ou quiser a melhor skill de um assunto. Busca por palavra-chave, compara por instalações e reputação, confere segurança com skill-auditor e instala sem sobrescrever. Find skills, skills.sh, install skill.
---

# Caçador de skills

Ordem de busca: **(1) biblioteca local → (2) skills.sh → (3) GitHub**. Só depois de achar, avalie e instale.

## 1) Biblioteca local primeiro
Procure no `INDEX.md` do The-best-skill (ou em `~/.claude/skills` e na biblioteca `~/.claude/skill-library`). Já existe? Use-a e pare.

## 2) skills.sh (diretório aberto de skills)
```bash
bash scripts/search-skills.sh "scroll animation" 15     # palavra-chave, quantidade
bash scripts/search-skills.sh "humanizer" 10
```
Mostra `instalações  dono/repositório/skill`. A rota usada é `https://www.skills.sh/api/search?q=…&limit=…`, que funcionou sem login quando testada; ela **não é documentada**, então se falhar use a busca do site (https://www.skills.sh) ou o comando oficial `npx skills find <termo>`.
- Se o ambiente bloquear o host, o usuário precisa liberar `skills.sh` e `www.skills.sh` na rede do ambiente.

## 3) GitHub (quando o skills.sh não tem)
Busque repositórios com termos como `claude code skill <assunto>` e leia o README e o `SKILL.md`. Prefira repositórios mantidos, com licença e com exemplos.

## 4) Avaliar (antes de instalar)
| Critério | Bom sinal | Alerta |
|---|---|---|
| Origem | Empresa oficial do produto (anthropics, vercel-labs, microsoft, google, cloudflare, stripe, supabase…) ou autor conhecido | Repositório anônimo, sem histórico |
| Instalações | Alta e coerente com a idade | Número enorme em repositório novo ou clone idêntico de outro |
| Conteúdo | Passos concretos, exemplos, limites claros | Genérico, só slogans |
| Gatilho (`description`) | Específico ao assunto | "Use em TODA tarefa" (sequestra o contexto) |
| Arquivos | Texto e referências pequenas | Binários, scripts que baixam e executam |
| Licença | MIT/Apache/BSD ou equivalente | Sem licença (não redistribua) |
Use a skill **`skill-auditor`** para a checagem de segurança. Nunca instale sem ela quando houver scripts.

## 5) Instalar sem estragar nada
- Oficial: `npx skills add <dono/repo> --skill <nome>`.
- Manual: copie a pasta da skill para `~/.claude/skills/<nome>/` (global) ou `.claude/skills/<nome>/` (projeto). **Não sobrescreva** pasta existente (`cp -rn`). Peça autorização antes de instalar no usuário.
- Avise que a skill passa a valer em **nova sessão**.
- Lembre: cada skill instalada adiciona sua descrição ao contexto. Instale o que vai usar.

## 6) Relatar
Diga em 3 linhas: o que achou (nome, origem, instalações), o veredito do `skill-auditor` e onde instalou. Se for excelente e livre, sugira incluí-la no The-best-skill (pasta em `skills/<nome>/`, linha no `INDEX.md`, licença em `licenses/`).

## Skills irmãs
`find-skills` (vercel-labs), `skill-creator` (anthropics), `skill-auditor`, `the-best-skill-guide`.
