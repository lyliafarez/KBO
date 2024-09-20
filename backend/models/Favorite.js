const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  idEntreprise: { type: mongoose.Schema.Types.ObjectId, ref: 'Entreprise', required: true },
});

favoriteSchema.index({ idUser: 1, idEntreprise: 1 }, { unique: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
