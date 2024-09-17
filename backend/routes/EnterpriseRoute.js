const express = require('express');
const router = express.Router();
const enterpriseController = require('../controllers/EnterpriseController');

router.post('/', enterpriseController.createEnterprise);
router.get('/', enterpriseController.getAllEnterprises);
router.get('/:enterpriseNumber', enterpriseController.getEnterpriseByNumber);
router.put('/:enterpriseNumber', enterpriseController.updateEnterprise);
router.delete('/:enterpriseNumber', enterpriseController.deleteEnterprise);
router.get('/status/:status', enterpriseController.getEnterprisesByStatus);

module.exports = router;