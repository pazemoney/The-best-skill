# Estudo de caso 01: "Agente de IA para clínica" (@igao.ia)

Engenharia reversa do Reels usado como referência principal desta skill.
Material analisado: o MP4 baixado do Instagram (720×1280, 30 fps, 57,9 s com a cartela do Instagram) e 3 prints da descrição.
Métodos: quadros a cada 0,5 s e a cada 0,1 s nas transições, detecção de cortes (ffmpeg `scene`), transcrição com tempo por palavra (Whisper large-v3-turbo), separação voz/fundo (Demucs htdemucs), medidas de tom (pYIN), loudness (EBU R128) e espectrograma.

> Regra de leitura: **[F]** = fato observado no material. **[H]** = hipótese (provável, não comprovada pelo material). Não trate [H] como regra.

---

## 1. Ficha técnica [F]

| Item | Valor |
|---|---|
| Duração útil | **53,8 s** (de 53,8 s a 57,9 s é a cartela automática do Instagram com logo e @, que o app adiciona no download) |
| Formato | 9:16, 720×1280 no arquivo baixado (o Instagram reduz; a produção original provavelmente era 1080×1920) [H] |
| Fala | 180 palavras em 53,4 s = **3,37 palavras/s (≈200 ppm, ≈7 sílabas/s)** |
| Cenas | **16 cenas** → média **3,4 s** por cena (mín. 1,3 s, máx. 5,1 s) |
| Eventos visuais | ≈70 (algo aparece, muda, é marcado ou carimbado) → **1 evento a cada ~0,8 s** |
| Legenda | palavra por palavra, 1 a 4 palavras na tela, ≈25 palavras-chave destacadas (uma a cada ~2 s) |
| Pessoa na tela | **nenhuma** (só interfaces, objetos e texto) |
| Música | **nenhuma perceptível**: o fundo sem voz fica ~33 dB abaixo da voz (≈ −50 dBFS) |
| Efeitos sonoros | poucos e discretos (bipes de interface, cliques, tiques), 25 a 35 dB abaixo da voz |
| Loudness | −13,8 LUFS integrado, faixa dinâmica (LRA) 1,4 LU → voz muito comprimida e constante |
| Final | corte seco logo depois da última palavra (53,4 s → 53,8 s), sem cartela de marca: emenda no começo (loop) |

## 2. Roteiro reconstruído (com tempos) [F]

| Tempo | Fala | Função |
|---|---|---|
| 0,00–3,86 | Você pode vender essa automação pra uma clínica odontológica por até 3 mil reais. | **Gancho**: ganho em dinheiro + nicho concreto + "essa automação" (qual?) |
| 4,14–5,22 | E olha só como ela funciona. | **Regancho 1** (promete a demonstração) |
| 5,42–9,90 | São 11h47 da noite e uma paciente manda um áudio no WhatsApp da clínica. | Cena com hora marcada e personagem |
| 10,02–11,38 | Só que o consultório já tá fechado. | Conflito |
| 11,60–15,50 | Normalmente, ela ficaria sem resposta e provavelmente procuraria outro dentista. | Custo do problema (perda) |
| 15,62–19,78 | Mas essa clínica tem um agente de inteligência artificial atendendo 24 horas. | Virada / solução |
| 19,96–25,94 | Primeiro, ele transcreve o áudio, entende o que a paciente precisa e identifica que ela tá procurando um atendimento urgente. | Passo 1 e 2 |
| 26,12–29,90 | Depois, consulta a agenda da dentista e oferece dois horários disponíveis. | Passo 3 |
| 30,00–32,34 | A paciente escolhe 9h30. | Passo 4 |
| 32,52–36,72 | O agente confirma a consulta, registra os dados e envia a localização da clínica. | Passo 5 |
| 36,82–39,02 | Tudo isso em apenas 41 segundos. | **Prova em número** |
| 39,28–40,20 | E sabe o que é mais interessante? | **Regancho 2** (aos 73% do vídeo) |
| 40,46–44,46 | Quando a dentista acorda, já tem três novas pacientes agendadas durante a madrugada. | **Clímax** (imagem do resultado) |
| 44,56–48,88 | E um dia antes de cada consulta, a IA ainda envia um lembrete pra reduzir as faltas. | Bônus |
| 49,06–50,20 | Quer aprender a criar esse agente? | Pergunta de transição para o CTA |
| 50,32–53,42 | Comenta AGENDA aqui embaixo que eu te mando o fluxo completo. | **CTA** por palavra-chave com recompensa |

Estrutura: **gancho de ganho → promessa de demonstração → micro-história com hora, personagem e conflito → solução → passos numerados → prova numérica → regancho → clímax visual → bônus → CTA com recompensa → corte seco**.

Mecanismos psicológicos presentes [F]: curiosidade (lacuna "essa automação"), ganho concreto (R$ 3 mil), especificidade (11h47, 41 s, 9h30, 3 pacientes), aversão à perda (paciente indo para o concorrente), demonstração (cada passo visível), contraste noite fechada × manhã com agenda cheia, prova social simulada (comentários "AGENDA" e "3.418 comentários" dentro do mockup), reciprocidade (material grátis por comentário).
Ausentes: humor, rosto/pessoa, urgência de oferta, polêmica.

## 3. Linha do tempo visual (cena a cena) [F]

| # | Tempo | Cena | Eventos sincronizados com a fala | Saída |
|---|---|---|---|---|
| 1 | 0,0–3,65 | Fachada 3D "Clínica Sorriso · Odontologia" à noite | chip "WhatsApp + ✳ Agente 24h" surge (0,5 s); luzes acendem (2,0 s); iPhone entra pela direita (2,5 s); notificação **"Pix recebido R$ 3.000,00"** em "3 mil reais" | dissolve com desfoque até o preto |
| 2 | 3,9–7,45 | Rádio-relógio "23:46" num criado-mudo, "SÁB 7 NOV" | relógio vira **23:47** em "11h47"; celular ao lado acende | corte com mudança de escala |
| 3 | 7,45–9,95 | iPhone no WhatsApp "Clínica Sorriso · Conta comercial" | resposta automática de horário; gravação de áudio (bolinha vermelha) → bolha de áudio 0:14 às 23:47 em "áudio" | **chicote** (deslize lateral com desfoque de movimento) |
| 4 | 10,15–11,45 | Câmera de segurança "Recepção · REC 23:47:10" (pixel art) | placa **"FECHADO · abre às 8h"** cai em "fechado" | corte seco |
| 5 | 11,45–15,55 | Busca no mapa "dentista" | etiqueta "sem resposta" → "há 40 min" → "há 2 h"; concorrente "Aberto 24 horas" com botão Ligar; nova busca digitada "dentista aberto agora"; a clínica **some da lista** em "outro dentista" | dissolve com desfoque |
| 6 | 15,85–19,95 | Painel "Agente · Clínica Sorriso": fluxo de 5 blocos + mostrador 24h | blocos acendem em sequência; contador 0 → 12 → 37; chave **"Desligado" → "Ativo 24h"** em "24 horas" | corte seco |
| 7 | 19,95–23,25 | "Transcrevendo o áudio · Mariana" | forma de onda tocando; transcrição digitada; trechos destacados ("dor muito forte no dente", "amanhã cedo"); chips Motivo/Quando | chicote + giro 3D do cartão |
| 8 | 23,45–26,05 | "Ficha de triagem" em papel creme com letra manuscrita | barra percorre Rotina/Avaliação/Retorno/Urgência; marca Urgência; **carimbo "URGENTE"** em "urgente" | corte seco |
| 9 | 26,1–30,0 | "Agenda · Dra. Ana Lima · sexta, 8 nov" | linha de varredura desce; horários "Livre · 9h30" e "Livre · 14h" marcados; painel "Pra Mariana" com ① 9h30 ② 14h e "Enviar opções" | chicote + giro |
| 10 | 30,3–32,5 | Dois "Cartões de consulta" (papel) 9h30 e 14h | o de 14h cai; o de 9h30 centraliza; selo **"Mariana escolheu"** | elemento compartilhado (o cartão encolhe e sobe) |
| 11 | 32,5–34,95 | Cartão no topo + planilha "Pacientes" | carimbo **"CONFIRMADA"** em "confirma"; nova linha digitada em "registra os dados" | chicote |
| 12 | 35,4–36,8 | Mapa escuro com rota | rota desenhada até o pino; "✓ Localização enviada pra Mariana" | corte seco |
| 13 | 36,8–39,1 | Cronômetro analógico creme | corre e **para em 00:41** em "41 segundos"; chips "0:06 transcreveu · 0:12 triagem · 0:24 agenda · 0:41 confirmou" | chicote |
| 14 | 39,45–44,5 | Tela de bloqueio "7:00" | despertador "consultório às 8h" some em "acorda"; **3 notificações "Nova consulta agendada"** empilham (23:48, 1:12, 4:36); cabeçalho "3 novas" | corte seco |
| 15 | 44,5–49,0 | "Lembretes automáticos" + gráfico "Faltas por mês" | seta "1 dia antes"; "na fila" → "✓ Lembrete enviado" em sequência; barras de out/nov **caem** em "faltas" | chicote |
| 16 | 49,2–53,8 | Mockup do próprio post no Instagram + comentários | carrossel 1/6 com as etapas; aba de comentários sobe em "Comenta"; vários "AGENDA", inclusive **"você · agora"**; notificação de Direct com "fluxo-agente-clinica.pdf" em "te mando o fluxo completo" | **fim seco** (loop) |

Regra que salta da tabela: **toda palavra concreta da fala vira um acontecimento na tela no mesmo instante (±0,2 s)**. Nada é "ilustrativo genérico": cada tela é a prova literal da frase.

## 4. Edição: especificação reproduzível [F, medido]

**Ritmo**
- Troca de cena sempre no limite de uma frase da narração (nunca no meio de uma frase).
- Cena média 3,4 s; dentro dela, um evento novo a cada 0,5 a 1 s (marcar, carimbar, contar, digitar, acender).
- Transições: ~45% corte seco, ~40% chicote/desfoque (0,2–0,4 s), ~15% outras (dissolve com desfoque, elemento compartilhado). Nunca efeitos chamativos (sem giros de 360°, sem "glitch", sem zoom de PowerPoint).

**Câmera e movimento**
- "Palco" escuro: fundo quase preto (#050505–#0d0d0d), luz radial suave no centro, partículas desfocadas (bokeh) e uma **grade de piso em perspectiva** na metade de baixo (dá profundidade sem 3D pesado).
- Entrada de elementos: escala 0,92→1 + opacidade + desfoque 8→0 px em ~250 ms, com escalonamento de 60–100 ms entre itens; saída rápida (150 ms).
- Empurrão lento contínuo (escala 1,00→1,04 ao longo da cena) para nunca ficar parado.
- Chicote: deslocamento lateral grande + desfoque de movimento horizontal + giro leve em Y (cartões "chegam balançando").

**Interfaces (o "cenário")**
- Mockups realistas de apps conhecidos (WhatsApp, mapa, agenda, planilha, tela de bloqueio, Instagram), modo escuro, estilo Apple.
- Cartões #161618 com borda 1 px branca a 8%, cantos ~24 px (em 1080), sombras suaves.
- Cor só nos ícones de apps reais e na semântica (vermelho = problema/urgente, verde = resolvido). O resto é monocromático.
- Contraste "humano × máquina": peças em **papel creme com letra manuscrita** (ficha, cartões de consulta) e **carimbos** (URGENTE, CONFIRMADA).
- Dados verossímeis e específicos (nomes, horários, endereços, valores).

**Legendas**
- Posição: centralizadas, linha de base a **~68% da altura** (≈ y 1300 em 1080×1920), largura máx. ~80%.
- Fonte: sem serifa neo-grotesca (tipo SF Pro/Inter), peso ~500, branca, ≈ 5,3% da largura (≈ 57 px em 1080), caixa normal, sem contorno, sombra leve.
- Entrada: **palavra por palavra no instante em que é dita**; cada palavra entra com desfoque (≈8→0 px), opacidade 0→1 e leve subida, em 120–180 ms. O grupo (1 a 4 palavras) sai com desfoque/fade quando a próxima frase começa.
- **Palavra-chave**: outra fonte (serifa itálica), cor branco-azulado, dentro de uma **caixa de seleção com alças nos cantos** (igual a seleção do Figma). É o elemento de assinatura: diz "isto importa" e dá textura. Uma palavra-chave por grupo, no substantivo/número que carrega o sentido.

**Som**
- Voz em primeiro plano, seca (sem eco), muito comprimida, −14 LUFS.
- Sem música perceptível. Efeitos de interface discretos (bipe duplo ~1–1,6 kHz em chips/notificações; tiques em digitação, cronômetro e comentários).
- Nenhum silêncio > 0,3 s até o fim; o vídeo termina 0,4 s depois da última palavra.

**O que é essencial × o que é estética** [H]
- Essencial: sincronia palavra→evento, ritmo de cena/evento, legenda palavra por palavra com destaque, demonstração literal, voz rápida e clara, final seco.
- Estético (troque pela identidade da marca): paleta, fontes, grade de piso, bokeh, o estilo exato da caixa de seleção, papel creme.

## 5. Narração [F, medido]

- Masculina, registro médio-agudo para homem: **F0 mediana 153 Hz** (p10 121 Hz, p90 208 Hz), variação de **9,5 semitons** (expressiva; vozes monótonas ficam em 4–6).
- **200 ppm**, pausas curtas (0,12–0,28 s) só entre frases; sem vícios ("é...", "né") nem respirações audíveis.
- Entonação de conversa animada: sobe nas perguntas e nos reganchos, acentua números ("três novas pacientes", "41 segundos").
- Registro informal ("tá", "pra", "olha só"), segunda pessoa ("você").
- Timbre limpo (centróide ~1,7 kHz), sotaque neutro.
- Origem (voz própria, clone ou TTS): **não dá para afirmar** [H].

## 6. Descrição da publicação [F]

Texto transcrito em `data/referencias/legenda-caso-01.txt` (um trecho entre o 2º e o 3º print não foi capturado).

| Item | Observação |
|---|---|
| 1ª linha | "👾 Agentes de IA ↓" → **rótulo de série + seta**: diz o assunto e convida a abrir o "mais" |
| Abertura | "Imagina uma clínica odontológica recebendo mensagens no WhatsApp durante a madrugada e conseguindo AGENDAR CONSULTAS AUTOMATICAMENTE…" → reconta o gancho do vídeo como cena |
| Tamanho | ~1.800 caracteres visíveis (≈260 palavras), **17 parágrafos curtos** separados por linha em branco |
| Tom | 2ª pessoa, entusiasmado, exclamações (5), **CAIXA ALTA só em termos-chave** (16 palavras) |
| Corpo | **lista de 7 recursos** "Emoji + Nome do recurso: o que faz" (transcrição, atendimento, urgência, horários, agendamento, informações, lembretes) |
| Cuidado | "sem substituir uma avaliação clínica" (linguagem responsável em saúde) |
| Oportunidade | "projetos de até R$ 3.000, dependendo do escopo" (valor com ressalva) |
| Emoção | "Imagine a dentista acordar e encontrar três novas consultas…" (repete o clímax do vídeo) |
| Reenquadramento | "Você não está vendendo apenas um chatbot. Está oferecendo uma solução…" |
| CTA 1 | ✅ Comenta "AGENDA" que eu te mando o FLUXO COMPLETO + PASSO A PASSO (igual ao do vídeo, com bônus a mais) |
| CTA 2 | "E me segue para receber…todos os dias" (promessa de valor recorrente) |
| Hashtags | **nenhuma** |
| Palavras-chave (busca) | agente de inteligência artificial, WhatsApp, agenda, clínica odontológica, agendamento automático, lembretes automáticos, transcrição de áudios |
| Comentários | palavra-chave com recompensa (automação de Direct) |
| Compartilhamento | útil para 2 públicos (quem vende automação e quem tem clínica); a lista de recursos incentiva **salvar** |

Padrão estrutural: **rótulo ↓ → cena do gancho → o que é → benefício-chave → lista de recursos → oportunidade/valor → imagem do resultado → reenquadramento → CTA de palavra-chave → CTA de seguir**.

## 7. Horário de publicação [F + cálculo]

| Dado | Fonte |
|---|---|
| Print com "Há 14 horas" | EXIF do PNG: **2026-11-08 11:50:31** (barra de status: 11:50) |
| Outros prints | 11:50:42 e 11:50:47 |
| Arquivo do vídeo | criado em 2026-11-08T14:50:01Z = **11:50:01 em UTC−3** (Brasília) → confirma o fuso |
| Dia | 08/11/2026 = domingo, logo a publicação foi no **sábado, 07/11/2026** |

Cálculo: o Instagram mostra "14 horas" para algo entre 14h00 e 14h59 decorridos (truncamento).
11:50 − 15 h = **20:50** e 11:50 − 14 h = **21:50** → **publicado entre 20h50 e 21h50 de sábado (07/11), mais provável ~21h20**.
Margem extra: se o app arredondar em vez de truncar, a janela vira 21h20–22h20. Janela segura: **20h50–22h20**.

Pista dentro do próprio vídeo: o rádio-relógio mostra **"SÁB 7 NOV"**, a mesma data da publicação → o vídeo provavelmente foi feito no mesmo dia [H].
Detalhe: outras telas dizem "sexta, 8 nov" e "qui, 7 nov" (datas de 2024). É um erro de continuidade que quase ninguém percebe na velocidade do vídeo; nas nossas produções, **mantenha datas coerentes**.

**Métricas:** os prints mostram só a descrição; **não há visualizações, curtidas, comentários nem compartilhamentos reais**. O "3.418 comentários" aparece **dentro do vídeo** (é cenário, não dado). Portanto não é possível calcular taxas de engajamento deste caso. O "desempenho superior" é o relato do usuário.

O horário pode ter ajudado (noite de sábado, tempo livre) **mas não há como provar**: um único caso, sem dados da conta, sem saber se houve impulsionamento, com um gancho forte e um tema de alto interesse. Use como **hipótese a testar** (ver `06-publicacao-e-horarios.md`).

## 8. Por que provavelmente funcionou (ranking)

| # | Fator | Tipo | Peso |
|---|---|---|---|
| 1 | **Tema + gancho**: dinheiro concreto (R$ 3 mil) + nicho visível (clínica) + lacuna ("essa automação") para um público que quer ganhar com IA | F + H | muito alto |
| 2 | **Demonstração literal**: cada frase vira uma tela real; o abstrato (agente de IA) fica concreto | F | muito alto |
| 3 | **Micro-história com conflito e hora marcada** (23h47, paciente perdida para o concorrente → agenda cheia de manhã) | F | alto |
| 4 | **Ritmo**: cena a cada 3,4 s, evento a cada ~0,8 s, voz a 200 ppm, reganchos aos 4 s e aos 73% | F | alto |
| 5 | **CTA de palavra-chave com recompensa e visualizado** (mostra os comentários e o Direct chegando) → comentários e DMs | F + H | alto |
| 6 | **Potencial de envio**: útil para dois públicos; dá vontade de mandar para o sócio ou para o dentista | H | alto |
| 7 | **Legenda palavra a palavra com destaque** (quem assiste sem som acompanha) | F | médio |
| 8 | **Voz enérgica e natural**, sem silêncios | F | médio |
| 9 | **Descrição longa com palavras-chave** e CTA repetido (busca + salvamentos) | F + H | médio |
| 10 | **Final seco** que emenda no início (incentiva rever) | F + H | médio |
| 11 | Horário (sábado ~21h) | H | baixo/incerto |
| — | Fatores de conta (histórico, seguidores, verificado, possível impulsionamento) | desconhecido | ? |

**Reproduzível pela Flow Group:** 2, 3, 4, 5 (com recompensa real), 6, 7, 8, 9, 10 e testes de horário.
**Não copiar:** o público-alvo do gancho (quem quer *vender* automação é concorrente da Flow, não cliente), números de prova social inventados ("3.418 comentários"), promessas de renda.
