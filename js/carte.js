/* Saison NE · Où acheter : carte du canton, choix de la commune, liste des lieux */
'use strict';

/* ---------------------------------------------------------------
   5. Carte et lieux
   --------------------------------------------------------------- */
const projeter = (lat, lon) => [(lon - MAP.proj.lon0) * MAP.proj.k * MAP.proj.s, (MAP.proj.lat1 - lat) * MAP.proj.s];


const SOURCE_LIEUX = 'Infos relevées le 6 novembre 2026 (loisirs.ch, sites des producteurs). À confirmer avec le lieu.';

/** Distance à vol d'oiseau en km */
function distanceKm(a, b) {
  const R = 6371, rad = x => x * Math.PI / 180;
  const dLat = rad(b[0] - a[0]), dLon = rad(b[1] - a[1]);
  const q = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(q));
}
const communeChoisie = () => LOCALITES.find(l => l[0] === state.commune) || null;

function brancherCommune() {
  const sel = $('#commune');
  sel.replaceChildren(h('option', { value: '' }, 'Choisir une commune'), ...LOCALITES.map(l => h('option', { value: l[0] }, l[0])));
  sel.value = communeChoisie() ? state.commune : '';
  sel.addEventListener('change', () => {
    state.commune = sel.value || null; state.lieuActif = null;
    lsSet('saison-ne.commune', state.commune);
    renderCarte(); renderListeLieux();
  });
}

function tousLesLieux() {
  return LIEUX;
}

function positionsPins(lieux) {
  const pts = lieux.filter(l => l.lat).map(l => { const [x, y] = projeter(l.lat, l.lon); return { l, x, y }; });
  for (let it = 0; it < 30; it++) {          // écarte les points qui se chevauchent
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i], b = pts[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 0.01;
      if (d < 21) { const k = (21 - d) / 2 / d; a.x -= dx * k; a.y -= dy * k; b.x += dx * k; b.y += dy * k; }
    }
  }
  return pts;
}

function renderCarte() {
  const lieux = tousLesLieux();
  const svg = s('svg', { viewBox: MAP.viewBox, class: 'map', role: 'group', 'aria-label': 'Carte du canton de Neuchâtel avec les lieux de vente' },
    s('rect', { width: MAP.w, height: MAP.h, fill: '#F1F5F3' }),
    s('path', { class: 'voisins', d: MAP.voisins }),
    s('path', { class: 'canton', d: MAP.canton }),
    s('path', { class: 'communes', d: MAP.communes }),
    s('path', { class: 'lacs', d: MAP.lacs }));
  const lac = projeter(46.905, 6.86);
  svg.append(s('text', { class: 'eau', x: lac[0], y: lac[1], 'text-anchor': 'middle', transform: `rotate(-38 ${lac[0]} ${lac[1]})`, text: 'Lac de Neuchâtel' }));
  [['France', 47.13, 6.53], ['Vaud', 46.84, 6.56], ['Berne', 47.165, 7.06]].forEach(([t, la, lo]) => {
    const [x, y] = projeter(la, lo); svg.append(s('text', { class: 'pays', x, y, 'text-anchor': 'middle', text: t, 'aria-hidden': 'true' }));
  });
  VILLES.forEach(v => {
    const [x, y] = projeter(v.lat, v.lon);
    svg.append(s('circle', { class: 'ville-dot', cx: x, cy: y, r: v.rang === 1 ? 3.5 : 2.5 }));
    svg.append(s('text', { class: 'ville' + (v.rang === 1 ? '' : ' r2'), x: x + v.dx, y: y + v.dy, 'text-anchor': v.ancre, text: v.nom }));
  });
  const c = communeChoisie();
  if (c) {
    const [x, y] = projeter(c[1], c[2]);
    svg.append(s('g', { class: 'moi', transform: `translate(${x.toFixed(1)} ${y.toFixed(1)})` },
      s('circle', { r: 16, class: 'moi-halo' }), s('circle', { r: 5, class: 'moi-core' }),
      s('text', { x: 0, y: 32, 'text-anchor': 'middle', text: c[0] })));
  }
  const pins = s('g', { class: 'pins' });
  positionsPins(lieux).forEach(({ l, x, y }) => {
    const visible = state.typeLieu === 'tout' || state.typeLieu === l.type;
    const g = s('g', {
      class: 'pin' + (state.lieuActif === l.id ? ' on' : '') + (visible ? '' : ' dim'), transform: `translate(${x.toFixed(1)} ${y.toFixed(1)})`,
      tabindex: visible ? '0' : '-1', role: 'button', 'aria-label': `${l.nom}, ${l.localite}`, 'data-id': l.id,
    },
      s('circle', { class: 'halo', r: 13 }),
      s('circle', { class: 'core', r: 8, fill: TYPES_LIEUX[l.type].c }),
      s('text', { x: x > MAP.w * 0.72 ? -14 : 14, y: 5, 'text-anchor': x > MAP.w * 0.72 ? 'end' : 'start', text: l.nom }));
    const choisir = () => choisirLieu(l.id, true);
    g.addEventListener('click', choisir);
    g.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); choisir(); } });
    pins.append(g);
  });
  // le lieu actif passe au-dessus des autres
  const actif = pins.querySelector('.pin.on'); if (actif) pins.append(actif);
  svg.append(pins);
  if (c) {   // traits vers les 3 lieux les plus proches
    const [cx, cy] = projeter(c[1], c[2]);
    const proches = positionsPins(lieux).filter(p => state.typeLieu === 'tout' || p.l.type === state.typeLieu)
      .sort((a, b) => Math.hypot(a.x - cx, a.y - cy) - Math.hypot(b.x - cx, b.y - cy)).slice(0, 3);
    const g = s('g', { class: 'liens' });
    proches.forEach((p, i) => {
      const l = s('line', { x1: cx, y1: cy, x2: p.x, y2: p.y, style: `--d:${Math.hypot(p.x - cx, p.y - cy).toFixed(0)};animation-delay:${i * 120}ms` });
      g.append(l);
    });
    svg.insertBefore(g, pins);
  }
  $('#map').replaceChildren(svg);
  if (carteVue && !REDUCE) {
    const on = svg.querySelector('.pin.on circle.core');
    if (on) {
      const onde = s('circle', { class: 'onde', r: 8 });
      on.parentNode.insertBefore(onde, on);
    }
  }
}
let carteVue = false;
function tomberEpingles() {
  if (REDUCE) return;
  document.querySelectorAll('#map .pin').forEach((g, i) => {
    g.firstChild.parentNode.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, delay: i * 45, fill: 'backwards' });
    g.querySelectorAll('circle').forEach(ci => ci.animate(
      [{ transform: 'translateY(-40px)' }, { transform: 'translateY(3px)', offset: 0.7 }, { transform: 'none' }],
      { duration: 560, delay: i * 45, easing: 'cubic-bezier(.3,.7,.4,1)', fill: 'backwards' }));
  });
}

function choisirLieu(id, depuisCarte) {
  state.lieuActif = state.lieuActif === id && !depuisCarte ? null : id;
  renderCarte(); renderListeLieux();
  if (depuisCarte) {
    const li = document.getElementById('lieu-' + id);
    if (li) { li.scrollIntoView({ block: 'nearest', behavior: REDUCE ? 'auto' : 'smooth' }); li.querySelector('h3 button')?.focus({ preventScroll: true }); }
  }
}

function badgeJour(l) {
  if (!l.jours) return null;
  const j = NOW.getDay();
  if (l.jours.length === 7) return h('span', { class: 'today-badge' }, 'Tous les jours');
  if (l.jours.includes(j)) {
    if (l.heures && NOW.getHours() >= l.heures[1]) return h('span', { class: 'today-badge closed' }, 'Fini pour aujourd’hui');
    return h('span', { class: 'today-badge' }, l.type === 'marche' ? 'Marché aujourd’hui' : 'Ouvert aujourd’hui');
  }
  for (let k = 1; k < 7; k++) {
    const jj = (j + k) % 7;
    if (l.jours.includes(jj)) return h('span', { class: 'today-badge closed' }, (k === 1 ? 'Demain' : 'Prochain : ' + JOURS[jj]));
  }
  return null;
}

function renderChipsLieux() {
  const lieux = tousLesLieux();
  const options = [['tout', 'Tout', lieux.length], ...Object.entries(TYPES_LIEUX).map(([id, t]) => [id, t.nom, lieux.filter(l => l.type === id).length])];
  $('#place-chips').replaceChildren(...options.filter(o => o[2]).map(([id, label, n]) => h('button', {
    class: 'chip', type: 'button', 'aria-pressed': String(state.typeLieu === id),
    onclick: () => { state.typeLieu = id; state.lieuActif = null; renderChipsLieux(); renderCarte(); renderListeLieux(); },
  }, id !== 'tout' ? h('span', { class: 'dot', style: `--c:${TYPES_LIEUX[id].c};width:10px;height:10px;align-self:center` }) : null, label, h('span', { class: 'n' }, n))));
}

function renderListeLieux() {
  const c = communeChoisie();
  let lieux = tousLesLieux().filter(l => state.typeLieu === 'tout' || state.typeLieu === l.type)
    .map(l => ({ ...l, km: c && l.lat ? distanceKm([c[1], c[2]], [l.lat, l.lon]) : null }));
  if (c) lieux = lieux.sort((a, b) => (a.km ?? 999) - (b.km ?? 999));
  $('#place-list').replaceChildren(...lieux.map(l => {
    const t = TYPES_LIEUX[l.type];
    const itin = l.adresse ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(l.nom + ', ' + l.adresse) : null;
    return h('li', { class: 'place' + (state.lieuActif === l.id ? ' on' : ''), id: 'lieu-' + l.id },
      h('h3', null, l.lat ? h('button', { type: 'button', 'aria-pressed': String(state.lieuActif === l.id), onclick: () => choisirLieu(l.id, false) }, l.nom) : l.nom),
      h('div', { class: 'where' }, h('span', { class: 'type', style: `--c:${t.c}` }, h('i'), t.un), h('span', null, l.localite), l.km !== null && l.km !== undefined ? h('span', null, `à ${l.km < 1 ? 'moins de 1' : Math.round(l.km)} km`) : null, badgeJour(l)),
      l.horaires ? h('p', null, l.horaires) : null,
      l.produits ? h('p', { style: 'color:var(--ink-soft)' }, l.produits) : null,
      h('div', { class: 'links' },
        l.site ? h('a', { href: l.site }, 'Site web') : null,
        itin ? h('a', { href: itin }, 'Itinéraire') : null,
        l.tel ? h('span', null, 'Tél. ' + l.tel) : null,
      ),
      h('p', { class: 'src' }, l.source || SOURCE_LIEUX));
  }));
}
