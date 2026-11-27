/* Photos supplémentaires des produits (galerie de la fiche), Wikimedia Commons.
   photos/<id>-2.jpg et photos/<id>-3.jpg ; la photo principale et son crédit sont dans photos.js.
   Format : "carotte": [ { fichier: "carotte-2.jpg", auteur: "…", licence: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:…", cadrage: "50% 60%" } ],
   (cadrage = facultatif, position CSS du produit dans la photo).
   VIGNETTES = true quand photos/petites/<id>.jpg existe pour tous les produits (pastilles légères). */
const GALERIE = {};
const VIGNETTES = false;
