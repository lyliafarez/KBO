const express = require('express');
const router = express.Router();
const activityController = require('../controllers/ActivityController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       required:
 *         - EntityNumber
 *         - ActivityGroup
 *         - NaceVersion
 *         - NaceCode
 *         - Classification
 *       properties:
 *         EntityNumber:
 *           type: string
 *           example: '1234.567.890'
 *           description: The entity number associated with the activity
 *         ActivityGroup:
 *           type: string
 *           example: '003'
 *           description: The group of the activity
 *         NaceVersion:
 *           type: string
 *           example: '2003'
 *           description: The version of NACE classification used
 *         NaceCode:
 *           type: string
 *           example: '93126'
 *           description: The NACE code for the activity
 *         Classification:
 *           type: string
 *           example: 'MAIN'
 *           description: The classification of the activity
 */

/**
 * @swagger
 * tags:
 *   name: Activities
 *   description: Activity management
 */

/**
 * @swagger
 * /api/activities:
 *   post:
 *     summary: Create a new activity
 *     tags: [Activities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       201:
 *         description: The created activity
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       400:
 *         description: Invalid input
 */
router.post('/', activityController.createActivity);

/**
 * @swagger
 * /api/activities:
 *   get:
 *     summary: Retrieve all activities
 *     tags: [Activities]
 *     responses:
 *       200:
 *         description: A list of activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 */
router.get('/', activityController.getActivities);

/**
 * @swagger
 * /api/activities/{id}:
 *   put:
 *     summary: Update an activity
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The activity ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       200:
 *         description: The updated activity
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       404:
 *         description: Activity not found
 *       400:
 *         description: Invalid input
 */
router.put('/:id', activityController.updateActivity);

module.exports = router;