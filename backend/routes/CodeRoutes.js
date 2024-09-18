const express = require('express');
const codeController = require('../controllers/CodeController');
const router = express.Router();

router.get('/', codeController.getCodes);
router.get('/:id', codeController.getCodeById);
router.post('/', codeController.createCode);
router.put('/:id', codeController.updateCode);
router.delete('/:id', codeController.deleteCode);

module.exports = router;
