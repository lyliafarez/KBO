const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'Users' 
  },
  idEntreprise: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'Entreprises' 
  },
  idFavorite: {
    type: String, 
    required: true,
    unique: true
  }
});

const Favorite = mongoose.model('favorites', favoriteSchema);
module.exports = Favorite;