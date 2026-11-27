/* Saison NE · Outils partagés : création d'éléments, dates, textes, mémoire du navigateur */
'use strict';

/* ---------------------------------------------------------------
   Outils
   --------------------------------------------------------------- */
const $ = (s, root = document) => root.querySelector(s);
// Animations actives par défaut (beaucoup de PC Windows ont « effets d'animation » coupés,
// ce qui désactivait tout). Un bouton en bas de page permet de les couper.
let REDUCE = false;
try { REDUCE = localStorage.getItem('saison-anim') === 'off'; } catch (e) {}
const NOW = new Date();
const MOIS_ACTUEL = NOW.getMonth() + 1;
const P = Object.fromEntries(PRODUITS.map(p => [p.id, p]));
const ORDRE_CAT = ['legume', 'salade', 'fruit', 'herbe'];
const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

/** Petit constructeur d'éléments : h('p', {class: 'x'}, 'texte', autreNoeud) */
function h(tag, attrs, ...kids) {
  const node = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (v === null || v === undefined || v === false) continue;
      if (k === 'class') node.className = v;
      else if (k === 'style') node.style.cssText = v;
      else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
      else if (k === 'text') node.textContent = v;
      else node.setAttribute(k, v === true ? '' : v);
    }
  }
  for (const kid of kids.flat()) {
    if (kid === null || kid === undefined || kid === false) continue;
    node.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
  }
  return node;
}
const svgNS = 'http://www.w3.org/2000/svg';
function s(tag, attrs, ...kids) {
  const node = document.createElementNS(svgNS, tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === null || v === undefined) continue;
    if (k === 'text') node.textContent = v; else node.setAttribute(k, v);
  }
  kids.flat().forEach(k => k && node.append(k));
  return node;
}

/** Petite illustration d'un produit (élément) */
function illu(p, cls) {
  const box = document.createElement('span');
  box.className = 'ill ' + (cls || '');
  if (typeof PHOTOS !== 'undefined' && PHOTOS.has(p.id)) {
    box.classList.add('photo');
    const img = document.createElement('img');
    const grande = 'photos/' + p.id + '.jpg';
    img.alt = ''; img.decoding = 'async';
    const cadrage = typeof CREDITS !== 'undefined' && CREDITS[p.id] && CREDITS[p.id].cadrage;
    if (cadrage) img.style.objectPosition = cadrage;   // ex. '50% 80%' : le produit est en bas de la photo
    if (cls === 'ill-fiche' || typeof VIGNETTES === 'undefined' || !VIGNETTES) img.src = grande;
    else {
      // Petites pastilles : vignette légère (photos/petites/), la grande photo en secours
      img.loading = 'lazy';
      img.onerror = () => { img.onerror = null; img.src = grande; };
      img.src = 'photos/petites/' + p.id + '.jpg';
    }
    box.appendChild(img);
  } else box.innerHTML = ILLUS.svg(p);
  return box;
}

const normalise = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const hash = str => [...str].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

/** 'f' = récolté ce mois-ci, 's' = de garde, null = pas de production suisse */
const etat = (p, m) => p.f.includes(m) ? 'f' : p.s.includes(m) ? 's' : null;
const ETAT_TXT = { f: 'de saison', s: 'de garde', null: 'hors saison' };

function lumi(hex) {
  const c = hex.replace('#', '').match(/../g).map(x => parseInt(x, 16) / 255)
    .map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
const contraste = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
const L_INK = lumi('#10343C');
/** Encre ou blanc : on garde la couleur de texte qui contraste le plus */
const texteSur = hex => contraste(lumi(hex), L_INK) >= contraste(lumi(hex), 1) ? '#10343C' : '#FFFFFF';
const estClair = hex => lumi(hex) > 0.45;

const deMois = m => (/^[aeiouyéèâêîôû]/i.test(MOIS[m - 1]) ? 'd’' : 'de ') + MOIS[m - 1];
function periode(mois) {
  if (!mois.length) return '';
  if (mois.length === 12) return 'toute l’année';
  if (mois.length === 1) return 'en ' + MOIS[mois[0] - 1];
  return deMois(mois[0]) + ' à ' + MOIS[mois[mois.length - 1] - 1];
}

function semaineIso(d) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const jour = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - jour);
  const debutAnnee = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return Math.ceil(((t - debutAnnee) / 86400000 + 1) / 7);
}
function bornesSemaine(d) {
  const lundi = new Date(d); lundi.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  const dimanche = new Date(lundi); dimanche.setDate(lundi.getDate() + 6);
  return [lundi, dimanche];
}

const FRACTIONS = { 0.25: '¼', 0.5: '½', 0.75: '¾' };
function quantite(q) {
  if (!q) return '';
  const ent = Math.floor(q), reste = Math.round((q - ent) * 100) / 100;
  if (FRACTIONS[reste]) return (ent ? ent + ' ' : '') + FRACTIONS[reste];
  return String(Math.round(q * 10) / 10).replace('.', ',');
}
const PLURIELS = {
  'chou-rave': 'choux-raves', 'oignon nouveau': 'oignons nouveaux', 'pak choï': 'pak choïs', 'chou-fleur': 'choux-fleurs', 'chou rouge': 'choux rouges',
  'saucisson neuchâtelois (ou 1 boîte de pois chiches)': 'saucissons neuchâtelois (ou 2 boîtes de pois chiches)',
};
const UNITES_PL = { gousse: 'gousses', tranche: 'tranches', poignée: 'poignées', botte: 'bottes', pincée: 'pincées', rouleau: 'rouleaux', morceau: 'morceaux', branche: 'branches' };
function ligneIngredient(ing, facteur) {
  const q = ing.q * facteur;
  let unite = ing.u, nom = ing.n;
  if (q > 1 && UNITES_PL[unite]) unite = UNITES_PL[unite];
  if (q > 1 && !ing.u) {
    if (PLURIELS[nom]) nom = PLURIELS[nom];
    else nom = nom.replace(/^(\S+)/, w => /[sxz]$/.test(w) ? w : w + 's');
  }
  return { q: [quantite(q), unite].filter(Boolean).join(' '), n: nom };
}

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

function lsGet(key, fallback) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } }
function lsSet(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); return true; } catch (e) { return false; } }
