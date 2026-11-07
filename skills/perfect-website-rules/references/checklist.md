# Checklist de entrega (copiar e marcar)

## Conteúdo
- [ ] Nenhum cliente, número, depoimento, prêmio ou contato inventado
- [ ] Regras do setor (conselho/ética) conferidas
- [ ] Um rótulo de CTA principal, igual em todo o site
- [ ] Textos lidos em voz alta e sem cara de IA

## Design
- [ ] Tokens centralizados; identidade própria do projeto
- [ ] Fotos reais, sem distorção; logo oficial
- [ ] Sem cara de template (gradiente genérico, partículas, círculos soltos)
- [ ] Contraste ≥ 4,5:1 e hierarquia clara

## Movimento
- [ ] Mesmo easing/tempo em tudo; reversível
- [ ] "Reduzir animações" respeitado; plano B sem WebGL
- [ ] Palco estável nos quadros reais (desktop e iPhone) — `measure-stage.mjs`

## Interação
- [ ] Área clicável = área visível (centro, borda, fora)
- [ ] Formulários e links testados; sucesso só se enviou de fato
- [ ] Teclado completo; foco visível

## Técnico
- [ ] typecheck, lint, build
- [ ] e2e em desktop, Android (Pixel 7) e iPhone 12
- [ ] Console limpo; sem rolagem lateral; nada cortado
- [ ] LCP < 2,5 s, CLS < 0,1, INP < 200 ms
- [ ] title, description, canonical, OG, sitemap, robots, JSON-LD
- [ ] LGPD: política e consentimento

## Publicação
- [ ] Deploy feito; **conferido no endereço real**
- [ ] Commit sem `--force`; sem segredos
- [ ] Relatório curto ao dono
