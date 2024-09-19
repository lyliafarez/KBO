const express = require('express');
const codeController = require('../controllers/CodeController');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Code:
 *       type: object
 *       required:
 *         - Category
 *         - Code
 *         - Language
 *         - Description
 *       properties:
 *         Category:
 *           type: string
 *           example: 'ActivityGroup'
 *           description: Different categories
 *         Code:
 *           type: string
 *           example: '001'
 *           description: The actual code value
 *         Language:
 *           type: string
 *           example: 'FR'
 *           description: The language of the code description
 *         Description:
 *           type: string
 *           example: 'Activités TVA'
 *           description: The meaning
 */

/**
 * @swagger
 * tags:
 *   name: Codes
 *   description: Code management
 */

/**
 * @swagger
 * /api/codes:
 *   get:
 *     summary: Retrieve all codes
 *     tags: [Codes]
 *     responses:
 *       200:
 *         description: A list of codes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Code'
 */
router.get('/', codeController.getCodes);

/**
 * @swagger
 * /api/codes/{id}:
 *   get:
 *     summary: Get a code by ID
 *     tags: [Codes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The code ID
 *     responses:
 *       200:
 *         description: The code data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Code'
 *       404:
 *         description: Code not found
 */
router.get('/:id', codeController.getCodeById);

/**
 * @swagger
 * /api/codes:
 *   post:
 *     summary: Create a new code
 *     tags: [Codes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Code'
 *     responses:
 *       201:
 *         description: The created code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Code'
 *       400:
 *         description: Invalid input
 */
router.post('/', codeController.createCode);

/**
 * @swagger
 * /api/codes/{id}:
 *   put:
 *     summary: Update a code
 *     tags: [Codes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The code ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Code'
 *     responses:
 *       200:
 *         description: The updated code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Code'
 *       404:
 *         description: Code not found
 *       400:
 *         description: Invalid input
 */
router.put('/:id', codeController.updateCode);

/**
 * @swagger
 * /api/codes/{id}:
 *   delete:
 *     summary: Delete a code
 *     tags: [Codes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The code ID
 *     responses:
 *       200:
 *         description: Code successfully deleted
 *       404:
 *         description: Code not found
 */
router.delete('/:id', codeController.deleteCode);

module.exports = router;