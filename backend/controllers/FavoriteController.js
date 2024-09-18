const Favorite = require('../models/Favorite.js');

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getFavoriteById = async (req, res) => {
  try {
    const favorite = await Favorite.findById(req.params.id);
    if (!favorite) return res.status(404).json({ message: "Favori non trouvé" });
    res.status(200).json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createFavorite = async (req, res) => {
  try {
    const newFavorite = new Favorite(req.body);
    await newFavorite.save();
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFavorite = async (req, res) => {
  try {
    const updatedFavorite = await Favorite.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFavorite) return res.status(404).json({ message: "Favori non trouvé" });
    res.status(200).json(updatedFavorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteFavorite = async (req, res) => {
  try {
    const deletedFavorite = await Favorite.findByIdAndDelete(req.params.id);
    if (!deletedFavorite) return res.status(404).json({ message: "Favori non trouvé" });
    res.status(200).json({ message: "Favori supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
