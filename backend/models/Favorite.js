import mongoose from 'mongoose';

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

export const Favorite = mongoose.model('favorites', favoriteSchema);
