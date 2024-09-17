// routes/denominationRoutes.js

const express = require('express');
const router = express.Router();
const denominationController = require('../controllers/DenominationController');
//const auth = require('../middleware/auth'); // Assuming you have an auth middleware

// Apply auth middleware to all routes (optional, remove if you don't need authentication)
//router.use(auth);

// Create a new denomination
router.post('/', denominationController.createDenomination);

// Get all denominations
router.get('/', denominationController.getAllDenominations);

// Get a single denomination by ID
router.get('/:id', denominationController.getDenominationById);

// Update a denomination
router.put('/:id', denominationController.updateDenomination);

// Delete a denomination
router.delete('/:id', denominationController.deleteDenomination);

module.exports = router;