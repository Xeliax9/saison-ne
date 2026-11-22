/* Lieux de vente dans le canton de Neuchâtel
   Fichier de DONNÉES : on peut le modifier sans toucher au code.
   Respecter les virgules et les guillemets, puis recharger la page.
   Si la page devient vide : une virgule ou une accolade manque. */

/* ---------------------------------------------------------------------
   Lieux de vente. type : marche | ferme | panier | epicerie | enligne
   jours : 0 = dimanche … 6 = samedi (pour « aujourd'hui »)
   lat/lon : position approximative (village), l'adresse fait foi.
   --------------------------------------------------------------------- */
const TYPES_LIEUX = {
  marche:   { nom: 'Marchés', un: 'Marché', c: '#B32E5C' },
  ferme:    { nom: 'Fermes et self-services', un: 'Ferme', c: '#2E7D46' },
  panier:   { nom: 'Paniers', un: 'Paniers', c: '#2C6A7B' },
  epicerie: { nom: 'Épiceries locales', un: 'Épicerie', c: '#7A4FA0' },
  enligne:  { nom: 'En ligne', un: 'En ligne', c: '#46636A' },
};

const LIEUX = [
  { id: 'marche-neuchatel', nom: 'Marché de Neuchâtel', type: 'marche', localite: 'Neuchâtel', adresse: 'Place des Halles, 2000 Neuchâtel', lat: 46.9900, lon: 6.9296,
    horaires: 'Mardi, jeudi et samedi, 7 h – 13 h', jours: [2, 4, 6], heures: [7, 13],
    produits: 'Fruits et légumes, fromages, poissons du lac, viande, œufs, miel, pain', site: 'https://www.marche-neuchatel.ch' },
  { id: 'marche-chaux-de-fonds', nom: 'Marché de La Chaux-de-Fonds', type: 'marche', localite: 'La Chaux-de-Fonds', adresse: 'Place du Marché, 2300 La Chaux-de-Fonds', lat: 47.1012, lon: 6.8300,
    horaires: 'Mercredi et samedi matin, env. 6 h – 12 h', jours: [3, 6], heures: [6, 12],
    produits: 'Fruits, légumes et produits de la région', site: null },
  { id: 'pres-d-areuse', nom: "Domaine des Prés d'Areuse", type: 'ferme', localite: 'Areuse (Boudry)', adresse: 'Route du Lac 11, 2015 Areuse', lat: 46.9545, lon: 6.8600,
    horaires: 'Magasin : ma, me et ve 8 h 30 – 12 h et 14 h – 17 h 30, sa 8 h 30 – 16 h', jours: [2, 3, 5, 6],
    produits: 'Légumes, fruits, viande, poisson, produits laitiers, œufs, miel, farine', site: 'https://aux-pres-de-chez-vous.ch' },
  { id: 'trois-rods', nom: 'Ferme de Trois-Rods', type: 'ferme', localite: 'Boudry', adresse: 'Route de Trois-Rods 42, 2017 Boudry', lat: 46.9574, lon: 6.8280,
    horaires: 'Self-service tous les jours, 8 h – 20 h', jours: [0, 1, 2, 3, 4, 5, 6],
    produits: 'Légumes, fruits, viande, produits laitiers, pain, miel, farine', site: 'https://fermedetroisrods.ch' },
  { id: 'domaine-des-gorges', nom: 'Domaine des Gorges', type: 'panier', localite: 'Boudry', adresse: 'Chemin des Clées 1, 2017 Boudry', lat: 46.9512, lon: 6.8330,
    horaires: 'Paniers de légumes tous les 15 jours, à retirer sur place. Self-service : se renseigner',
    produits: 'Légumes et fruits', site: 'https://domainedesgorges.ch' },
  { id: 'biosem', nom: 'Biosem', type: 'ferme', localite: 'Chambrelien (Rochefort)', adresse: 'Le Burkli 83, 2019 Chambrelien', lat: 46.9708, lon: 6.8150,
    horaires: 'Jardin en self-service de mai à novembre, petit magasin à la ferme en hiver',
    produits: 'Légumes bio, céréales, huile, jus de pomme, farine', site: 'https://biosem.ch' },
  { id: 'pa-bio', nom: 'Pa-Bio', type: 'ferme', localite: 'Cortaillod', adresse: 'Route de Longe-Coca 5, 2016 Cortaillod', lat: 46.9410, lon: 6.8485,
    horaires: 'Self-service tous les jours, 5 h – 23 h 30', jours: [0, 1, 2, 3, 4, 5, 6],
    produits: 'Légumes, fruits, œufs, pain au levain, confitures', site: null, tel: '079 819 38 00' },
  { id: 'agriculture-feerique', nom: 'Agriculture Féerique', type: 'ferme', localite: 'Engollon (Val-de-Ruz)', adresse: "Rue de l'Église 4, 2063 Engollon", lat: 47.0390, lon: 6.9210,
    horaires: 'Self-service 24 h / 24', jours: [0, 1, 2, 3, 4, 5, 6],
    produits: 'Légumes, fruits, œufs, pain au levain, céréales, huile', site: 'https://agrifeerique.ch' },
  { id: 'domaine-aurore', nom: "Domaine de l'Aurore", type: 'ferme', localite: 'Cernier (Val-de-Ruz)', adresse: "Les Sagnes d'Avenches 1, 2053 Cernier", lat: 47.0555, lon: 6.8955,
    horaires: 'Self-service du lundi au samedi, 8 h – 19 h', jours: [1, 2, 3, 4, 5, 6],
    produits: 'Viande, charcuterie, lait, pâtes, céréales, farine, jus de pomme', site: null, tel: '079 394 63 10' },
  { id: 'ferme-des-tourbieres', nom: 'Ferme des Tourbières', type: 'ferme', localite: 'Brot-Plamboz', adresse: 'Le Joratel 2, 2318 Brot-Plamboz', lat: 46.9880, lon: 6.7440,
    horaires: 'Marché à la ferme tous les jours, 7 h – 20 h', jours: [0, 1, 2, 3, 4, 5, 6],
    produits: 'Fromage, viande séchée, pâtes, lentilles, farine, œufs, jus de pomme', site: 'https://fermedestourbieres.ch' },
  { id: 'aubier', nom: "L'Aubier", type: 'epicerie', localite: 'Montézillon (Rochefort)', adresse: 'Les Murailles 5, 2205 Montézillon', lat: 46.9925, lon: 6.8455,
    horaires: 'Boutique de la ferme, horaires sur le site',
    produits: 'Fromage, pain, lait et produits de la ferme', site: 'https://aubier.ch' },
  { id: 'rage-de-vert', nom: 'Rage de Vert', type: 'panier', localite: 'Thielle-Wavre (La Tène)', adresse: 'Closel-Bourbon 3, 2075 Thielle-Wavre', lat: 47.0222, lon: 7.0235,
    horaires: 'Panier bio chaque semaine (abonnement). Livraison à vélo à Neuchâtel et à La Chaux-de-Fonds, ou retrait dans des points de distribution',
    produits: 'Légumes bio', site: 'https://ragedevert.ch' },
  { id: 'chez-mamie', nom: 'Chez Mamie', type: 'epicerie', localite: 'Corcelles (Neuchâtel)', adresse: 'Avenue Soguel 10C, 2035 Corcelles', lat: 46.9885, lon: 6.8765,
    horaires: 'Épicerie en vrac, horaires sur le site',
    produits: 'Produits bio et régionaux en vrac', site: 'https://chezmamie-biovrac.ch' },
  { id: 'cellier-des-fees', nom: 'Le Cellier des Fées', type: 'epicerie', localite: 'Fleurier (Val-de-Travers)', adresse: 'Fleurier', lat: 46.9022, lon: 6.5825,
    horaires: 'Épicerie coopérative, se renseigner',
    produits: 'Produits locaux en vrac', site: null },
  { id: 'gout-et-region', nom: 'Goût & Région', type: 'epicerie', localite: 'Noiraigue (Val-de-Travers)', adresse: 'Gare de Noiraigue, 2103 Noiraigue', lat: 46.9566, lon: 6.7255,
    horaires: 'Boutique à la gare et marché du terroir en ligne',
    produits: 'Produits du Val-de-Travers : fromages, charcuterie, miel, sirops', site: null },
  { id: 'esprit-d-ici', nom: "Esprit d'ici", type: 'enligne', localite: 'Tout le canton', adresse: null, lat: null, lon: null,
    horaires: 'Commande en ligne, livraison à domicile dans le canton',
    produits: 'Produits de producteurs locaux', site: 'https://espritdici.ch' },
];

/* Villes affichées sur la carte (GeoNames) */
const VILLES = [
  { nom: 'Neuchâtel', lat: 46.9918, lon: 6.9310, rang: 1, dx: 14, dy: 24, ancre: 'start' },
  { nom: 'La Chaux-de-Fonds', lat: 47.0999, lon: 6.8259, rang: 1, dx: -12, dy: -12, ancre: 'end' },
  { nom: 'Le Locle', lat: 47.0562, lon: 6.7491, rang: 2, dx: -8, dy: -9, ancre: 'end' },
  { nom: 'Fleurier', lat: 46.9022, lon: 6.5825, rang: 2, dx: 0, dy: 26, ancre: 'middle' },
  { nom: 'Cernier', lat: 47.0588, lon: 6.9004, rang: 2, dx: 10, dy: -10, ancre: 'start' },
  { nom: 'Boudry', lat: 46.9499, lon: 6.8376, rang: 2, dx: -16, dy: 18, ancre: 'end' },
  { nom: 'Le Landeron', lat: 47.0570, lon: 7.0705, rang: 2, dx: -8, dy: -9, ancre: 'end' },
];

/* Localités proposées dans le formulaire « Proposer un lieu » */
const LOCALITES = [
  ['Auvernier', 46.9755, 6.8790], ['Bevaix', 46.9296, 6.8147], ['Boudry', 46.9499, 6.8376], ['Brot-Plamboz', 46.9880, 6.7440],
  ['Cernier', 47.0588, 6.9004], ['Chézard-Saint-Martin', 47.0663, 6.9333], ['Colombier', 46.9660, 6.8640], ['Corcelles-Cormondrèche', 46.9885, 6.8765],
  ['Cornaux', 47.0396, 7.0187], ['Cortaillod', 46.9431, 6.8444], ['Couvet', 46.9253, 6.6327], ['Cressier', 47.0491, 7.0346],
  ['Dombresson', 47.0719, 6.9592], ['Fleurier', 46.9022, 6.5825], ['Fontainemelon', 47.0550, 6.8868], ['Gorgier', 46.9014, 6.7799],
  ['Hauterive', 47.0120, 6.9720], ['La Brévine', 46.9810, 6.6060], ['La Chaux-de-Fonds', 47.0999, 6.8259], ['La Sagne', 47.0410, 6.8070],
  ['Le Landeron', 47.0570, 7.0705], ['Le Locle', 47.0562, 6.7491], ['Les Brenets', 47.0677, 6.7048], ['Les Geneveys-sur-Coffrane', 47.0153, 6.8513],
  ['Les Ponts-de-Martel', 46.9974, 6.7306], ['Lignières', 47.0830, 7.0670], ['Marin-Epagnier', 47.0102, 6.9994], ['Môtiers', 46.9110, 6.6110],
  ['Neuchâtel', 46.9918, 6.9310], ['Noiraigue', 46.9566, 6.7255], ['Peseux', 46.9870, 6.8890], ['Rochefort', 46.9777, 6.8084],
  ['Saint-Aubin-Sauges', 46.8942, 6.7725], ['Saint-Blaise', 47.0151, 6.9883], ['Savagnier', 47.0510, 6.9549], ['Travers', 46.9402, 6.6760],
  ['Valangin', 47.0160, 6.9070], ['Les Verrières', 46.9040, 6.4800],
];

