# SEO, acessibilidade e desempenho: referência rápida

## Head mínimo
```html
<html lang="pt-BR">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Marca — o que faz, para quem (≤ 60 caracteres)</title>
<meta name="description" content="Uma frase útil e verdadeira (≤ 155 caracteres).">
<link rel="canonical" href="https://dominio-oficial.com.br/">
<meta property="og:title" content="…"><meta property="og:description" content="…">
<meta property="og:image" content="https://dominio-oficial.com.br/og.jpg"> <!-- 1200×630 -->
<meta property="og:type" content="website"><meta property="og:locale" content="pt_BR">
<meta name="theme-color" content="#…">
```

## JSON-LD (exemplo: profissional/negócio local)
Use o tipo certo (`LegalService`, `Physician`, `LocalBusiness`, `Person`, `Organization`). Só dados reais e visíveis na página. Valide no Rich Results Test.

## Imagens
Formatos AVIF/WebP, `width`/`height` sempre, `srcset`/`sizes`, LCP com `fetchpriority="high"` e sem lazy, o resto `loading="lazy" decoding="async"`. Rosto/produto: `object-fit: cover` com `object-position` ajustado.

## Fontes
Self-host com subset latino (+ latino estendido para PT-BR), `font-display: swap`, preload só da principal, no máximo 2 famílias e poucos pesos (variável quando possível).

## JavaScript
Dividir por rota/seção, adiar o que não é essencial (analytics, chat), evitar bibliotecas grandes para efeitos pequenos, `import()` para three.js/mapas/vídeo.

## Acessibilidade (teste rápido)
1. Navegar só com Tab: ordem lógica, foco visível, sem armadilha.
2. Zoom 200%: nada quebra.
3. Leitor de tela: títulos em ordem, botões com nome.
4. `prefers-reduced-motion` e `prefers-color-scheme` respeitados.
5. Contraste: texto normal ≥ 4,5:1.

## Medição
Lighthouse (celular, 4G lento), PageSpeed Insights (dados reais), WebPageTest. Corrija primeiro LCP, depois CLS, depois INP.

## Cabeçalhos e infraestrutura (Vercel/CDN)
HTTPS e HSTS, redirecionar `www`/`http` para o domínio oficial, `Cache-Control: immutable` para assets com hash, compressão Brotli, página 404 útil.
