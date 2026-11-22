/* Produits : calendrier des saisons (gemuese.ch)
   Fichier de DONNÉES : on peut le modifier sans toucher au code.
   Respecter les virgules et les guillemets, puis recharger la page.
   Si la page devient vide : une virgule ou une accolade manque. */

/* =====================================================================
   Saison NE — données
   ---------------------------------------------------------------------
   - Légumes, salades, herbes : Union maraîchère suisse, calendrier des
     saisons et fiches produits (gemuese.ch), consultés le 6.11.2026.
     f = mois où le produit est récolté en Suisse (« de saison »)
     s = mois où il vient des entrepôts suisses (« de garde »)
   - Fruits : périodes indicatives (Fruit-Union Suisse, communiqués de
     saison 2026). À VÉRIFIER par le groupe avec le tableau des fruits
     de la SSN / du WWF avant la remise.
   - Lieux : dossier loisirs.ch « Où acheter bio et local dans le canton
     de Neuchâtel ? », myfarm.ch, MySwitzerland et j3l.ch. Horaires
     indicatifs, à vérifier régulièrement.
   ===================================================================== */

const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const MOIS_COURT = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

/* Plage de mois qui peut passer par la fin de l'année : R(11, 2) = nov., déc., janv., févr. */
const R = (a, b) => { const o = []; let m = a; for (;;) { o.push(m); if (m === b) break; m = m % 12 + 1; } return o; };
const TOUTE_ANNEE = R(1, 12);

const CATEGORIES = {
  legume: { nom: 'Légumes', un: 'Légume' },
  salade: { nom: 'Salades', un: 'Salade' },
  fruit:  { nom: 'Fruits', un: 'Fruit' },
  herbe:  { nom: 'Herbes', un: 'Herbe aromatique' },
};

/* slug = page de la fiche sur gemuese.ch/fr/especes-de-legumes/<slug> */
const PRODUITS = [
  // ---------- Légumes (gemuese.ch) ----------
  { id: 'ail', nom: 'Ail', cat: 'legume', f: R(6, 7), s: R(8, 12), c: '#EDE4D3', slug: 'ail' },
  { id: 'artichaut', nom: 'Artichaut', cat: 'legume', f: R(7, 10), s: [], c: '#6F8C5C', slug: 'artichaut' },
  { id: 'asperge-blanche', nom: 'Asperge blanche', cat: 'legume', f: R(4, 6), s: [], c: '#F2ECD2', slug: 'asperge-blanche' },
  { id: 'asperge-verte', nom: 'Asperge verte', cat: 'legume', f: R(4, 6), s: [], c: '#5B8A38', slug: 'asperge-verte' },
  { id: 'aubergine', nom: 'Aubergine', cat: 'legume', f: R(4, 10), s: [], c: '#4A2A5E', slug: 'aubergine' },
  { id: 'betterave-rouge', nom: 'Betterave', cat: 'legume', f: R(6, 10), s: R(11, 5), c: '#8E1B47', slug: 'betterave-rouge' },
  { id: 'brocoli', nom: 'Brocoli', cat: 'legume', f: R(5, 11), s: [], c: '#3E6D3A', slug: 'brocoli' },
  { id: 'carotte', nom: 'Carotte', cat: 'legume', f: R(6, 10), s: R(11, 5), c: '#F26B1D', slug: 'carotte-carotte-en-botte' },
  { id: 'celeri-branche', nom: 'Céleri-branche', cat: 'legume', f: R(5, 12), s: [], c: '#9DC26A', slug: 'celeri-branche' },
  { id: 'celeri-rave', nom: 'Céleri-rave', cat: 'legume', f: R(6, 10), s: R(11, 5), c: '#D9CFAC', slug: 'celeri-rave' },
  { id: 'chou-blanc', nom: 'Chou blanc', cat: 'legume', f: R(5, 10), s: R(11, 4), c: '#DCE8C2', slug: 'chou-blanc' },
  { id: 'chou-chinois', nom: 'Chou chinois', cat: 'legume', f: R(5, 3), s: [], c: '#CDE3A3', slug: 'chou-chinois' },
  { id: 'chou-de-bruxelles', nom: 'Chou de Bruxelles', cat: 'legume', f: R(9, 11), s: R(12, 1), c: '#5C8A3B', slug: 'chou-de-bruxelles' },
  { id: 'chou-frise', nom: 'Chou frisé', cat: 'legume', f: TOUTE_ANNEE, s: [], c: '#7FA35B', slug: 'chou-frise' },
  { id: 'chou-kale', nom: 'Chou kale', cat: 'legume', f: R(10, 3), s: [], c: '#2E5C3B', slug: 'chou-kale' },
  { id: 'chou-rouge', nom: 'Chou rouge', cat: 'legume', f: R(5, 10), s: R(11, 4), c: '#6B2C72', slug: 'chou-rouge' },
  { id: 'chou-fleur', nom: 'Chou-fleur', cat: 'legume', f: R(5, 11), s: [], c: '#F0EAD9', slug: 'chou-fleur' },
  { id: 'chou-navet', nom: 'Chou-navet', cat: 'legume', f: R(7, 4), s: [], c: '#C9A86B', slug: 'chou-navet' },
  { id: 'chou-rave', nom: 'Chou-rave', cat: 'legume', f: R(4, 11), s: [], c: '#B8D88A', slug: 'chou-rave' },
  { id: 'concombre', nom: 'Concombre', cat: 'legume', f: R(4, 9), s: [], c: '#3D7C3A', slug: 'concombre' },
  { id: 'cotes-de-bettes', nom: 'Côtes de bettes', cat: 'legume', f: R(3, 11), s: [], c: '#4F7F30', slug: 'cotes-de-bettes' },
  { id: 'courge', nom: 'Courge', cat: 'legume', f: R(8, 10), s: R(11, 2), c: '#DB8A2E', slug: 'courge' },
  { id: 'courgette', nom: 'Courgette', cat: 'legume', f: R(5, 10), s: [], c: '#4D7A2E', slug: 'courgette' },
  { id: 'echalote', nom: 'Échalote', cat: 'legume', f: R(7, 5), s: [], c: '#B4655A', slug: 'echalote' },
  { id: 'endive', nom: 'Endive', cat: 'legume', f: TOUTE_ANNEE, s: [], c: '#F1EBC2', slug: 'endive' },
  { id: 'epinards', nom: 'Épinards', cat: 'legume', f: R(3, 11), s: [], c: '#2F6A34', slug: 'epinards' },
  { id: 'fenouil', nom: 'Fenouil', cat: 'legume', f: R(5, 11), s: [], c: '#E3ECC4', slug: 'fenouil' },
  { id: 'haricots', nom: 'Haricots', cat: 'legume', f: R(6, 10), s: [], c: '#4E8E3B', slug: 'haricots' },
  { id: 'mais-doux', nom: 'Maïs doux', cat: 'legume', f: R(7, 10), s: [], c: '#F2CB3B', slug: 'mais-doux' },
  { id: 'navet', nom: 'Navet', cat: 'legume', f: R(4, 6), s: [], c: '#E6D6E8', slug: 'navet' },
  { id: 'oignon', nom: 'Oignon', cat: 'legume', f: R(6, 10), s: R(11, 5), c: '#C88A49', slug: 'oignon' },
  { id: 'oignons-bottes', nom: 'Oignon nouveau', cat: 'legume', f: R(4, 10), s: [], c: '#CFE2AE', slug: 'oignons-bottes' },
  { id: 'pak-choi', nom: 'Pak choï', cat: 'legume', f: R(4, 11), s: [], c: '#7CB35B', slug: 'pak-choi' },
  { id: 'panais', nom: 'Panais', cat: 'legume', f: R(7, 3), s: [], c: '#EADDB3', slug: 'panais' },
  { id: 'patate-douce', nom: 'Patate douce', cat: 'legume', f: R(9, 2), s: [], c: '#C2552F', slug: 'patate-douce' },
  { id: 'persil-tubereux', nom: 'Persil tubéreux', cat: 'legume', f: R(9, 1), s: [], c: '#E9DEBF', slug: 'persil-tubereux' },
  { id: 'petits-pois', nom: 'Petits pois', cat: 'legume', f: R(6, 7), s: [], c: '#79B342', slug: 'petits-pois' },
  { id: 'poireau', nom: 'Poireau', cat: 'legume', f: TOUTE_ANNEE, s: [], c: '#8DB256', slug: 'poireau' },
  { id: 'pois-mange-tout', nom: 'Pois mange-tout', cat: 'legume', f: R(6, 8), s: [], c: '#8CC44A', slug: 'pois-mange-tout' },
  { id: 'poivron', nom: 'Poivron', cat: 'legume', f: R(6, 10), s: [], c: '#D5302A', slug: 'poivron' },
  // gemuese.ch : récoltées de juin à octobre, disponibles presque toute l'année grâce au stockage
  { id: 'pommes-de-terre', nom: 'Pommes de terre', cat: 'legume', f: R(6, 10), s: R(11, 4), c: '#D1A75E', slug: 'pommes-de-terre' },
  { id: 'radis', nom: 'Radis', cat: 'legume', f: R(3, 12), s: [], c: '#DF456A', slug: 'radis' },
  { id: 'radis-long', nom: 'Radis long', cat: 'legume', f: R(4, 10), s: R(11, 12), c: '#F2EEE5', slug: 'radis-long' },
  { id: 'rave-d-automne', nom: "Rave d'automne", cat: 'legume', f: R(11, 2), s: [], c: '#E2D2E6', slug: 'rave-d-automne' },
  { id: 'rhubarbe', nom: 'Rhubarbe', cat: 'legume', f: R(4, 6), s: [], c: '#C6365C', slug: 'rhubarbe' },
  { id: 'romanesco', nom: 'Romanesco', cat: 'legume', f: R(5, 11), s: [], c: '#9CC340', slug: 'romanesco' },
  { id: 'salsifis', nom: 'Salsifis', cat: 'legume', f: R(10, 12), s: R(1, 2), c: '#5B4636', slug: 'salsifis-scorsonere' },
  { id: 'tomate', nom: 'Tomate', cat: 'legume', f: R(4, 11), s: [], c: '#E23A2E', slug: 'tomate' },
  { id: 'topinambour', nom: 'Topinambour', cat: 'legume', f: R(11, 3), s: [], c: '#B88A5D', slug: 'topinambour' },

  // ---------- Salades (gemuese.ch) ----------
  { id: 'batavia', nom: 'Batavia', cat: 'salade', f: R(3, 11), s: [], c: '#8FC25B', slug: 'batavia-verterouge' },
  { id: 'chicoree', nom: 'Chicorée frisée', cat: 'salade', f: R(5, 11), s: [], c: '#B7D76B', slug: 'chicoree-lissefrisee' },
  { id: 'pain-de-sucre', nom: 'Pain de sucre', cat: 'salade', f: R(6, 11), s: R(12, 2), c: '#CEDF98', slug: 'chicoree-pain-de-sucre' },
  { id: 'cicorino-rosso', nom: 'Cicorino rosso', cat: 'salade', f: R(6, 11), s: R(12, 2), c: '#9A2C4B', slug: 'cicorino-rosso' },
  { id: 'feuille-de-chene', nom: 'Feuille de chêne', cat: 'salade', f: R(3, 12), s: [], c: '#A8513C', slug: 'laitue-feuille-de-chene-verterouge' },
  { id: 'iceberg', nom: 'Iceberg', cat: 'salade', f: R(5, 10), s: [], c: '#C8E39F', slug: 'laitue-iceberg' },
  { id: 'laitue-pommee', nom: 'Laitue pommée', cat: 'salade', f: R(3, 12), s: [], c: '#9BCB62', slug: 'laitue-pommee-verterouge' },
  { id: 'romaine', nom: 'Romaine', cat: 'salade', f: R(4, 10), s: [], c: '#5D9D3E', slug: 'laitue-romaine' },
  { id: 'lollo', nom: 'Lollo', cat: 'salade', f: R(3, 11), s: [], c: '#873456', slug: 'lollo-verterouge' },
  // gemuese.ch : toute l'année, saison principale de septembre à avril
  { id: 'rampon', nom: 'Rampon', cat: 'salade', f: TOUTE_ANNEE, s: [], c: '#3B6D2F', slug: 'rampon' },
  { id: 'roquette', nom: 'Roquette', cat: 'salade', f: R(4, 10), s: [], c: '#49792C', slug: 'roquette' },
  { id: 'cresson', nom: 'Cresson', cat: 'salade', f: R(5, 10), s: [], c: '#2D6A3A', slug: 'cresson-de-fontaine' },

  // ---------- Herbes (gemuese.ch) ----------
  { id: 'basilic', nom: 'Basilic', cat: 'herbe', f: R(6, 8), s: [], c: '#3E893A', slug: 'basilic' },
  { id: 'ciboulette', nom: 'Ciboulette', cat: 'herbe', f: TOUTE_ANNEE, s: [], c: '#4B993F', slug: 'ciboulette' },
  { id: 'coriandre', nom: 'Coriandre', cat: 'herbe', f: R(5, 10), s: [], c: '#5E9F4A', slug: 'coriandre' },
  { id: 'menthe', nom: 'Menthe', cat: 'herbe', f: R(5, 10), s: [], c: '#48A26B', slug: 'menthe' },
  { id: 'persil', nom: 'Persil', cat: 'herbe', f: R(5, 11), s: [], c: '#3A7C2E', slug: 'persil-plat-frise' },
  { id: 'thym', nom: 'Thym', cat: 'herbe', f: R(5, 10), s: [], c: '#7D8E5A', slug: 'thym' },

  // ---------- Fruits (indicatif, voir en-tête) ----------
  { id: 'fraise', nom: 'Fraise', cat: 'fruit', f: R(5, 8), s: [], c: '#E1343F', slug: null },
  { id: 'cerise', nom: 'Cerise', cat: 'fruit', f: R(6, 7), s: [], c: '#8D1631', slug: null },
  { id: 'abricot', nom: 'Abricot', cat: 'fruit', f: R(7, 8), s: [], c: '#F29A3A', slug: null },
  { id: 'framboise', nom: 'Framboise', cat: 'fruit', f: R(6, 9), s: [], c: '#D13A62', slug: null },
  { id: 'groseille', nom: 'Groseille', cat: 'fruit', f: R(6, 8), s: [], c: '#D7303F', slug: null },
  { id: 'myrtille', nom: 'Myrtille', cat: 'fruit', f: R(7, 9), s: [], c: '#3A4A8C', slug: null },
  { id: 'mure', nom: 'Mûre', cat: 'fruit', f: R(7, 9), s: [], c: '#2E1F3F', slug: null },
  { id: 'melon', nom: 'Melon', cat: 'fruit', f: R(7, 8), s: [], c: '#F2A55A', slug: 'melon' },
  { id: 'pruneau', nom: 'Pruneau', cat: 'fruit', f: R(8, 9), s: [], c: '#4A2D64', slug: null },
  { id: 'mirabelle', nom: 'Mirabelle', cat: 'fruit', f: R(8, 9), s: [], c: '#E6C13A', slug: null },
  { id: 'pomme', nom: 'Pomme', cat: 'fruit', f: R(8, 11), s: R(12, 7), c: '#CE3A2F', slug: null },
  { id: 'poire', nom: 'Poire', cat: 'fruit', f: R(8, 10), s: R(11, 3), c: '#C5C24A', slug: null },
  { id: 'coing', nom: 'Coing', cat: 'fruit', f: R(9, 11), s: [], c: '#E2C34B', slug: null },
  { id: 'raisin', nom: 'Raisin', cat: 'fruit', f: R(9, 10), s: [], c: '#6A3D7A', slug: null },
  { id: 'noix', nom: 'Noix', cat: 'fruit', f: R(9, 11), s: [], c: '#9A6A3E', slug: null },
  { id: 'chataigne', nom: 'Châtaigne', cat: 'fruit', f: R(10, 11), s: [], c: '#7A4A2A', slug: null },
];

