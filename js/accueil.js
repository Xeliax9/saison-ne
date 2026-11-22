/* Saison NE · Haut de page : mois en cours, étiquettes des produits, vedettes, frise des mois */
'use strict';

/* ---------------------------------------------------------------
   État de la page
   --------------------------------------------------------------- */
const state = {
  mois: MOIS_ACTUEL,
  cat: 'tout',
  calCat: 'tout',
  calRecherche: '',
  recetteId: null,        // null = la recette de la semaine
  personnes: 2,
  typeLieu: 'tout',
  lieuActif: null,
  commune: lsGet('saison-ne.commune', null),
};

const produitsDuMois = (m, cat = 'tout') => PRODUITS
  .filter(p => etat(p, m) && (cat === 'tout' || p.cat === cat))
  .sort((a, b) => ORDRE_CAT.indexOf(a.cat) - ORDRE_CAT.indexOf(b.cat) || a.nom.localeCompare(b.nom, 'fr'));
const recettesDuMois = m => RECETTES.filter(r => r.mois.includes(m));
const SEMAINE = semaineIso(NOW);
/** Un plat principal différent chaque semaine (les desserts restent dans « Autres idées ») */
function recetteDeLaSemaine() {
  const plats = recettesDuMois(MOIS_ACTUEL).filter(r => !r.sucre);
  const liste = plats.length ? plats : recettesDuMois(MOIS_ACTUEL);
  return liste[SEMAINE % liste.length];
}

/* ---------------------------------------------------------------
   1. Le mois (héro)
   --------------------------------------------------------------- */
function renderSemaine() {
  const [lu, di] = bornesSemaine(NOW);
  const debut = lu.getMonth() === di.getMonth() ? String(lu.getDate()) : lu.getDate() + ' ' + MOIS[lu.getMonth()];
  const p = $('#week');
  p.replaceChildren(`Semaine ${SEMAINE}, du ${debut} au ${di.getDate()} ${MOIS[di.getMonth()]}`);
  if (state.mois !== MOIS_ACTUEL) {
    p.append(' ', h('button', { class: 'linkish', type: 'button', onclick: () => setMois(MOIS_ACTUEL) }, `Revenir à ${MOIS[MOIS_ACTUEL - 1]}`));
  }
}

/** Le nom du mois prend toute la largeur sans jamais déborder (« septembre » est le plus long) */
function ajusterTitre() {
  const t = $('#month-title');
  t.style.fontSize = '';
  const dispo = t.clientWidth;
  if (t.scrollWidth > dispo) {
    const taille = parseFloat(getComputedStyle(t).fontSize);
    t.style.fontSize = Math.floor(taille * dispo / t.scrollWidth * 0.98) + 'px';
  }
}

let sens = 1;   // 1 = mois suivant, -1 = mois précédent
function animerTitre(nouveau, premierAffichage) {
  const t = $('#month-title');
  if (REDUCE || !t.animate) { t.textContent = nouveau; ajusterTitre(); return; }
  const entrer = () => t.animate(
    premierAffichage
      ? [{ fontVariationSettings: "'wdth' 62", opacity: 0.2, letterSpacing: '.02em' }, { fontVariationSettings: "'wdth' 125", opacity: 1, letterSpacing: '-.045em' }]
      : [{ fontVariationSettings: "'wdth' 62", opacity: 0, transform: `translateX(${sens * 60}px)` }, { fontVariationSettings: "'wdth' 125", opacity: 1, transform: 'none' }],
    { duration: premierAffichage ? 1000 : 480, easing: 'cubic-bezier(.2,.9,.25,1)' });
  if (premierAffichage) { t.textContent = nouveau; ajusterTitre(); entrer(); return; }
  const sortie = t.animate([{ fontVariationSettings: "'wdth' 125", opacity: 1, transform: 'none' }, { fontVariationSettings: "'wdth' 62", opacity: 0, transform: `translateX(${-sens * 60}px)` }],
    { duration: 180, easing: 'ease-in', fill: 'forwards' });
  sortie.onfinish = () => { t.textContent = nouveau; sortie.cancel(); ajusterTitre(); entrer(); };
}

let dernierCompte = 0;
/** Fait défiler un nombre jusqu'à sa nouvelle valeur */
function compter(node, de, a) {
  if (REDUCE || de === a) { node.textContent = a; return; }
  const t0 = performance.now(), d = 650;
  const pas = now => {
    const k = Math.min(1, (now - t0) / d), e = 1 - Math.pow(1 - k, 3);
    node.textContent = Math.round(de + (a - de) * e);
    if (k < 1) requestAnimationFrame(pas);
  };
  requestAnimationFrame(pas);
}

function renderChipsCategories() {
  const box = $('#cat-chips');
  const total = produitsDuMois(state.mois).length;
  const options = [['tout', 'Tout', total], ...ORDRE_CAT.map(c => [c, CATEGORIES[c].nom, produitsDuMois(state.mois, c).length])];
  box.replaceChildren(...options.map(([id, label, n]) => h('button', {
    class: 'chip', type: 'button', 'aria-pressed': String(state.cat === id),
    onclick: () => { state.cat = id; renderChipsCategories(); renderPlanche(true); renderAccroche(); },
  }, label, h('span', { class: 'n' }, n))));
}

function renderAccroche() {
  const liste = produitsDuMois(state.mois, state.cat);
  const n = liste.length;
  const garde = liste.filter(p => etat(p, state.mois) === 's').length;
  const SING = { legume: 'légume suisse', salade: 'salade suisse', fruit: 'fruit suisse', herbe: 'herbe suisse' };
  const quoi = state.cat === 'tout' ? 'fruits, légumes et herbes suisses'
    : n === 1 ? SING[state.cat] : CATEGORIES[state.cat].nom.toLowerCase() + ' suisses';
  const lead = $('#hero-lead');
  if (!n) { lead.textContent = `Rien dans cette catégorie en ${MOIS[state.mois - 1]}.`; return; }
  const fort = h('strong', null, h('span', { class: 'compte' }, String(n)), ` ${quoi}`);
  compter(fort.firstChild, dernierCompte, n); dernierCompte = n;
  lead.replaceChildren(
    fort,
    `${n === 1 ? ' est' : ' sont'} de saison en ${MOIS[state.mois - 1]}`,
    garde ? `, dont ${garde} de garde. ` : '. ',
    'Touchez un produit pour voir sa saison et quoi en cuisiner.'
  );
}

function autocollant(p, m) {
  const e = etat(p, m);
  const r = ((hash(p.id) % 9) - 4) * 0.7;
  return h('button', {
    class: 'sticker' + (e === 's' ? ' garde' : '') + (estClair(p.c) ? ' light' : ''),
    type: 'button', 'data-id': p.id,
    style: `--c:${p.c};--t:${texteSur(p.c)};--r:${r.toFixed(1)}deg`,
    onclick: ev => ecraser(ev.currentTarget, () => ouvrirFiche(p.id, ev.currentTarget)),
  }, illu(p, 'ill-sticker'), h('span', { class: 'nom' }, p.nom), e === 's' ? h('span', { class: 'visually-hidden' }, ', de garde') : null);
}

function ecraser(node, ensuite) {
  if (REDUCE || !node.animate) { ensuite(); return; }
  node.animate([{ transform: getComputedStyle(node).transform }, { transform: 'scale(.86, .8) rotate(0deg)' }, { transform: 'scale(1.08) rotate(0deg)' }, { transform: 'none' }],
    { duration: 260, easing: 'ease-out' });
  setTimeout(ensuite, 140);
}

let animPlanche = null;
function renderPlanche(anime) {
  const sheet = $('#sheet');
  const liste = produitsDuMois(state.mois, state.cat);
  const construire = () => {
    sheet.replaceChildren(...(liste.length ? liste.map(p => autocollant(p, state.mois))
      : [h('p', { class: 'sheet-empty' }, `Pas de ${CATEGORIES[state.cat].nom.toLowerCase()} suisses en ${MOIS[state.mois - 1]}. Essayez une autre catégorie.`)]));
    if (anime && !REDUCE && sheet.animate) {
      [...sheet.children].forEach((node, i) => {
        const r = parseFloat(node.style.getPropertyValue('--r')) || 0;
        node.animate([
          { opacity: 0, transform: `translateY(-16px) rotate(${(r * 4).toFixed(1)}deg) scale(1.18)` },
          { opacity: 1, transform: `rotate(${r}deg) scale(1)` },
        ], { duration: 420, delay: Math.min(i * 14, 520), easing: 'cubic-bezier(.3,1.4,.5,1)', fill: 'backwards' });
      });
    }
  };
  const anciens = [...sheet.children];
  if (!anime || REDUCE || !anciens.length || !sheet.animate) { construire(); return; }
  if (animPlanche) animPlanche.forEach(a => a.cancel());
  animPlanche = anciens.map((node, i) => node.animate(
    [{ opacity: 1 }, { opacity: 0, transform: 'translateY(10px) scale(.9)' }],
    { duration: 150, delay: Math.min(i * 3, 120), easing: 'ease-in', fill: 'forwards' }));
  Promise.all(animPlanche.map(a => a.finished.catch(() => null))).then(() => { animPlanche = null; construire(); });
}

/** Trois grands produits du mois qui flottent à droite du titre */
function renderVedettes(anime) {
  const box = $('#vedettes'); if (!box) return;
  const frais = produitsDuMois(state.mois).filter(p => etat(p, state.mois) === 'f');
  const pool = frais.length >= 3 ? frais : produitsDuMois(state.mois);
  const vus = new Set(), choix = [];
  for (let k = 0; choix.length < 3 && k < 30 && pool.length; k++) {
    const p = pool[hash(MOIS[state.mois - 1] + ':' + k) % pool.length];
    if (!vus.has(p.id)) { vus.add(p.id); choix.push(p); }
  }
  const remplir = () => {
    box.replaceChildren(...choix.map((p, k) => {
      const b = h('button', { type: 'button', class: 'vedette v' + k, 'aria-label': 'Voir la fiche : ' + p.nom, style: `--fond:${ILLUS.nuance(p.c, 0.55)}`, onclick: ev => ouvrirFiche(p.id, ev.currentTarget) },
        illu(p), h('span', { class: 'vedette-nom' }, p.nom));
      if (anime && !REDUCE && b.animate) b.animate([{ opacity: 0, transform: 'translateY(40px) scale(.5) rotate(-20deg)' }, { opacity: 1, transform: 'none' }],
        { duration: 700, delay: 140 + k * 110, easing: 'cubic-bezier(.3,1.3,.5,1)', fill: 'backwards' });
      return b;
    }));
  };
  const anciens = [...box.children];
  if (!anime || REDUCE || !anciens.length || !box.animate) { remplir(); return; }
  Promise.all(anciens.map((n, k) => n.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(-30px) scale(.6) rotate(15deg)' }],
    { duration: 220, delay: k * 40, easing: 'ease-in', fill: 'forwards' }).finished.catch(() => null))).then(remplir);
}

function renderRail() {
  $('#rail').replaceChildren(...MOIS.map((nom, i) => h('button', {
    type: 'button', 'aria-pressed': String(state.mois === i + 1), 'aria-label': nom + (i + 1 === MOIS_ACTUEL ? ' (mois actuel)' : ''),
    class: i + 1 === MOIS_ACTUEL ? 'today' : null, onclick: () => setMois(i + 1),
  }, MOIS_COURT[i])), h('span', { class: 'rail-pill', 'aria-hidden': 'true' }));
}
let pastillePos = null;
function placerPastille(anime) {
  const rail = $('#rail'), pill = rail.querySelector('.rail-pill');
  const btn = rail.querySelector('button[aria-pressed="true"]');
  if (!pill || !btn) return;
  const pos = { x: btn.offsetLeft, y: btn.offsetTop, w: btn.offsetWidth, h: btn.offsetHeight };
  Object.assign(pill.style, { width: pos.w + 'px', height: pos.h + 'px', transform: `translate(${pos.x}px, ${pos.y}px)` });
  if (anime && pastillePos && !REDUCE && pill.animate) {
    const dx = pastillePos.x - pos.x, dy = pastillePos.y - pos.y;
    pill.animate([
      { transform: `translate(${pastillePos.x}px, ${pastillePos.y}px)`, width: pastillePos.w + 'px' },
      { transform: `translate(${pos.x - dx * 0.08}px, ${pos.y - dy * 0.08}px) scaleX(1.25)`, width: pos.w + 'px', offset: 0.7 },
      { transform: `translate(${pos.x}px, ${pos.y}px)`, width: pos.w + 'px' },
    ], { duration: 520, easing: 'cubic-bezier(.3,1.2,.4,1)' });
  }
  pastillePos = pos;
}

function setMois(m) {
  if (m === state.mois) return;
  const ecart = (m - state.mois + 12) % 12;
  sens = ecart > 0 && ecart <= 6 ? 1 : -1;
  state.mois = m;
  state.recetteId = null;
  animerTitre(MOIS[m - 1], false);
  renderSemaine(); renderChipsCategories(); renderAccroche(); renderPlanche(true); renderVedettes(true); renderRail(); placerPastille(true);
  renderRecette(true); renderCalendrier(true);
}
