# Modelo: cena 3D conduzida pela rolagem

```bash
npm install
npm run dev        # desenvolvimento
npm run build && npm run preview
```
Arquivos: `src/stage.js` (palco estável), `src/main.js` (cena three.js + textos), `src/styles.css` (duração da cena em `--anim` e `--hold`).
Troque o nó de torção por seu modelo (glTF/GLB comprimido) mantendo o padrão: **posição = função do progresso**.
