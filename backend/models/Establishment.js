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
    ref: 'Entreprise',
    validate: {
      validator: function(v) {
        return /^\d{4}\.\d{3}\.\d{3}$/.test(v);
      },
      message: props => `${props.value} is not a valid Enterprise Number!`
    }
  }
});
establishmentSchema.index({ EnterpriseNumber: 1 });

const Establishment = mongoose.model('Establishment', establishmentSchema);

module.exports = Establishment;