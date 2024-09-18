const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/UploadController');

// Route to trigger the CSV upload process
router.post('/upload-entreprise', uploadController.uploadFirst10Enterprises);
router.post('/upload-address', uploadController.uploadFirst100Addresses);
router.post('/upload-establishment', uploadController.uploadFirst100Establishments);
router.post('/upload-activity', uploadController.uploadFirst100Activities);
router.post('/upload-denomination', uploadController.uploadFirst100Denominations);
router.post('/upload-contact', uploadController.uploadFirst100Contacts);
router.post('/upload-code', uploadController.uploadFirst100Codes);
router.post('/upload-branch', uploadController.uploadFirst100Branches);

module.exports = router;
