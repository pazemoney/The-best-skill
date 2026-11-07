---
name: token-economy
description: Disciplina de economia de tokens para o Claude Code. Use no começo de qualquer tarefa grande, quando o usuário reclamar de limite de uso, custo, "gastando muito", contexto cheio, sessão lenta, ou pedir para economizar tokens. Ensina a medir, ler menos, cortar saída de comandos, delegar o barulhento, enxugar CLAUDE.md/skills/MCP e manter a qualidade. Token saving, context window, cost, usage limits.
---

# Economia de tokens sem perder qualidade

Regra de ouro: **gaste tokens no que muda o resultado, nunca no que só faz volume.** Economizar não é responder mal; é parar de carregar peso inútil.

## De onde vêm os tokens (o que de fato pesa)
1. **Contexto reenviado a cada mensagem.** A conversa inteira volta em todo turno. Quanto mais longa a sessão, mais cada resposta custa.
2. **Leituras grandes:** arquivos inteiros, lockfiles, bundles, logs, JSON enorme.
3. **Saída de comandos** sem filtro (testes, `git log`, `npm install`, `find`).
4. **Raciocínio longo** em tarefa simples.
5. **Peso fixo:** `CLAUDE.md` gigante, muitos servidores MCP, muitas skills instaladas (cada descrição entra no contexto).
6. **Retrabalho:** errar por falta de contexto e refazer custa mais que ler direito uma vez.

## Passo 0: medir antes de mexer
- `/context` mostra o que ocupa a janela. `/cost` (ou `/usage`) mostra o gasto. Se algum comando não existir na sua versão, use `/help`.
- Rode `scripts/token-audit.sh` (nesta skill) para ver CLAUDE.md, skills, MCP e arquivos gigantes do projeto em poucas linhas.

## Regras de leitura e busca (maior economia)
- **Busque antes de ler:** `Grep`/`Glob` para achar, depois `Read` só do trecho (use `offset` e `limit`). Nunca abra arquivo grande inteiro "para entender".
- Não releia o que já está na conversa. Se já leu, use o que leu.
- Evite pastas pesadas: `node_modules`, `dist`, `build`, `.next`, `vendor`, `*.lock`, `*.min.js`, dumps e dados. Mande explorar só diretórios relevantes.
- Peça estrutura antes de conteúdo: `ls`, `tree -L 2`, `wc -l`, `head -40`.
- Para entender um código novo, comece por README, ponto de entrada e testes, não por varredura total.

## Regras de saída de comandos
Sempre limite a saída no próprio comando:
- `git log --oneline -20`, `git diff --stat` antes de `git diff`, `git status -sb`.
- `comando 2>&1 | tail -40` (erros costumam estar no fim) ou `| grep -E "error|fail|FAIL" | head -30`.
- Testes em modo quieto: `--silent`, `-q`, `--reporter=dot`, `--bail`, rodar **só o teste afetado**.
- `npm install --silent`, `pip install -q`, `curl -s`. Jamais despeje JSON de API inteiro: `| jq '.campo' | head`.
- Se a saída for enorme e necessária, mande para arquivo (`> /tmp/out.txt`) e leia só o relevante com `grep`.

## Regras de escrita (as minhas respostas)
- Comece pela resposta. Sem preâmbulo ("Claro! Vou...") e sem recap do que o usuário acabou de ver.
- Não reimprima código que já escreveu no arquivo; diga o caminho e o que mudou em uma frase.
- **Edite com `Edit` em trechos mínimos**; use `Write` só para arquivo novo ou reescrita real.
- Listas curtas, frases curtas. Sem tabelas e títulos decorativos em resposta simples.
- **Exceções que nunca se cortam:** avisos de segurança, passos destrutivos, erros que o usuário precisa entender, mensagens de commit, código e textos entregues ao usuário (esses ficam completos). Brevidade vale para a conversa, não para o produto.
- Para um modo ainda mais enxuto, existem as skills `caveman`, `paleo` e `token-saver` desta coleção.

## Raciocínio proporcional
Tarefa simples: pense pouco e aja. Tarefa difícil: pense fundo **uma vez**, escreva o plano curto e execute sem replanejar a cada passo. Se a versão permitir níveis de esforço, use baixo no mecânico e alto só no difícil.

## Higiene de sessão
- **Uma tarefa por sessão.** Mudou de assunto? `/clear`.
- Sessão longa e ainda útil: `/compact` com instrução do que manter (ex.: `/compact manter decisões, arquivos alterados e o próximo passo`). Faça **antes** de a janela encher, não depois.
- Antes de encerrar algo grande, deixe um **resumo de continuidade** (arquivo `HANDOFF.md` ou a skill `handoff`) e comece a próxima sessão limpa lendo só ele.
- Corrigiu o mesmo erro duas vezes? Pare, releia o que realmente falhou e mude a abordagem, em vez de empilhar tentativas no contexto.

## Delegar o barulhento (funil)
Busca larga, logs, saída de testes e leitura de muitos arquivos vão para **subagente** (contexto separado) com pedido de resposta curta. Use a skill `model-funnel`: Haiku no mecânico, Sonnet no médio, Opus só no difícil. Não delegue tarefa pequena: subagente começa do zero e pode sair mais caro.

## Peso fixo: configurar uma vez, economizar sempre
1. **CLAUDE.md curto** (idealmente poucas dezenas de linhas): só regras que mudam o comportamento. Detalhe raro vira skill (carregada sob demanda) ou arquivo referenciado.
2. **Bloquear leituras inúteis** em `.claude/settings.json` (veja `references/settings-snippets.md`).
3. **MCP:** deixe ligados só os servidores que usa. Cada ferramenta MCP adiciona definição ao contexto.
4. **Skills:** instale só o que usa. Todas as descrições entram no contexto da sessão. Por isso o The-best-skill instala um conjunto recomendado e deixa o resto numa biblioteca sob demanda (veja `the-best-skill-guide`).
5. Modelo: o menor que resolve (`/model`), planejando com o forte e executando com o barato (`/model opusplan`, se disponível).

## Anti-padrões (cortar já)
- Pedir "leia o projeto inteiro".
- Colar logs gigantes no chat em vez de filtrar.
- Rodar a suíte completa de testes a cada edição pequena.
- Reescrever arquivo inteiro para mudar 3 linhas.
- Reexplicar o contexto toda mensagem em vez de deixar no CLAUDE.md.
- Manter 50 abas de assunto numa sessão só.

## Checklist rápido
Antes: sei exatamente o que preciso ler? Posso buscar em vez de abrir? Isso é barulhento o bastante para um subagente?
Durante: saída filtrada? Edição mínima? Sem repetir o que já foi dito?
Depois: `/compact` ou `/clear`? Deixei o próximo passo escrito?

Mais detalhes e números: `references/playbook.md`.
