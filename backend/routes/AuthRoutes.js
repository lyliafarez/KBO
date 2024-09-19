const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
//const auth = require('../middleware/auth'); // Assuming you have an auth middleware

// Public routes (no authentication required)
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);




module.exports = router;