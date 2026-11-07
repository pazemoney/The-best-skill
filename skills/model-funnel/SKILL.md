---
name: model-funnel
description: Funil de modelos para gastar menos e acertar mais. Triagem de cada tarefa e envio do trabalho fácil ao Haiku, do médio ao Sonnet e só do difícil ao Opus, via subagentes. Use sempre que for delegar, pesquisar em muitos arquivos, rodar testes, quando o usuário falar em economizar tokens/custo/limite de uso, "usar Haiku", "usar Opus", "dividir o trabalho" ou "funil". Model routing, cost, cheaper model, subagent dispatch.
---

# Funil de modelos (Haiku → Sonnet → Opus)

Ideia: **o modelo forte pensa, os modelos baratos executam.** Cada tarefa passa por uma triagem e vai para o modelo mais barato que ainda entrega a qualidade necessária. Isso economiza tokens e limite de uso sem perder resultado.

## Verdades que decidem tudo
- Você (Claude) **não troca o modelo da sessão**. Quem troca é o usuário, com `/model`. O que você controla é **delegar**: o parâmetro `model` da ferramenta de subagente (`haiku`, `sonnet`, `opus`) ou subagentes com `model:` no cabeçalho (`.claude/agents/*.md`).
- Um subagente começa **vazio**: tudo o que ele lê é custo novo. Delegar tarefa pequena sai **mais caro** que fazer direto. Só delegue o que valha a viagem.
- O ganho grande vem de tirar da sessão principal o que é **barulhento** (buscas largas, logs, saída de testes, leitura de muitos arquivos) e mandar o subagente devolver **só um resumo curto**.
- Cuidado com o falso barato: um modelo fraco errando e refazendo custa mais que o forte acertando de primeira.

## Triagem em 4 perguntas (nesta ordem)
1. **É trivial e eu já tenho o contexto?** (editar 1–2 linhas, responder pergunta curta) → faça direto, sem subagente.
2. **É mecânico e bem especificado?** (achar onde algo está, renomear, formatar, rodar teste e relatar, gerar boilerplate, resumir log, traduzir texto, converter formato) → **Haiku**.
3. **Tem lógica real, mas o caminho é claro?** (implementar feature descrita, escrever testes, corrigir bug com causa conhecida, refatorar com regra clara) → **Sonnet**.
4. **Exige julgamento?** (arquitetura, bug sem causa óbvia, segurança, migração arriscada, revisão final, decisões com trade-off, requisito ambíguo) → **Opus**, ou fique no modelo da sessão se ele já for o forte.

Na dúvida entre dois níveis, escolha o **de cima** quando o erro for caro (dados, segurança, produção) e o **de baixo** quando o erro for barato e fácil de ver.

## Tabela rápida
| Tarefa | Modelo |
|---|---|
| Buscar/listar/mapear arquivos e símbolos | Haiku |
| Rodar testes/build/lint e reportar só falhas | Haiku |
| Resumir logs, diffs, documentos longos | Haiku |
| Renomear, formatar, mover, boilerplate, traduzir strings | Haiku |
| Implementar feature com spec clara | Sonnet |
| Escrever testes, corrigir bug conhecido | Sonnet |
| Revisar mudança pequena | Sonnet |
| Planejar arquitetura, desenhar solução | Opus |
| Depurar bug misterioso, concorrência, performance | Opus |
| Segurança, migração de dados, revisão final de PR grande | Opus |
| Decidir entre abordagens, escrever a spec | Opus |

## Como delegar bem (contrato do subagente)
Todo envio deve ter:
1. **Objetivo** em uma frase e **o que NÃO fazer**.
2. **Contexto mínimo**: caminhos exatos, comandos, restrições. Não cole o que ele pode ler sozinho.
3. **Formato da resposta curto e fixo**, por exemplo: "responda em até 15 linhas: arquivos alterados, resultado dos testes, dúvidas". Isso protege a sua janela de contexto.
4. **Critério de pronto** verificável (comando que deve passar).

Dispare em **paralelo** os trabalhos independentes (várias chamadas na mesma mensagem). Junte tudo antes de seguir.

## Verificar e escalar (a parte que evita retrabalho)
- Nunca aceite resultado de Haiku sem checar o que importa: rode o teste/comando de verificação você mesmo ou peça a um nível acima.
- Sinais para **escalar um nível**: resultado vago, saída que não bate com a pergunta, teste que falha duas vezes, mudança fora do escopo pedido, o subagente "inventou" caminho ou função.
- Máximo de **uma retentativa** no mesmo nível, depois suba. Nunca fique em loop com o modelo barato.
- Revisão final do que é crítico: sempre pelo nível mais forte disponível.

## Esforço de raciocínio (segundo botão de custo)
Se a sua versão permitir níveis de esforço (low/medium/high), use **baixo** em exploração e tarefas mecânicas e **alto** só no que é difícil. Um modelo forte pensando pouco muitas vezes basta.

## Instalar os subagentes prontos
Esta skill traz subagentes prontos em `agents/`. Para ativar (peça permissão ao usuário antes de copiar):
```bash
mkdir -p ~/.claude/agents && cp -n agents/*.md ~/.claude/agents/
```
Use `.claude/agents/` (no projeto) para valer só no projeto. Reinicie a sessão para o Claude Code enxergá-los. O `cp -n` não sobrescreve nada que já exista.

| Agente | Modelo | Para quê |
|---|---|---|
| `funnel-scout` | haiku | Explorar o código só-leitura e devolver mapa curto |
| `funnel-worker` | haiku | Edições mecânicas e bem definidas |
| `funnel-test-runner` | haiku | Rodar comandos/testes e devolver só o que falhou |
| `funnel-builder` | sonnet | Implementação padrão com spec clara |
| `funnel-architect` | opus | Desenho de solução e bugs difíceis |
| `funnel-reviewer` | opus | Revisão crítica, só-leitura |

## Atalho do usuário
- `/model opusplan` (se disponível na sua versão): Opus planeja, Sonnet executa. Confirme com `/model`.
- Para sessões longas e baratas: sessão em Sonnet, chamar `funnel-architect` (Opus) só nos pontos difíceis.

## Modelos
Use os apelidos `haiku`, `sonnet`, `opus` (resolvem para a versão atual). Não escreva IDs de versão fixos em agentes: eles envelhecem.

## Relacionadas na coleção
`token-economy` (disciplina geral de tokens), `caveman` e `paleo` (respostas enxutas), `model-routing` (plugin MIT de roteamento com mais agentes), `dispatching-parallel-agents` e `subagent-driven-development` (obra/superpowers).
