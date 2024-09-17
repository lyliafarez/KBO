// routes/branchRoutes.js

const express = require('express');
const router = express.Router();
const branchController = require('../controllers/BranchController');
//const auth = require('../middleware/auth'); // Assuming you have an auth middleware

// Apply auth middleware to all routes (optional, remove if you don't need authentication)
//router.use(auth);

// Create a new branch
router.post('/', branchController.createBranch);

// Get all branches
router.get('/', branchController.getAllBranches);

// Get a single branch by ID
router.get('/:id', branchController.getBranchById);

// Update a branch
router.put('/:id', branchController.updateBranch);

// Delete a branch
router.delete('/:id', branchController.deleteBranch);

// Get branches by EnterpriseNumber
router.get('/enterprise/:enterpriseNumber', branchController.getBranchesByEnterpriseNumber);

module.exports = router;