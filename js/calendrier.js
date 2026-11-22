/* Saison NE · Calendrier des saisons (tableau) */
'use strict';

/* ---------------------------------------------------------------
   3. Calendrier
   --------------------------------------------------------------- */
function renderChipsCalendrier() {
  const options = [['tout', 'Tout'], ...ORDRE_CAT.map(c => [c, CATEGORIES[c].nom])];
  $('#cal-chips').replaceChildren(...options.map(([id, label]) => h('button', {
    class: 'chip', type: 'button', 'aria-pressed': String(state.calCat === id),
    onclick: () => { state.calCat = id; renderChipsCalendrier(); renderCalendrier(); },
  }, label)));
}

let calVu = false;
function pousserBarres(seulementColonne) {
  if (REDUCE) return;
  const lignes = [...document.querySelectorAll('#cal tbody tr[data-id]')];
  lignes.forEach((tr, i) => {
    const barres = seulementColonne ? tr.querySelectorAll('td.col-now .c') : tr.querySelectorAll('.c');
    barres.forEach(b => {
      const col = b.parentElement.cellIndex;
      b.animate([{ transform: 'scaleX(0)', opacity: 0.3 }, { transform: 'scaleX(1)', opacity: 1 }],
        { duration: seulementColonne ? 380 : 520, delay: seulementColonne ? Math.min(i * 8, 300) : Math.min(i * 10, 500) + col * 22, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
    });
  });
}

function renderCalendrier(changementMois) {
  const table = $('#cal');
  if (!table.querySelector('colgroup')) {
    table.tHead.before(h('colgroup', null, h('col', { class: 'c-nom' }), MOIS.map(() => h('col'))));
  }
  table.tHead.replaceChildren(h('tr', null,
    h('th', { scope: 'col' }, 'Produit'),
    MOIS_COURT.map((m, i) => h('th', { scope: 'col', abbr: MOIS[i], class: i + 1 === state.mois ? 'col-now' : null }, m))));

  const q = normalise(state.calRecherche.trim());
  const lignes = [];
  for (const cat of ORDRE_CAT) {
    if (state.calCat !== 'tout' && state.calCat !== cat) continue;
    const items = PRODUITS.filter(p => p.cat === cat && (!q || normalise(p.nom).includes(q)))
      .sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
    if (!items.length) continue;
    if (state.calCat === 'tout') lignes.push(h('tr', { class: 'group' }, h('th', { colspan: '13', scope: 'colgroup' }, CATEGORIES[cat].nom)));
    for (const p of items) {
      const ouvrir = ev => ouvrirFiche(p.id, ev && ev.currentTarget);
      lignes.push(h('tr', {
        tabindex: '0', 'data-id': p.id, onclick: ouvrir,
        onkeydown: ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); ouvrir(); } },
      },
        h('th', { scope: 'row' }, illu(p, 'ill-row'), p.nom),
        MOIS.map((nom, i) => {
          const e = etat(p, i + 1);
          return h('td', { class: i + 1 === state.mois ? 'col-now' : null },
            e ? h('span', { class: 'c ' + e }) : null,
            h('span', { class: 'visually-hidden' }, e ? (e === 'f' ? 'récolté' : 'de garde') : 'non'));
        })));
    }
  }
  if (!lignes.length) lignes.push(h('tr', null, h('td', { colspan: '13', class: 'cal-empty' }, `Aucun produit ne correspond à « ${state.calRecherche} ».`)));
  table.tBodies[0].replaceChildren(...lignes);
  if (changementMois && calVu) pousserBarres(true);
}
