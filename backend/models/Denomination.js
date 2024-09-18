const mongoose = require('mongoose');

const denominationSchema = new mongoose.Schema({
  EntityNumber: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Entreprise',
    validate: {
      validator: function(v) {
        return /^\d{4}\.\d{3}\.\d{3}$/.test(v);
      },
      message: props => `${props.value} is not a valid Entity Number!`
    }
  },
  Language: {
    type: String,
    required: true,
    enum: ['1', '2', '3', '4'], // Assuming 1: Dutch, 2: French, 3: German, 4: English
    validate: {
      validator: function(v) {
        return /^[1-4]$/.test(v);
      },
      message: props => `${props.value} is not a valid Language code!`
    }
  },
  TypeOfDenomination: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{3}$/.test(v);
      },
      message: props => `${props.value} is not a valid Type of Denomination!`
    }
  },
  Denomination: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Compound index for uniqueness
denominationSchema.index({ EntityNumber: 1, Language: 1, TypeOfDenomination: 1 }, { unique: true });

const Denomination = mongoose.model('Denomination', denominationSchema);

module.exports = Denomination;