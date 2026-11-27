# Contexte pour Claude — Saison NE

Lu automatiquement par Claude Code au début de chaque session. Le tenir à jour quand une décision change.

## Le projet
- TIP 2026-2027 du **groupe 11 au CPNE** (Neuchâtel). Problématique : comment inciter les gens à manger des produits locaux de saison ?
- Site « Saison NE » : ce qui pousse en Suisse ce mois-ci, une recette de saison par semaine, où acheter local dans le canton de Neuchâtel.
- Base des saisons : calendrier de l'Union maraîchère suisse (gemuese.ch/fr/calendrier-des-saisons).
- Le site sera hébergé sur **GitHub Pages** (branche `main`, racine).

## Règles techniques
- HTML/CSS/JS simples, **pas de framework, pas d'étape de compilation** : `index.html` doit s'ouvrir par double-clic.
- Scripts classiques (pas de modules ES), chargés dans l'ordre de `index.html` : données d'abord, puis `js/outils.js` → `accueil.js` → `recette.js` → `calendrier.js` → `fiche.js` → `carte.js` → `app.js`. Ils partagent la portée globale.
- Les données restent en `.js` (pas de CSV/JSON chargés par fetch, qui casseraient l'ouverture par double-clic).
- Police : Archivo (Google Fonts, axe de largeur 62–125). Couleurs : encre #10343C, jaune #EDBE52, vert #2E7D46, brume #EEF3F1.
- Animations actives par défaut (beaucoup de PC Windows coupent les « effets d'animation », ce qui désactivait tout). Bouton « Animations » en bas de page pour les couper (classe `calme` sur `<html>`).
- Forcer les couleurs claires (`color-scheme: light`) : en mode sombre, la fiche devenait illisible.
- Photos : `photos/<id>.jpg` + crédit (auteur, licence, url) dans `donnees/photos.js`. Sans photo, `js/dessins.js` dessine le produit en SVG.
- `outils/construire_artifact.py` assemble tout en une page pour l'aperçu Claude (artifact) ; inutile pour GitHub Pages.

## Ton et contenu
- Tout en français. Recettes au vouvoiement, quantités pour 2 personnes, petit budget.
- Public visé : jeunes adultes et étudiants de la région.
- Toujours citer les sources (gemuese.ch, sites des producteurs, Wikimedia pour les photos) — utile aussi pour le rapport en APA.

## À vérifier / en cours
- Photos : 84 photos Wikimedia choisies, rassemblées dans `saison-ne-photos.json` (Téléchargements d'Alex). Import : `python outils/importer_photos.py chemin/saison-ne-photos.json`.
- Saisons des **fruits** indicatives : à vérifier avec le tableau SSN/WWF.
- Deux écarts relevés avec gemuese.ch : courge et pois mange-tout.
- Horaires des lieux de vente relevés le 6.11.2026 : à confirmer, notamment après la visite chez le maraîcher (pas encore faite fin novembre).

## Façon de travailler
- Une demande précise à la fois ; vérifier le site (ordinateur + téléphone, ouverture d'une fiche, console sans erreur) avant de dire que c'est fini.
- Un commit par changement, message clair en français.
