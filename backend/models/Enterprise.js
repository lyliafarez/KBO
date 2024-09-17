const mongoose = require('mongoose');

const enterpriseSchema = new mongoose.Schema({
  EnterpriseNumber: {
    type: String,
    required: true,
    unique: true
  },
  Status: {
    type: String,
    required: true
  },
  JuridicalSituation: {
    type: String,
    required: true
  },
  TypeOfEnterprise: {
    type: String,
    required: true
  },
  JuridicalForm: {
    type: String,
    required: true
  },
  JuridicalFormCAC: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  }
});

const Enterprise = mongoose.model('Enterprise', enterpriseSchema);

module.exports = Enterprise;