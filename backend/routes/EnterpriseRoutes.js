const express = require('express');
const router = express.Router();
const enterpriseController = require('../controllers/EnterpriseController');

/**
 * @swagger
 * tags:
 *   name: Enterprises
 *   description: Gestion des entreprises
 */

/**
 * @swagger
 * /api/enterprises:
 *   post:
 *     summary: Créer une nouvelle entreprise
 *     tags: [Enterprises]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - EnterpriseNumber
 *               - Status
 *               - JuridicalSituation
 *               - TypeOfEnterprise
 *               - JuridicalForm
 *               - JuridicalFormCAC
 *               - startDate
 *             properties:
 *               EnterpriseNumber:
 *                 type: string
 *                 example: '1234.567.890'
 *               Status:
 *                 type: string
 *                 example: 'AC'
 *               JuridicalSituation:
 *                 type: string
 *                 example: '012'
 *               TypeOfEnterprise:
 *                 type: string
 *                 example: '2'
 *               JuridicalForm:
 *                 type: string
 *                 example: '116'
 *               JuridicalFormCAC:
 *                 type: string
 *                 example: '612'
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: '06-02-2015'
 *     responses:
 *       201:
 *         description: L'entreprise a été créée avec succès.
 *       400:
 *         description: Données invalides.
 */
router.post('/', enterpriseController.createEnterprise);

/**
 * @swagger
 * /api/enterprises:
 *   get:
 *     summary: Récupérer toutes les entreprises
 *     tags: [Enterprises]
 *     responses:
 *       200:
 *         description: Une liste de toutes les entreprises.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Enterprise'
 */
router.get('/', enterpriseController.getAllEnterprises);

/**
 * @swagger
 * /api/enterprises/{enterpriseNumber}:
 *   get:
 *     summary: Récupérer une entreprise par son numéro d'entreprise
 *     tags: [Enterprises]
 *     parameters:
 *       - in: path
 *         name: enterpriseNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: "Le numéro d'entreprise (ex: 1234.567.890)"
 *     responses:
 *       200:
 *         description: "Entreprise récupérée avec succès."
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enterprise'
 *       404:
 *         description: "Entreprise non trouvée."
 */

router.get('/:enterpriseNumber', enterpriseController.getEnterpriseByNumber);

/**
 * @swagger
 * /api/enterprises/{enterpriseNumber}:
 *   put:
 *     summary: Mettre à jour une entreprise par son numéro d'entreprise
 *     tags: [Enterprises]
 *     parameters:
 *       - in: path
 *         name: enterpriseNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: Le numéro d'entreprise
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Status:
 *                 type: string
 *               JuridicalSituation:
 *                 type: string
 *               TypeOfEnterprise:
 *                 type: string
 *               JuridicalForm:
 *                 type: string
 *               JuridicalFormCAC:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: L'entreprise a été mise à jour avec succès.
 *       404:
 *         description: Entreprise non trouvée.
 *       400:
 *         description: Données invalides.
 */
router.put('/:enterpriseNumber', enterpriseController.updateEnterprise);

/**
 * @swagger
 * /api/enterprises/{enterpriseNumber}:
 *   delete:
 *     summary: Supprimer une entreprise par son numéro d'entreprise
 *     tags: [Enterprises]
 *     parameters:
 *       - in: path
 *         name: enterpriseNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: Le numéro d'entreprise
 *     responses:
 *       200:
 *         description: L'entreprise a été supprimée avec succès.
 *       404:
 *         description: Entreprise non trouvée.
 */
router.delete('/:enterpriseNumber', enterpriseController.deleteEnterprise);

module.exports = router;
