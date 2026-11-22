/* Saison NE · Dessins de secours (utilisés quand un produit n'a pas encore de photo) */
/* =====================================================================
   Saison NE — illustrations
   Chaque produit est dessiné en SVG à partir d'une « forme » de base
   (racine, bulbe, chou, baies…) colorée avec sa propre couleur.
   Aucune image externe : tout est dessiné dans la page.
   ===================================================================== */
const ILLUS = (function () {
  'use strict';

  /* ---------- couleurs ---------- */
  function hexRgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function rgbHex(r, g, b) { return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join(''); }
  /** k < 0 : plus foncé, k > 0 : plus clair */
  function nuance(h, k) {
    const [r, g, b] = hexRgb(h);
    return k < 0 ? rgbHex(r * (1 + k), g * (1 + k), b * (1 + k)) : rgbHex(r + (255 - r) * k, g + (255 - g) * k, b + (255 - b) * k);
  }
  const VERT = '#4E8A3A', VERT_F = '#2F6A34', VERT_C = '#7DB35A', BOIS = '#7A5230';

  /* ---------- pièces réutilisables ---------- */
  const feuille = (x, y, rot, l = 46, w = 16, c = VERT) =>
    `<path class="f" d="M0 0 C ${w} ${-l * 0.35}, ${w * 0.6} ${-l * 0.85}, 0 ${-l} C ${-w * 0.6} ${-l * 0.85}, ${-w} ${-l * 0.35}, 0 0Z" fill="${c}" transform="translate(${x} ${y}) rotate(${rot})"/>` +
    `<path d="M0 -4 L0 ${-l + 6}" stroke="${nuance(c, -0.3)}" stroke-width="2" stroke-linecap="round" fill="none" transform="translate(${x} ${y}) rotate(${rot})" opacity=".55"/>`;
  const touffe = (x, y, c = VERT) => `<g class="feuillage">${feuille(x, y, -28, 48, 14, c)}${feuille(x, y, 26, 44, 14, nuance(c, -0.12))}${feuille(x, y, 0, 56, 15, nuance(c, 0.1))}</g>`;
  const reflet = (cx, cy, rx, ry, rot = -30) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff" opacity=".28" transform="rotate(${rot} ${cx} ${cy})"/>`;
  const ombre = `<ellipse cx="100" cy="186" rx="52" ry="7" fill="#10343C" opacity=".12"/>`;

  /* ---------- formes ---------- */
  const F = {
    racine(c, d) {
      return ombre + touffe(100, 58) +
        `<path d="M68 62 Q100 48 132 62 Q122 132 102 186 Q96 190 92 182 Q80 130 68 62Z" fill="${c}"/>` +
        [84, 104, 124, 146].map((y, i) => `<path d="M${76 + i * 3} ${y} q10 4 ${18 - i * 3} 0" stroke="${d}" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".5"/>`).join('') +
        reflet(86, 92, 7, 26, 8);
    },
    rondRacine(c, d) {
      return ombre + touffe(100, 70) +
        `<path d="M100 66 C 140 66, 152 104, 148 124 C 144 152, 122 166, 100 166 C 78 166, 56 152, 52 124 C 48 104, 60 66, 100 66Z" fill="${c}"/>` +
        `<path d="M100 164 Q104 178 110 190" stroke="${d}" stroke-width="3" fill="none" stroke-linecap="round"/>` +
        `<path d="M72 120 q8 6 16 2 M112 136 q8 6 16 2" stroke="${d}" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".45"/>` + reflet(80, 100, 12, 22);
    },
    bulbe(c, d) {
      return ombre +
        `<path d="M96 40 Q100 30 104 40 L106 64 L94 64Z" fill="${nuance(c, -0.15)}"/>` +
        `<path d="M100 58 C 60 92, 52 160, 100 172 C 148 160, 140 92, 100 58Z" fill="${c}"/>` +
        `<path d="M100 62 C 80 100, 80 150, 100 170 M100 62 C 120 100, 120 150, 100 170 M100 62 C 66 104, 66 150, 96 170 M100 62 C 134 104, 134 150, 104 170" stroke="${d}" stroke-width="2" fill="none" opacity=".4"/>` +
        `<path d="M88 172 l-6 12 M96 174 l-2 14 M104 174 l2 14 M112 172 l6 12" stroke="${BOIS}" stroke-width="2.2" stroke-linecap="round"/>` + reflet(82, 110, 9, 24, 12);
    },
    chou(c, d, l) {
      return ombre + `<circle cx="100" cy="112" r="68" fill="${d}"/>` +
        `<path d="M40 120 C 34 70, 80 40, 104 48 C 70 60, 52 90, 60 140Z" fill="${c}" opacity=".9"/>` +
        `<path d="M160 120 C 166 70, 120 40, 96 48 C 130 60, 148 90, 140 140Z" fill="${c}" opacity=".9"/>` +
        `<circle cx="100" cy="114" r="46" fill="${c}"/>` +
        `<path d="M70 112 C 80 82, 120 82, 130 112 M78 128 C 88 104, 112 104, 122 128" stroke="${l}" stroke-width="4" fill="none" stroke-linecap="round"/>` +
        `<path d="M100 72 L100 156 M100 110 L74 90 M100 110 L126 90 M100 132 L80 118 M100 132 L120 118" stroke="${l}" stroke-width="2" fill="none" opacity=".7"/>`;
    },
    fleur(c, d) {
      const pts = [[100, 78, 18], [76, 88, 16], [124, 88, 16], [64, 108, 15], [136, 108, 15], [88, 102, 17], [112, 102, 17], [100, 118, 16], [78, 120, 14], [122, 120, 14]];
      return ombre + `<path d="M100 186 L100 128" stroke="${VERT_C}" stroke-width="14" stroke-linecap="round"/>` +
        `<g class="feuillage"><path class="f" d="M100 176 C 60 170, 34 136, 42 112 C 64 128, 80 150, 100 162Z" fill="${VERT}"/><path class="f" d="M100 176 C 140 170, 166 136, 158 112 C 136 128, 120 150, 100 162Z" fill="${VERT_F}"/></g>` +
        pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><circle cx="${x - r * 0.3}" cy="${y - r * 0.3}" r="${r * 0.35}" fill="#fff" opacity=".22"/>`).join('') +
        pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${d}" stroke-width="1.5" opacity=".35"/>`).join('');
    },
    feuilles(c, d, l) {
      const f = (rot, s, col) => `<g transform="translate(100 182) rotate(${rot}) scale(${s})"><path class="f" d="M0 0 C 34 -30, 36 -110, 0 -146 C -36 -110, -34 -30, 0 0Z" fill="${col}"/><path d="M0 -6 L0 -136 M0 -40 L-16 -60 M0 -40 L16 -60 M0 -80 L-14 -98 M0 -80 L14 -98" stroke="${l}" stroke-width="3" stroke-linecap="round" fill="none" opacity=".6"/></g>`;
      return ombre + `<g class="feuillage">${f(-42, 0.82, d)}${f(42, 0.82, d)}${f(-20, 0.95, c)}${f(20, 0.95, c)}${f(0, 1, nuance(c, 0.08))}</g>`;
    },
    long(c, d) {
      return ombre + `<g transform="rotate(-38 100 110)"><rect x="76" y="34" width="48" height="150" rx="24" fill="${c}"/>` +
        `<rect x="84" y="50" width="10" height="110" rx="5" fill="#fff" opacity=".22"/>` +
        `<path d="M78 46 Q100 26 122 46 L118 54 Q100 44 82 54Z" fill="${VERT_F}"/><rect x="95" y="18" width="10" height="22" rx="4" fill="${VERT}"/></g>`;
    },
    tiges(c, d, l) {
      const tige = (x, h, rot) => `<g transform="rotate(${rot} ${x} 182)"><rect x="${x - 11}" y="${182 - h}" width="22" height="${h}" rx="11" fill="${c}"/><rect x="${x - 6}" y="${190 - h}" width="5" height="${h - 30}" rx="2.5" fill="#fff" opacity=".25"/><path class="f" d="M${x - 11} ${196 - h} Q${x} ${150 - h} ${x + 11} ${196 - h}Z" fill="${l === 'pointe' ? d : VERT}"/></g>`;
      return ombre + `<g class="feuillage">${tige(78, 132, -10)}${tige(122, 132, 10)}${tige(100, 150, 0)}</g>` +
        `<rect x="70" y="140" width="60" height="12" rx="4" fill="${BOIS}" opacity=".8"/>`;
    },
    gousse(c, d) {
      return ombre + `<path d="M36 150 C 50 70, 130 40, 170 58 C 160 72, 150 76, 140 76 C 112 92, 74 132, 50 162 C 44 168, 34 162, 36 150Z" fill="${c}"/>` +
        [[70, 128], [92, 106], [116, 88], [140, 72]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13" fill="${nuance(c, 0.3)}"/><circle cx="${x - 4}" cy="${y - 4}" r="4" fill="#fff" opacity=".4"/>`).join('') +
        `<path d="M166 58 q10 -8 8 -22" stroke="${VERT_F}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    },
    fruit(c, d, l, v) {
      let corps = `<circle cx="100" cy="116" r="60" fill="${c}"/>`;
      if (v === 'poire') corps = `<path d="M100 54 C 120 54, 122 84, 132 100 C 160 130, 150 178, 100 178 C 50 178, 40 130, 68 100 C 78 84, 80 54, 100 54Z" fill="${c}"/>`;
      if (v === 'ovale') corps = `<ellipse cx="100" cy="118" rx="48" ry="62" fill="${c}"/><path d="M100 60 Q90 118 100 178" stroke="${d}" stroke-width="2.5" fill="none" opacity=".4"/>`;
      if (v === 'courge') corps = `<ellipse cx="100" cy="122" rx="78" ry="54" fill="${c}"/>` + [60, 80, 120, 140].map(x => `<path d="M${x} 74 Q${x + (x < 100 ? -18 : 18)} 122 ${x} 172" stroke="${d}" stroke-width="3" fill="none" opacity=".4"/>`).join('') + `<path d="M100 70 Q96 122 100 174" stroke="${d}" stroke-width="3" fill="none" opacity=".4"/>`;
      if (v === 'poivron') corps = `<path d="M60 84 C 40 110, 46 168, 76 178 C 90 182, 96 172, 100 172 C 104 172, 110 182, 124 178 C 154 168, 160 110, 140 84 C 124 66, 76 66, 60 84Z" fill="${c}"/><path d="M100 76 Q94 126 100 170" stroke="${d}" stroke-width="3" fill="none" opacity=".35"/>`;
      if (v === 'melon') corps += [70, 100, 130].map(x => `<path d="M${x} 58 Q${x + (x - 100) * 0.6} 116 ${x} 174" stroke="${l}" stroke-width="2.5" fill="none" opacity=".55"/>`).join('') + `<path d="M44 116 Q100 100 156 116 M50 140 Q100 126 150 140 M52 92 Q100 80 148 92" stroke="${l}" stroke-width="2.5" fill="none" opacity=".55"/>`;
      if (v === 'cerise') {
        return ombre + `<path d="M76 120 C 80 80, 100 50, 128 38 M128 120 C 128 80, 128 60, 128 38" stroke="${BOIS}" stroke-width="4" fill="none" stroke-linecap="round"/>` +
          `<g class="feuillage">${feuille(128, 40, 60, 44, 14)}</g>` +
          `<circle cx="74" cy="142" r="32" fill="${c}"/><circle cx="130" cy="146" r="32" fill="${d}"/>` + reflet(64, 130, 7, 12) + reflet(120, 134, 7, 12);
      }
      const tige = v === 'tomate'
        ? `<path d="M100 60 l-26 -6 l18 12 l-22 8 l26 0 l4 0 l26 0 l-22 -8 l18 -12 l-26 6Z" fill="${VERT}"/><rect x="97" y="40" width="6" height="22" rx="3" fill="${VERT_F}"/>`
        : v === 'poivron' ? `<path d="M90 76 Q100 56 112 46 L118 52 Q108 62 108 76Z" fill="${VERT_F}"/>`
        : v === 'courge' ? `<path d="M92 74 Q94 52 110 44 L114 52 Q104 58 106 74Z" fill="${BOIS}"/>`
        : `<path d="M100 60 Q102 46 110 36" stroke="${BOIS}" stroke-width="5" fill="none" stroke-linecap="round"/><g class="feuillage">${feuille(106, 46, 58, 40, 14)}</g>`;
      return ombre + corps + tige + reflet(76, 96, 12, 24);
    },
    baies(c, d, l, v) {
      if (v === 'fraise') {
        const graines = [[86, 100], [110, 98], [98, 118], [78, 124], [120, 122], [92, 142], [110, 144], [100, 162]];
        return ombre + `<path d="M100 184 C 60 160, 44 112, 58 88 C 72 70, 128 70, 142 88 C 156 112, 140 160, 100 184Z" fill="${c}"/>` +
          graines.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2.6" ry="4" fill="#F7E08A"/>`).join('') +
          `<g class="feuillage"><path class="f" d="M100 80 l-34 -6 l22 -10 l-14 -18 l26 12 l0 -20 l0 20 l26 -12 l-14 18 l22 10Z" fill="${VERT}"/></g>` + reflet(76, 104, 8, 18);
      }
      if (v === 'grappe') {
        const g = [[82, 70], [110, 70], [68, 94], [96, 94], [124, 94], [82, 118], [110, 118], [96, 142], [100, 166]];
        return ombre + `<path d="M100 60 Q104 40 120 34" stroke="${BOIS}" stroke-width="5" fill="none" stroke-linecap="round"/><g class="feuillage">${feuille(116, 38, 64, 46, 18)}</g>` +
          g.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="17" fill="${c}" stroke="${d}" stroke-width="2"/><circle cx="${x - 5}" cy="${y - 5}" r="4" fill="#fff" opacity=".35"/>`).join('');
      }
      if (v === 'chaine') {
        const g = [[70, 74], [84, 98], [96, 122], [106, 146], [112, 170]];
        return ombre + `<path d="M56 50 Q96 80 116 178" stroke="${VERT_F}" stroke-width="3" fill="none"/>` +
          g.map(([x, y], i) => `<circle cx="${x + 12}" cy="${y}" r="${15 - i}" fill="${c}"/><circle cx="${x + 8}" cy="${y - 4}" r="3.5" fill="#fff" opacity=".45"/>`).join('') +
          `<g class="feuillage">${feuille(58, 52, -50, 46, 18)}</g>`;
      }
      if (v === 'myrtille') {
        return ombre + [[78, 126, 30], [124, 120, 30], [100, 156, 28], [102, 96, 26]].map(([x, y, r]) =>
          `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${l}" stroke-width="2" opacity=".35"/><path d="M${x - 6} ${y - r + 8} l6 4 l6 -4" stroke="${d}" stroke-width="3" fill="none"/>${reflet(x - r * 0.35, y - r * 0.2, 4, 9)}`).join('');
      }
      // framboise, mûre : dôme de petites boules
      const pts = [];
      for (let row = 0; row < 5; row++) for (let i = 0; i <= row + 1; i++) pts.push([100 + (i - (row + 1) / 2) * 20, 82 + row * 20 - (row === 4 ? 4 : 0)]);
      return ombre + `<g class="feuillage"><path class="f" d="M100 70 l-30 -8 l20 -8 l-8 -18 l18 14 l0 -16 l0 16 l18 -14 l-8 18 l20 8Z" fill="${VERT}"/></g>` +
        pts.filter(([x, y]) => Math.hypot((x - 100) / 54, (y - 122) / 58) < 1).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="12" fill="${c}"/><circle cx="${x - 3}" cy="${y - 3}" r="3.5" fill="#fff" opacity=".35"/>`).join('');
    },
    herbe(c, d, l, v) {
      if (v === 'brins') {
        return ombre + `<g class="feuillage">` + [-18, -9, 0, 9, 18].map((r, i) => `<path class="f" d="M${92 + i * 4} 184 Q${90 + i * 4 + r} 110 ${82 + i * 9 + r * 1.4} 36" stroke="${i % 2 ? c : nuance(c, -0.15)}" stroke-width="7" fill="none" stroke-linecap="round"/>`).join('') + `</g>` +
          `<rect x="82" y="150" width="36" height="12" rx="4" fill="${BOIS}" opacity=".8"/>`;
      }
      const rang = [[0.18, -1], [0.18, 1], [0.38, -1], [0.38, 1], [0.58, -1], [0.58, 1], [0.78, -1], [0.78, 1]];
      const pt = t => [100 + Math.sin(t * 3) * 10, 184 - t * 150];
      return ombre + `<path d="M100 184 Q112 120 100 34" stroke="${VERT_F}" stroke-width="4" fill="none" stroke-linecap="round"/><g class="feuillage">` +
        rang.map(([t, s]) => { const [x, y] = pt(t); return feuille(x, y, s * 60, v === 'petit' ? 22 : 40, v === 'petit' ? 8 : 16, s < 0 ? c : nuance(c, -0.1)); }).join('') +
        feuille(102, 40, 0, v === 'petit' ? 20 : 34, v === 'petit' ? 8 : 14, nuance(c, 0.1)) + `</g>`;
    },
    tubercule(c, d) {
      return ombre + `<path d="M48 120 C 40 84, 80 64, 112 70 C 150 76, 166 104, 156 134 C 148 162, 112 172, 86 166 C 62 162, 52 142, 48 120Z" fill="${c}"/>` +
        [[78, 100], [118, 92], [132, 132], [92, 146], [70, 128]].map(([x, y]) => `<path d="M${x - 4} ${y} q4 -3 8 0" stroke="${d}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`).join('') + reflet(78, 92, 10, 18);
    },
    noix(c, d, l, v) {
      if (v === 'chataigne') return ombre + `<path d="M100 48 C 140 70, 158 120, 150 152 C 144 172, 56 172, 50 152 C 42 120, 60 70, 100 48Z" fill="${c}"/><path d="M54 150 C 70 140, 130 140, 146 150 C 144 170, 56 170, 54 150Z" fill="${l}"/>` + reflet(80, 96, 10, 26, 20);
      return ombre + `<ellipse cx="100" cy="118" rx="56" ry="62" fill="${c}"/><path d="M100 56 C 92 90, 108 140, 100 180" stroke="${d}" stroke-width="3" fill="none"/>` +
        `<path d="M70 92 q10 8 4 20 M128 96 q-8 10 -2 22 M72 138 q12 4 10 18 M128 140 q-10 6 -8 18" stroke="${d}" stroke-width="2.5" fill="none" opacity=".55"/>` + reflet(76, 98, 9, 20);
    },
    artichaut(c, d, l) {
      let s = ombre + `<path d="M100 150 Q96 170 104 188" stroke="${d}" stroke-width="10" fill="none" stroke-linecap="round"/>` +
        `<ellipse cx="100" cy="108" rx="54" ry="58" fill="${d}"/>`;
      const rangs = [[150, 5, 26, 30], [126, 4, 30, 34], [100, 3, 32, 36], [76, 2, 30, 32]];
      rangs.forEach(([y, n, w, hh], r) => {
        for (let i = 0; i < n; i++) {
          const x = 100 + (i - (n - 1) / 2) * w * 0.95;
          s += `<path d="M${x - w / 2} ${y} Q${x - w / 2} ${y - hh} ${x} ${y - hh - 6} Q${x + w / 2} ${y - hh} ${x + w / 2} ${y}Z" fill="${(i + r) % 2 ? c : nuance(c, -0.1)}" stroke="${l}" stroke-width="2"/>`;
        }
      });
      return s;
    },
    mais(c, d) {
      let k = '';
      for (let r = 0; r < 7; r++) for (let i = 0; i < 4; i++) k += `<rect x="${82 + i * 10}" y="${52 + r * 16}" width="8" height="13" rx="4" fill="${i % 2 ? c : nuance(c, -0.08)}"/>`;
      return ombre + `<g transform="rotate(-18 100 110)">${k}<path d="M100 186 C 60 160, 52 110, 70 80 C 76 130, 88 160, 100 172Z" fill="${VERT}"/><path d="M100 186 C 140 160, 148 110, 130 80 C 124 130, 112 160, 100 172Z" fill="${VERT_F}"/></g>`;
    },
  };

  /* ---------- quelle forme pour quel produit ---------- */
  const FORMES = {
    carotte: 'racine', panais: 'racine', 'persil-tubereux': 'racine', salsifis: 'racine', 'radis-long': 'racine',
    'betterave-rouge': 'rondRacine', radis: 'rondRacine', navet: 'rondRacine', 'rave-d-automne': 'rondRacine', 'celeri-rave': 'rondRacine', 'chou-navet': 'rondRacine', 'chou-rave': 'rondRacine', fenouil: 'rondRacine',
    ail: 'bulbe', echalote: 'bulbe', oignon: 'bulbe',
    'chou-blanc': 'chou', 'chou-rouge': 'chou', 'chou-frise': 'chou', 'chou-de-bruxelles': 'chou', 'chou-chinois': 'feuilles',
    'chou-fleur': 'fleur', brocoli: 'fleur', romanesco: 'fleur',
    epinards: 'feuilles', 'cotes-de-bettes': 'feuilles', 'pak-choi': 'feuilles', 'chou-kale': 'feuilles', endive: 'feuilles',
    courgette: 'long', concombre: 'long', aubergine: 'long',
    poireau: 'tiges', 'celeri-branche': 'tiges', 'asperge-blanche': 'tiges:pointe', 'asperge-verte': 'tiges:pointe', 'oignons-bottes': 'tiges', rhubarbe: 'tiges',
    haricots: 'gousse', 'petits-pois': 'gousse', 'pois-mange-tout': 'gousse',
    tomate: 'fruit:tomate', pomme: 'fruit', coing: 'fruit:poire', abricot: 'fruit', pruneau: 'fruit:ovale', mirabelle: 'fruit', melon: 'fruit:melon',
    poivron: 'fruit:poivron', courge: 'fruit:courge', poire: 'fruit:poire', cerise: 'fruit:cerise',
    fraise: 'baies:fraise', framboise: 'baies', mure: 'baies', myrtille: 'baies:myrtille', groseille: 'baies:chaine', raisin: 'baies:grappe',
    basilic: 'herbe', menthe: 'herbe', persil: 'herbe:petit', coriandre: 'herbe:petit', thym: 'herbe:petit', cresson: 'herbe:petit', ciboulette: 'herbe:brins',
    noix: 'noix', chataigne: 'noix:chataigne',
    'pommes-de-terre': 'tubercule', 'patate-douce': 'tubercule', topinambour: 'tubercule',
    artichaut: 'artichaut', 'mais-doux': 'mais',
  };

  /** Renvoie le SVG (texte) d'un produit. Les salades non listées prennent la forme « feuilles ». */
  function svg(p, cls = '') {
    const [forme, variante] = (FORMES[p.id] || (p.cat === 'salade' ? 'feuilles' : p.cat === 'herbe' ? 'herbe' : 'fruit')).split(':');
    const c = p.c, d = nuance(c, -0.28), l = nuance(c, 0.45);
    return `<svg class="illu ${cls}" viewBox="0 0 200 200" aria-hidden="true" focusable="false">${F[forme](c, d, l, variante)}</svg>`;
  }

  return { svg, nuance };
})();
