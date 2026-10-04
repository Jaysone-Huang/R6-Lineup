(() => {
  const slug = s => s.toLowerCase().replace(/ø/g, 'o').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');

  const OPS = [
    ...ATTACKERS.map(n => ({ id: slug(n), name: n, side: 'atk' })),
    ...DEFENDERS.map(n => ({ id: slug(n), name: n, side: 'def' })),
  ];
  const MAPS = Object.entries(MAP_DATA).map(([name, sites]) => ({
    id: slug(name), name,
    sites: sites.map(s => { const [floor, n] = s.split('|'); return { id: slug(floor + ' ' + n.split('/')[0]), floor, name: n.trim() }; }),
  }));

  // Returns plans: [[src, src], [src]]
  const plans = (map, site, op) => {
    let v = LINEUPS[map]?.[site]?.[op];
    if (!v) return [];
    if (!Array.isArray(v)) v = [v];
    if (v.length && typeof v[0] === 'string') v = [v];
    const dir = `images/${map}/${site}/`;
    return v.map((p, pi) => Array.isArray(p) ? p.map(f => dir + f) : Array.from({ length: p }, (_, i) => `${dir}${op}-${pi + 1}.${i + 1}.png`)).filter(p => p.length);
  };
  const images = (map, site, op) => plans(map, site, op);
  const countMap = map => Object.keys(LINEUPS[map] || {}).reduce((a, s) => a + countSite(map, s), 0);
  const countSite = (map, site) => Object.keys(LINEUPS[map]?.[site] || {}).reduce((a, op) => a + plans(map, site, op).length, 0);
  const total = MAPS.reduce((a, m) => a + countMap(m.id), 0);

  const state = { map: 'chalet', site: null, side: 'def', op: 'denari', onlyWith: true, q: '' };
  const $ = id => document.getElementById(id);
  const getMap = () => MAPS.find(m => m.id === state.map) || MAPS[0];
  const getSite = () => { const m = getMap(); return m.sites.find(s => s.id === state.site) || m.sites[0]; };
  const getOp = () => OPS.find(o => o.id === state.op) || OPS[0];

  // When map/site changes, jump to an operator that actually has lineups there.
  function autoPickOp() {
    const m = getMap().id, s = getSite().id;
    if (images(m, s, state.op).length && getOp().side === state.side) return;
    const pick = OPS.find(o => o.side === state.side && images(m, s, o.id).length)
      || OPS.find(o => images(m, s, o.id).length);
    if (pick) { state.op = pick.id; state.side = pick.side; }
  }

  function readHash() {
    const [map, site, op] = decodeURIComponent(location.hash.slice(1)).split('/');
    const m = MAPS.find(x => x.id === map);
    if (!m) return false;
    state.map = m.id;
    state.site = (m.sites.find(x => x.id === site) || m.sites[0]).id;
    const o = OPS.find(x => x.id === op);
    if (o) { state.op = o.id; state.side = o.side; } else autoPickOp();
    return true;
  }
  const writeHash = () => history.replaceState(null, '', `#${getMap().id}/${getSite().id}/${getOp().id}`);

  function render() {
    const map = getMap(), site = getSite(), op = getOp();
    state.site = site.id;
    $('stats').textContent = `${total} PLANS · ${MAPS.length} MAPS`;
    $('mapName').textContent = map.name;
    $('crumb').textContent = `${site.floor} · ${site.name.toUpperCase()} · ${op.name.toUpperCase()}`;
    document.title = `${map.name} · ${site.name} · ${op.name} — Lineup Index`;

    const q = state.q.trim().toLowerCase();
    $('maps').innerHTML = MAPS.filter(m => !q || m.name.toLowerCase().includes(q)).map(m => {
      const c = countMap(m.id);
      return `<button class="map-btn${c ? ' has' : ''}${m.id === map.id ? ' on' : ''}" data-map="${m.id}"><span class="name">${esc(m.name)}</span><span class="count">${c || ''}</span></button>`;
    }).join('');

    $('sites').innerHTML = map.sites.map(s => {
      const c = countSite(map.id, s.id);
      return `<button class="site-btn${s.id === site.id ? ' on' : ''}" data-site="${s.id}"><span class="meta"><span>${esc(s.floor)}</span><span>${c ? `${c} PLAN${c > 1 ? 'S' : ''}` : '—'}</span></span><span class="name">${esc(s.name)}</span></button>`;
    }).join('');

    document.querySelectorAll('#side button').forEach(b => b.classList.toggle('on', b.dataset.side === state.side));
    $('onlyWith').checked = state.onlyWith;

    const ops = OPS.filter(o => o.side === state.side)
      .map(o => ({ o, c: images(map.id, site.id, o.id).length }))
      .filter(x => !state.onlyWith || x.c)
      .sort((a, b) => (b.c > 0) - (a.c > 0));
    $('ops').innerHTML = ops.length
      ? ops.map(({ o, c }) => `<button class="op-btn${c ? ' has' : ''}${o.id === op.id ? ' on' : ''}" data-op="${o.id}"><span class="name">${esc(o.name)}</span><span class="count">${c || ''}</span></button>`).join('')
      : `<div class="note">No ${state.side === 'atk' ? 'attacker' : 'defender'} lineups for this site yet.</div>`;

    const ps = op.side === state.side ? plans(map.id, site.id, op.id) : [];
    const shots = ps.flat();
    const g = $('gallery');
    if (!ps.length) {
      g.innerHTML = `<div class="empty"><h2>No lineups yet</h2><p>Nothing for ${esc(op.name)} on ${esc(site.name)}. To add some, put screenshots in <code>images/${map.id}/${site.id}/</code> and list them in <code>data.js</code>.</p></div>`;
    } else {
      let k = 0;
      lb.meta = [];
      g.innerHTML = `<div class="gallery-head">${esc(op.name.toUpperCase())} · ${esc(site.name.toUpperCase())} · ${ps.length} PLAN${ps.length > 1 ? 'S' : ''}</div>` +
        ps.map((p, pi) => `<div class="plan">
          <div class="plan-head"><span class="plan-tag">PLAN ${pad(pi + 1)}</span><span class="plan-line"></span><span class="plan-count">${p.length} SHOT${p.length > 1 ? 'S' : ''}</span></div>
          <div class="grid">${p.map((src, i) => { const idx = k++; lb.meta.push(`PLAN ${pad(pi + 1)} · ${pad(i + 1)} / ${pad(p.length)}`); return `<button class="shot" data-shot="${idx}"><img src="${esc(src)}" alt="${esc(`${op.name} plan ${pi + 1} shot ${i + 1}, ${site.name}, ${map.name}`)}" loading="lazy"><span class="num">${pi + 1}.${i + 1}</span></button>`; }).join('')}</div>
        </div>`).join('');
      g.querySelectorAll('.shot img').forEach(img => img.addEventListener('error', () => {
        const b = img.parentElement; b.classList.add('missing'); b.disabled = true;
        img.remove(); b.insertAdjacentHTML('beforeend', `<span class="miss">missing file<br>${esc(img.getAttribute('src'))}</span>`);
      }, { once: true }));
    }
    lb.list = shots;
    writeHash();
  }

  // Events
  $('maps').addEventListener('click', e => { const b = e.target.closest('[data-map]'); if (!b) return; state.map = b.dataset.map; state.site = null; autoPickOp(); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  $('sites').addEventListener('click', e => { const b = e.target.closest('[data-site]'); if (!b) return; state.site = b.dataset.site; autoPickOp(); render(); });
  $('ops').addEventListener('click', e => { const b = e.target.closest('[data-op]'); if (!b) return; state.op = b.dataset.op; render(); });
  $('side').addEventListener('click', e => {
    const b = e.target.closest('[data-side]'); if (!b || b.dataset.side === state.side) return;
    state.side = b.dataset.side;
    const m = getMap().id, s = getSite().id;
    const pick = OPS.find(o => o.side === state.side && images(m, s, o.id).length) || OPS.find(o => o.side === state.side);
    state.op = pick.id; render();
  });
  $('onlyWith').addEventListener('change', e => { state.onlyWith = e.target.checked; render(); });
  $('mapSearch').addEventListener('input', e => { state.q = e.target.value; render(); });
  $('copyLink').addEventListener('click', () => {
    navigator.clipboard?.writeText(location.href).catch(() => {});
    const b = $('copyLink'); b.textContent = 'LINK COPIED'; setTimeout(() => (b.textContent = 'COPY LINK'), 1400);
  });
  window.addEventListener('hashchange', () => { if (readHash()) render(); });

  // Lightbox
  const lb = { el: $('lightbox'), list: [], i: 0 };
  const lbImg = lb.el.querySelector('img');
  const show = i => { lb.i = (i + lb.list.length) % lb.list.length; lbImg.src = lb.list[lb.i]; lb.el.querySelector('.lb-count').textContent = lb.meta?.[lb.i] || `${pad(lb.i + 1)} / ${pad(lb.list.length)}`; };
  const open = i => { lb.el.hidden = false; document.body.style.overflow = 'hidden'; show(i); };
  const close = () => { lb.el.hidden = true; document.body.style.overflow = ''; };
  $('gallery').addEventListener('click', e => { const b = e.target.closest('.shot:not(.missing)'); if (b) open(+b.dataset.shot); });
  lb.el.addEventListener('click', e => {
    if (e.target.closest('.lb-prev')) return show(lb.i - 1);
    if (e.target.closest('.lb-next')) return show(lb.i + 1);
    if (e.target === lb.el || e.target.closest('.lb-close')) close();
  });
  document.addEventListener('keydown', e => {
    if (lb.el.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(lb.i - 1);
    if (e.key === 'ArrowRight') show(lb.i + 1);
  });

  if (!readHash()) autoPickOp();
  render();
})();
