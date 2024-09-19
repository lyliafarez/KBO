const express = require('express');
const router = express.Router();
const { scrapeEnterprise } = require('../controllers/ScrappingController');

router.get('/:enterpriseNumber', scrapeEnterprise);
//router.get('/scrape/multiple', scrapeMultipleEnterprises);


module.exports = router;
