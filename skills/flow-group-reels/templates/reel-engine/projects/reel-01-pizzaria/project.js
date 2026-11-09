/* Reel 01 · "Pizzaria perdendo pedido no WhatsApp" — Fórmula FLOW. Pizzaria fictícia (exemplo ilustrativo). */
(() => {
  const R = window.REEL, { h, set, appear, P, punch, lerp, clamp, count, brl, typed } = R;
  const C = window.CAPTIONS;
  R.cues = C.cues; R.fps = 30;
  R.duration = Math.round((C.end + 0.3) * R.fps) / R.fps; // termina ~0,3 s depois da última palavra (corte seco, loop)
  const q = n => R.cue(n);
  const base = (window.PROJECT_BASE || '') ;
  const img = f => base + 'img/' + f;
  const LOGO = 'engine/img/logo-flow.jpg'; // logo oficial (fonte única)

  R.stageBackground({ seed: 11 });

  // ---------- peças desta história ----------
  function storefront(y = 260) {
    const el = h('div.card', { style: { left: '70px', top: y + 'px', width: '940px', height: '600px', borderRadius: '30px', background: 'linear-gradient(180deg,#141416,#0c0c0e)' } });
    const bricks = h('div', { style: { position: 'absolute', inset: '0', opacity: '.5', backgroundImage: 'linear-gradient(rgb(255 255 255 / .035) 2px, transparent 2px), linear-gradient(90deg, rgb(255 255 255 / .03) 2px, transparent 2px)', backgroundSize: '120px 46px, 120px 92px' } });
    const awning = h('div', { style: { position: 'absolute', left: '0', right: '0', top: '0', height: '96px', background: 'repeating-linear-gradient(90deg,#e9e7e1 0 58px,#1d1d20 58px 116px)', boxShadow: '0 14px 30px rgb(0 0 0 / .7)' } });
    const scallop = h('div', { style: { position: 'absolute', left: '0', right: '0', top: '96px', height: '24px', background: 'radial-gradient(circle at 29px 0, #e9e7e1 0 28px, transparent 29px) 0 0/116px 24px, radial-gradient(circle at 29px 0, #1d1d20 0 28px, transparent 29px) 58px 0/116px 24px' } });
    const sign = h('div', { style: { position: 'absolute', left: '0', right: '0', top: '150px', textAlign: 'center', fontFamily: 'Marker', fontSize: '104px', color: '#fff', lineHeight: '1' } }, 'Forno Aceso');
    const sub = h('div', { style: { position: 'absolute', left: '0', right: '0', top: '262px', textAlign: 'center', fontFamily: 'Anton', fontSize: '30px', letterSpacing: '.5em', color: '#cfcfd2' } }, 'PIZZARIA');
    const win = h('div', { style: { position: 'absolute', left: '70px', top: '330px', width: '520px', height: '240px', borderRadius: '18px', border: '3px solid #2c2c30', overflow: 'hidden', background: 'radial-gradient(70% 90% at 50% 100%, rgb(255 255 255 / .22), rgb(255 255 255 / .03) 70%), #101012' } });
    const oven = h('div', { style: { position: 'absolute', left: '150px', bottom: '-40px', width: '220px', height: '200px', borderRadius: '110px 110px 0 0', background: '#08080a', boxShadow: 'inset 0 0 0 10px #1d1d20' } });
    const fire = h('div', { style: { position: 'absolute', left: '200px', bottom: '0', width: '120px', height: '70px', borderRadius: '60px 60px 0 0', background: 'radial-gradient(60% 80% at 50% 100%, #fff, rgb(255 255 255 / .2) 70%, transparent)', filter: 'blur(4px)' } });
    win.append(oven, fire);
    const door = h('div', { style: { position: 'absolute', right: '70px', top: '330px', width: '250px', height: '270px', borderRadius: '14px 14px 0 0', border: '3px solid #2c2c30', borderBottom: '0', background: 'linear-gradient(180deg,#141416,#0e0e10)' } },
      h('div', { style: { position: 'absolute', left: '28px', right: '28px', top: '26px', height: '120px', borderRadius: '10px', background: 'rgb(255 255 255 / .06)' } }),
      h('div', { style: { position: 'absolute', right: '26px', top: '150px', width: '10px', height: '46px', borderRadius: '5px', background: '#55565b' } }));
    const openSign = h('div', { style: { position: 'absolute', right: '102px', top: '372px', padding: '6px 14px', borderRadius: '8px', border: '2px solid #fff', font: '700 22px InterUI', letterSpacing: '.12em', color: '#fff' } }, 'ABERTO');
    const shutter = h('div', { style: { position: 'absolute', left: '0', right: '0', top: '120px', height: '480px', transformOrigin: '50% 0', transform: 'scaleY(0)', background: 'repeating-linear-gradient(180deg,#2a2a2e 0 16px,#1b1b1e 16px 22px)', boxShadow: 'inset 0 -6px 0 #3a3a3f' } });
    const closed = h('div', { style: { position: 'absolute', left: '50%', top: '330px', transform: 'translateX(-50%)', padding: '14px 30px', borderRadius: '12px', background: '#f2f0ea', color: '#111', font: '700 40px InterUI', letterSpacing: '.18em', opacity: '0' } }, 'FECHADO');
    const label = h('div.label-ilustrativo', { style: { right: '24px', bottom: '14px' } }, 'exemplo ilustrativo');
    el.append(bricks, win, door, awning, scallop, sign, sub, openSign, shutter, closed, label);
    return { el, sign, sub, win, fire, openSign, shutter, closed };
  }
  const glow = (el, k) => { el.style.textShadow = `0 0 ${6 * k}px #fff, 0 0 ${22 * k}px rgb(255 255 255 / ${0.75 * k}), 0 0 ${60 * k}px rgb(255 255 255 / ${0.45 * k})`; el.style.opacity = String(0.35 + 0.65 * k); };

  function lockScreen(screen, day = 'sexta-feira', time = '21:37') {
    const bg = h('div', { style: { position: 'absolute', inset: '0', background: 'radial-gradient(120% 70% at 50% 0%, #2a2a30, #0d0d10 70%)' } });
    const d = h('div', { style: { position: 'absolute', top: '150px', left: '0', right: '0', textAlign: 'center', font: '600 30px InterUI', color: '#d1d1d6' } }, day);
    const c = h('div', { style: { position: 'absolute', top: '186px', left: '0', right: '0', textAlign: 'center', font: '700 156px InterUI', letterSpacing: '-5px', color: '#f2f2f7' } }, time);
    screen.append(bg, d, c);
    return { clock: c };
  }

  // ===================== CENAS =====================
  // 1. GANCHO — notificações se acumulando no celular da pizzaria
  R.scene({
    id: 'hook', start: 0, end: q('olha'),
    camMove: { from: 1.0, to: 1.06 },
    build(cam) {
      const sf = storefront(150);
      const ph = UI.phone({ x: 540 - 600 * 0.86 / 2, y: 520, scale: 0.86, time: '21:37', fadeAt: 1120, fadeLen: 170 });
      lockScreen(ph.screen);
      const N = [
        ['Juliana', 'Oi, ainda tão entregando?', -0.9],
        ['Rafa', 'Quero uma calabresa G', -0.45],
        ['Marcos', 'Alô??', 0.6],
        ['Bia', 'Qual o valor da 4 queijos?', 1.25],
        ['Carlos', 'Tem promoção hoje?', 1.9],
        ['Dani', 'Boa noite! Faz entrega no Centro?', 2.62],
        ['Juliana', 'Deixa, vou pedir em outro lugar.', 3.88],
      ].map(([who, msg, at], i) => {
        const n = UI.notif('whatsapp', who, msg, i === 6 ? 'agora' : `${6 - i} min`);
        Object.assign(n.style, { position: 'absolute', left: '24px', right: '24px', top: '400px' });
        if (i === 6) n.style.boxShadow = '0 0 0 3px rgb(255 77 94 / .9), 0 20px 50px -10px rgb(255 77 94 / .45)';
        ph.screen.append(n);
        return { n, at };
      });
      const badgeIn = h('div', { style: { display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 24px 12px 14px', borderRadius: '999px', background: '#161618', boxShadow: '0 0 0 1px rgb(255 255 255 / .1), 0 20px 40px -20px #000', font: '700 30px InterUI' } }, UI.logo('whatsapp', 50), h('span.badge-n', '1'), h('span', { style: { color: '#c4c5c8', fontWeight: '500' } }, 'não lidas'));
      const badge = h('div', { style: { position: 'absolute', left: '0', right: '0', top: '448px', display: 'flex', justifyContent: 'center' } }, badgeIn);
      cam.append(sf.el, ph.el, badge);
      return { sf, ph, N, badge, num: badge.querySelector('.badge-n') };
    },
    update(r, t) {
      glow(r.sf.sign, 0.85 + 0.15 * Math.sin(t * 9) * Math.sin(t * 3.3));
      set(r.sf.el, { o: 0.62, b: 2.2 + 2 * P(t, 0, 4), s: 1.0 });
      appear(r.ph.el, t, -0.3, Infinity, { dy: 50 });
      // pilha: a mais nova no topo, as anteriores descem
      const STEP = 148;
      r.N.forEach((it, i) => {
        let y = 0;
        for (let j = i + 1; j < r.N.length; j++) y += STEP * P(t, r.N[j].at, 0.32, 'outExpo');
        const k = P(t, it.at, 0.32, 'outExpo');
        const fade = clamp(1 - (y - STEP * 4) / STEP);
        set(it.n, { o: k * fade, y: y + (1 - k) * -60, s: lerp(0.92, 1, k), b: (1 - k) * 10 });
      });
      const n = 5 + Math.round(9 * P(t, 0, q('percebe'), 'linear'));
      r.num.textContent = String(Math.max(1, n));
      r.num.style.color = n >= 10 ? '#ff4d5e' : '#fff';
      set(r.badge, { o: P(t, -0.3, 0.3), s: punch(t, q('whats'), 0.12) * punch(t, q('percebe'), 0.08) });
    },
  });

  // 2. "Olha só… São 21h37" — relógio que vira
  R.scene({
    id: 'clock', start: q('olha'), end: q('forno') - 0.12, enter: { type: 'blur', dur: 0.36 },
    build(cam) {
      const card = h('div.card', { style: { left: '140px', top: '470px', width: '800px', height: '380px', display: 'grid', placeItems: 'center' } });
      const digits = h('div.big-num', { style: { fontSize: '232px', lineHeight: '1', letterSpacing: '.02em', color: '#f4f4f2', textShadow: '0 0 40px rgb(255 255 255 / .25)' } }, '21:36');
      const split = h('div', { style: { position: 'absolute', left: '0', right: '0', top: '50%', height: '4px', background: '#050506' } });
      const tag = h('div', { style: { position: 'absolute', left: '0', right: '0', top: '318px', textAlign: 'center', font: '600 28px InterUI', letterSpacing: '.3em', color: '#9b9ca1' } }, 'SEXTA · PICO DE PEDIDOS');
      card.append(digits, split, tag);
      const head = h('div', { style: { position: 'absolute', left: '0', right: '0', top: '380px', textAlign: 'center', font: '600 34px InterUI', color: '#c4c5c8' } }, h('span', { html: UI.I.clock.replace('<svg', '<svg width="34" height="34" style="vertical-align:-6px;margin-right:12px"') }), 'Forno Aceso · cozinha');
      cam.append(head, card);
      return { card, digits, head };
    },
    update(r, t) {
      appear(r.head, t, q('olha'), Infinity, { dy: 20 });
      appear(r.card, t, q('olha') + 0.05, Infinity, { s0: 0.9 });
      const flip = P(t, q('hora') - 0.05, 0.22, 'inOutCubic');
      r.digits.textContent = flip > 0.5 ? '21:37' : '21:36';
      set(r.digits, { sy: Math.abs(1 - 2 * flip) * 0.98 + 0.02, s: 1, o: 1, b: flip > 0.05 && flip < 0.95 ? 3 : 0 });
      r.card.style.transform += ` scale(${punch(t, q('hora') + 0.18, 0.05)})`;
    },
  });

  // 3. Forno lotado, motoboy esperando, 14 mensagens sem resposta
  R.scene({
    id: 'chaos', start: q('forno') - 0.12, end: q('cada'),
    build(cam) {
      const mk = (y, ic, title, sub) => {
        const c = h('div.card', { style: { left: '80px', top: y + 'px', width: '920px', height: '190px', display: 'flex', alignItems: 'center', gap: '30px', padding: '0 40px' } });
        const ico = UI.icon(ic, { size: 104, r: 30, bg: '#232326' });
        const tx = h('div.col', { style: { gap: '8px' } }, h('div', { style: { font: '700 44px InterUI' } }, title), h('div', { style: { font: '500 30px InterUI', color: '#9b9ca1' } }, sub));
        c.append(ico, tx); return { c, tx };
      };
      const a = mk(330, 'flame', 'Forno', '8 pizzas na fila');
      const barWrap = h('div', { style: { marginLeft: 'auto', width: '230px', height: '20px', borderRadius: '10px', background: '#2c2c30', overflow: 'hidden' } }); const bar = h('div', { style: { height: '100%', width: '0%', background: '#f4f4f2', borderRadius: '10px' } }); barWrap.append(bar); a.c.append(barWrap);
      const b = mk(550, 'moto', 'Motoboy', 'esperando o pedido');
      const timer = h('div.mono', { style: { marginLeft: 'auto', font: '700 52px InterUI', color: '#f4f4f2' } }, '11:58'); b.c.append(timer);
      const c = h('div.card', { style: { left: '80px', top: '770px', width: '920px', height: '330px', padding: '36px 40px' } });
      const row = h('div.row', { style: { gap: '26px' } }, UI.logo('whatsapp', 92), h('div', { style: { font: '700 44px InterUI' } }, 'Mensagens'));
      const big = h('div.big-num', { style: { position: 'absolute', right: '44px', top: '18px', fontSize: '220px', lineHeight: '1', color: '#fff' } }, '0');
      const tag = h('div', { style: { position: 'absolute', left: '40px', bottom: '40px' } }, UI.pill('sem resposta', 'bad'));
      c.append(row, big, tag);
      cam.append(a.c, b.c, c);
      return { a, b, c, bar, timer, big, tag };
    },
    update(r, t) {
      appear(r.a.c, t, q('forno') - 0.24, Infinity, { dx: -40, dy: 0 }); // já entrando no corte
      r.bar.style.width = (100 * P(t, q('forno') + 0.2, 0.7, 'outCubic')).toFixed(1) + '%';
      appear(r.b.c, t, q('moto') - 0.05, Infinity, { dx: -40, dy: 0 });
      const secs = 718 + Math.floor(Math.max(0, t - q('moto')) * 1);
      r.timer.textContent = `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;
      appear(r.c, t, q('n14') - 0.2, Infinity, { dx: -40, dy: 0 });
      r.big.textContent = String(count(0, 14, t, q('n14') - 0.05, 0.45));
      r.big.style.transform = `scale(${punch(t, q('n14') + 0.4, 0.08)})`;
      r.big.style.color = t > q('semresp') ? '#ff4d5e' : '#fff';
      r.big.style.textShadow = t > q('semresp') ? '0 0 60px rgb(255 77 94 / .5)' : 'none';
      appear(r.tag, t, q('semresp') - 0.04, Infinity, { s0: 1.3, dy: 0, blur: 4, dur: 0.25 });
      r.c.style.boxShadow = t > q('semresp') ? `0 0 0 ${2 + 2 * P(t, q('semresp'), 0.3)}px rgb(255 77 94 / .7), 0 40px 80px -30px rgb(0 0 0 / .85)` : '';
    },
  });

  // 4. Cliente desiste e pede na pizzaria do lado
  R.scene({
    id: 'lost', start: q('cada'), end: q('agora'), enter: { type: 'whip', dur: 0.4, dir: 1 },
    build(cam) {
      const ph = UI.phone({ x: 540 - 600 * 0.9 / 2, y: 330, scale: 0.9, time: '21:44', fadeAt: 1110, fadeLen: 160 });
      const chat = UI.waChat(ph.screen, { name: 'Juliana', sub: 'cliente', avatar: 'J' });
      const b1 = UI.bubble('Oi, ainda tão entregando?', 'in', '21:31');
      const b2 = UI.bubble('Oi??', 'in', '21:38');
      const wait = h('div', { style: { alignSelf: 'center', margin: '10px 0', padding: '10px 22px', borderRadius: '14px', background: '#182229', font: '500 24px InterUI', color: '#8696a0' } }, 'sem resposta há 13 min');
      const b3 = UI.bubble('Deixa, vou pedir em outro lugar.', 'in', '21:44');
      chat.body.append(b1, b2, wait, b3);
      const nt = UI.notif('whatsapp', 'Pizzaria do lado', 'Pedido #482 confirmado ✓ chega em 35 min', 'agora');
      nt.firstChild.replaceWith(UI.icon('bag', { size: 62, r: 16, bg: '#3a3a3f' }));
      Object.assign(nt.style, { position: 'absolute', left: '60px', width: '960px', top: '236px' });
      const lost = h('div', { style: { position: 'absolute', left: '0', right: '0', top: '1120px', display: 'flex', justifyContent: 'center' } }, UI.pill('pedido perdido', 'bad'));
      cam.append(ph.el, nt, lost);
      return { ph, b1, b2, wait, b3, nt, lost, chat };
    },
    update(r, t) {
      const s = q('cada');
      set(r.b1, { o: 1 }); appear(r.b2, t, s + 0.2, Infinity, { dy: 16 });
      appear(r.wait, t, s + 0.55, Infinity, { dy: 10 });
      r.wait.textContent = `sem resposta há ${count(9, 13, t, s + 0.55, 1.1, 'linear')} min`;
      appear(r.b3, t, q('desiste') - 0.05, Infinity, { dy: 16, dx: -20 });
      appear(r.nt, t, q('lado') - 0.1, Infinity, { dy: -80, s0: 0.96, blur: 6 });
      appear(r.lost, t, q('lado') + 0.25, Infinity, { dy: 0, s0: 1.35, dur: 0.25 });
    },
  });

  // 5. Virada: a mesma sexta, com um robô atendendo
  R.scene({
    id: 'turn', start: q('agora'), end: q('msg'), enter: { type: 'whip', dur: 0.4, dir: -1 },
    build(cam) {
      const clock = h('div', { style: { position: 'absolute', left: '0', right: '0', top: '300px', textAlign: 'center' } },
        h('div', { style: { font: '600 30px InterUI', letterSpacing: '.3em', color: '#9b9ca1' } }, 'SEXTA'),
        h('div.big-num', { style: { fontSize: '170px', lineHeight: '1.05', color: '#f4f4f2' } }, '21:37'));
      const p = UI.panel({ x: 80, y: 620, w: 920, icon: 'robot', title: 'Atendimento automático', tag: 'Forno Aceso' });
      const tg = UI.toggle();
      const st = h('div.row', { style: { gap: '26px', justifyContent: 'space-between' } }, h('div.col', { style: { gap: '8px' } }, h('div', { style: { font: '700 40px InterUI' } }, 'Robô no WhatsApp'), h('div.st-sub', { style: { font: '500 28px InterUI', color: '#9b9ca1' } }, 'desligado')), tg.el);
      const conn = h('div.row', { style: { gap: '18px', marginTop: '30px', padding: '22px 26px', borderRadius: '22px', background: '#1c1c1f', border: '1px solid rgb(255 255 255 / .06)' } }, UI.logo('whatsapp', 56), h('div', { style: { font: '600 30px InterUI' } }, 'Conectado ao WhatsApp da pizzaria'), h('div', { style: { marginLeft: 'auto', width: '46px', height: '46px', borderRadius: '50%', background: 'var(--ok)', color: '#04210f', display: 'grid', placeItems: 'center' }, html: UI.I.check.replace('<svg', '<svg width="28" height="28"') }));
      p.body.append(st, conn);
      cam.append(clock, p.el);
      return { clock, p, tg, sub: st.querySelector('.st-sub'), conn };
    },
    update(r, t) {
      const s = q('agora');
      appear(r.clock, t, s + 0.05, Infinity, { dy: -30 });
      appear(r.p.el, t, q('mesma') - 0.1, Infinity, { dy: 60 });
      const on = P(t, q('robo') - 0.05, 0.28, 'outBack');
      r.tg.knob.style.transform = `translateX(${(52 * on).toFixed(1)}px)`;
      r.tg.el.style.background = on > 0.5 ? '#f4f4f2' : '#2c2c30';
      r.tg.knob.style.background = on > 0.5 ? '#0b0b0d' : '#fff';
      r.sub.textContent = on > 0.5 ? 'ligado · responde em segundos' : 'desligado';
      r.sub.style.color = on > 0.5 ? '#c8f5d9' : '#9b9ca1';
      r.p.el.style.boxShadow = on > 0.5 ? `0 0 0 2px rgb(255 255 255 / ${0.35 * (1 - P(t, q('robo') + 0.2, 0.8))}), 0 40px 80px -30px rgb(0 0 0 / .85)` : '';
      appear(r.conn, t, q('wa2') - 0.1, Infinity, { dy: 24 });
    },
  });

  // 6. A mensagem chega e o robô responde na hora, com o cardápio
  R.scene({
    id: 'reply', start: q('msg'), end: q('escolhe'),
    build(cam) {
      const ph = UI.phone({ x: 540 - 600 * 0.9 / 2, y: 250, scale: 0.9, time: '21:37', fadeAt: 1090, fadeLen: 160 });
      const chat = UI.waChat(ph.screen, { name: 'Forno Aceso', sub: 'conta comercial', avatar: 'FA' });
      const b1 = UI.bubble('Boa noite! Quero pedir uma pizza', 'out', '21:37 ✓✓');
      const typing = h('div.bub.in', { style: { width: '120px', display: 'flex', gap: '10px', justifyContent: 'center' } }, h('i.dt'), h('i.dt'), h('i.dt'));
      typing.querySelectorAll('.dt').forEach(d => Object.assign(d.style, { width: '14px', height: '14px', borderRadius: '50%', background: '#8696a0', display: 'block' }));
      const b2 = UI.bubble('Boa noite! 🍕 Aqui é o atendimento da <b>Forno Aceso</b>. Faz o seu pedido por aqui:', 'in', '21:37');
      const link = h('div.bub.in', { style: { padding: '10px', width: '76%' } },
        h('div', { style: { height: '200px', borderRadius: '14px', backgroundImage: `url(${img('pizza.webp')})`, backgroundSize: 'cover', backgroundPosition: 'center 40%' } }),
        h('div', { style: { padding: '14px 12px 4px' } }, h('div', { style: { font: '700 28px InterUI' } }, 'Cardápio · Forno Aceso'), h('div', { style: { font: '400 23px InterUI', color: '#8696a0' } }, 'toque para montar seu pedido')));
      chat.body.append(b1, typing, b2, link);
      const chip = h('div', { style: { position: 'absolute', left: '0', right: '0', top: '1130px', display: 'flex', justifyContent: 'center' } }, UI.pill('respondido em 2 segundos', 'ok'));
      cam.append(ph.el, chip);
      return { ph, b1, typing, b2, link, chip };
    },
    update(r, t) {
      appear(r.b1, t, q('msg') + 0.12, Infinity, { dy: 20, dx: 20 });
      const ty = t >= q('msg') + 0.5 && t < q('responde') - 0.05;
      r.typing.style.display = ty ? 'flex' : 'none';
      [...r.typing.children].forEach((d, i) => { d.style.opacity = String(0.35 + 0.65 * Math.max(0, Math.sin(t * 9 - i * 0.9))); });
      r.b2.style.display = t >= q('responde') - 0.1 ? 'block' : 'none';
      appear(r.b2, t, q('responde') - 0.08, Infinity, { dy: 20, dx: -20 });
      r.link.style.display = t >= q('cardapio') - 0.15 ? 'block' : 'none';
      appear(r.link, t, q('cardapio') - 0.12, Infinity, { dy: 24, dx: -20, s0: 0.9 });
      appear(r.chip, t, q('responde') + 0.3, Infinity, { dy: 0, s0: 1.2, dur: 0.3 });
    },
  });

  // 7. Escolhe pizza, borda, bebida e paga no Pix
  R.scene({
    id: 'menu', start: q('escolhe'), end: q('pedido'),
    build(cam) {
      const ph = UI.phone({ x: 540 - 600 * 0.86 / 2, y: 240, scale: 0.86, time: '21:38', fadeAt: 1190, fadeLen: 90 });
      const scr = ph.screen;
      const hero = h('div', { style: { position: 'absolute', left: '0', right: '0', top: '0', height: '360px', backgroundImage: `linear-gradient(180deg, rgb(0 0 0 / .1), #0d0d0f), url(${img('pizza.webp')})`, backgroundSize: 'cover', backgroundPosition: 'center 45%' } });
      const title = h('div', { style: { position: 'absolute', left: '36px', top: '250px', font: '800 46px Montserrat', color: '#fff' } }, 'Forno Aceso');
      const sub = h('div', { style: { position: 'absolute', left: '36px', top: '308px', font: '500 24px InterUI', color: '#c4c5c8' } }, 'Cardápio · entrega em ~35 min');
      const list = h('div', { style: { position: 'absolute', left: '22px', right: '22px', top: '390px', display: 'flex', flexDirection: 'column', gap: '16px' } });
      const item = (name, desc, price) => {
        const add = h('div', { style: { width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #55565b', display: 'grid', placeItems: 'center', font: '600 40px InterUI', color: '#fff', flex: 'none' } }, '+');
        const el = h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px', padding: '22px 22px', borderRadius: '22px', background: '#161618', border: '1px solid rgb(255 255 255 / .06)' } },
          h('div.col', { style: { flex: '1', gap: '6px' } }, h('div', { style: { font: '700 34px InterUI', color: '#fff' } }, name), h('div', { style: { font: '400 25px InterUI', color: '#9b9ca1' } }, desc), h('div', { style: { font: '600 30px InterUI', color: '#e5e5ea' } }, price)), add);
        list.append(el); return { el, add };
      };
      const it = [item('Calabresa · G', '8 fatias, cebola, azeitona', 'R$ 54,90'), item('Borda de catupiry', 'para a sua pizza', '+ R$ 9,90'), item('Guaraná 2 L', 'gelado', 'R$ 12,90')];
      const cart = h('div', { style: { position: 'absolute', left: '22px', right: '22px', bottom: '150px', height: '110px', borderRadius: '28px', background: '#f4f4f2', color: '#0b0b0d', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 34px', font: '700 31px InterUI' } }, h('span.cart-l', '1 item'), h('span.row', { style: { gap: '14px' } }, UI.logo('pix', 46), h('span.cart-r', 'Pagar R$ 54,90')));
      const ok = h('div', { style: { position: 'absolute', inset: '0', background: 'rgb(8 8 10 / .92)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', opacity: '0' } },
        h('div', { style: { width: '170px', height: '170px', borderRadius: '50%', background: 'var(--ok)', color: '#04210f', display: 'grid', placeItems: 'center' }, html: UI.I.check.replace('<svg', '<svg width="100" height="100"') }),
        h('div', { style: { font: '700 44px InterUI', color: '#fff' } }, 'Pagamento aprovado'),
        h('div.row', { style: { gap: '14px', font: '600 34px InterUI', color: '#c4c5c8' } }, UI.logo('pix', 48), 'Pix · R$ 77,70'));
      scr.append(h('div', { style: { position: 'absolute', inset: '0', background: '#0d0d0f' } }), hero, title, sub, list, cart, ok);
      cam.append(ph.el);
      return { ph, it, cart, ok, cl: cart.querySelector('.cart-l'), cr: cart.querySelector('.cart-r') };
    },
    update(r, t) {
      const picks = [q('pizza'), q('borda'), q('bebida')];
      const totals = [54.9, 64.8, 77.7];
      let n = 0;
      r.it.forEach((x, i) => {
        const on = t >= picks[i] - 0.05;
        if (on) n = i + 1;
        x.add.textContent = on ? '✓' : '+';
        x.add.style.background = on ? '#f4f4f2' : 'transparent';
        x.add.style.color = on ? '#0b0b0d' : '#fff';
        x.add.style.borderColor = on ? '#f4f4f2' : '#55565b';
        x.add.style.transform = `scale(${punch(t, picks[i] - 0.05, 0.22)})`;
        x.el.style.borderColor = on ? 'rgb(255 255 255 / .35)' : 'rgb(255 255 255 / .06)';
        appear(x.el, t, q('escolhe') + i * 0.07, Infinity, { dy: 30 });
      });
      r.cl.textContent = n <= 1 ? '1 item' : `${n} itens`;
      r.cr.textContent = 'Pagar ' + brl(totals[Math.max(0, n - 1)]);
      r.cart.style.transform = `scale(${punch(t, q('paga') - 0.05, 0.06)})`;
      const k = P(t, q('pix') - 0.18, 0.25, 'outCubic');
      r.ok.style.opacity = String(k);
      r.ok.firstChild.style.transform = `scale(${lerp(0.4, 1, P(t, q('pix') - 0.1, 0.35, 'outBack'))})`;
    },
  });

  // 8. O pedido cai na tela da cozinha, com endereço
  R.scene({
    id: 'kitchen', start: q('pedido'), end: q('acompanha'), enter: { type: 'whip', dur: 0.4, dir: 1 },
    camMove: { from: 1.0, to: 1.08, origin: '32% 40%' },
    build(cam) {
      const p = UI.panel({ x: 60, y: 300, w: 960, icon: 'flame', title: 'Cozinha · pedidos ao vivo', tag: 'Forno Aceso', pad: 26 });
      const cols = h('div', { style: { display: 'grid', gridTemplateColumns: '1.35fr 1fr 1fr', gap: '18px' } });
      const col = (name) => { const c = h('div.col', { style: { gap: '14px' } }, h('div', { style: { font: '600 24px InterUI', letterSpacing: '.14em', color: '#9b9ca1', textTransform: 'uppercase' } }, name)); cols.append(c); return c; };
      const cN = col('Novos'), cF = col('No forno'), cS = col('Saiu');
      const mini = (num, txt) => h('div', { style: { padding: '18px', borderRadius: '18px', background: '#1c1c1f', border: '1px solid rgb(255 255 255 / .06)' } }, h('div', { style: { font: '700 26px InterUI' } }, num), h('div', { style: { font: '400 21px InterUI', color: '#9b9ca1', marginTop: '6px' } }, txt));
      cF.append(mini('#146', 'Portuguesa G'), mini('#147', 'Frango c/ catupiry'));
      cS.append(mini('#144', 'Margherita M'), mini('#145', '4 queijos G'));
      const card = h('div', { style: { padding: '22px', borderRadius: '20px', background: '#f2f0ea', color: '#111', boxShadow: '0 20px 40px -18px #000' } },
        h('div.row', { style: { justifyContent: 'space-between' } }, h('div', { style: { font: '800 34px InterUI' } }, '#148'), h('div', { style: { font: '700 20px InterUI', padding: '6px 12px', borderRadius: '10px', background: '#111', color: '#fff' } }, 'NOVO')),
        h('div', { style: { font: '600 25px InterUI', marginTop: '10px', lineHeight: '1.3' } }, 'Calabresa G', h('br'), '+ borda catupiry', h('br'), 'Guaraná 2 L'),
        h('div.row.paid', { style: { gap: '10px', marginTop: '12px', font: '600 22px InterUI', color: '#1a7f45' } }, '✓ pago no Pix'),
        h('div.addr', { style: { marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed rgb(0 0 0 / .2)', font: '500 22px InterUI', color: '#333', minHeight: '58px' } }));
      cN.append(card);
      p.body.append(cols);
      p.el.style.height = '760px';
      cam.append(p.el);
      return { p, card, addr: card.querySelector('.addr') };
    },
    update(r, t) {
      appear(r.p.el, t, q('pedido') - 0.15, Infinity, { dy: 40 });
      const k = P(t, q('cai') - 0.1, 0.42, 'outBack');
      set(r.card, { o: clamp(k * 3), y: (1 - k) * -260, s: lerp(1.15, 1, P(t, q('cai') - 0.1, 0.4)), r: (1 - k) * -6 });
      const full = '📍 Rua das Acácias, 210 · Centro';
      r.addr.textContent = typed(full, t, q('endereco') - 0.1, 30);
    },
  });

  // 9. Cliente acompanha cada etapa
  R.scene({
    id: 'status', start: q('acompanha'), end: q('m14'),
    build(cam) {
      const ph = UI.phone({ x: 540 - 600 * 0.82 / 2, y: 450, scale: 0.82, time: '21:52', fadeAt: 1110, fadeLen: 160 });
      const chat = UI.waChat(ph.screen, { name: 'Forno Aceso', sub: 'conta comercial', avatar: 'FA' });
      const msgs = [['🔥 Seu pedido <b>#148</b> tá no forno!', '21:52'], ['🛵 Saiu pra entrega. Chega em ~20 min', '22:06'], ['✅ Chegou! Bom apetite 🍕', '22:24']].map(([m, tm]) => { const b = UI.bubble(m, 'in', tm); chat.body.append(b); return b; });
      const steps = h('div', { style: { position: 'absolute', left: '80px', right: '80px', top: '262px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } });
      const line = h('div', { style: { position: 'absolute', left: '60px', right: '60px', top: '38px', height: '6px', borderRadius: '3px', background: '#2c2c30' } }); const fill = h('div', { style: { height: '100%', width: '0%', background: '#f4f4f2', borderRadius: '3px' } }); line.append(fill); steps.append(line);
      const st = ['No forno', 'Saiu', 'Chegou'].map((s, i) => { const d = h('div.col', { style: { alignItems: 'center', gap: '14px', position: 'relative', zIndex: '1', width: '200px' } }, h('div.circ', { style: { width: '82px', height: '82px', borderRadius: '50%', background: '#1c1c1f', border: '3px solid #3a3a3f', display: 'grid', placeItems: 'center', color: '#76777c' }, html: UI.I[['flame', 'moto', 'check'][i]].replace('<svg', '<svg width="40" height="40"') }), h('div', { style: { font: '700 28px InterUI', color: '#c4c5c8' } }, s)); steps.append(d); return d; });
      cam.append(steps, ph.el);
      return { msgs, st, fill, steps };
    },
    update(r, t) {
      appear(r.steps, t, q('acompanha') + 0.05, Infinity, { dy: -30 });
      const at = [q('noforno'), q('saiu'), q('chegou')];
      r.msgs.forEach((b, i) => { b.style.display = t >= at[i] - 0.1 ? 'block' : 'none'; appear(b, t, at[i] - 0.08, Infinity, { dy: 24, dx: -20 }); });
      r.st.forEach((d, i) => {
        const on = t >= at[i] - 0.05; const c = d.querySelector('.circ');
        c.style.background = on ? '#f4f4f2' : '#1c1c1f'; c.style.color = on ? '#0b0b0d' : '#76777c'; c.style.borderColor = on ? '#f4f4f2' : '#3a3a3f';
        c.style.transform = `scale(${punch(t, at[i] - 0.05, 0.2)})`;
        if (i === 2 && on) { c.style.background = 'var(--ok)'; c.style.borderColor = 'var(--ok)'; c.style.color = '#04210f'; }
      });
      let f = 0;
      if (t >= at[2]) f = 50 + 50 * P(t, at[2] - 0.1, 0.3);
      else if (t >= at[1]) f = 50 * P(t, at[1] - 0.1, 0.3);
      r.fill.style.width = f.toFixed(1) + '%';
    },
  });

  // 10. 14 mensagens, zero sem resposta, ninguém encostou no celular
  R.scene({
    id: 'zero', start: q('m14'), end: q('melhor'), enter: { type: 'blur', dur: 0.36 },
    camMove: { from: 1.0, to: 1.07 },
    build(cam) {
      const wrap = h('div', { style: { position: 'absolute', left: '0', right: '0', top: '300px', textAlign: 'center' } });
      const n14 = h('div.row', { style: { justifyContent: 'center', gap: '30px', alignItems: 'baseline' } }, h('span.big-num.n', { style: { fontSize: '300px', lineHeight: '1' } }, '14'), h('span', { style: { font: '700 64px Montserrat', color: '#c4c5c8' } }, 'mensagens'));
      const z = h('div.row', { style: { justifyContent: 'center', gap: '30px', alignItems: 'baseline', marginTop: '10px' } }, h('span.big-num.z', { style: { fontSize: '300px', lineHeight: '1', color: 'var(--ok)', textShadow: '0 0 60px rgb(60 207 122 / .35)' } }, '0'), h('span', { style: { font: '700 64px Montserrat', color: '#c8f5d9' } }, 'sem resposta'));
      wrap.append(n14, z);
      const card = h('div.card', { style: { left: '170px', top: '1010px', width: '740px', height: '150px', display: 'flex', alignItems: 'center', gap: '26px', padding: '0 34px' } }, UI.icon('phone', { size: 86, r: 24, bg: '#232326' }), h('div.col', { style: { gap: '6px' } }, h('div', { style: { font: '700 34px InterUI' } }, 'Celular do dono'), h('div', { style: { font: '500 27px InterUI', color: '#9b9ca1' } }, 'nenhum toque · o robô respondeu tudo')));
      cam.append(wrap, card);
      return { n14, z, card };
    },
    update(r, t) {
      appear(r.n14, t, q('m14') - 0.05, Infinity, { s0: 0.85, dy: 0 });
      r.n14.style.transform += ` scale(${punch(t, q('m14') + 0.25, 0.05)})`;
      appear(r.z, t, q('zero') - 0.08, Infinity, { s0: 1.5, dy: 0, blur: 14, dur: 0.3 });
      r.z.style.transform += ` scale(${punch(t, q('zero') + 0.22, 0.07)})`;
      appear(r.card, t, q('ninguem') + 0.05, Infinity, { dy: 50 });
    },
  });

  // 11a. Quando a pizzaria fecha
  R.scene({
    id: 'closing', start: q('melhor'), end: q('painel') - 0.12, enter: { type: 'whip', dur: 0.4, dir: 1 },
    build(cam) {
      const sf = storefront(380);
      const q1 = h('div', { style: { position: 'absolute', left: '0', right: '0', top: '270px', textAlign: 'center', font: '700 40px Montserrat', color: '#c4c5c8' } }, '23:30 · fim do expediente');
      cam.append(q1, sf.el);
      return { sf, q1 };
    },
    update(r, t) {
      appear(r.q1, t, q('melhor') + 0.1, Infinity, { dy: -20 });
      const off = P(t, q('fecha') - 0.25, 0.5, 'inOutCubic');
      glow(r.sf.sign, (1 - off) * (0.9 + 0.1 * Math.sin(t * 11)));
      r.sf.fire.style.opacity = String(1 - off);
      r.sf.openSign.style.opacity = String(1 - off);
      const sh = P(t, q('fecha') - 0.3, 0.55, 'outCubic');
      r.sf.shutter.style.transform = `scaleY(${sh.toFixed(3)})`;
      const c = P(t, q('fecha') + 0.25, 0.3, 'outBack');
      r.sf.closed.style.opacity = String(clamp(c * 2));
      r.sf.closed.style.transform = `translateX(-50%) scale(${lerp(1.4, 1, c)})`;
    },
  });

  // 11b. O painel: pedidos, quanto vendeu, sabor campeão
  R.scene({
    id: 'dash', start: q('painel') - 0.12, end: q('roboN'),
    build(cam) {
      const p = UI.panel({ x: 70, y: 280, w: 940, icon: 'chart', title: 'Painel · sexta', tag: '18h – 23h30', pad: 30 });
      const grid = h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' } });
      const s1 = h('div.stat', h('div.k', 'Pedidos'), h('div.v.mono', '0'));
      const s2 = h('div.stat', h('div.k', 'Vendido'), h('div.v.mono', { style: { fontSize: '54px' } }, 'R$ 0'));
      grid.append(s1, s2);
      const champ = h('div.stat', { style: { marginTop: '20px', display: 'flex', alignItems: 'center', gap: '24px' } },
        h('div', { style: { width: '120px', height: '120px', borderRadius: '24px', backgroundImage: `url(${img('pizza.webp')})`, backgroundSize: 'cover', backgroundPosition: 'center', flex: 'none' } }),
        h('div.col', { style: { gap: '6px' } }, h('div.k', 'Sabor campeão'), h('div', { style: { font: '800 52px InterUI' } }, 'Calabresa')), h('div', { style: { marginLeft: 'auto' } }, UI.pill('18 pedidos', 'white')));
      const chart = h('div', { style: { marginTop: '20px', padding: '26px 28px 18px', borderRadius: '24px', background: '#161618', border: '1px solid rgb(255 255 255 / .06)' } });
      const bars = h('div', { style: { display: 'flex', alignItems: 'flex-end', gap: '18px', height: '170px' } });
      const vals = [4, 7, 12, 11, 8, 5];
      const bs = vals.map(v => { const b = h('div', { style: { flex: '1', height: (v / 12 * 100) + '%', borderRadius: '10px 10px 4px 4px', background: 'linear-gradient(180deg,#f4f4f2,#76777c)', transformOrigin: '50% 100%', transform: 'scaleY(0)' } }); bars.append(b); return b; });
      const labels = h('div', { style: { display: 'flex', gap: '18px', marginTop: '12px' } }, ...['18h', '19h', '20h', '21h', '22h', '23h'].map(x => h('div', { style: { flex: '1', textAlign: 'center', font: '500 21px InterUI', color: '#76777c' } }, x)));
      chart.append(bars, labels);
      const zero = h('div', { style: { marginTop: '20px' } }, UI.pill('0 mensagens sem resposta', 'ok'));
      p.body.append(grid, champ, chart, zero);
      const lab = h('div.label-ilustrativo', { style: { left: '80px', top: '1215px' } }, 'dados ilustrativos');
      cam.append(p.el, lab);
      return { p, s1, s2, champ, bs, zero, lab };
    },
    update(r, t) {
      appear(r.p.el, t, q('painel') - 0.22, Infinity, { dy: 50 });
      r.bs.forEach((b, i) => { b.style.transform = `scaleY(${P(t, q('painel') + 0.1 + i * 0.06, 0.45, 'outCubic').toFixed(3)})`; });
      r.s1.lastChild.textContent = String(count(0, 47, t, q('pedidos') - 0.05, 0.7));
      r.s1.style.transform = `scale(${punch(t, q('pedidos') + 0.55, 0.05)})`;
      r.s2.lastChild.textContent = t < q('vendeu') - 0.05 ? 'R$ —' : brl(Math.round(lerp(0, 3284.5, P(t, q('vendeu') - 0.05, 0.6)) * 100) / 100);
      r.s2.style.transform = `scale(${punch(t, q('vendeu') + 0.5, 0.05)})`;
      appear(r.champ, t, q('campeao') - 0.1, Infinity, { dy: 26, s0: 0.96 });
      appear(r.zero, t, q('campeao') + 0.35, Infinity, { dy: 10 });
      appear(r.lab, t, q('painel'), Infinity, { dy: 0, o: 1 });
    },
  });

  // 12. Tudo conectado + marca
  R.scene({
    id: 'brand', start: q('roboN'), end: q('quer'), enter: { type: 'blur', dur: 0.36 },
    build(cam) {
      const pos = [[540, 390], [235, 900], [845, 900]];
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg'); svg.setAttribute('width', '1080'); svg.setAttribute('height', '1300'); svg.style.position = 'absolute'; svg.style.left = '0'; svg.style.top = '0';
      const lines = [[0, 1], [1, 2], [2, 0]].map(([a, b]) => { const l = document.createElementNS(svgNS, 'line'); l.setAttribute('x1', pos[a][0]); l.setAttribute('y1', pos[a][1]); l.setAttribute('x2', pos[b][0]); l.setAttribute('y2', pos[b][1]); l.setAttribute('stroke', 'rgba(255,255,255,.55)'); l.setAttribute('stroke-width', '4'); l.setAttribute('stroke-dasharray', '10 12'); svg.append(l); const d = document.createElementNS(svgNS, 'circle'); d.setAttribute('r', '9'); d.setAttribute('fill', '#fff'); svg.append(d); return { l, d, a: pos[a], b: pos[b] }; });
      const node = (i, ic, label) => { const n = h('div', { style: { position: 'absolute', left: (pos[i][0] - 170) + 'px', top: (pos[i][1] - 125) + 'px', width: '340px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' } }, UI.icon(ic, { size: 190, r: 54, bg: 'linear-gradient(180deg,#2a2a2e,#161618)' }), h('div', { style: { font: '800 42px Montserrat', textAlign: 'center', lineHeight: '1.1' } }, label)); n.firstChild.style.boxShadow = '0 0 0 2px rgb(255 255 255 / .14), 0 30px 60px -20px #000'; return n; };
      const nodes = [node(0, 'robot', 'Robô no WhatsApp'), node(1, 'menu', 'Cardápio digital'), node(2, 'chart', 'Painel de pedidos')];
      const graph = h('div', { style: { position: 'absolute', inset: '0' } }); graph.append(svg, ...nodes);
      const logoBox = h('div', { style: { position: 'absolute', left: '540px', top: '470px', width: '460px', height: '460px', marginLeft: '-230px', borderRadius: '48px', overflow: 'hidden', boxShadow: '0 0 0 2px rgb(255 255 255 / .18), 0 50px 100px -30px #000', backgroundImage: `url(${LOGO})`, backgroundSize: 'cover' } });
      const word = h('div', { style: { position: 'absolute', left: '0', right: '0', top: '975px', textAlign: 'center' } }, h('div.big-num', { style: { fontSize: '110px', lineHeight: '1', letterSpacing: '.04em' } }, 'FLOW GROUP'), h('div', { style: { font: '600 38px Montserrat', color: '#c4c5c8', marginTop: '16px' } }, 'tecnologia que profissionaliza o seu negócio'));
      cam.append(graph, logoBox, word);
      return { nodes, lines, graph, logoBox, word };
    },
    update(r, t) {
      const at = [q('roboN'), q('cardN'), q('painelN')];
      const out = P(t, q('isso') - 0.1, 0.45, 'inOutCubic');
      r.nodes.forEach((n, i) => { appear(n, t, at[i] - 0.06, Infinity, { s0: 0.6, dy: 0, blur: 12, ease: 'outBack' }); n.style.opacity = String(Number(n.style.opacity) * (1 - out)); });
      r.lines.forEach((L, i) => {
        const p = P(t, q('conectado') - 0.1 + i * 0.08, 0.35, 'outCubic');
        const x2 = lerp(L.a[0], L.b[0], p), y2 = lerp(L.a[1], L.b[1], p);
        L.l.setAttribute('x2', x2.toFixed(1)); L.l.setAttribute('y2', y2.toFixed(1)); L.l.style.opacity = String((p > 0 ? 1 : 0) * (1 - out));
        L.l.setAttribute('stroke-dashoffset', String((-t * 60) % 22));
        const k = ((t - q('conectado')) * 0.9 + i / 3) % 1;
        L.d.setAttribute('cx', lerp(L.a[0], L.b[0], k).toFixed(1)); L.d.setAttribute('cy', lerp(L.a[1], L.b[1], k).toFixed(1));
        L.d.style.opacity = String(t > q('conectado') + 0.3 ? 1 - out : 0);
      });
      set(r.graph, { o: 1, s: lerp(1, 0.8, out), y: -120 * out });
      appear(r.logoBox, t, q('flow') - 0.25, Infinity, { s0: 0.7, dy: 0, blur: 16, ease: 'outBack', dur: 0.45 });
      r.logoBox.style.transform += ` scale(${punch(t, q('flow') + 0.2, 0.05)})`;
      appear(r.word, t, q('flow') - 0.05, Infinity, { dy: 30 });
    },
  });

  // 13. CTA — comentário CARDÁPIO e o Direct chegando
  R.scene({
    id: 'cta', start: q('quer'), end: R.duration, enter: { type: 'rise', dur: 0.4 },
    build(cam) {
      const card = h('div.card', { style: { left: '90px', top: '250px', width: '900px', height: '960px', fontFamily: 'InterUI' } });
      const head = h('div.row', { style: { gap: '20px', padding: '26px 28px' } }, h('div', { style: { width: '78px', height: '78px', borderRadius: '50%', backgroundImage: `url(${LOGO})`, backgroundSize: 'cover', boxShadow: '0 0 0 3px #0b0b0d, 0 0 0 5px #55565b' } }), h('div.col', h('div', { style: { font: '700 32px InterUI' } }, 'flowgroup.br'), h('div', { style: { font: '400 24px InterUI', color: '#9b9ca1' } }, 'sites, sistemas e automações')), h('div', { style: { marginLeft: 'auto', padding: '14px 28px', borderRadius: '16px', background: '#f4f4f2', color: '#0b0b0d', font: '700 26px InterUI' } }, 'Seguir'));
      const media = h('div', { style: { position: 'relative', height: '400px', margin: '0 28px', borderRadius: '24px', overflow: 'hidden', background: 'radial-gradient(80% 90% at 50% 30%, #222226, #0d0d0f)' } },
        h('div', { style: { position: 'absolute', left: '0', right: '0', top: '120px', textAlign: 'center', fontFamily: 'Anton', fontSize: '70px', lineHeight: '1.05' } }, 'PIZZARIA SEM', h('br'), 'PERDER PEDIDO'));
      const actions = h('div.row', { style: { gap: '26px', padding: '22px 34px', color: '#fff' } }, ...['heart', 'comment', 'send'].map(i => h('span', { html: UI.I[i].replace('<svg', '<svg width="46" height="46"') })));
      const sheet = h('div', { style: { position: 'absolute', left: '0', right: '0', bottom: '0', height: '470px', borderRadius: '34px 34px 0 0', background: '#1c1c1f', boxShadow: '0 -20px 40px rgb(0 0 0 / .5)', padding: '20px 30px' } },
        h('div', { style: { width: '80px', height: '8px', borderRadius: '4px', background: '#3a3a3f', margin: '0 auto 22px' } }),
        h('div', { style: { textAlign: 'center', font: '700 30px InterUI', marginBottom: '20px' } }, 'Comentários'));
      const mine = h('div.row', { style: { gap: '18px', alignItems: 'flex-start', marginTop: '6px' } }, h('div', { style: { width: '64px', height: '64px', borderRadius: '50%', background: '#3a3a3f', display: 'grid', placeItems: 'center', font: '700 28px InterUI', flex: 'none' } }, 'V'), h('div.col', { style: { gap: '8px' } }, h('div', { style: { font: '600 26px InterUI', color: '#c4c5c8' } }, 'você · agora'), h('div', { style: { display: 'inline-block', padding: '8px 16px', borderRadius: '10px', background: '#f4f4f2', color: '#0b0b0d', font: '800 34px InterUI', letterSpacing: '.04em', alignSelf: 'flex-start' } }, 'CARDÁPIO')));
      const input = h('div', { style: { position: 'absolute', left: '30px', right: '30px', bottom: '34px', height: '84px', borderRadius: '42px', border: '2px solid #3a3a3f', display: 'flex', alignItems: 'center', padding: '0 30px', font: '500 30px InterUI', color: '#9b9ca1' } }, h('span.typed', 'Adicione um comentário…'));
      sheet.append(mine, input);
      card.append(head, media, actions, sheet);
      const dm = UI.notif('instagram', 'flowgroup.br', 'Te mandei a demonstração do cardápio 👇', 'agora');
      dm.firstChild.replaceWith(h('div', { style: { width: '62px', height: '62px', borderRadius: '50%', flex: 'none', backgroundImage: `url(${LOGO})`, backgroundSize: 'cover' } }));
      Object.assign(dm.style, { position: 'absolute', left: '90px', width: '900px', top: '200px' });
      cam.append(card, dm);
      return { card, sheet, mine, typedEl: input.querySelector('.typed'), input, dm };
    },
    update(r, t) {
      appear(r.card, t, q('quer') - 0.1, Infinity, { dy: 60 });
      const up = P(t, q('comenta') - 0.15, 0.4, 'outExpo');
      set(r.sheet, { o: up > 0 ? 1 : 0, y: (1 - up) * 480 });
      const word = 'CARDÁPIO';
      const tt = typed(word, t, q('comenta') + 0.15, 22);
      const posted = t >= q('cardcta') + 0.35;
      r.typedEl.textContent = posted ? 'Adicione um comentário…' : (tt || 'Adicione um comentário…');
      r.typedEl.style.color = !posted && tt ? '#fff' : '#9b9ca1';
      r.mine.style.display = posted ? 'flex' : 'none';
      appear(r.mine, t, q('cardcta') + 0.35, Infinity, { dy: 20, s0: 0.95 });
      appear(r.dm, t, q('manda') - 0.15, Infinity, { dy: -90, blur: 8 });
    },
  });

  R.handle('@flowgroup.br', { y: 150, o: 0.6 });
  R.captions(C.groups, { y: 1262 });
})();
