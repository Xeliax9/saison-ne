# Saison NE

Site du **groupe 11 (CPNE, TIP 2026-2027)** pour encourager à manger local et de saison dans le canton de Neuchâtel :
ce qui pousse en Suisse ce mois-ci, une recette de saison par semaine, et où acheter local.

Données de saison : calendrier de l'Union maraîchère suisse ([gemuese.ch](https://www.gemuese.ch/fr/calendrier-des-saisons)).

## Voir le site

- **En ligne** : GitHub Pages (Settings → Pages → branche `main`, dossier `/`).
- **Sur son ordi** : double-cliquer sur `index.html`. Tout fonctionne sans installation.

## Où modifier quoi

| Je veux…                                   | Fichier                    |
|--------------------------------------------|----------------------------|
| Corriger une saison, ajouter un légume     | `donnees/produits.js`      |
| Ajouter / corriger un lieu de vente        | `donnees/lieux.js`         |
| Ajouter une recette                        | `donnees/recettes.js`      |
| Ajouter une photo                          | `photos/<id>.jpg` + une ligne dans `donnees/photos.js` |
| Changer un texte de la page                | `index.html`               |
| Changer les couleurs, tailles, animations  | `css/style.css`            |

Les fichiers de `donnees/` se modifient sans connaître le code : on copie une ligne existante et on change les valeurs.
**Si la page devient vide après une modification**, c'est presque toujours une virgule, un guillemet ou une accolade oubliés.
Ouvrir la console du navigateur (F12) : elle indique le fichier et la ligne.

## Organisation du code

```
index.html              structure de la page (textes, sections)
css/style.css           mise en page, couleurs, animations
donnees/                données du site (modifiables par tout le groupe)
  produits.js           84 fruits, légumes, salades, herbes et leurs mois
  lieux.js              marchés, fermes, paniers, épiceries
  recettes.js           recettes (quantités pour 2 personnes)
  photos.js             auteur et licence de chaque photo
  carte-neuchatel.js    contour du canton (généré, ne pas modifier)
photos/                 une photo carrée par produit : <id>.jpg
js/                     code du site (pas de framework, HTML/CSS/JS simples)
  outils.js             fonctions partagées
  accueil.js            haut de page : mois, étiquettes, vedettes
  recette.js            recette de la semaine
  calendrier.js         tableau des saisons
  fiche.js              fiche produit qui s'ouvre au clic
  carte.js              carte et liste des lieux
  dessins.js            dessins de secours quand une photo manque
  app.js                démarrage du site
outils/                 scripts Python (aperçu Claude, import des photos)
```

Les scripts sont chargés dans l'ordre de `index.html` : d'abord les données, puis le code.

## Règles du groupe

- Un changement = un commit avec un message clair (« Ajoute la Ferme X à Cernier », pas « modif »).
- Vérifier le site après chaque changement (recharger la page, ouvrir une fiche, regarder sur téléphone).
- Toute info ajoutée (horaires, saisons) : noter la source et la date dans le fichier.
- Les idées et problèmes vont dans les **Issues** GitHub.
- Les photos de Wikimedia Commons doivent être créditées (auteur + licence dans `donnees/photos.js`).

## Travailler avec Claude

Commencer une conversation par : « Reprends le site Saison NE depuis le dépôt GitHub `<compte>/saison-ne` ».
Une demande précise par message, avec une capture d'écran si c'est visuel.
