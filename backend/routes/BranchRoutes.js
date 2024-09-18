// routes/branchRoutes.js

const express = require('express');
const router = express.Router();
const branchController = require('../controllers/BranchController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - Id
 *         - StartDate
 *         - EnterpriseNumber
 *       properties:
 *         Id:
 *           type: string
 *           example: '9.000.006.626'
 *           description: The unique identifier for the branch
 *           pattern: '^\d{1,3}\.\d{3}\.\d{3}\.\d{3}$'
 *         StartDate:
 *           type: string
 *           example: '01-09-1995'
 *           format: date
 *           description: The start date of the branch
 *         EnterpriseNumber:
 *           type: string
 *           example: '0257.883.408'
 *           description: The enterprise number associated with the branch
 *           pattern: '^\d{4}\.\d{3}\.\d{3}$'
 */

/**
 * @swagger
 * tags:
 *   name: Branches
 *   description: Branch management
 */

/**
 * @swagger
 * /api/branches:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       201:
 *         description: The created branch
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       400:
 *         description: Invalid input
 */
router.post('/', branchController.createBranch);

/**
 * @swagger
 * /api/branches:
 *   get:
 *     summary: Retrieve all branches
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: A list of branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 */
router.get('/', branchController.getAllBranches);

/**
 * @swagger
 * /api/branches/{id}:
 *   get:
 *     summary: Get a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The branch ID
 *     responses:
 *       200:
 *         description: The branch data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       404:
 *         description: Branch not found
 */
router.get('/:id', branchController.getBranchById);

/**
 * @swagger
 * /api/branches/{id}:
 *   put:
 *     summary: Update a branch
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The branch ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       200:
 *         description: The updated branch
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       404:
 *         description: Branch not found
 *       400:
 *         description: Invalid input
 */
router.put('/:id', branchController.updateBranch);

/**
 * @swagger
 * /api/branches/{id}:
 *   delete:
 *     summary: Delete a branch
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The branch ID
 *     responses:
 *       200:
 *         description: Branch successfully deleted
 *       404:
 *         description: Branch not found
 */
router.delete('/:id', branchController.deleteBranch);

/**
 * @swagger
 * /api/branches/enterprise/{enterpriseNumber}:
 *   get:
 *     summary: Get branches by Enterprise Number
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: enterpriseNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: The Enterprise Number
 *     responses:
 *       200:
 *         description: List of branches for the given enterprise
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 *       404:
 *         description: No branches found for this enterprise
 */
router.get('/enterprise/:enterpriseNumber', branchController.getBranchesByEnterpriseNumber);

module.exports = router;