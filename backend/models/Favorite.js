const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  idUser: {
    type: String, 
    required: true,
    ref: 'User' 
  },
  idEntreprise: {
    type: String, 
    required: true,
    ref: 'Entreprise' 
  },
  idFavorite: {
    type: String, 
    required: true,
    unique: true
  }
});

const Favorite = mongoose.model('favorites', favoriteSchema);
module.exports = Favorite;