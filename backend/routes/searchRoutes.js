const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search for enterprises
 *     tags: [Search]
 *     description: Retrieve a list of enterprises based on search criteria
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   EnterpriseNumber:
 *                     type: string
 *                   Denomination:
 *                     type: string
 *                   Status:
 *                     type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.get('/', searchController.search);

module.exports = router;
