const Favorite = require('../models/Favorite');

// Créer un favori
// exports.createFavorite = async (req, res) => {
//   const { idUser, idEntreprise } = req.body;

//   // if (!idUser || !idEntreprise) {
//   //   return res.status(400).json({ message: 'idUser et idEntreprise sont requis' });
//   // }

//   if (!idEntreprise) {
//     return res.status(400).json({ message: 'L\'identifiant de l\'entreprise (idEntreprise) est requis.' });
//   }

//   if (!idUser) {
//     return res.status(400).json({ message: 'L\'identifiant de l\'utilisateur (idUser) est requis.' });
//   }

//   // if (!idEntreprise) {
//   //   return res.status(400).json({ message: 'L\'identifiant de l\'entreprise (idEntreprise) est requis.' });
//   // }

//   try {
//     const newFavorite = new Favorite({ idUser, idEntreprise });
//     const savedFavorite = await newFavorite.save();
//     res.status(201).json(savedFavorite);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// Créer un favori
exports.createFavorite = async (req, res) => {
  const { idUser, idEntreprise } = req.body;
  console.log('Received body:', req.body); // Affiche le corps de la requête

  // if (!idEntreprise || !idUser) {
  //   return res.status(400).json({ message: 'L\'identifiant de l\'entreprise (idEntreprise) et l\'identifiant de l\'utilisateur (idUser) sont requis.' });
  // }

  if (!idEntreprise) {
    return res.status(400).json({ message: 'L\'identifiant de l\'entreprise (idEntreprise) est requis.' });
  }

  if (!idUser) {
    return res.status(400).json({ message: 'L\'identifiant de l\'utilisateur (idUser) est requis.' });
  }

  // try {
  //   const newFavorite = new Favorite({ idUser, idEntreprise });
  //   const savedFavorite = await newFavorite.save();
  //   res.status(201).json(savedFavorite);
  // } catch (error) {
  //   res.status(400).json({ message: error.message });
  // }

  try {
    const favorite = new Favorite({ idUser, idEntreprise });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
},

// Récupérer tous les favoris
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getFavoriteById = async (req, res) => {
  const { id } = req.params;

  try {
    const favorite = await Favorite.findById(id);

    if (!favorite) {
      return res.status(404).json({ message: 'Favori non trouvé' });
    }

    res.status(200).json({ 
      message: 'Ce favori existe déjà.', 
      favorite 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Mettre à jour un favori
exports.updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { idUser, idEntreprise } = req.body;

  try {
    const updatedFavorite = await Favorite.findByIdAndUpdate(
      id,
      { idUser, idEntreprise },
      { new: true, runValidators: true }
    );

    if (!updatedFavorite) {
      return res.status(404).json({ message: 'Favori non trouvé' });
    }

    res.status(200).json(updatedFavorite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un favori
// exports.deleteFavorite = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedFavorite = await Favorite.findByIdAndDelete(id);

//     if (!deletedFavorite) {
//       return res.status(404).json({ message: 'Favori non trouvé' });
//     }

//     res.status(200).json({ message: 'Favori supprimé avec succès' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


exports.deleteFavorite = async (req, res) => {
  const { id } = req.params;

  try {
    const favorite = await Favorite.findByIdAndDelete(id);
    
    if (!favorite) {
      return res.status(404).json({ message: 'Favori non trouvé' });
    }
    
    res.json({ message: 'Favori supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.checkFavoriteById = async (req, res) => {
  const { id } = req.params;

  try {
    const favorite = await Favorite.findById(id);

    if (favorite) {
      return res.status(200).json({ message: 'Déjà en favoris', favorite });
    }

    res.status(404).json({ message: 'Favori non trouvé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
