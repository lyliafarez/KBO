// routes/denominationRoutes.js

const express = require('express');
const router = express.Router();
const denominationController = require('../controllers/DenominationController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Denomination:
 *       type: object
 *       required:
 *         - EntityNumber
 *         - Language
 *         - TypeOfDenomination
 *         - Denomination
 *       properties:
 *         EntityNumber:
 *           type: string
 *           description: The entity number in format XXXX.XXX.XXX
 *           pattern: '^\d{4}\.\d{3}\.\d{3}$'
 *         Language:
 *           type: string
 *           enum: ['1', '2', '3', '4']
 *         TypeOfDenomination:
 *           type: string
 *           description: Type of denomination (3-digit code)
 *           pattern: '^\d{3}$'
 *         Denomination:
 *           type: string
 *           example: 'Farys'
 *           description: The actual denomination
 */

/**
 * @swagger
 * tags:
 *   name: Denominations
 *   description: Denomination management
 */

/**
 * @swagger
 * /api/denominations:
 *   post:
 *     summary: Create a new denomination
 *     tags: [Denominations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Denomination'
 *     responses:
 *       201:
 *         description: The created denomination
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Denomination'
 *       400:
 *         description: Invalid input
 */
router.post('/', denominationController.createDenomination);

/**
 * @swagger
 * /api/denominations:
 *   get:
 *     summary: Retrieve all denominations
 *     tags: [Denominations]
 *     responses:
 *       200:
 *         description: A list of denominations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Denomination'
 */
router.get('/', denominationController.getAllDenominations);

/**
 * @swagger
 * /api/denominations/{id}:
 *   get:
 *     summary: Get a denomination by ID
 *     tags: [Denominations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The denomination ID
 *     responses:
 *       200:
 *         description: The denomination data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Denomination'
 *       404:
 *         description: Denomination not found
 */
router.get('/:id', denominationController.getDenominationById);

/**
 * @swagger
 * /api/denominations/{id}:
 *   put:
 *     summary: Update a denomination
 *     tags: [Denominations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The denomination ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Denomination'
 *     responses:
 *       200:
 *         description: The updated denomination
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Denomination'
 *       404:
 *         description: Denomination not found
 *       400:
 *         description: Invalid input
 */
router.put('/:id', denominationController.updateDenomination);

/**
 * @swagger
 * /api/denominations/{id}:
 *   delete:
 *     summary: Delete a denomination
 *     tags: [Denominations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The denomination ID
 *     responses:
 *       200:
 *         description: Denomination successfully deleted
 *       404:
 *         description: Denomination not found
 */
router.delete('/:id', denominationController.deleteDenomination);

module.exports = router;