/* Componentes reutilizáveis de interface (mockups realistas). Usam REEL.h. */
(() => {
  const { h } = window.REEL;

  // Ícones em linha (stroke = currentColor). Mantém o estilo monocromático.
  const I = {
    robot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M9.5 16h5"/><circle cx="12" cy="3.5" r="1"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M9 9h6M9 13h6M9 17h3"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 20h16"/><rect x="6" y="11" width="3" height="7" rx="1"/><rect x="11" y="7" width="3" height="11" rx="1"/><rect x="16" y="4" width="3" height="14" rx="1"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
    flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 21c-4 0-7-2.8-7-6.6 0-3.1 2.2-5 3.6-7.4.3 1.8 1.2 3 2.4 3.6C11 7.5 12.6 5 15 3c.2 3.2 4 5.7 4 11.4C19 18.2 16 21 12 21z"/><path d="M12 21c-1.7 0-3-1.2-3-2.9 0-1.6 1.4-2.6 2.2-4 .4 1 1 1.6 1.6 1.9.3-.8.9-1.5 1.6-2 .4 1.4 1.6 2.4 1.6 4.1 0 1.7-1.3 2.9-3 2.9z"/></svg>',
    moto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17h6l3-6h3l2 6M9 11h5M14 7h3"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.2 4.2L19 7"/></svg>',
    store: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 10v9h16v-9M3 6l2-3h14l2 3v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z"/><path d="M10 19v-5h4v5"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M21 3 10 14M21 3l-7 18-4-7-7-4z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
    comment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  };
  // Marcas reais só dentro dos mockups (reconhecimento imediato).
  const LOGO = {
    whatsapp: '<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#25D366"/><path fill="#fff" d="M16 6.4a9.6 9.6 0 0 0-8.3 14.4L6.4 25.6l4.9-1.3A9.6 9.6 0 1 0 16 6.4zm0 17.5c-1.5 0-3-.4-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A7.9 7.9 0 1 1 16 23.9zm4.3-5.9c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.3.1-.1 0-.3 0-.4l-.7-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.2z"/></svg>',
    pix: '<svg viewBox="0 0 32 32"><g fill="#32BCAD"><path d="M23.2 22.4a3.4 3.4 0 0 1-2.4-1l-3.5-3.5a.7.7 0 0 0-.9 0l-3.5 3.5a3.4 3.4 0 0 1-2.4 1h-.7l4.4 4.4a3.5 3.5 0 0 0 5 0l4.4-4.4z"/><path d="M10.5 9.6a3.4 3.4 0 0 1 2.4 1l3.5 3.5c.3.3.7.3.9 0l3.5-3.5a3.4 3.4 0 0 1 2.4-1h.4l-4.4-4.4a3.5 3.5 0 0 0-5 0l-4.4 4.4z"/><path d="m26.8 13.5-2.7-2.7h-.9a2.1 2.1 0 0 0-1.5.6l-3.5 3.5a2 2 0 0 1-2.8 0l-3.5-3.5a2.1 2.1 0 0 0-1.5-.6H9.2l-2.7 2.7a3.5 3.5 0 0 0 0 5l2.7 2.7h1.2a2.1 2.1 0 0 0 1.5-.6l3.5-3.5a2 2 0 0 1 2.8 0l3.5 3.5a2.1 2.1 0 0 0 1.5.6h.9l2.7-2.7a3.5 3.5 0 0 0 0-5z"/></g></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="1" fill="#fff"/></svg>',
  };

  const icon = (name, opts = {}) => {
    const box = h('div.ico', { style: { width: (opts.size || 56) + 'px', height: (opts.size || 56) + 'px', background: opts.bg || '', color: opts.color || '#fff', borderRadius: (opts.r || 16) + 'px' } });
    box.innerHTML = I[name] || LOGO[name] || '';
    const svg = box.firstChild; if (svg) { const k = Math.round((opts.size || 56) * (opts.k || 0.54)); svg.style.width = k + 'px'; svg.style.height = k + 'px'; }
    return box;
  };
  const logo = (name, size = 56) => { const d = h('div', { style: { width: size + 'px', height: size + 'px', flex: 'none' } }); d.innerHTML = LOGO[name]; d.firstChild.style.width = '100%'; d.firstChild.style.height = '100%'; return d; };

  /** iPhone (600×1230) com ilha e barra de status. `el` é um invólucro já no tamanho final (anime ele); `device` é o aparelho. */
  function phone(opts = {}) {
    const sc = opts.scale ?? 1;
    const y = opts.y ?? 300, hgt = 1230 * sc;
    const el = h('div', { style: { position: 'absolute', left: (opts.x ?? 240) + 'px', top: y + 'px', width: (600 * sc) + 'px', height: hgt + 'px' } });
    if (opts.fadeAt) { // some suavemente a partir desta altura do palco (deixa a legenda limpa)
      const a = Math.max(0, (opts.fadeAt - y) / hgt * 100), b = Math.min(100, a + (opts.fadeLen ?? 180) / hgt * 100);
      el.style.webkitMaskImage = el.style.maskImage = `linear-gradient(to bottom, #000 ${a.toFixed(1)}%, transparent ${b.toFixed(1)}%)`;
    }
    const device = h('div.phone', { style: { left: '0', top: '0', transform: `scale(${sc})`, transformOrigin: '0 0' } });
    const screen = h('div.screen', { style: { background: opts.bg || '#000' } });
    const time = h('span', opts.time || '21:37');
    const sbar = h('div.sbar', time, h('span', { html: '<svg width="70" height="26" viewBox="0 0 70 26"><g fill="#fff"><rect x="0" y="14" width="6" height="10" rx="1.5"/><rect x="9" y="10" width="6" height="14" rx="1.5"/><rect x="18" y="6" width="6" height="18" rx="1.5"/><rect x="27" y="2" width="6" height="22" rx="1.5"/><rect x="40" y="4" width="26" height="18" rx="5" fill="none" stroke="#fff" stroke-width="2"/><rect x="43" y="7" width="18" height="12" rx="2.5"/></g></svg>' }));
    device.append(screen, h('div.island'), sbar);
    el.append(device);
    return { el, device, screen, time };
  }

  /** Conversa do WhatsApp dentro de um celular */
  function waChat(screen, opts = {}) {
    const wa = h('div.wa');
    const head = h('div.wa-head', h('div.wa-av', opts.avatar || 'P'), h('div.col', h('div.wa-name', opts.name || 'Pizzaria'), h('div.wa-sub', opts.sub || 'conta comercial')));
    const body = h('div.wa-body');
    const input = h('div.wa-input', 'Mensagem');
    wa.append(head, body, input);
    screen.append(wa);
    return { wa, head, body, input };
  }
  const bubble = (html, side = 'in', meta = '21:37') => h('div.bub.' + side, { html: `${html}<span class="meta">${meta}</span>` });

  /** Notificação estilo iOS */
  function notif(appLogo, title, body, time = 'agora') {
    return h('div', { style: { width: '100%', borderRadius: '30px', padding: '22px 26px', background: 'rgb(42 42 46 / .92)', boxShadow: '0 20px 40px -18px rgb(0 0 0 / .8), 0 0 0 1px rgb(255 255 255 / .06)', display: 'flex', gap: '20px', alignItems: 'center', fontFamily: 'InterUI' } },
      logo(appLogo, 62),
      h('div.col', { style: { flex: '1', minWidth: '0' } },
        h('div.row', { style: { justifyContent: 'space-between' } }, h('span', { style: { font: '600 31px InterUI', color: '#fff' } }, title), h('span', { style: { font: '400 24px InterUI', color: '#a1a1a6' } }, time)),
        h('span', { style: { font: '400 30px InterUI', color: '#e5e5ea', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, body)));
  }

  /** Painel no estilo dos sistemas da Flow */
  function panel(opts = {}) {
    const el = h('div.panel', { style: { left: (opts.x ?? 80) + 'px', top: (opts.y ?? 300) + 'px', width: (opts.w ?? 920) + 'px', height: opts.hgt ? opts.hgt + 'px' : 'auto' } });
    const head = h('div.panel-h', icon(opts.icon || 'chart', { size: 58, bg: 'var(--s5)' }), h('span', opts.title || ''), opts.tag ? h('span.tag', opts.tag) : null);
    const body = h('div', { style: { padding: (opts.pad ?? 30) + 'px' } });
    el.append(head, body);
    return { el, head, body };
  }
  const pill = (txt, kind = '') => h('span.pill' + (kind ? '.' + kind : ''), txt);
  function toggle() { const el = h('div.toggle'); const knob = h('div.knob'); el.append(knob); return { el, knob }; }

  window.UI = { I, LOGO, icon, logo, phone, waChat, bubble, notif, panel, pill, toggle };
})();
