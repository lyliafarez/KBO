const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/FavoriteController');


/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       required:
 *         - idUser
 *         - idEntreprise
 *         - idFavorite
 *       properties:
 *         idUser:
 *           type: string
 *           description: The ID of the user (references Users collection)
 *         idEntreprise:
 *           type: string
 *           description: The ID of the enterprise (references Entreprises collection)
 *         idFavorite:
 *           type: string
 *           description: Unique identifier for the favorite
 */

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Favorite management
 */

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Retrieve all favorites
 *     tags: [Favorites]
 *     responses:
 *       200:
 *         description: A list of favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorite'
 */
router.get('/', favoriteController.getFavorites);

/**
 * @swagger
 * /api/favorites/{id}:
 *   get:
 *     summary: Get a favorite by ID
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The favorite ID
 *     responses:
 *       200:
 *         description: The favorite data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorite'
 *       404:
 *         description: Favorite not found
 */
router.get('/:id', favoriteController.getFavoriteById);

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Create a new favorite
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Favorite'
 *     responses:
 *       201:
 *         description: The created favorite
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorite'
 *       400:
 *         description: Invalid input
 */
router.post('/', favoriteController.createFavorite);

/**
 * @swagger
 * /api/favorites/{id}:
 *   put:
 *     summary: Update a favorite
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The favorite ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Favorite'
 *     responses:
 *       200:
 *         description: The updated favorite
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorite'
 *       404:
 *         description: Favorite not found
 *       400:
 *         description: Invalid input
 */
router.put('/:id', favoriteController.updateFavorite);

/**
 * @swagger
 * /api/favorites/{id}:
 *   delete:
 *     summary: Delete a favorite
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The favorite ID
 *     responses:
 *       200:
 *         description: Favorite successfully deleted
 *       404:
 *         description: Favorite not found
 */
router.delete('/:id', favoriteController.deleteFavorite);

module.exports = router;