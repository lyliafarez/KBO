const mongoose = require('mongoose');

const denominationSchema = new mongoose.Schema({
  EntityNumber: {
    type: String,
    required: true,
    ref: 'Entreprise',
    trim: true,
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
    enum: ['0','1', '2', '3', '4'], // Assuming 1: Dutch, 2: French, 3: German, 4: English
    validate: {
      validator: function(v) {
        return /^[0-4]$/.test(v);
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
    trim: true,
    required: true
  }
}, { timestamps: true });

// Compound index for uniqueness
denominationSchema.index({ EntityNumber: 1, Language: 1, TypeOfDenomination: 1 }, { unique: true });
denominationSchema.index({ EntityNumber: 1 });
denominationSchema.index({ Denomination: 'text' });


const Denomination = mongoose.model('Denomination', denominationSchema);

module.exports = Denomination;