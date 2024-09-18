const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  EntityNumber: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'EntityType' // Référence polymorphe
  },
  EntityType: {
    type: String,
    enum: ['Enterprise', 'Establishment'],
    required: true
  },
  TypeOfAddress: {
    type: String,
    required: true
  },
  CountryNL: {
    type: String
  },
  CountryFR: {
    type: String
  },
  Zipcode: {
    type: String,
   // required: true
  },
  MunicipalityNL: {
    type: String,
    //required: true
  },
  MunicipalityFR: {
    type: String,
    //required: true
  },
  StreetNL: {
    type: String,
    //required: true
  },
  StreetFR: {
    type: String,
  
  },
  HouseNumber: {
    type: String,
   
  },
  Box: {
    type: String
  },
  ExtraAddressInfo: {
    type: String
  },
  DateStrikingOff: {
    type: Date
  }
});

module.exports = mongoose.model('Address', addressSchema);
