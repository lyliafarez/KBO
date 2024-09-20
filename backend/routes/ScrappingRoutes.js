const express = require('express');
const router = express.Router();
const { scrapeEnterprise,scrapeKboEntreprise } = require('../controllers/ScrappingController');

/**
 * @swagger
 * /api/scrapping/{enterpriseNumber}:
 *   get:
 *     summary: Scrape enterprise data
 *     tags: [Scraping]
 *     description: Retrieve scraped data for a specific enterprise
 *     parameters:
 *       - in: path
 *         name: enterpriseNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The enterprise number to scrape data for
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 EntrepriseDataEntrepriseweb:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     status:
 *                       type: string
 *                     businessNumber:
 *                       type: string
 *                     address:
 *                       type: string
 *                     creationDate:
 *                       type: string
 *                     mainActivity:
 *                       type: string
 *                     financialYears:
 *                       type: array
 *                       items:
 *                         type: string
 *                     financialData:
 *                       type: object
 *                       properties:
 *                         "Chiffre d'affaires":
 *                           type: array
 *                           items:
 *                             type: string
 *                         "Bénéfices/pertes":
 *                           type: array
 *                           items:
 *                             type: string
 *                         "Capitaux propres":
 *                           type: array
 *                           items:
 *                             type: string
 *                         "Marge brute":
 *                           type: array
 *                           items:
 *                             type: string
 *                         "Personnel":
 *                           type: array
 *                           items:
 *                             type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Enterprise not found
 *       500:
 *         description: Server error
 */
router.get('/:enterpriseNumber', scrapeEnterprise);
router.get('/kbo/:enterpriseNumber', scrapeKboEntreprise);
//router.get('/scrape/multiple', scrapeMultipleEnterprises);


module.exports = router;
