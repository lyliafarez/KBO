const express = require('express');
const router = express.Router();
const establishmentController = require('../controllers/EstablishmentController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Establishment:
 *       type: object
 *       required:
 *         - EstablishmentNumber
 *         - StartDate
 *         - EnterpriseNumber
 *       properties:
 *         EstablishmentNumber:
 *           type: string
 *           example: '2.000.000.339'
 *           description: The unique establishment number
 *         StartDate:
 *           type: string
 *           example: '01-11-1974'
 *           format: date
 *           description: The start date of the establishment
 *         EnterpriseNumber:
 *           type: string
 *           example: '0403.449.823'
 *           description: The enterprise number in format XXXX.XXX.XXX
 *           pattern: '^\d{4}\.\d{3}\.\d{3}$'
 */

/**
 * @swagger
 * tags:
 *   name: Establishments
 *   description: Establishment management
 */

/**
 * @swagger
 * /api/establishments:
 *   post:
 *     summary: Create a new establishment
 *     tags: [Establishments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Establishment'
 *     responses:
 *       201:
 *         description: The created establishment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Establishment'
 *       400:
 *         description: Invalid input
 */
router.post('/', establishmentController.createEstablishment);

/**
 * @swagger
 * /api/establishments:
 *   get:
 *     summary: Retrieve all establishments
 *     tags: [Establishments]
 *     responses:
 *       200:
 *         description: A list of establishments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Establishment'
 */
router.get('/', establishmentController.getAllEstablishments);

/**
 * @swagger
 * /api/establishments/{establishmentNumber}:
 *   get:
 *     summary: Get an establishment by its number
 *     tags: [Establishments]
 *     parameters:
 *       - in: path
 *         name: establishmentNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: The establishment number
 *     responses:
 *       200:
 *         description: The establishment data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Establishment'
 *       404:
 *         description: Establishment not found
 */
router.get('/:establishmentNumber', establishmentController.getEstablishmentByNumber);

/**
 * @swagger
 * /api/establishments/{establishmentNumber}:
 *   put:
 *     summary: Update an establishment
 *     tags: [Establishments]
 *     parameters:
 *       - in: path
 *         name: establishmentNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: The establishment number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Establishment'
 *     responses:
 *       200:
 *         description: The updated establishment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Establishment'
 *       404:
 *         description: Establishment not found
 *       400:
 *         description: Invalid input
 */
router.put('/:establishmentNumber', establishmentController.updateEstablishment);

/**
 * @swagger
 * /api/establishments/{establishmentNumber}:
 *   delete:
 *     summary: Delete an establishment
 *     tags: [Establishments]
 *     parameters:
 *       - in: path
 *         name: establishmentNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: The establishment number
 *     responses:
 *       200:
 *         description: Establishment successfully deleted
 *       404:
 *         description: Establishment not found
 */
router.delete('/:establishmentNumber', establishmentController.deleteEstablishment);

/**
 * @swagger
 * /api/establishments/enterprise/{enterpriseNumber}:
 *   get:
 *     summary: Get establishments by enterprise number
 *     tags: [Establishments]
 *     parameters:
 *       - in: path
 *         name: enterpriseNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: The enterprise number
 *     responses:
 *       200:
 *         description: List of establishments for the given enterprise
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Establishment'
 *       404:
 *         description: No establishments found for this enterprise
 */
router.get('/enterprise/:enterpriseNumber', establishmentController.getEstablishmentsByEnterprise);

module.exports = router;