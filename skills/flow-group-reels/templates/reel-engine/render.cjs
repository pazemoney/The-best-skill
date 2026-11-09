#!/usr/bin/env node
/*
 * Renderiza as cenas HTML quadro a quadro (Playwright + Chromium) e monta o vídeo com ffmpeg.
 *
 *   node render.cjs --p projects/reel-01-pizzaria --snap 0,2.6,9.5        # fotos de conferência (PNG)
 *   node render.cjs --p projects/reel-01-pizzaria --sheet 0.5             # folha de contato (1 quadro a cada 0,5 s)
 *   node render.cjs --p projects/reel-01-pizzaria --out video.mp4         # vídeo sem som (1080x1920, 30 fps)
 *   opções: --fps 30  --workers 4  --from 0  --to <fim>  --crf 16
 *
 * Requer: playwright (require('playwright')) e ffmpeg no PATH.
 */
const path = require('path');
const fs = require('fs');
const os = require('os');
const { spawn, spawnSync } = require('child_process');
const { chromium } = require('playwright');

/** --chave valor  (ou --chave sozinho = true) */
function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) continue;
    const next = argv[i + 1];
    out[argv[i].slice(2)] = next !== undefined && !next.startsWith('--') ? next : true;
  }
  return out;
}
const args = parseArgs(process.argv.slice(2));
const ROOT = __dirname;
const proj = args.p || 'projects/reel-01-pizzaria';
const projDir = path.join(ROOT, proj);
const url = 'file://' + path.join(ROOT, 'index.html') + '?p=' + encodeURIComponent(proj);
const fps = Number(args.fps || 30);
const W = 1080, H = 1920;

async function openPage(browser) {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto(url);
  await page.waitForFunction(() => window.__ready === true || !!window.__error, null, { timeout: 60000 });
  const err = await page.evaluate(() => window.__error || null);
  if (err) throw new Error('Erro no projeto: ' + err);
  if (errors.length) throw new Error('Erros no console: ' + errors.join(' | '));
  return page;
}
const seek = (page, t) => page.evaluate(tt => window.__seek(tt), t);

async function main() {
  const browser = await chromium.launch({ args: ['--force-color-profile=srgb', '--font-render-hinting=none', '--disable-lcd-text'] });
  try {
    const probe = await openPage(browser);
    const duration = Number(args.to || (await probe.evaluate(() => window.REEL.duration)));
    const from = Number(args.from || 0);

    if (args.snap) {
      const out = path.join(projDir, 'snaps'); fs.mkdirSync(out, { recursive: true });
      for (const ts of String(args.snap).split(',').map(Number)) {
        await seek(probe, ts);
        const f = path.join(out, `snap_${ts.toFixed(2).padStart(6, '0')}.png`);
        await probe.screenshot({ path: f });
        console.log(f);
      }
      return;
    }
    if (args.sheet) {
      const step = Number(args.sheet) || 0.5;
      const out = path.join(projDir, 'snaps'); fs.mkdirSync(out, { recursive: true });
      const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sheet-'));
      let i = 0;
      for (let t = from; t < duration; t += step, i++) { await seek(probe, t); await probe.screenshot({ path: path.join(tmp, `f_${String(i).padStart(4, '0')}.jpg`), type: 'jpeg', quality: 80 }); }
      const sheet = path.join(out, `sheet_${from}-${duration}.jpg`);
      const cols = 6, rows = Math.ceil(i / cols);
      spawnSync('ffmpeg', ['-v', 'error', '-y', '-framerate', '1', '-i', path.join(tmp, 'f_%04d.jpg'), '-vf', `scale=270:480,drawtext=text='%{n}':x=6:y=6:fontsize=22:fontcolor=yellow:box=1:boxcolor=black@0.6,tile=${cols}x${rows}:padding=4`, '-frames:v', '1', '-q:v', '3', sheet], { stdio: 'inherit' });
      console.log(sheet, `(quadro n = ${from} + n*${step}s)`);
      return;
    }

    // vídeo: divide em blocos entre "workers", cada um vira um segmento mp4; depois concatena
    const outFile = path.resolve(args.out || path.join(projDir, 'video_sem_som.mp4'));
    const workers = Math.max(1, Number(args.workers || 4));
    const total = Math.round((duration - from) * fps);
    const per = Math.ceil(total / workers);
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'reel-'));
    const crf = String(args.crf || 16);
    const t0 = Date.now();
    await probe.close();
    const fmt = args.format || 'jpeg'; // jpeg q95 é ~3x mais rápido que png e some no H.264
    const parts = await Promise.all(Array.from({ length: workers }, async (_, w) => {
      const a = w * per, b = Math.min(total, a + per);
      if (a >= b) return null;
      const own = await chromium.launch({ args: ['--force-color-profile=srgb', '--font-render-hinting=none', '--disable-lcd-text'] }); // um navegador por worker
      const page = await openPage(own);
      const seg = path.join(tmp, `seg_${w}.mp4`);
      const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', crf, '-pix_fmt', 'yuv420p', '-r', String(fps), seg], { stdio: ['pipe', 'inherit', 'inherit'] });
      for (let f = a; f < b; f++) {
        await seek(page, from + f / fps);
        const buf = await page.screenshot(fmt === 'png' ? { type: 'png' } : { type: 'jpeg', quality: 95 });
        if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
        if (w === 0 && (f - a) % 60 === 0) process.stdout.write(`\r  quadros: ~${Math.round(((f - a) / (b - a)) * 100)}%   `);
      }
      ff.stdin.end();
      await new Promise((res, rej) => ff.on('close', c => (c === 0 ? res() : rej(new Error('ffmpeg falhou no segmento ' + w)))));
      await own.close();
      return seg;
    }));
    const list = path.join(tmp, 'list.txt');
    fs.writeFileSync(list, parts.filter(Boolean).map(p => `file '${p}'`).join('\n'));
    const r = spawnSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', '-movflags', '+faststart', outFile], { stdio: 'inherit' });
    if (r.status !== 0) throw new Error('concat falhou');
    console.log(`\nvídeo: ${outFile} | ${total} quadros em ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  } finally {
    await browser.close();
  }
}
main().catch(e => { console.error('\nFALHOU:', e.message); process.exit(1); });
