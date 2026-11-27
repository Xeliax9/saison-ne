/* Saison NE · Fiche produit qui s'ouvre au clic + animations d'ouverture/fermeture */
'use strict';

/* ---------------------------------------------------------------
   4. Fiche produit
   --------------------------------------------------------------- */
let origineFiche = null;

/** Photos d'un produit : la principale (photos.js) puis celles de la galerie (galerie.js) */
function photosDe(p) {
  if (typeof PHOTOS === 'undefined' || !PHOTOS.has(p.id)) return [];
  const extra = (typeof GALERIE !== 'undefined' && GALERIE[p.id]) || [];
  return [{ src: 'photos/' + p.id + '.jpg', ...CREDITS[p.id] },
    ...extra.map(g => ({ src: 'photos/' + g.fichier, ...g }))];
}

/** Ligne de crédit d'une photo (obligatoire pour les licences Wikimedia) */
const creditPhoto = ph => ['Photo : ', h('a', { href: ph.url }, ph.auteur || 'Wikimedia Commons'),
  ', ' + (ph.licence || 'licence libre') + ', Wikimedia Commons'];

/** Galerie : les photos défilent au doigt (scroll-snap), avec flèches et points */
function galerieFiche(p, photos, credit) {
  const piste = h('div', { class: 'piste' }, photos.map((ph, k) =>
    h('img', { src: ph.src, alt: k ? `${p.nom}, photo ${k + 1}` : '', decoding: 'async', draggable: 'false',
      style: ph.cadrage ? 'object-position:' + ph.cadrage : null })));
  const points = photos.map((_, k) => h('button', {
    type: 'button', class: k ? null : 'actif', 'aria-label': `Photo ${k + 1} sur ${photos.length}`, onclick: () => aller(k),
  }));
  let i = 0;
  function aller(k) {
    k = (k + photos.length) % photos.length;
    piste.scrollTo({ left: k * piste.clientWidth, behavior: REDUCE ? 'auto' : 'smooth' });
  }
  piste.addEventListener('scroll', () => {
    const k = Math.round(piste.scrollLeft / Math.max(1, piste.clientWidth));
    if (k === i || !photos[k]) return;
    i = k;
    points.forEach((b, j) => b.classList.toggle('actif', j === k));
    credit.replaceChildren(...creditPhoto(photos[k]));
  }, { passive: true });
  const fleche = (sens, d) => h('button', { type: 'button', class: 'gal-fleche ' + sens, 'aria-label': sens === 'prec' ? 'Photo précédente' : 'Photo suivante', onclick: () => aller(i + (sens === 'prec' ? -1 : 1)) },
    s('svg', { viewBox: '0 0 24 24', width: '18', height: '18', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.6', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true' }, s('path', { d })));
  return [h('span', { class: 'ill ill-fiche photo galerie' }, piste),
    fleche('prec', 'M15 6l-6 6 6 6'), fleche('suiv', 'M9 6l6 6-6 6'),
    h('div', { class: 'gal-points' }, points)];
}

function ouvrirFiche(id, origine) {
  const p = P[id]; if (!p) return;
  const dlg = $('#fiche'), body = $('#fiche-body');
  const e = etat(p, state.mois);
  const recettes = RECETTES.filter(r => r.ingredients.some(i => i.p === id));
  const phrase = [];
  if (p.f.length) phrase.push(`Récolté en Suisse ${periode(p.f)}.`);
  if (p.s.length) phrase.push(`De garde ${periode(p.s)}.`);
  const statut = e === 'f' ? `Récolté en ${MOIS[state.mois - 1]}` : e === 's' ? `De garde en ${MOIS[state.mois - 1]}` : `Pas de production suisse en ${MOIS[state.mois - 1]}`;
  const confettis = Array.from({ length: 12 }, (_, k) => {
    const a = (k / 12) * Math.PI * 2, d = 120 + (k % 3) * 28;
    return h('i', { class: 'confetti', style: `--x:${(Math.cos(a) * d).toFixed(0)}px;--y:${(Math.sin(a) * d * 0.6).toFixed(0)}px;--s:${6 + (k % 4) * 3}px;--d:${200 + k * 18}ms;background:${k % 3 ? ILLUS.nuance(p.c, 0.3) : '#fff'}` });
  });
  const photos = photosDe(p);
  const credit = photos.length ? h('p', { class: 'credit' }, creditPhoto(photos[0])) : null;
  const image = photos.length > 1 ? galerieFiche(p, photos, credit) : illu(p, 'ill-fiche');
  body.replaceChildren(
    h('button', { class: 'close', type: 'button', 'aria-label': 'Fermer', onclick: () => fermerFiche() },
      s('svg', { viewBox: '0 0 24 24', width: '18', height: '18', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.4', 'stroke-linecap': 'round', 'aria-hidden': 'true' }, s('path', { d: 'M6 6l12 12M18 6L6 18' }))),
    h('div', { class: 'fiche-tete', style: `--c:${p.c};--fond:${ILLUS.nuance(p.c, 0.8)};--fond2:${ILLUS.nuance(p.c, 0.62)}` },
      h('span', { class: 'rond r1' }), h('span', { class: 'rond r2' }), h('span', { class: 'rond r3' }),
      confettis, image),
    h('div', { class: 'fiche-corps' },
      h('p', { class: 'kind' }, CATEGORIES[p.cat].un),
      h('h2', { id: 'fiche-title', class: 'fiche-nom' }, p.nom),
      h('span', { class: 'statut ' + (e || 'h') }, h('i'), statut),
      h('div', { class: 'yearbar', role: 'img', 'aria-label': phrase.join(' ') },
        MOIS_COURT.map((m, i) => h('div', { class: i + 1 === state.mois ? 'now' : null }, h('span', { class: etat(p, i + 1) || '' }), m))),
      h('p', { class: 'say' }, phrase.join(' ')),
      recettes.length ? h('h4', null, 'À cuisiner avec') : null,
      recettes.length ? h('ul', { class: 'fiche-recettes' }, recettes.map(r => h('li', null, h('button', {
        type: 'button', onclick: () => fermerFiche(() => {
          if (!r.mois.includes(state.mois)) setMois(r.mois[0]);
          state.recetteId = r.id; renderRecette(true);
          $('#recette').scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth' });
        }),
      }, h('strong', null, r.titre), h('span', null, `${r.temps} min, ${periode(r.mois)}`))))) : null,
      h('p', { class: 'src' }, p.slug ? h('a', { href: 'https://www.gemuese.ch/fr/especes-de-legumes/' + p.slug }, 'Fiche complète sur gemuese.ch') : 'Période indicative, à confirmer.'),
      credit));

  origineFiche = origine && origine.isConnected ? origine : null;
  if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
  dlg.scrollTop = 0;
  if (REDUCE || !dlg.animate) return;

  // 1. la fenêtre grandit depuis l'élément touché
  const fin = dlg.getBoundingClientRect();
  const debut = origineFiche ? origineFiche.getBoundingClientRect() : null;
  dlg.style.transformOrigin = debut ? '0 0' : '50% 50%';
  dlg.animate(debut
    ? [{ transform: `translate(${debut.left - fin.left}px, ${debut.top - fin.top}px) scale(${debut.width / fin.width}, ${debut.height / fin.height})`, borderRadius: '200px', opacity: 0.5 },
       { transform: 'none', borderRadius: '26px', opacity: 1 }]
    : [{ transform: 'translateY(30px) scale(.94)', opacity: 0 }, { transform: 'none', opacity: 1 }],
    { duration: 560, easing: 'cubic-bezier(.2,.9,.2,1.04)' });
  // 2. l'illustration arrive en rebondissant, les ronds s'ouvrent
  const ill = body.querySelector('.ill-fiche');
  if (ill.classList.contains('photo')) ill.animate(
    [{ clipPath: 'circle(12% at 50% 55%)', transform: 'scale(1.35)', filter: 'saturate(.4) blur(6px)' },
     { clipPath: 'circle(75% at 50% 50%)', transform: 'scale(1)', filter: 'none' }],
    { duration: 900, delay: 120, easing: 'cubic-bezier(.6,0,.2,1)', fill: 'backwards' });
  else ill.animate(
    [{ transform: 'translateY(60px) scale(.3) rotate(-25deg)', opacity: 0 }, { transform: 'translateY(-8px) scale(1.08) rotate(6deg)', opacity: 1, offset: 0.65 }, { transform: 'none', opacity: 1 }],
    { duration: 820, delay: 180, easing: 'cubic-bezier(.3,.8,.3,1)', fill: 'backwards' });
  body.querySelectorAll('.rond').forEach((r, k) => r.animate([{ transform: 'scale(0)' }, { transform: 'scale(1)' }],
    { duration: 700, delay: 100 + k * 90, easing: 'cubic-bezier(.3,1.4,.5,1)', fill: 'backwards' }));
  // 3. le texte monte en cascade
  [...body.querySelector('.fiche-corps').children].forEach((el, k) => el.animate(
    [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }],
    { duration: 420, delay: 260 + k * 60, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' }));
  body.querySelectorAll('.yearbar span').forEach((sp, i) => sp.animate(
    [{ transform: 'scaleY(.2)', opacity: 0 }, { transform: 'scaleY(1)', opacity: 1 }],
    { duration: 380, delay: 440 + i * 35, easing: 'cubic-bezier(.3,1.4,.5,1)', fill: 'backwards' }));
}

let fermeture = false;
function fermerFiche(ensuite) {
  const dlg = $('#fiche');
  if (!dlg.open || fermeture) return;
  const finir = () => { fermeture = false; dlg.close(); if (ensuite) ensuite(); };
  if (REDUCE || !dlg.animate) { finir(); return; }
  fermeture = true;
  const a = dlg.getBoundingClientRect();
  const b = origineFiche && origineFiche.isConnected ? origineFiche.getBoundingClientRect() : null;
  const vers = b && b.width && b.bottom > 0 && b.top < innerHeight
    ? { transform: `translate(${b.left - a.left}px, ${b.top - a.top}px) scale(${b.width / a.width}, ${b.height / a.height})`, borderRadius: '200px', opacity: 0 }
    : { transform: 'translateY(24px) scale(.95)', opacity: 0 };
  dlg.style.transformOrigin = '0 0';
  dlg.animate([{ transform: 'none', opacity: 1 }, vers], { duration: 300, easing: 'cubic-bezier(.5,0,.75,0)', fill: 'forwards' })
    .onfinish = function () { finir(); this.cancel(); };
}

function brancherDialogs() {
  const dlg = $('#fiche');
  dlg.addEventListener('click', ev => { if (ev.target === dlg) fermerFiche(); });
  dlg.addEventListener('cancel', ev => { ev.preventDefault(); fermerFiche(); });
}
