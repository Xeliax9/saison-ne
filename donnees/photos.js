/* Photos des produits : photos/<id>.jpg (carré, ~600 px).
   Une photo par produit, avec son auteur et sa licence (obligatoire pour Wikimedia).
   Pour ajouter une photo : mettre le fichier dans photos/ et ajouter une ligne ici.
   Si un produit n'a pas de ligne, le site affiche un dessin à la place.
   Exemple :
   carotte: { auteur: 'Nom Prénom', licence: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:...' },
*/
const CREDITS = {
};
const PHOTOS = new Set(Object.keys(CREDITS));
