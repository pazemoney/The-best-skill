# Escolha da técnica

| Técnica | Quando | Cuidados |
|---|---|---|
| **WebGL / three.js** | Objeto 3D, câmera percorrendo cena, shaders, partículas com propósito | DPR limitado, modelos comprimidos, plano B com imagem real, perda de contexto |
| **Sequência de imagens em canvas** | Produto "renderizado" pesado (estilo página de produto premium) | 60–180 quadros WebP/AVIF, menos quadros no celular, pré-carregar em ordem, desenhar por `drawImage` conforme o progresso |
| **CSS 3D flat** | Cartões e camadas com profundidade simples | `perspective` no pai, ordem fixa, **sem `preserve-3d` com planos cruzando**, só `transform`/`opacity` |
| **Vídeo** | Fundo contínuo sem scrub preciso | Scrub por `currentTime` é impreciso e pesado no iOS; prefira sequência de imagens |
| **GSAP puro (DOM)** | Textos, revelações, parallax leve | Sem animar layout; reversível; mesmo easing em todo o site |

## Sequência de imagens (esqueleto)
```js
const frames = Array.from({length: N}, (_, i) => `/seq/${String(i).padStart(4,'0')}.webp`);
const imgs = []; let ready = 0;
frames.forEach((src, i) => { const im = new Image(); im.src = src; im.decode().then(() => { imgs[i] = im; ready++; }); });
function drawFrame(p) {
  const i = Math.min(N - 1, Math.round(p * (N - 1))); const im = imgs[i]; if (!im) return;
  // cobrir o canvas sem distorcer (object-fit: cover manual)
  const r = Math.max(cv.width / im.width, cv.height / im.height);
  ctx.drawImage(im, (cv.width - im.width * r) / 2, (cv.height - im.height * r) / 2, im.width * r, im.height * r);
}
// onProgress(p) → dirty = true; desenhar no gsap.ticker
```
Pré-carregue o primeiro quadro e mostre-o como `poster`; carregue o resto em segundo plano.

## Câmera guiada por trilho (WebGL)
Use `THREE.CatmullRomCurve3` com poucos pontos e `curve.getPoint(p)` para a câmera; `lookAt` em outra curva/alvo. Sem lerp no progresso.

## Efeitos que valem o custo
Reflexo de ambiente (RoomEnvironment/HDR pequeno), profundidade de campo falsa por camadas, parallax por camadas (transform), tipografia revelando por máscara, mudança de cor/material por progresso. Evite: partículas aleatórias sem função, brilho exagerado, círculos decorativos, efeitos repetidos.
