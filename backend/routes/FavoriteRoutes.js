const express = require('express');
const favoriteController = require('../controllers/FavoriteController');
const router = express.Router();


router.get('/', favoriteController.getFavorites);
router.get('/:id', favoriteController.getFavoriteById);
router.post('/', favoriteController.createFavorite);
router.put('/:id', favoriteController.updateFavorite);
router.delete('/:id', favoriteController.deleteFavorite);

module.exports = router;