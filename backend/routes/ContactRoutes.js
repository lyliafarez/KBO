const express = require('express');
const router = express.Router();
const contactController = require('../controllers/ContactController');

/**
 * @swagger
 * tags:
 *  name: Contacts
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - EntityNumber
 *         - EntityContact
 *         - ContactType
 *         - Value
 *       properties:
 *         EntityNumber:
 *           type: string
 *           example: '0200.362.210'
 *           description: The entity number associated with the contact
 *         EntityContact:
 *           type: string
 *           example: 'ENT'
 *           description: The entity contact information
 *         ContactType:
 *           type: string
 *           example: 'EMAIL'
 *           description: The type of contact
 *         Value:
 *           type: string
 *           example: 'officiel.ic-inbw@inbw.be'
 *           description: The value of the contact information
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Retrieve a list of contacts
 *     tags: [Contacts]
 *     description: Retrieve a list of all contacts from the database
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
router.get('/', contactController.getContacts);

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     tags: [Contacts]
 *     description: Retrieve a single contact by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 */
router.get('/:id', contactController.getContactById);

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     description: Create a new contact in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Created contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Invalid input
 */
router.post('/', contactController.createContact);

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     tags: [Contacts]
 *     description: Update an existing contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Updated contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 *       400:
 *         description: Invalid input
 */
router.put('/:id', contactController.updateContact);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
 *     description: Delete a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact successfully deleted
 *       404:
 *         description: Contact not found
 */
router.delete('/:id', contactController.deleteContact);

module.exports = router;