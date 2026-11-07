---
name: humanizer-pt-br
description: Humaniza textos em português do Brasil, tirando a cara de texto de IA (clichês, vocabulário inflado, estrutura repetitiva, tom de robô) sem mudar fatos. Use quando o usuário pedir para humanizar, naturalizar, "tirar o jeito de IA", deixar mais natural, soar como gente, revisar copy de site, post, e-mail, artigo ou legenda em português. Complementa a skill humanizer (inglês).
---

# Humanizador de texto (PT-BR)

Objetivo: o texto soar como **uma pessoa específica escrevendo com clareza**, mantendo **exatamente os mesmos fatos**. Não é maquiar: é escrever melhor.

## Regras de honestidade
- **Nunca invente fatos, números, citações, fontes ou casos** para "dar vida". Se o texto é vago, deixe vago ou pergunte; não preencha com falsidade.
- Preserve nomes, números, datas, links, termos técnicos, trechos de código e citações.
- O objetivo é qualidade de escrita, **não burlar regras acadêmicas ou detectores de IA**. Se o usuário quer isso para trabalho que proíbe IA, avise que não é o propósito.

## Processo (4 passadas)
1. **Diagnóstico (rápido, interno):** marque os padrões de IA do `references/padroes-ia-ptbr.md` e identifique a intenção, o público e o registro (formal, profissional, coloquial).
2. **Reescrita:** reescreva frase por frase, aplicando as técnicas abaixo. Mantenha a estrutura de seções e a formatação (markdown, listas) se o usuário usa.
3. **Auditoria:** pergunte-se "o que ainda faz isso soar como IA?" e liste de 3 a 5 pontos restantes. Corrija.
4. **Entrega:** devolva o texto final. Se pedirem, adicione uma lista curta do que mudou. Sem preâmbulo, sem comentários longos.

Para texto grande, trabalhe por blocos e mantenha a **mesma voz** do começo ao fim.

## Técnicas que mais funcionam
- **Comece pelo ponto.** Corte a abertura genérica e o fecho de resumo. O primeiro parágrafo já entrega algo.
- **Concretize.** Troque "diversos benefícios" pelos benefícios; "otimizar processos" pelo que muda na rotina. Se não há dado, corte a frase em vez de inflá-la.
- **Verbos simples.** *usar* em vez de *utilizar*, *fazer* em vez de *realizar/efetuar*, *ajudar* em vez de *auxiliar*, *mostrar* em vez de *evidenciar*, *por causa de* em vez de *em virtude de*.
- **Ritmo variado.** Misture frase curta e longa. Evite parágrafos todos do mesmo tamanho e três itens por padrão.
- **Voz ativa e sujeito claro.** "A equipe corrigiu o erro" em vez de "O erro foi corrigido pela equipe".
- **Opinião e posição** quando o gênero permitir: "eu acho", "o problema é", "na prática". Texto sem posição parece de IA.
- **Corte o hedge** ("pode ser considerado", "de certa forma", "em certa medida") salvo quando a incerteza é real.
- **Menos enfeite tipográfico:** poucos travessões, sem negrito em tudo, sem emoji de título, sem "Título: explicação" em toda lista.
- **Registro certo:** no coloquial valem "pra", "tá", "a gente", contrações. No profissional, mantenha correção sem rebuscar.
- **Detalhe específico** que só quem viveu o assunto diria (só se o usuário forneceu).

## Calibragem por tipo de texto
| Tipo | Ajuste |
|---|---|
| Site/landing | Curto, direto, benefício real, sem superlativos vazios (veja `perfect-website-rules`) |
| Post/legenda | Voz da pessoa, abertura que prende, sem hashtag-em-excesso |
| E-mail | Assunto e pedido claros logo no início, 1 pedido por e-mail |
| Artigo/blog | Tese clara, exemplos concretos, sem "neste artigo vamos" |
| Texto jurídico/saúde | Preserve termos e cautelas legais; humanize só a clareza, sem prometer resultado |
| Acadêmico | Preserve rigor e citações; não invente fontes |

## Saída
Entregue **só o texto reescrito** (e, se pedido, uma lista de mudanças em até 5 itens). Se o texto original já está bom, diga isso em uma linha e aponte só o que mudaria.

## Skills irmãs
`humanizer` (inglês), `avoid-ai-writing`, `no-ai-slop`, `deslop`, `writing-guidelines`, `copywriting`. Exemplos: `references/exemplos.md`.
