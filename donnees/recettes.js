/* Recettes de la semaine
   Fichier de DONNÉES : on peut le modifier sans toucher au code.
   Respecter les virgules et les guillemets, puis recharger la page.
   Si la page devient vide : une virgule ou une accolade manque. */

/* ---------------------------------------------------------------------
   Recettes de l'équipe. mois = mois où la recette est proposée.
   Ingrédients : q (quantité pour 2 personnes), u (unité), n (nom),
   p (id du produit de saison, si c'en est un).
   --------------------------------------------------------------------- */
const RECETTES = [
  { id: 'veloute-courge', titre: "Velouté de courge et carotte, croûtons à l'ail", mois: [9, 10, 11, 12, 1, 2], temps: 35, budget: 'Petit budget', vege: true,
    ingredients: [
      { q: 500, u: 'g', n: 'courge (butternut ou potimarron)', p: 'courge' },
      { q: 2, u: '', n: 'carottes', p: 'carotte' },
      { q: 1, u: '', n: 'oignon', p: 'oignon' },
      { q: 1, u: 'gousse', n: "d'ail", p: 'ail' },
      { q: 6, u: 'dl', n: 'bouillon de légumes' },
      { q: 2, u: 'tranches', n: 'de pain rassis' },
      { q: 1, u: 'c. à s.', n: 'huile de colza' },
    ],
    etapes: [
      'Épluchez la courge et les carottes, coupez-les en dés. Émincez l’oignon.',
      'Faites revenir l’oignon dans l’huile 3 minutes, puis ajoutez la courge et les carottes.',
      'Versez le bouillon, couvrez et laissez cuire 20 minutes, jusqu’à ce que tout soit tendre.',
      'Pendant ce temps, frottez le pain avec l’ail, coupez-le en cubes et faites-le dorer à la poêle.',
      'Mixez la soupe, salez et poivrez. Servez avec les croûtons.',
    ],
    astuce: 'Gardez la moitié au frigo : ça fait un repas pour le lendemain (3 jours maximum).' },

  { id: 'papet-saucisson', titre: 'Poireaux et pommes de terre au saucisson neuchâtelois', mois: [10, 11, 12, 1, 2, 3], temps: 45, budget: 'Petit budget', vege: false,
    ingredients: [
      { q: 2, u: '', n: 'poireaux', p: 'poireau' },
      { q: 400, u: 'g', n: 'pommes de terre', p: 'pommes-de-terre' },
      { q: 1, u: '', n: 'oignon', p: 'oignon' },
      { q: 1, u: '', n: 'saucisson neuchâtelois (ou 1 boîte de pois chiches)' },
      { q: 3, u: 'dl', n: 'bouillon' },
      { q: 2, u: 'c. à s.', n: 'crème' },
    ],
    etapes: [
      'Coupez les poireaux en rondelles et rincez-les bien : la terre se cache entre les feuilles. Coupez les pommes de terre en dés.',
      'Faites fondre l’oignon émincé dans un peu d’huile, ajoutez poireaux et pommes de terre.',
      'Versez le bouillon, posez le saucisson dessus, couvrez et laissez mijoter 35 minutes à feu doux.',
      'Ajoutez la crème, goûtez, ajustez le sel. Coupez le saucisson en tranches pour servir.',
    ],
    astuce: 'Version végé : remplacez le saucisson par des pois chiches et une pincée de paprika fumé.' },

  { id: 'gratin-chou-fleur', titre: 'Gratin de chou-fleur et brocoli', mois: [9, 10, 11], temps: 40, budget: 'Petit budget', vege: true,
    ingredients: [
      { q: 0.5, u: '', n: 'chou-fleur', p: 'chou-fleur' },
      { q: 1, u: '', n: 'brocoli', p: 'brocoli' },
      { q: 3, u: 'dl', n: 'lait' },
      { q: 2, u: 'c. à s.', n: 'farine' },
      { q: 20, u: 'g', n: 'beurre' },
      { q: 60, u: 'g', n: 'fromage râpé (gruyère ou tomme)' },
    ],
    etapes: [
      'Préchauffez le four à 200 °C. Coupez le chou-fleur et le brocoli en bouquets et faites-les cuire 6 minutes à l’eau salée. Égouttez.',
      'Faites fondre le beurre, ajoutez la farine, puis le lait petit à petit en fouettant jusqu’à ce que la sauce épaississe. Salez.',
      'Mettez les légumes dans un plat, nappez de sauce et parsemez de fromage.',
      'Enfournez 20 minutes, jusqu’à ce que le dessus soit doré.',
    ],
    astuce: 'La tige du brocoli se mange : épluchez-la et coupez-la en bâtonnets avec le reste.' },

  { id: 'salade-betterave-pomme', titre: 'Salade betterave, pomme et noix', mois: [10, 11, 12, 1, 2, 3], temps: 15, budget: 'Petit budget', vege: true,
    ingredients: [
      { q: 2, u: '', n: 'betteraves cuites', p: 'betterave-rouge' },
      { q: 1, u: '', n: 'pomme', p: 'pomme' },
      { q: 1, u: 'poignée', n: 'de rampon', p: 'rampon' },
      { q: 1, u: 'poignée', n: 'de noix', p: 'noix' },
      { q: 1, u: 'c. à s.', n: 'vinaigre de cidre' },
      { q: 2, u: 'c. à s.', n: 'huile de colza' },
      { q: 1, u: 'c. à c.', n: 'moutarde' },
    ],
    etapes: [
      'Coupez les betteraves et la pomme en dés.',
      'Mélangez le vinaigre, la moutarde, l’huile, du sel et du poivre.',
      'Ajoutez la betterave, la pomme, le rampon et les noix concassées. Mélangez au dernier moment.',
    ],
    astuce: 'Crues, les betteraves cuisent en 45 minutes à l’eau. Cuites sous vide, elles sont prêtes tout de suite.' },

  { id: 'chou-rouge-pommes', titre: 'Chou rouge braisé aux pommes', mois: [10, 11, 12, 1, 2], temps: 45, budget: 'Petit budget', vege: true,
    ingredients: [
      { q: 0.5, u: '', n: 'chou rouge', p: 'chou-rouge' },
      { q: 2, u: '', n: 'pommes', p: 'pomme' },
      { q: 1, u: '', n: 'oignon', p: 'oignon' },
      { q: 2, u: 'c. à s.', n: 'vinaigre' },
      { q: 1, u: 'c. à s.', n: 'miel' },
      { q: 2, u: 'dl', n: 'bouillon' },
    ],
    etapes: [
      'Émincez finement le chou et l’oignon. Coupez les pommes en quartiers.',
      'Faites revenir l’oignon, ajoutez le chou et remuez 5 minutes.',
      'Ajoutez les pommes, le vinaigre, le miel et le bouillon. Couvrez et cuisez 30 minutes à feu doux en remuant de temps en temps.',
      'Goûtez et ajustez le sel, le poivre et le vinaigre.',
    ],
    astuce: 'Encore meilleur réchauffé le lendemain. Avec des pommes de terre ou des spätzli, c’est un repas.' },

  { id: 'veloute-topinambour', titre: 'Velouté de topinambour', mois: [11, 12, 1, 2, 3], temps: 35, budget: 'Petit budget', vege: true,
    ingredients: [
      { q: 400, u: 'g', n: 'topinambours', p: 'topinambour' },
      { q: 1, u: '', n: 'pomme de terre', p: 'pommes-de-terre' },
      { q: 0.5, u: '', n: 'oignon', p: 'oignon' },
      { q: 6, u: 'dl', n: 'bouillon' },
      { q: 2, u: 'c. à s.', n: 'crème' },
      { q: 1, u: 'poignée', n: 'de noisettes' },
    ],
    etapes: [
      'Brossez ou épluchez les topinambours et la pomme de terre, coupez-les en morceaux.',
      'Faites revenir l’oignon, ajoutez les légumes et le bouillon.',
      'Cuisez 20 minutes, puis mixez avec la crème.',
      'Servez avec les noisettes grillées à sec dans une poêle.',
    ],
    astuce: 'Le topinambour a un petit goût d’artichaut. Première fois ? Commencez par une petite portion.' },

  { id: 'pates-kale', titre: 'Pâtes au chou kale et à l’ail', mois: [10, 11, 12, 1, 2, 3], temps: 20, budget: 'Petit budget', vege: true,
    ingredients: [
      { q: 150, u: 'g', n: 'chou kale', p: 'chou-kale' },
      { q: 200, u: 'g', n: 'pâtes' },
      { q: 2, u: 'gousses', n: "d'ail", p: 'ail' },
      { q: 3, u: 'c. à s.', n: "huile d'olive" },
      { q: 40, u: 'g', n: 'fromage à pâte dure râpé' },
    ],
    etapes: [
      'Retirez les grosses côtes du kale et coupez les feuilles en lanières.',
      'Cuisez les pâtes. 3 minutes avant la fin, ajoutez le kale dans la même eau.',
      'Pendant ce temps, faites dorer l’ail émincé dans l’huile à feu doux.',
      'Égouttez en gardant un fond d’eau de cuisson. Mélangez avec l’huile à l’ail, le fromage et un peu de cette eau.',
    ],
    astuce: 'Le kale cru, massé 2 minutes avec un peu d’huile et de sel, devient une salade tendre.' },

  { id: 'fenouil-roti', titre: 'Fenouil et carottes rôtis, sauce yogourt', mois: [9, 10, 11], temps: 35, budget: 'Petit budget', vege: true,
    ingredients: [
      { q: 2, u: '', n: 'fenouils', p: 'fenouil' },
      { q: 3, u: '', n: 'carottes', p: 'carotte' },
      { q: 2, u: 'c. à s.', n: 'huile' },
      { q: 1, u: 'c. à c.', n: 'cumin ou graines de fenouil' },
      { q: 180, u: 'g', n: 'yogourt nature' },
    ],
    etapes: [
      'Préchauffez le four à 210 °C. Coupez le fenouil en quartiers et les carottes en bâtonnets.',
      'Mélangez-les avec l’huile, les épices et du sel, puis étalez-les sur une plaque.',
      'Faites rôtir 25 minutes en retournant à mi-cuisson.',
      'Servez avec le yogourt assaisonné de sel et de poivre.',
    ],
    astuce: 'Ajoutez des pois chiches sur la même plaque : c’est un repas complet.' },

  { id: 'bruxelles-rotis', titre: 'Choux de Bruxelles rôtis, miel et moutarde', mois: [10, 11, 12, 1], temps: 30, budget: 'Petit budget', vege: true,
    ingredients: [
      { q: 300, u: 'g', n: 'choux de Bruxelles', p: 'chou-de-bruxelles' },
      { q: 300, u: 'g', n: 'pommes de terre', p: 'pommes-de-terre' },
      { q: 2, u: 'c. à s.', n: 'huile' },
      { q: 1, u: 'c. à s.', n: 'miel' },
      { q: 1, u: 'c. à s.', n: 'moutarde' },
    ],
    etapes: [
      'Préchauffez le four à 210 °C. Coupez les choux de Bruxelles en deux et les pommes de terre en quartiers.',
      'Mélangez-les avec l’huile et du sel, enfournez 25 minutes.',
      'Mélangez le miel et la moutarde, versez sur les légumes pour les 5 dernières minutes.',
    ],
    astuce: 'Rôtis, ils perdent leur amertume. C’est la recette pour qui croit ne pas aimer ça.' },

  { id: 'compote-pommes-coings', titre: 'Compote pommes et coings', mois: [10, 11, 12], temps: 40, budget: 'Petit budget', vege: true, sucre: true,
    ingredients: [
      { q: 3, u: '', n: 'pommes', p: 'pomme' },
      { q: 1, u: '', n: 'coing', p: 'coing' },
      { q: 1, u: 'c. à s.', n: 'sucre' },
      { q: 1, u: 'pincée', n: 'de cannelle' },
      { q: 1, u: 'dl', n: "d'eau" },
    ],
    etapes: [
      'Épluchez le coing (il est dur, prenez un bon couteau), retirez le cœur et coupez-le en petits dés.',
      'Cuisez le coing avec l’eau 15 minutes à couvert.',
      'Ajoutez les pommes en morceaux, le sucre et la cannelle, puis cuisez encore 15 minutes.',
      'Écrasez à la fourchette ou mixez.',
    ],
    astuce: 'Se garde 5 jours au frigo. Parfait avec du séré ou dans un bircher.' },

  { id: 'rosti-racines', titre: 'Rösti de légumes racines', mois: [11, 12, 1, 2, 3], temps: 35, budget: 'Petit budget', vege: true,
    ingredients: [
      { q: 2, u: '', n: 'pommes de terre', p: 'pommes-de-terre' },
      { q: 1, u: '', n: 'carotte', p: 'carotte' },
      { q: 150, u: 'g', n: 'céleri-rave', p: 'celeri-rave' },
      { q: 1, u: '', n: 'œuf' },
      { q: 1, u: 'c. à s.', n: 'farine' },
      { q: 3, u: 'c. à s.', n: 'huile' },
    ],
    etapes: [
      'Râpez grossièrement les pommes de terre, la carotte et le céleri. Pressez-les dans un linge propre pour enlever l’eau.',
      'Mélangez avec l’œuf, la farine, du sel et du poivre.',
      'Chauffez l’huile, formez des petites galettes et cuisez-les 4 à 5 minutes par face à feu moyen.',
      'Servez avec du fromage frais ou un œuf au plat.',
    ],
    astuce: 'L’étape du linge fait tout : moins d’eau, plus de croustillant.' },

  { id: 'bircher', titre: 'Bircher aux pommes, version rapide', mois: [11, 12, 1, 2, 3, 4], temps: 10, budget: 'Petit budget', vege: true, sucre: true,
    ingredients: [
      { q: 80, u: 'g', n: "flocons d'avoine" },
      { q: 2, u: 'dl', n: 'lait ou boisson végétale' },
      { q: 1, u: '', n: 'yogourt nature' },
      { q: 2, u: '', n: 'pommes', p: 'pomme' },
      { q: 1, u: 'poignée', n: 'de noix', p: 'noix' },
      { q: 1, u: 'c. à s.', n: 'miel' },
    ],
    etapes: [
      'Le soir, mélangez les flocons, le lait et le yogourt dans un bocal.',
      'Le matin, râpez les pommes directement dedans, ajoutez le miel et les noix.',
    ],
    astuce: 'Le bircher a été inventé à Zurich vers 1900. Dans un bocal fermé, il se transporte facilement.' },

  { id: 'salade-rampon', titre: 'Salade de rampon, pomme et œuf mollet', mois: [12, 1, 2, 3], temps: 15, budget: 'Petit budget', vege: true,
    ingredients: [
      { q: 100, u: 'g', n: 'rampon', p: 'rampon' },
      { q: 1, u: '', n: 'pomme', p: 'pomme' },
      { q: 2, u: '', n: 'œufs' },
      { q: 1, u: 'tranche', n: 'de pain' },
      { q: 2, u: 'c. à s.', n: 'vinaigrette' },
    ],
    etapes: [
      'Plongez les œufs 6 minutes dans l’eau bouillante, puis dans l’eau froide, et écalez-les.',
      'Lavez le rampon : il cache souvent un peu de terre.',
      'Coupez la pomme en fines lamelles et le pain en croûtons.',
      'Assemblez le rampon, la pomme, les croûtons et les œufs coupés en deux. Arrosez de vinaigrette.',
    ],
    astuce: 'Rampon, doucette ou mâche : c’est la même salade selon la région.' },

  { id: 'tartines-radis', titre: 'Tartines radis, séré et ciboulette', mois: [3, 4, 5, 6], temps: 10, budget: 'Petit budget', vege: true,
    ingredients: [
      { q: 4, u: 'tranches', n: 'de pain complet' },
      { q: 150, u: 'g', n: 'séré' },
      { q: 1, u: 'botte', n: 'de radis', p: 'radis' },
      { q: 0.5, u: 'botte', n: 'de ciboulette', p: 'ciboulette' },
    ],
    etapes: [
      'Mélangez le séré avec la ciboulette ciselée, du sel et du poivre.',
      'Tartinez le pain et ajoutez les radis en fines rondelles.',
      'Un filet d’huile, un tour de poivre, c’est prêt.',
    ],
    astuce: 'Les fanes de radis se mixent en pesto avec de l’huile, du fromage et des noix.' },

  { id: 'oeufs-epinards', titre: 'Œufs au plat sur épinards', mois: [3, 4, 5], temps: 15, budget: 'Petit budget', vege: true,
    ingredients: [
      { q: 200, u: 'g', n: 'épinards frais', p: 'epinards' },
      { q: 2, u: '', n: 'œufs' },
      { q: 1, u: 'gousse', n: "d'ail" },
      { q: 1, u: 'c. à s.', n: 'huile' },
      { q: 2, u: 'tranches', n: 'de pain' },
    ],
    etapes: [
      'Faites revenir l’ail émincé dans l’huile, ajoutez les épinards lavés et remuez jusqu’à ce qu’ils tombent (2 minutes).',
      'Creusez deux trous dans les épinards et cassez-y les œufs. Couvrez 4 minutes.',
      'Salez, poivrez et servez avec le pain.',
    ],
    astuce: '200 g d’épinards crus, c’est une montagne qui fond en une poignée. C’est normal.' },

  { id: 'risotto-asperges', titre: 'Risotto aux asperges vertes', mois: [4, 5, 6], temps: 35, budget: 'Budget moyen', vege: true,
    ingredients: [
      { q: 250, u: 'g', n: 'asperges vertes', p: 'asperge-verte' },
      { q: 160, u: 'g', n: 'riz à risotto' },
      { q: 1, u: '', n: 'oignon nouveau', p: 'oignons-bottes' },
      { q: 7, u: 'dl', n: 'bouillon chaud' },
      { q: 30, u: 'g', n: 'fromage râpé' },
      { q: 10, u: 'g', n: 'beurre' },
    ],
    etapes: [
      'Coupez la base dure des asperges et détaillez-les en tronçons. Gardez les pointes à part.',
      'Faites revenir l’oignon émincé, ajoutez le riz et remuez 1 minute.',
      'Ajoutez le bouillon louche par louche en remuant, pendant 18 minutes. Les tronçons à mi-cuisson, les pointes 5 minutes avant la fin.',
      'Hors du feu, ajoutez le beurre et le fromage, couvrez 2 minutes et servez.',
    ],
    astuce: 'Les asperges suisses arrivent en avril. Avant, elles ont fait un long voyage.' },

  { id: 'crumble-rhubarbe', titre: 'Crumble rhubarbe et fraises', mois: [5, 6], temps: 45, budget: 'Petit budget', vege: true, sucre: true,
    ingredients: [
      { q: 300, u: 'g', n: 'rhubarbe', p: 'rhubarbe' },
      { q: 200, u: 'g', n: 'fraises', p: 'fraise' },
      { q: 80, u: 'g', n: 'sucre' },
      { q: 80, u: 'g', n: 'farine' },
      { q: 60, u: 'g', n: 'beurre froid' },
      { q: 30, u: 'g', n: "flocons d'avoine" },
    ],
    etapes: [
      'Préchauffez le four à 190 °C. Coupez la rhubarbe en tronçons et les fraises en deux. Mélangez-les avec la moitié du sucre dans un plat.',
      'Du bout des doigts, sablez la farine, les flocons, le beurre et le reste du sucre.',
      'Émiettez la pâte sur les fruits et enfournez 30 minutes.',
    ],
    astuce: 'La rhubarbe jeune n’a pas besoin d’être épluchée. Ses feuilles, par contre, ne se mangent pas.' },

  { id: 'wok-pak-choi', titre: 'Wok de pak choï, chou-rave et carotte', mois: [4, 5, 6, 7], temps: 20, budget: 'Petit budget', vege: true,
    ingredients: [
      { q: 2, u: '', n: 'pak choï', p: 'pak-choi' },
      { q: 1, u: '', n: 'chou-rave', p: 'chou-rave' },
      { q: 1, u: '', n: 'carotte', p: 'carotte' },
      { q: 1, u: '', n: 'oignon nouveau', p: 'oignons-bottes' },
      { q: 150, u: 'g', n: 'riz ou nouilles' },
      { q: 2, u: 'c. à s.', n: 'sauce soja' },
      { q: 1, u: 'morceau', n: 'de gingembre' },
    ],
    etapes: [
      'Lancez la cuisson du riz.',
      'Coupez le chou-rave et la carotte en bâtonnets fins, le pak choï en lanières (séparez tiges et feuilles).',
      'Saisissez à feu vif dans un peu d’huile : d’abord chou-rave, carotte et tiges (4 minutes), puis feuilles, oignon et gingembre râpé (1 minute).',
      'Ajoutez la sauce soja et servez sur le riz.',
    ],
    astuce: 'Coupez tout avant d’allumer le feu : un wok, ça va très vite.' },

  { id: 'salade-tomates', titre: 'Salade tomates, concombre et basilic', mois: [6, 7, 8], temps: 10, budget: 'Petit budget', vege: true,
    ingredients: [
      { q: 3, u: '', n: 'tomates', p: 'tomate' },
      { q: 0.5, u: '', n: 'concombre', p: 'concombre' },
      { q: 1, u: 'poignée', n: 'de basilic', p: 'basilic' },
      { q: 0.5, u: '', n: 'oignon nouveau', p: 'oignons-bottes' },
      { q: 2, u: 'c. à s.', n: 'huile' },
      { q: 1, u: 'c. à s.', n: 'vinaigre' },
    ],
    etapes: [
      'Coupez les tomates et le concombre en morceaux, l’oignon en fines rondelles.',
      'Salez et attendez 5 minutes : les tomates rendent leur jus.',
      'Ajoutez l’huile, le vinaigre et le basilic déchiré. Servez avec du pain pour saucer.',
    ],
    astuce: 'Ne mettez pas les tomates au frigo : elles y perdent leur goût.' },

  { id: 'ratatouille-four', titre: 'Ratatouille au four', mois: [7, 8, 9], temps: 50, budget: 'Petit budget', vege: true,
    ingredients: [
      { q: 1, u: '', n: 'courgette', p: 'courgette' },
      { q: 1, u: '', n: 'aubergine', p: 'aubergine' },
      { q: 1, u: '', n: 'poivron', p: 'poivron' },
      { q: 3, u: '', n: 'tomates', p: 'tomate' },
      { q: 1, u: '', n: 'oignon', p: 'oignon' },
      { q: 2, u: 'gousses', n: "d'ail", p: 'ail' },
      { q: 3, u: 'c. à s.', n: 'huile' },
      { q: 1, u: 'branche', n: 'de thym', p: 'thym' },
    ],
    etapes: [
      'Préchauffez le four à 200 °C.',
      'Coupez tous les légumes en gros dés et mettez-les dans un plat avec l’ail écrasé, l’huile, le thym et du sel.',
      'Enfournez 40 minutes en mélangeant une fois.',
      'Servez chaud avec du riz, ou froid le lendemain.',
    ],
    astuce: 'Doublez les quantités : la ratatouille se congèle très bien.' },

  { id: 'pates-courgette', titre: 'Pâtes courgette, menthe et fromage frais', mois: [6, 7, 8, 9], temps: 20, budget: 'Petit budget', vege: true,
    ingredients: [
      { q: 2, u: '', n: 'courgettes', p: 'courgette' },
      { q: 200, u: 'g', n: 'pâtes' },
      { q: 1, u: 'poignée', n: 'de menthe', p: 'menthe' },
      { q: 100, u: 'g', n: 'fromage frais' },
      { q: 1, u: 'gousse', n: "d'ail", p: 'ail' },
      { q: 2, u: 'c. à s.', n: 'huile' },
    ],
    etapes: [
      'Cuisez les pâtes.',
      'Râpez les courgettes et faites-les revenir 5 minutes avec l’ail dans l’huile.',
      'Mélangez avec les pâtes égouttées, le fromage frais, la menthe ciselée et un peu d’eau de cuisson.',
    ],
    astuce: 'Râpée, la courgette cuit en 5 minutes au lieu de 15.' },

  { id: 'salade-haricots', titre: 'Salade tiède haricots verts et pommes de terre', mois: [7, 8, 9], temps: 25, budget: 'Petit budget', vege: true,
    ingredients: [
      { q: 250, u: 'g', n: 'haricots verts', p: 'haricots' },
      { q: 300, u: 'g', n: 'pommes de terre', p: 'pommes-de-terre' },
      { q: 2, u: '', n: 'œufs' },
      { q: 1, u: '', n: 'échalote', p: 'echalote' },
      { q: 1, u: 'poignée', n: 'de persil', p: 'persil' },
      { q: 3, u: 'c. à s.', n: 'vinaigrette' },
    ],
    etapes: [
      'Cuisez les pommes de terre 15 minutes à l’eau salée. En même temps, cuisez les haricots 8 minutes et les œufs 9 minutes.',
      'Hachez l’échalote et mélangez-la à la vinaigrette.',
      'Mélangez le tout encore tiède et parsemez de persil haché.',
    ],
    astuce: 'Passez les haricots sous l’eau froide après la cuisson : ils restent bien verts.' },

  { id: 'tarte-pruneaux', titre: 'Tarte aux pruneaux', mois: [8, 9], temps: 50, budget: 'Petit budget', vege: true, sucre: true,
    ingredients: [
      { q: 1, u: 'rouleau', n: 'de pâte brisée' },
      { q: 600, u: 'g', n: 'pruneaux', p: 'pruneau' },
      { q: 2, u: 'c. à s.', n: 'sucre' },
      { q: 2, u: 'c. à s.', n: 'noisettes moulues' },
      { q: 1, u: 'pincée', n: 'de cannelle' },
    ],
    etapes: [
      'Préchauffez le four à 200 °C. Étalez la pâte dans un moule, piquez le fond et saupoudrez les noisettes moulues.',
      'Coupez les pruneaux en deux, dénoyautez-les et disposez-les bien serrés, face coupée vers le haut.',
      'Enfournez 35 minutes. Saupoudrez de sucre et de cannelle à la sortie du four.',
    ],
    astuce: 'Les noisettes au fond boivent le jus : la pâte reste croustillante.' },

  { id: 'sere-fruits-rouges', titre: 'Séré aux fruits rouges', mois: [6, 7, 8], temps: 5, budget: 'Petit budget', vege: true, sucre: true,
    ingredients: [
      { q: 250, u: 'g', n: 'séré' },
      { q: 150, u: 'g', n: 'framboises', p: 'framboise' },
      { q: 1, u: 'c. à s.', n: 'miel' },
    ],
    etapes: [
      'Écrasez la moitié des framboises avec le miel.',
      'Mélangez avec le séré et ajoutez le reste des fruits entiers.',
    ],
    astuce: 'Congelez des framboises en été : en hiver, vous mangez encore local.' },
];

