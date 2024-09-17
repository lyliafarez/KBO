const express = require('express');
const Address = require('../models/Address');
const router = express.Router();

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

router.get('/', async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
