const mongoose = require('mongoose');

const establishmentSchema = new mongoose.Schema({
  EstablishmentNumber: {
    type: String,
    required: true,
    unique: true
  },
  StartDate: {
    type: Date,
    required: true
  },
  EnterpriseNumber: {
    type: String,
    required: true,
    ref: 'Enterprise'
  }
});

const Establishment = mongoose.model('Establishment', establishmentSchema);

module.exports = Establishment;