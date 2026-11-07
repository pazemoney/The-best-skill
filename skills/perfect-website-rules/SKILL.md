---
name: perfect-website-rules
description: Regras e checklist para criar sites perfeitos de ponta a ponta - estratégia, design system, copy honesta, movimento, acessibilidade, SEO, desempenho, celular, formulários, LGPD e entrega testada. Use ao criar, redesenhar, revisar ou publicar qualquer site, landing page ou página institucional, e antes de dizer que um site está pronto. Website design rules, landing page, QA, launch checklist.
---

# Regras para criar sites perfeitos

Siga na ordem. Cada regra existe porque a versão que não a seguia foi reprovada na prática.

## 0. Como trabalhar
- **Decida sozinho o que dá para decidir.** Pergunte só o que bloqueia (dado que só o cliente tem). Inspecione, implemente, teste, corrija, entregue.
- **Nunca diga "corrigido/pronto" sem ter testado rodando o site** e medindo. Mostre a evidência (comando, captura, número).
- Relatório final **curto**: o que mudou, o que foi testado, se está no ar. Fale com o dono na língua dele.
- Leia o `README`/`DESIGN`/`CLAUDE.md` do projeto antes de mexer em layout, texto ou animação. As regras do projeto vencem as deste guia.

## 1. Briefing (5 perguntas, antes de qualquer pixel)
1. Quem é o visitante e o que ele quer resolver? 2. Qual a **única** ação principal? 3. Que **prova real** existe (fotos, resultados verificáveis, certificações)? 4. Há **regra do setor** (OAB, CFM/CRM, CRP, finanças, saúde, alimentos, LGPD)? 5. Quais referências o dono aprova e quais reprova?
Sem prova real, **não invente**: construa a página para funcionar sem ela e deixe o espaço previsto.

## 2. Mensagem e estrutura
- **Hero**: posicionamento claro em uma frase + benefício + ação. Benefício antes de tecnologia.
- Fio condutor: **reconhecer o problema → mostrar a transformação (antes/depois) → como funciona → prova → ação**.
- **Um rótulo de CTA principal**, repetido igual em todo o site. Secundários não competem.
- Mostrar o produto em vez de explicar: mockups realistas, demos que funcionam (marcadas como "exemplo ilustrativo"), comparador antes/depois.
- Seções com um propósito cada; cortar o que não ajuda a decidir.

## 3. Texto (copy)
- Português natural, direto, curto. Frases que um humano diria. Sem jargão, sem "soluções inovadoras", sem parágrafos longos. (Para limpar textos de IA use `humanizer-pt-br`.)
- **Nunca inventar**: clientes, depoimentos, números, prêmios, parcerias, projetos, contatos, endereços, registro profissional.
- Promessa de resultado, "o melhor", "garantido", "especialista" sem título: **proibidos** em setores regulados. Em dúvida, descreva o serviço, não o resultado.
- Contatos: só canais reais confirmados pelo dono.
- Detalhes em `references/copy-rules.md`.

## 4. Design system (tokens, não valores soltos)
- **Cores, tipografia, espaçamento, raios, sombras e movimento em tokens** num só lugar (`tokens.css`/variáveis). Nada de tons e raios avulsos.
- **Identidade própria por projeto**: não reaproveite a paleta/fonte de outro cliente. Paleta curta (1 base + 1 acento + neutros), contraste verificado.
- **Tipografia**: no máximo 2 famílias, bem distintas; escala definida; linhas ≤ 75 caracteres; serifa tem um pouco mais de entrelinha. O título carrega a personalidade.
- **Fotos reais** do cliente, sem distorção (`object-fit: cover`), nada de banco de imagem genérico nem imagem gerada quando o pedido é "fotos reais da pessoa".
- **Logo oficial** do cliente, sem recriar nem esticar.
- **Cara de template de IA = reprovado**: gradiente roxo/azul genérico, partículas aleatórias, brilho exagerado, círculos decorativos sem função, 3 cartões idênticos com ícone, efeitos repetidos. Cada escolha visual precisa de uma razão ligada ao assunto do cliente.
- Vidro (liquid glass) com moderação, só em elementos pequenos e estáticos.

## 5. Movimento
- **Um sistema de movimento**: mesmos tempos e easings em entradas, títulos, cards e hovers. Nada aparece "do nada" enquanto os vizinhos animam.
- **Reversível** (descer e subir). Nada que toca uma vez só.
- **Respeitar "reduzir animações"**: a experiência continua completa; somem só movimentos automáticos e de enfeite.
- Animações presas à rolagem, cenas 3D e palcos fixos: siga `site-3d-scroll` (rolagem nativa, `scrub: true`, sticky/fixed, sem `preserve-3d` cruzado).

## 6. Interação
- **Área clicável = área visível.** Botões sem ancestral com transform 3D, `perspective` ou `backdrop-filter`. Teste centro, bordas e fora.
- Um clique faz uma coisa (desktop e toque). Alvo de toque ≥ 44×44 px. Foco visível. Estados de hover, foco, ativo, desabilitado e carregando.
- **Formulários honestos**: rótulos reais, validação clara, erro específico, sucesso só quando de fato enviou. Nunca afirmar que enviou uma mensagem que só foi copiada.
- Para contato por WhatsApp/Instagram: link direto (`https://wa.me/55DDDNUMERO?text=...`, `https://ig.me/m/perfil`) e, se gerar mensagem, permitir editar e copiar antes de abrir.

## 7. Celular primeiro
Mais da metade das visitas é no celular. Projete 360–430 px primeiro. Teste 360, 390, 768, 1280, 1920. **Sem rolagem lateral. Nada cortado.** Use `svh/dvh` em vez de `vh` para telas cheias. **iPhone/Safari decide**: o que não funciona no iPhone não está pronto.

## 8. Desempenho
Metas: LCP < 2,5 s, INP < 200 ms, CLS < 0,1 (p75 em celular). Imagens AVIF/WebP com `width/height`, `srcset`, `loading="lazy"` (menos a do LCP, com `fetchpriority="high"`); fontes com subset, `font-display: swap` e preload da principal; JS enxuto e dividido; terceiros adiados; cache longo para assets com hash. Detalhes: `references/seo-a11y-perf.md`.

## 9. SEO técnico
Um `<h1>`; `title` e `description` únicos; `canonical` no domínio oficial; Open Graph/Twitter com imagem 1200×630; `sitemap.xml` e `robots.txt`; JSON-LD adequado (Organization, LocalBusiness, Person, Service, FAQ só se houver FAQ visível); `lang="pt-BR"`; URLs limpas; textos reais no HTML (não dentro de imagem/canvas); redirecionar `www`/`http` para o domínio oficial.

## 10. Acessibilidade (WCAG 2.2 AA)
Contraste ≥ 4,5:1 (3:1 para texto grande); navegação completa por teclado; HTML semântico (`header/nav/main/footer`, botões são `<button>`, links são `<a>`); `alt` descritivo ou vazio se decorativo; `label` em todo campo; `skip link`; não depender só de cor; vídeo com legenda; `prefers-reduced-motion` respeitado.

## 11. Privacidade e legal (Brasil)
LGPD: política de privacidade clara, coleta mínima, consentimento para cookies não essenciais/analytics, contato do responsável. Setores regulados: siga o código do conselho (OAB/Provimento 205, CFM, CRP etc.). Dados pessoais de terceiros e fotos de pessoas só com autorização.

## 12. Entrega (checklist obrigatória)
- [ ] Typecheck, lint e build de produção sem erro.
- [ ] Testes (inclusive e2e em desktop, Android e iPhone) passando.
- [ ] Console sem erros; sem rolagem lateral; nada cortado no celular.
- [ ] Botões principais testados (centro, borda, fora), formulários, links externos.
- [ ] Animações estáveis nos quadros reais e reversíveis ao subir.
- [ ] Lighthouse/Core Web Vitals dentro das metas; imagens otimizadas.
- [ ] SEO e acessibilidade conferidos; contatos e textos conferidos com o dono.
- [ ] Publicado e **conferido no endereço real** (não só local). Se o deploy falhar, corrigir antes de avisar.
- [ ] Commit claro; sem `--force`; sem segredos no repositório.
Versão para copiar: `references/checklist.md`.

## Skills irmãs
`site-3d-scroll`, `frontend-design`, `taste-skill`, `design-taste-frontend`, `ui-ux-pro-max`, `web-design-guidelines`, `accessibility`, `seo`, `performance`, `core-web-vitals`, `copywriting`, `humanizer-pt-br`, `landing-page-conversion-audit`.
