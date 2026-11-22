/* Saison NE · Recette de la semaine */
'use strict';

/* ---------------------------------------------------------------
   2. Recette
   --------------------------------------------------------------- */
function renderRecette(transition) {
  const box = $('#recipe');
  const hebdo = recetteDeLaSemaine();
  const liste = recettesDuMois(state.mois);
  let r = RECETTES.find(x => x.id === state.recetteId);
  if (!r) r = state.mois === MOIS_ACTUEL ? hebdo : liste[0];
  const facteur = state.personnes / 2;
  const deSaison = r.ingredients.filter(i => i.p && etat(P[i.p], state.mois)).length;

  const titre = h('div', { class: 'recipe-title' },
    h('div', null,
      h('span', { class: 'flag' }, r.id === hebdo.id && state.mois === MOIS_ACTUEL ? `Semaine ${SEMAINE}` : `Idée pour ${MOIS[state.mois - 1]}`),
      h('h3', null, r.titre),
      h('ul', { class: 'facts' },
        h('li', null, h('strong', null, r.temps + ' min')),
        h('li', null, r.budget),
        r.vege ? h('li', null, 'Végétarien') : h('li', null, 'Version végé possible'),
        h('li', null, `${deSaison} produit${deSaison > 1 ? 's' : ''} de saison en ${MOIS[state.mois - 1]}`))),
    h('div', { class: 'portions', role: 'group', 'aria-label': 'Nombre de personnes' },
      [2, 4].map(n => h('button', {
        type: 'button', 'aria-pressed': String(state.personnes === n),
        onclick: () => { state.personnes = n; renderRecette(); },
      }, `${n} personnes`))));

  const ingredients = h('div', { class: 'recipe-body' },
    h('h4', null, 'Ingrédients'),
    h('ul', { class: 'ing' }, r.ingredients.map(ing => {
      const l = ligneIngredient(ing, facteur);
      const p = ing.p && P[ing.p];
      const e = p ? etat(p, state.mois) : undefined;
      return h('li', null,
        h('span', { class: 'q' }, l.q || ''),
        h('span', { class: 'name' }, p ? illu(p, 'ill-ing') : null,
          p ? h('button', { class: 'linkish', type: 'button', style: 'font-weight:500', onclick: ev => ouvrirFiche(p.id, ev.currentTarget) }, l.n) : l.n),
        p ? h('span', { class: 'state ' + (e || 'h') }, ETAT_TXT[e]) : h('span'));
    })));

  const etapes = h('div', { class: 'recipe-body' },
    h('h4', null, 'Préparation'),
    h('ol', { class: 'steps' }, r.etapes.map(t => h('li', null, h('button', { type: 'button', class: 'step', 'aria-pressed': 'false', onclick: ev => cocher(ev.currentTarget) }, h('span', null, t))))),
    h('p', { class: 'note' }, 'Touchez une étape pour la marquer comme faite.'),
    h('div', { class: 'tip' }, h('strong', null, 'Astuce. '), r.astuce),
    h('p', { style: 'margin:16px 0 0' }, h('a', { href: '#ou-acheter' }, 'Où trouver ces produits près de chez vous')));

  const autres = liste.filter(x => x.id !== r.id);
  const plus = h('div', { class: 'more' },
    h('h4', null, `Autres idées pour ${MOIS[state.mois - 1]}`),
    h('div', { class: 'more-list' }, autres.map(x => h('button', {
      type: 'button', 'aria-pressed': 'false',
      onclick: () => { state.recetteId = x.id; renderRecette(true); $('#recette').scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth' }); },
    }, x.titre + (x.id === hebdo.id && state.mois === MOIS_ACTUEL ? ' (cette semaine)' : '')))));

  const remplir = () => box.replaceChildren(titre, ingredients, etapes, plus);
  if (transition && !REDUCE && box.firstChild && box.animate) {
    box.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 140, fill: 'forwards' }).onfinish = function () {
      remplir(); this.cancel(); box.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 260, easing: 'ease-out' });
    };
  } else remplir();
}

function cocher(btn) {
  const fait = btn.getAttribute('aria-pressed') !== 'true';
  btn.setAttribute('aria-pressed', String(fait));
  const li = btn.closest('li');
  if (!REDUCE && li.animate) li.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.03)' }, { transform: 'scale(1)' }], { duration: 260, easing: 'ease-out' });
}
