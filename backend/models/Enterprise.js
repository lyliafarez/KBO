const mongoose = require('mongoose');

const enterpriseSchema = new mongoose.Schema({
  EnterpriseNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^\d{4}\.\d{3}\.\d{3}$/.test(v);
      },
      message: props => `${props.value} is not a valid Enterprise Number!`
    }
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
enterpriseSchema.index({ EnterpriseNumber: 1 });
enterpriseSchema.index({ Status: 1 });
const Enterprise = mongoose.model('Enterprise', enterpriseSchema);

module.exports = Enterprise;