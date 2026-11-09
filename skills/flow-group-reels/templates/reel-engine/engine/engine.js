/*
 * Reel engine — cenas em HTML conduzidas pelo tempo (t, em segundos).
 * Tudo o que aparece é função de t: nada de CSS transition/animation, Date.now ou Math.random.
 * O render (render.mjs) chama window.__seek(t) quadro a quadro e fotografa a página.
 */
(() => {
  const W = 1080, H = 1920;

  // ---------- matemática e easing ----------
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, p) => a + (b - a) * p;
  const ease = {
    linear: p => p,
    inQuad: p => p * p,
    outQuad: p => 1 - (1 - p) * (1 - p),
    inOutQuad: p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2),
    inCubic: p => p * p * p,
    outCubic: p => 1 - Math.pow(1 - p, 3),
    inOutCubic: p => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
    outQuint: p => 1 - Math.pow(1 - p, 5),
    inExpo: p => (p === 0 ? 0 : Math.pow(2, 10 * p - 10)),
    outExpo: p => (p === 1 ? 1 : 1 - Math.pow(2, -10 * p)),
    inOutExpo: p => (p === 0 ? 0 : p === 1 ? 1 : p < 0.5 ? Math.pow(2, 20 * p - 10) / 2 : (2 - Math.pow(2, -20 * p + 10)) / 2),
    outBack: p => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); },
    outBackSoft: p => { const c1 = 0.9, c3 = c1 + 1; return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); },
  };
  /** progresso 0→1 entre start e start+dur, com easing */
  const P = (t, start, dur, e = 'outCubic') => ease[e](clamp((t - start) / Math.max(dur, 1e-6)));

  /** gerador pseudoaleatório com semente (determinístico) */
  function rng(seed) {
    let s = seed >>> 0;
    return () => {
      s = (s + 0x6d2b79f5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // ---------- DOM ----------
  /** h('div.classe#id', {style:{}, ...attrs}, ...filhos) */
  function h(sel, attrs, ...kids) {
    const m = sel.match(/^([a-z0-9]+)?((?:[.#][\w-]+)*)$/i);
    const el = document.createElement((m && m[1]) || 'div');
    if (m && m[2]) for (const part of m[2].match(/[.#][\w-]+/g)) {
      if (part[0] === '.') el.classList.add(part.slice(1)); else el.id = part.slice(1);
    }
    if (attrs && (typeof attrs !== 'object' || attrs instanceof Node || Array.isArray(attrs))) { kids.unshift(attrs); attrs = null; }
    if (attrs) for (const [k, v] of Object.entries(attrs)) {
      if (k === 'style') Object.assign(el.style, v);
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'text') el.textContent = v;
      else el.setAttribute(k, v);
    }
    for (const k of kids.flat()) if (k != null && k !== false) el.append(k instanceof Node ? k : document.createTextNode(String(k)));
    return el;
  }

  /** aplica opacidade/transform/blur de uma vez (o, x, y, s, sx, sy, r, rx, ry, b) */
  function set(el, st) {
    if (!el) return;
    const o = st.o ?? 1;
    el.style.opacity = o <= 0.001 ? '0' : String(o);
    el.style.visibility = o <= 0.001 ? 'hidden' : 'visible';
    const x = st.x || 0, y = st.y || 0, s = st.s ?? 1, sx = st.sx ?? s, sy = st.sy ?? s;
    el.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0)` +
      (st.rx ? ` rotateX(${st.rx.toFixed(3)}deg)` : '') + (st.ry ? ` rotateY(${st.ry.toFixed(3)}deg)` : '') +
      (st.r ? ` rotate(${st.r.toFixed(3)}deg)` : '') + (sx !== 1 || sy !== 1 ? ` scale(${sx.toFixed(4)},${sy.toFixed(4)})` : '');
    const b = st.b || 0;
    el.style.filter = b > 0.05 ? `blur(${b.toFixed(2)}px)` : 'none';
  }

  /**
   * Entrada e saída padrão (o "sistema de movimento" único):
   * entra em tIn (desfoque 10→0, sobe 28 px, escala .94→1) e sai em tOut (rápido).
   */
  function appear(el, t, tIn, tOut = Infinity, o = {}) {
    const dur = o.dur ?? 0.38, out = o.out ?? 0.16;
    const pi = P(t, tIn, dur, o.ease || 'outExpo');
    const po = tOut === Infinity ? 0 : P(t, tOut, out, 'inCubic');
    const k = pi * (1 - po);
    set(el, {
      o: k * (o.o ?? 1),
      x: (o.dx ?? 0) * (1 - pi) - (o.exitDx ?? 0) * po,
      y: (o.dy ?? 28) * (1 - pi) - (o.exitDy ?? 0) * po,
      s: lerp(o.s0 ?? 0.94, 1, pi) * lerp(1, o.s1 ?? 0.98, po) * (o.scale ?? 1),
      b: (o.blur ?? 10) * (1 - pi) + 8 * po,
      ry: (o.ry ?? 0) * (1 - pi), rx: (o.rx ?? 0) * (1 - pi), r: (o.r ?? 0) * (1 - pi),
    });
    return k;
  }

  /** "soco" de impacto: escala 1 → 1+amp → 1 em ~0,4 s a partir de t0 */
  const punch = (t, t0, amp = 0.06) => {
    if (t < t0) return 1;
    const a = P(t, t0, 0.1, 'outCubic'), b = P(t, t0 + 0.1, 0.3, 'outCubic');
    return 1 + amp * a - amp * b;
  };

  /** texto sendo digitado: devolve o trecho visível */
  const typed = (txt, t, t0, cps = 28) => txt.slice(0, Math.max(0, Math.floor((t - t0) * cps)));
  /** contador numérico */
  const count = (a, b, t, t0, dur, e = 'outCubic') => Math.round(lerp(a, b, P(t, t0, dur, e)));
  const brl = v => 'R$ ' + v.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // ---------- palco / cenas ----------
  const REEL = {
    W, H, fps: 30, duration: 10, scenes: [], layers: [], words: [], cues: {},
    clamp, lerp, ease, P, rng, h, set, appear, punch, typed, count, brl,
  };

  let root, scenesHost, svgDefs;

  function ensureRoot() {
    if (root) return;
    root = document.getElementById('stage');
    scenesHost = h('div.scenes');
    root.append(scenesHost);
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '0'); svg.setAttribute('height', '0');
    svg.style.position = 'absolute';
    svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    svg.append(svgDefs);
    root.append(svg);
  }

  /** filtro SVG de desfoque direcional (motion blur horizontal/vertical) */
  function motionFilter(id) {
    const f = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    f.setAttribute('id', id);
    f.setAttribute('x', '-20%'); f.setAttribute('y', '-5%'); f.setAttribute('width', '140%'); f.setAttribute('height', '110%');
    f.setAttribute('color-interpolation-filters', 'sRGB');
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    g.setAttribute('stdDeviation', '0 0');
    f.append(g);
    svgDefs.append(f);
    return g;
  }

  /**
   * Registra uma cena.
   * { id, start, end, enter: {type:'cut'|'whip'|'blur'|'fade'|'rise', dur, dir:1|-1}, cam: {from, to}, build(el, R), update(refs, t, lt, R) }
   * A transição de entrada acontece em torno de `start` (que deve coincidir com o início de uma frase).
   */
  REEL.scene = function (def) {
    ensureRoot();
    const el = h('div.scene', { 'data-id': def.id });
    const tr = h('div.tr');
    const cam = h('div.cam');
    tr.append(cam); el.append(tr); scenesHost.append(el);
    const id = 'mb-' + def.id;
    const blurNode = motionFilter(id);
    const sc = { ...def, el, tr, cam, blurNode, filterId: id, enter: { type: 'cut', dur: 0, dir: 1, ...(def.enter || {}) } };
    sc.refs = def.build ? def.build(cam, REEL) || {} : {};
    REEL.scenes.push(sc);
    return sc;
  };

  function transitionState(sc, t) {
    // estado do "tr" (transição) para a cena sc no tempo t
    const idx = REEL.scenes.indexOf(sc);
    const next = REEL.scenes[idx + 1];
    const inT = sc.enter, outT = next ? next.enter : { type: 'cut', dur: 0 };
    const st = { o: 1, x: 0, y: 0, s: 1, b: 0, mbx: 0, ry: 0 };
    // entrada
    if (inT.type !== 'cut' && inT.dur > 0) {
      const half = inT.dur / 2;
      if (inT.type === 'whip') {
        const p = P(t, sc.start, half * 1.15, 'outCubic');
        st.x = (1 - p) * W * 0.62 * inT.dir; st.mbx = (1 - p) * 46; st.ry = (1 - p) * -16 * inT.dir; st.o = P(t, sc.start, 0.06, 'linear');
      } else if (inT.type === 'blur') {
        const p = P(t, sc.start - half * 0.4, half * 1.4, 'outCubic');
        st.o = p; st.b = (1 - p) * 26; st.s = lerp(1.04, 1, p);
      } else if (inT.type === 'fade') {
        const p = P(t, sc.start - half * 0.4, half * 1.4, 'inOutQuad');
        st.o = p;
      } else if (inT.type === 'rise') {
        const p = P(t, sc.start, inT.dur, 'outExpo');
        st.o = p; st.y = (1 - p) * 140; st.b = (1 - p) * 14; st.s = lerp(0.96, 1, p);
      }
    }
    // saída (quem manda é a transição de entrada da próxima)
    if (next && outT.type !== 'cut' && outT.dur > 0) {
      const half = outT.dur / 2;
      if (outT.type === 'whip') {
        const p = P(t, next.start - half, half, 'inCubic');
        st.x += -p * W * 0.62 * outT.dir; st.mbx = Math.max(st.mbx, p * 46); st.ry += p * 16 * outT.dir;
        if (t >= next.start) st.o = 0;
      } else if (outT.type === 'blur' || outT.type === 'fade') {
        const p = P(t, next.start - half, half * 1.1, 'inCubic');
        st.o *= 1 - p; if (outT.type === 'blur') { st.b += p * 22; st.s *= lerp(1, 0.985, p); }
      } else if (outT.type === 'rise') {
        const p = P(t, next.start - 0.12, 0.2, 'inCubic');
        st.o *= 1 - p; st.b += p * 10;
      }
    }
    return st;
  }

  function sceneWindow(sc) {
    const idx = REEL.scenes.indexOf(sc);
    const next = REEL.scenes[idx + 1];
    const a = sc.start - (sc.enter.type === 'cut' ? 0 : sc.enter.dur);
    const b = next ? (next.start + (next.enter.type === 'cut' ? 0 : 0.02)) : sc.end;
    return [a, b];
  }

  /** camadas fixas (fundo, legendas, assinatura) */
  REEL.layer = function (def) {
    ensureRoot();
    const el = h('div.layer', { 'data-id': def.id || 'layer', style: { zIndex: def.z ?? 1 } });
    if ((def.z ?? 1) < 10) root.insertBefore(el, scenesHost); // fundo: atrás das cenas
    else root.append(el); // legendas e assinatura: na frente
    const L = { ...def, el, refs: def.build ? def.build(el, REEL) || {} : {} };
    REEL.layers.push(L);
    return L;
  };

  /** tempo de uma palavra marcada no roteiro (@nome) */
  REEL.cue = (name, fallback = 0) => (name in REEL.cues ? REEL.cues[name] : fallback);

  REEL.seek = function (t) {
    for (const sc of REEL.scenes) {
      const [a, b] = sceneWindow(sc);
      const vis = t >= a && t < b;
      sc.el.style.display = vis ? 'block' : 'none';
      if (!vis) continue;
      const st = transitionState(sc, t);
      set(sc.tr, { o: st.o, x: st.x, y: st.y, s: st.s, ry: st.ry });
      // desfoque: gaussiano comum + direcional (SVG)
      const filters = [];
      if (st.mbx > 0.4) { sc.blurNode.setAttribute('stdDeviation', `${st.mbx.toFixed(1)} 0`); filters.push(`url(#${sc.filterId})`); }
      if (st.b > 0.05) filters.push(`blur(${st.b.toFixed(2)}px)`);
      sc.tr.style.filter = filters.length ? filters.join(' ') : 'none';
      // câmera: aproximação lenta contínua
      const cam = sc.camMove || { from: 1, to: 1.035 };
      if (cam.origin && !sc._origin) { sc.cam.style.transformOrigin = cam.origin; sc._origin = true; }
      const pc = clamp((t - sc.start) / Math.max(0.1, sc.end - sc.start));
      set(sc.cam, { s: lerp(cam.from, cam.to, ease.inOutQuad(pc)), y: (cam.dy || 0) * pc, o: 1 });
      if (sc.update) sc.update(sc.refs, t, t - sc.start, REEL);
    }
    for (const L of REEL.layers) if (L.update) L.update(L.refs, t, REEL);
  };

  // ---------- fundo padrão (palco escuro com grade e partículas) ----------
  REEL.stageBackground = function (opts = {}) {
    const seed = opts.seed ?? 7;
    return REEL.layer({
      id: 'bg', z: 0,
      build(el) {
        el.classList.add('bg');
        const glow = h('div.bg-glow');
        const floor = h('div.bg-floor', h('div.bg-grid'));
        const bokeh = h('div.bg-bokeh');
        const r = rng(seed);
        const dots = [];
        for (let i = 0; i < (opts.dots ?? 11); i++) {
          const d = h('div.bokeh');
          const size = 18 + r() * 70;
          Object.assign(d.style, { width: size + 'px', height: size + 'px', left: (r() * 100) + '%', top: (8 + r() * 80) + '%', opacity: String(0.05 + r() * 0.12), filter: `blur(${(4 + r() * 10).toFixed(1)}px)` });
          dots.push({ d, ph: r() * 6.28, sp: 0.15 + r() * 0.35, amp: 10 + r() * 26 });
          bokeh.append(d);
        }
        const vig = h('div.bg-vignette');
        const grain = h('div.bg-grain');
        el.append(glow, floor, bokeh, vig, grain);
        return { floor, dots, grain };
      },
      update(refs, t) {
        refs.floor.firstChild.style.transform = `translate3d(0, ${((t * 26) % 120).toFixed(2)}px, 0)`;
        for (const k of refs.dots) k.d.style.transform = `translate3d(${(Math.sin(t * k.sp + k.ph) * k.amp).toFixed(1)}px, ${(Math.cos(t * k.sp * 0.8 + k.ph) * k.amp * 0.6).toFixed(1)}px, 0)`;
        refs.grain.style.backgroundPosition = `${Math.floor((t * 977) % 256)}px ${Math.floor((t * 1531) % 256)}px`;
      },
    });
  };

  // ---------- legendas palavra por palavra ----------
  /**
   * groups: [{ s, e, words: [{ t:'texto', s, e, k:true|false }] }]
   * Palavra entra quando é dita (desfoque + sobe); palavra-chave ganha a caixa de seleção.
   */
  REEL.captions = function (groups, opts = {}) {
    return REEL.layer({
      id: 'captions', z: 60,
      build(el) {
        el.classList.add('captions');
        el.style.top = (opts.y ?? 1250) + 'px';
        const gEls = groups.map(g => {
          const line = h('div.cap-line');
          const ws = g.words.map(w => {
            let node;
            if (w.k) {
              node = h('span.cap-key', h('span.cap-key-txt', w.t), h('i.hd.h-tl'), h('i.hd.h-tr'), h('i.hd.h-bl'), h('i.hd.h-br'));
            } else node = h('span.cap-w', w.t);
            line.append(node);
            return { node, w };
          });
          el.append(line);
          return { line, ws, g };
        });
        return { gEls };
      },
      update(refs, t) {
        for (const G of refs.gEls) {
          const { g } = G;
          // o grupo anterior some ANTES do próximo começar (nunca dois grupos na tela)
          const vis = t >= g.s - 0.05 && t < g.e;
          G.line.style.display = vis ? 'flex' : 'none';
          if (!vis) continue;
          const out = P(t, g.e - 0.13, 0.11, 'inCubic');
          G.line.style.opacity = String(1 - out);
          G.line.style.filter = out > 0.01 ? `blur(${(out * 9).toFixed(1)}px)` : 'none';
          for (const { node, w } of G.ws) {
            const p = w.s < 0.12 ? P(t, -0.25, 0.18, 'outCubic') : P(t, w.s - 0.04, 0.18, 'outCubic'); // 1º quadro já legível
            node.style.opacity = String(p);
            node.style.transform = `translate3d(0, ${((1 - p) * 16).toFixed(1)}px, 0) scale(${lerp(0.96, 1, p).toFixed(3)})`;
            node.style.filter = p < 0.99 ? `blur(${((1 - p) * 10).toFixed(1)}px)` : 'none';
            if (w.k) {
              const pk = P(t, w.s + 0.02, 0.22, 'outExpo');
              node.style.setProperty('--box', pk.toFixed(3));
            }
          }
        }
      },
    });
  };

  /** assinatura discreta (garante autoria quando o vídeo é baixado e reenviado) */
  REEL.handle = function (text, opts = {}) {
    return REEL.layer({
      id: 'handle', z: 70,
      build(el) { el.classList.add('handle'); el.append(h('span.handle-dot'), h('span', text)); el.style.top = (opts.y ?? 150) + 'px'; },
      update(refs, t) { const o = P(t, 0.2, 0.5) * (opts.o ?? 0.62); this.el.style.opacity = String(o); },
    });
  };

  REEL.ready = async function () {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    const imgs = [...document.images].map(img => (img.complete ? null : new Promise(r => { img.onload = img.onerror = r; }))).filter(Boolean);
    await Promise.all(imgs);
    REEL.seek(0);
    window.__ready = true;
  };

  window.REEL = REEL;
  window.__seek = t => { REEL.seek(t); };
})();
