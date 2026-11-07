# Palco de rolagem: como funciona e por quê

## Estrutura
```html
<section id="story" class="story">        <!-- altura FIXA em CSS -->
  <div id="stage" class="stage">…</div>   <!-- 100svh -->
</section>
```
```css
.story { height: calc(100svh + (var(--anim) + var(--hold) * 2) * 1svh); }
.stage { position: sticky; top: 0; height: 100svh; width: 100%; contain: layout paint; }
.stage[data-mode="fixed"] { position: fixed; left: 0; }
```
`--anim` = alturas de tela rolando **durante** a animação (ex.: 400). `--hold` = trecho parado em cada ponta (ex.: 30).

## Linha do tempo da rolagem (p = progresso dentro da seção, 0→1)
```
p:   0 ────── a ───────────────────────── b ────── 1
      sticky   |        fixed (animando)      |  sticky
              troca (palco já em top:0)    troca
```
`a = (hold/travel)/2` e `b = 1 − a`: a troca acontece **no meio do trecho parado**, com o palco colado no topo nos dois estados, então não há salto.

## Regras de implementação (resumo do `src/stage.js`)
- O estado (`sticky`/`fixed`) é função de `p`, calculada em `onUpdate` **e** em `onRefresh` (cobre reload no meio da página).
- A animação usa outro ScrollTrigger com `start: top+=hold`, `end: +=anim`, `scrub: true`, `invalidateOnRefresh: true`.
- `ScrollTrigger.config({ ignoreMobileResize: true })` e alturas em `svh`.
- Nada de `pin: true` nem `snap`. Nada de `normalizeScroll` por padrão.
- O desenho 3D roda em `gsap.ticker` (1 vez por quadro, só se `dirty`).

## Várias cenas na mesma página
Uma seção/palco por cena. Entre elas deixe um respiro de rolagem normal (`min-height: 60svh`). Não deixe dois palcos `fixed` ao mesmo tempo.

## Âncoras e navegação
Links internos para dentro do palco devem apontar para posições de **p** conhecidas (`scrollTo(top + p*travel)`). Teste o clique no menu durante a animação.

## Quando usar `pin` do GSAP em vez deste padrão
Se a cena é curta (≤ 2 alturas) e simples, `pin: true` do ScrollTrigger funciona bem. Para cenas longas, com 3D ou iPhone exigente, prefira o palco acima.
