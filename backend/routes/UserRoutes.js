const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
//const auth = require('../middleware/auth'); // Assuming you have an auth middleware

// Public routes (no authentication required)
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes (authentication required)
//router.use(auth); // Apply auth middleware to all routes below this line

// User profile routes
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

// User management routes (typically admin operations)
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;