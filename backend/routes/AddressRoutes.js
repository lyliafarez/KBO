const express = require('express');
const Address = require('../models/Address');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - EntityNumber
 *         - TypeOfAddress
 *         - Zipcode
 *         - MunicipalityNL
 *         - MunicipalityFR
 *         - StreetNL
 *         - StreetFR
 *         - HouseNumber
 *       properties:
 *         EntityNumber:
 *           type: string
 *           example: '1234.567.890'
 *           description: The entity number associated with the address
 *         TypeOfAddress:
 *           type: string
 *           example: 'REGO'
 *           description: The type of address
 *         CountryNL:
 *           type: string
 *           description: The country name in Dutch
 *         CountryFR:
 *           type: string
 *           description: The country name in French
 *         Zipcode:
 *           type: string
 *           description: The postal code
 *         MunicipalityNL:
 *           type: string
 *           description: The municipality name in Dutch
 *         MunicipalityFR:
 *           type: string
 *           description: The municipality name in French
 *         StreetNL:
 *           type: string
 *           description: The street name in Dutch
 *         StreetFR:
 *           type: string
 *           description: The street name in French
 *         HouseNumber:
 *           type: string
 *           description: The house number
 *         Box:
 *           type: string
 *           description: The box number (if applicable)
 *         ExtraAddressInfo:
 *           type: string
 *           description: Any additional address information
 *         DateStrikingOff:
 *           type: string
 *           format: date
 *           description: The date when the address was struck off (if applicable)
 */

/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: Address management
 */

/**
 * @swagger
 * /api/addresses:
 *   post:
 *     summary: Create a new address
 *     tags: [Addresses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: The created address
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       400:
 *         description: Invalid input
 */
router.post('/', async (req, res) => {
  const {
    EntityNumber,
    TypeOfAddress,
    CountryNL,
    CountryFR,
    Zipcode,
    MunicipalityNL,
    MunicipalityFR,
    StreetNL,
    StreetFR,
    HouseNumber,
    Box,
    ExtraAddressInfo,
    DateStrikingOff
  } = req.body;

  const address = new Address({
    EntityNumber,
    TypeOfAddress,
    CountryNL,
    CountryFR,
    Zipcode,
    MunicipalityNL,
    MunicipalityFR,
    StreetNL,
    StreetFR,
    HouseNumber,
    Box,
    ExtraAddressInfo,
    DateStrikingOff
  });

  try {
    const savedAddress = await address.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/addresses:
 *   get:
 *     summary: Retrieve all addresses
 *     tags: [Addresses]
 *     responses:
 *       200:
 *         description: A list of addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/addresses/{id}:
 *   put:
 *     summary: Update an address
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: The updated address
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       404:
 *         description: Address not found
 *       400:
 *         description: Invalid input
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    EntityNumber,
    TypeOfAddress,
    CountryNL,
    CountryFR,
    Zipcode,
    MunicipalityNL,
    MunicipalityFR,
    StreetNL,
    StreetFR,
    HouseNumber,
    Box,
    ExtraAddressInfo,
    DateStrikingOff
  } = req.body;

  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      {
        EntityNumber,
        TypeOfAddress,
        CountryNL,
        CountryFR,
        Zipcode,
        MunicipalityNL,
        MunicipalityFR,
        StreetNL,
        StreetFR,
        HouseNumber,
        Box,
        ExtraAddressInfo,
        DateStrikingOff
      },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: 'Adresse non trouvée' });
    }

    res.json(updatedAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
