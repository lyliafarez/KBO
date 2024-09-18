const mongoose = require('mongoose');

const enterpriseSchema = new mongoose.Schema({
  EnterpriseNumber: {
    type: String,
    required: true,
    unique: true,
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
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Code' // check if code is realy same and category == 'juridical'form
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