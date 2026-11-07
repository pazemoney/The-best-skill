---
name: site-3d-scroll
description: Cria sites com cena 3D e animação conduzida pela rolagem (scrollytelling, scroll motion, palco fixo, three.js, GSAP ScrollTrigger, parallax 3D, sequência de imagens) com perfeição, sem tremor e rápido no iPhone. Use quando o pedido for site 3D, animação de scroll, efeito premium/awwwards, hero 3D, produto girando ao rolar, ou quando uma animação de rolagem treme, falha no celular ou trava. Inclui modelo pronto testado e script que mede tremor nos quadros reais.
---

# Sites 3D com animação de rolagem (perfeição técnica)

Objetivo: a cena **cola na rolagem** (nada "correndo atrás"), **não treme**, funciona no **iPhone, Android e desktop**, **reverte ao subir**, respeita **"reduzir animações"** e tem **plano B sem WebGL**.

## Comece pelo modelo testado
`templates/starter/` é um projeto Vite (three + GSAP) já com tudo abaixo. Teste real: **0 px de desvio em ~900 quadros** do compositor em desktop, Pixel 7 e iPhone 12 (emulação Chromium), sem erros de console e sem rolagem lateral.
```bash
cp -r <esta-skill>/templates/starter ./meu-site && cd meu-site && npm install && npm run dev
```
Troque a cena em `src/main.js`; a duração em `--anim`/`--hold` no CSS. Detalhes do palco: `references/scroll-stage.md`.

## As 10 regras que não se negociam (aprendidas na dor)
1. **Rolagem nativa.** Sem Lenis/smooth-scroll por JavaScript: ele briga por frações de pixel com elementos fixos/sticky e faz tremer.
2. **Sem `snap`** em ScrollTrigger com conteúdo fixado.
3. **Palco** (seção fixada com animação longa): `position: sticky` só na **entrada e saída** (trechos curtos parados); **`position: fixed` durante a animação**; troca feita com o palco já em `top: 0`, no meio do trecho parado (sem salto). A seção tem **altura fixa em CSS** (sem pin-spacer).
4. **`scrub: true`** (sem número). Suavização faz o conteúdo "correr atrás" e parecer atrasado.
5. **Progresso = função da posição**, nunca do sentido da rolagem. Assim saltos, inércia, âncoras e reload no meio funcionam e tudo **reverte** ao subir.
6. **Só `transform` e `opacity`** em tudo que se move. Nunca animar `top/left/width/height` (principalmente dentro de 3D).
7. **Nada de `transform-style: preserve-3d` com planos que se cruzam** (cintila). Use cena "flat" com `perspective` e ordem fixa, ou WebGL de verdade.
8. **Sem `backdrop-filter` em elementos grandes/fixos/em movimento**, sem camada de tela inteira com `mix-blend-mode`.
9. **Camada própria** (`will-change: transform`) só no que muda a cada quadro; não espalhe em tudo.
10. **`force3D: true`** nas timelines com scrub (evita alternar camada 2D/3D nas bordas).

iPhone: **comece com rolagem nativa** (sem `ScrollTrigger.normalizeScroll`). Já se viu a rolagem ficar estranha com ele; só adicione se o palco realmente tremer num iPhone real, e meça de novo. Use `ScrollTrigger.config({ ignoreMobileResize: true })` e unidades `svh` para a barra de endereço não causar saltos.

## Receita em 7 passos
1. **Decida a técnica** (`references/techniques.md`): WebGL (three.js) para objetos/cenas reais; **sequência de imagens em canvas** para produto "renderizado" pesado; **CSS 3D flat** para cartões/camadas simples; vídeo só se não precisar de scrub preciso.
2. **Roteiro por progresso (0→1):** escreva em papel o que acontece em 0–0,25–0,5–0,75–1 (câmera, objeto, texto, cor). Uma ideia por trecho.
3. **Monte o palco** (`stage.js`): seção com altura em CSS; `createStage({ section, stage, timeline, onProgress })`.
4. **Ligue a cena ao progresso sem suavização:** posição/rotação/câmera = f(p). Desenhe **uma vez por quadro**, só quando algo mudou, via `gsap.ticker`.
5. **Textos reais no HTML** (acessível, copiável, indexável), contraste garantido com degradê atrás do texto, `aria-hidden` no canvas decorativo, link "pular a animação".
6. **Plano B e reduzir animações:** sem WebGL ou contexto perdido → imagem real da cena (nunca uma versão simplificada diferente); com `prefers-reduced-motion` → a **experiência completa continua** (o usuário conduz pela rolagem), somem só movimentos **automáticos** e de enfeite.
7. **Meça** (`scripts/measure-stage.mjs`) e só então diga "pronto".

## Desempenho (orçamento)
- **Resolução limitada:** `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))` e ~1,5 em telas estreitas.
- **Tamanho do canvas pelo palco** (`stage.clientWidth/Height`), não por `innerHeight`.
- Desenhar **só quando visível** (IntersectionObserver) e **só quando mudou**. Pausar laços infinitos e marquees fora da tela.
- Modelos: glTF/GLB com **Draco/Meshopt** e texturas **KTX2/WebP**; poucos materiais e draw calls; sem sombras em tempo real no celular.
- Carregue three.js com `import()` dinâmico depois do primeiro desenho do texto; imagens críticas com `preload`; o resto `loading="lazy"`.
- Ambiente de reflexo sem baixar HDR: `RoomEnvironment` + PMREM (como no modelo).
- Telas estreitas: **afaste a câmera pela proporção** (`fit`), senão o objeto estoura o quadro.
- Orçamento sugerido: < 200 KB de JS inicial fora do three.js, LCP < 2,5 s, nenhuma tarefa longa durante a rolagem.

## Como verificar (não confie em ler a posição por JavaScript)
`node scripts/measure-stage.mjs <url> "#secao" "#palco"` mede o palco nos **quadros reais do compositor** (`Page.startScreencast`), em desktop, Pixel 7 e iPhone 12, rolando devagar, rápido, subindo, descendo e invertendo. Aprovado: desvio ≤ 1 px, sem erros, sem rolagem lateral. Veja `references/qa.md` para a checklist completa (inclui teste em **iPhone real**, que é o que decide).

## Erros comuns (e a causa)
| Sintoma | Causa provável |
|---|---|
| Palco "pula" ao entrar/sair | Troca sticky↔fixed fora do `top:0`, ou pin-spacer com altura diferente |
| Cena atrasada em relação ao dedo | `scrub` com número, lerp na câmera, ou desenho fora do ticker |
| Tremor só no iPhone | Barra de endereço mudando `vh` (use `svh` + `ignoreMobileResize`), `backdrop-filter` ou camada 3D cruzada |
| Cintilação nas bordas de cartões 3D | `preserve-3d` com planos se cruzando |
| Fica preto no celular | Perda de contexto WebGL, textura grande demais, DPR alto |
| Imagem de reserva por cima do canvas | CSS `display` vencendo o atributo `hidden` (use `[hidden]{display:none}`) |
| Texto ilegível sobre o 3D | Falta degradê/scrim atrás do texto |

## Texto e conteúdo
Siga `perfect-website-rules` para copy, SEO, acessibilidade e fotos reais. Não invente números, clientes ou depoimentos.

## Skills irmãs
`gsap-scrolltrigger`, `gsap-core`, `gsap-timeline`, `gsap-performance`, `gsap-react`, `threejs-fundamentals`, `threejs-animation`, `threejs-materials`, `threejs-lighting`, `threejs-shaders`, `threejs-performance`, `threejs-react-three-fiber`, `emil-design-eng`, `animation-performance`, `frontend-design`, `taste-skill`, `design-taste-frontend`.
