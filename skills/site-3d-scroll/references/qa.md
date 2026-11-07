# QA de cenas com rolagem (checklist)

## Automático (Playwright)
- `node scripts/measure-stage.mjs <url> "#secao" "#palco"` → desvio ≤ 1 px nos 3 perfis.
- Sem erros de console; `document.documentElement.scrollWidth <= innerWidth` (sem rolagem lateral).
- Com WebGL desligado (simule negando o contexto): aparece a imagem real da cena e o texto continua legível.
- `prefers-reduced-motion: reduce`: a cena ainda responde à rolagem; nada se move sozinho.
- Reverter: subir a página deve desfazer tudo (mesmo quadro em p=0,3 descendo e subindo).

## Manual (obrigatório antes de dizer "pronto")
1. **iPhone real** (Safari e Chrome; no iPhone todo navegador é WebKit): rolar devagar, rápido, soltar com inércia, inverter várias vezes.
2. Android de entrada (CPU fraca): a rolagem não pode "engasgar".
3. Rotacionar a tela e redimensionar a janela com a cena no meio.
4. Navegar por teclado (Tab, setas, Page Down) e pelo menu/âncoras.
5. Recarregar a página no meio da cena.

## Se medir pelo Chrome DevTools
Aba Performance → gravar rolando → procurar tarefas longas (> 50 ms) e repinturas grandes (Paint) por quadro. Aba Rendering → "Paint flashing" mostra o que repinta; o palco não deve piscar.

## Critérios de aceite
- 0–1 px de desvio no palco; 60 fps estáveis no desktop e sem quedas visíveis no celular.
- LCP < 2,5 s, CLS ≈ 0, JS inicial enxuto.
- Contraste do texto ≥ 4,5:1 sobre qualquer frame da cena.
