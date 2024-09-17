import express from 'express';
import {
  getFavorites,
  getFavoriteById,
  createFavorite,
  updateFavorite,
  deleteFavorite
} from '../controllers/FavoriteController.js';

const router = express.Router();


router.get('/', getFavorites);
router.get('/:id', getFavoriteById);
router.post('/', createFavorite);
router.put('/:id', updateFavorite);
router.delete('/:id', deleteFavorite);

export default router;