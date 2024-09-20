const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/UploadController');

/**
 * @swagger
 * /api/upload-entreprise:
 *   post:
 *     summary: Upload and process the first 1000 enterprises from a CSV file
 *     tags: [Upload]
 *     responses:
 *       200:
 *         description: Enterprises uploaded successfully
 *       500:
 *         description: Server error during upload process
 */
router.post('/upload-entreprise', uploadController.uploadFirst10Enterprises);

/**
 * @swagger
 * /api/upload-address:
 *   post:
 *     summary: Upload and process the first 10000 addresses from a CSV file
 *     tags: [Upload]
 *     responses:
 *       200:
 *         description: Addresses uploaded successfully
 *       500:
 *         description: Server error during upload process
 */
router.post('/upload-address', uploadController.uploadFirst100Addresses);

/**
 * @swagger
 * /api/upload-establishment:
 *   post:
 *     summary: Upload and process the first 10000 establishments from a CSV file
 *     tags: [Upload]
 *     responses:
 *       200:
 *         description: Establishments uploaded successfully
 *       500:
 *         description: Server error during upload process
 */
router.post('/upload-establishment', uploadController.uploadFirst100Establishments);

/**
 * @swagger
 * /api/upload-activity:
 *   post:
 *     summary: Upload and process the first 10000 activities from a CSV file
 *     tags: [Upload]
 *     responses:
 *       200:
 *         description: Activities uploaded successfully
 *       500:
 *         description: Server error during upload process
 */
router.post('/upload-activity', uploadController.uploadFirst100Activities);

/**
 * @swagger
 * /api/upload-denomination:
 *   post:
 *     summary: Upload and process the first 10000 denominations from a CSV file
 *     tags: [Upload]
 *     responses:
 *       200:
 *         description: Denominations uploaded successfully
 *       500:
 *         description: Server error during upload process
 */
router.post('/upload-denomination', uploadController.uploadFirst100Denominations);

/**
 * @swagger
 * /api/upload-contact:
 *   post:
 *     summary: Upload and process the first 10000 contacts from a CSV file
 *     tags: [Upload]
 *     responses:
 *       200:
 *         description: Contacts uploaded successfully
 *       500:
 *         description: Server error during upload process
 */
router.post('/upload-contact', uploadController.uploadFirst100Contacts);

/**
 * @swagger
 * /api/upload-code:
 *   post:
 *     summary: Upload and process the first 10000 codes from a CSV file
 *     tags: [Upload]
 *     responses:
 *       200:
 *         description: Codes uploaded successfully
 *       500:
 *         description: Server error during upload process
 */
router.post('/upload-code', uploadController.uploadFirst100Codes);

/**
 * @swagger
 * /api/upload-branch:
 *   post:
 *     summary: Upload and process the first 10000 branches from a CSV file
 *     tags: [Upload]
 *     responses:
 *       200:
 *         description: Branches uploaded successfully
 *       500:
 *         description: Server error during upload process
 */
router.post('/upload-branch', uploadController.uploadFirst100Branches);

module.exports = router;
