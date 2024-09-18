const Address = require('../models/Address');
const csv = require('csv-parser');
const fs = require('fs');

exports.createAddress = async (req, res) => {
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
  

  console.log("EntityNumber:", EntityNumber);


  let EntityType;
  if (/^\d{4}\.\d{3}\.\d{3}$/.test(EntityNumber)) {
      EntityType = 'Enterprise';
  } else if (/^\d{1,3}\.\d{3}\.\d{3}\.\d{3}$/.test(EntityNumber)) {
      EntityType = 'Establishment';
  } else {
      return res.status(400).json({ message: 'Invalid EntityNumber format' });
  }

  try {
      const address = new Address({
          EntityNumber,
          EntityType,  // Ajoute automatiquement le EntityType
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
  
      const savedAddress = await address.save();
      res.status(201).json(savedAddress);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};
  

exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAddress = async (req, res) => {
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
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json(updatedAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
