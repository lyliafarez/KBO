const express = require('express');
const router = express.Router();
const establishmentController = require('../controllers/EstablishmentController');

router.post('/', establishmentController.createEstablishment);
router.get('/', establishmentController.getAllEstablishments);
router.get('/:establishmentNumber', establishmentController.getEstablishmentByNumber);
router.put('/:establishmentNumber', establishmentController.updateEstablishment);
router.delete('/:establishmentNumber', establishmentController.deleteEstablishment);
router.get('/enterprise/:enterpriseNumber', establishmentController.getEstablishmentsByEnterprise);

module.exports = router;