// Mede se o "palco" fixo treme, nos quadros REAIS do compositor (Page.startScreencast).
// Uso (na pasta do projeto, onde o Playwright está instalado):
//   node caminho/measure-stage.mjs http://localhost:4173 "#story" "#stage"
// Saída: para desktop, Pixel 7 e iPhone 12, quantos quadros foram capturados e quanto o marcador se mexeu (px).
// Aprovado = desvio máximo <= 1 px (desktop) e <= 1 px (mobile) durante a animação.
import { createRequire } from 'node:module';
const require = createRequire(process.cwd() + '/');
const pw = require('playwright');

const [url = 'http://localhost:4173', sectionSel = '#story', stageSel = '#stage'] = process.argv.slice(2);
const profiles = [
  { name: 'desktop', opts: { viewport: { width: 1280, height: 800 } } },
  { name: 'pixel7', opts: pw.devices['Pixel 7'] },
  { name: 'iphone12', opts: pw.devices['iPhone 12'] },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let failed = false;

for (const p of profiles) {
  const browser = await pw.chromium.launch();
  const ctx = await browser.newContext(p.opts);
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(url, { waitUntil: 'networkidle' });
  await sleep(500);

  const vp = page.viewportSize();
  // Marcador vermelho dentro do palco (posição relativa ao palco).
  await page.evaluate(([sec, st]) => {
    const stage = document.querySelector(st);
    const m = document.createElement('div');
    m.id = '__marker';
    m.style.cssText = 'position:absolute;left:20px;top:20px;width:30px;height:30px;background:#ff0000;z-index:99999;pointer-events:none';
    stage.appendChild(m);
  }, [sectionSel, stageSel]);

  const geo = await page.evaluate(([sec, st]) => {
    const s = document.querySelector(sec), g = document.querySelector(st);
    const top = s.getBoundingClientRect().top + scrollY;
    return { top, travel: s.offsetHeight - g.offsetHeight, hscroll: document.documentElement.scrollWidth > innerWidth + 1 };
  }, [sectionSel, stageSel]);

  // Página auxiliar para decodificar os quadros (sem dependências externas).
  const helper = await ctx.newPage();
  await helper.setContent('<canvas id=c></canvas>');

  const lo = geo.top + 5, hi = geo.top + geo.travel - 5;
  await page.evaluate((y) => scrollTo(0, y), lo); await sleep(400);   // começa dentro do palco
  const cdp = await ctx.newCDPSession(page);
  const frames = [];
  cdp.on('Page.screencastFrame', async (f) => {
    frames.push(f.data);
    await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {});
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 70, maxWidth: vp.width, maxHeight: vp.height, everyNthFrame: 1 });

  // Rolagem: lenta, rápida com inércia, inverter várias vezes — sempre dentro do trecho do palco.
  await sleep(200);
  const sweep = async (from, to, steps, delay) => {
    for (let i = 1; i <= steps; i++) {
      const t = i / steps, e = t * t * (3 - 2 * t);               // aceleração/desaceleração
      await page.evaluate((y) => scrollTo(0, y), from + (to - from) * e);
      await sleep(delay);
    }
  };
  await sweep(lo, hi, 140, 16);        // descida lenta
  await sweep(hi, lo, 60, 8);          // subida rápida
  await sweep(lo, hi, 40, 4);          // descida muito rápida
  for (let k = 0; k < 4; k++) { await sweep(geo.top + geo.travel * 0.4, geo.top + geo.travel * (0.5 + 0.1 * k), 20, 8); await sweep(geo.top + geo.travel * (0.5 + 0.1 * k), geo.top + geo.travel * 0.4, 20, 8); }
  await page.evaluate((y) => scrollTo(0, y), geo.top + geo.travel * 0.15); await sleep(200);
  await page.mouse.move(vp.width / 2, vp.height / 2);
  for (let i = 0; i < 14; i++) { await page.mouse.wheel(0, 120); await sleep(12); }   // entrada real de roda/toque (dentro do palco)
  for (let i = 0; i < 14; i++) { await page.mouse.wheel(0, -120); await sleep(12); }
  await sleep(400);
  await cdp.send('Page.stopScreencast');

  // Procura o marcador (vermelho puro) em cada quadro.
  const boxes = await helper.evaluate(async (list) => {
    const c = document.getElementById('c'), x = c.getContext('2d', { willReadFrequently: true });
    const out = [];
    for (const b64 of list) {
      const img = await createImageBitmap(await (await fetch('data:image/jpeg;base64,' + b64)).blob());
      c.width = img.width; c.height = img.height; x.drawImage(img, 0, 0);
      const d = x.getImageData(0, 0, Math.min(160, img.width), Math.min(160, img.height)).data;
      const W = Math.min(160, img.width); let minx = 1e9, miny = 1e9, n = 0;
      for (let i = 0; i < d.length; i += 4) if (d[i] > 190 && d[i + 1] < 70 && d[i + 2] < 70) {
        const px = (i / 4) % W, py = Math.floor(i / 4 / W); if (px < minx) minx = px; if (py < miny) miny = py; n++;
      }
      out.push(n > 50 ? { x: minx, y: miny } : null);
    }
    return out;
  }, frames);

  if (process.env.DEBUG) console.log(p.name, boxes.map((b,i)=>b?(b.y!==20||b.x!==20?i+':'+b.x+','+b.y:''):i+':X').filter(Boolean).join(' '));
  const seen = boxes.filter(Boolean);
  const xs = seen.map((b) => b.x), ys = seen.map((b) => b.y);
  const dx = seen.length ? Math.max(...xs) - Math.min(...xs) : NaN;
  const dy = seen.length ? Math.max(...ys) - Math.min(...ys) : NaN;
  const lost = boxes.length - seen.length;
  const ok = seen.length > 20 && dx <= 1 && dy <= 1 && lost === 0 && !geo.hscroll && errors.length === 0;
  if (!ok) failed = true;
  console.log(`${ok ? 'OK  ' : 'FALHA'} ${p.name.padEnd(9)} quadros=${boxes.length} marcador_perdido=${lost} desvio_x=${dx}px desvio_y=${dy}px rolagem_lateral=${geo.hscroll} erros_console=${errors.length}`);
  errors.slice(0, 3).forEach((e) => console.log('   erro:', e.slice(0, 160)));
  await browser.close();
}
process.exit(failed ? 1 : 0);
