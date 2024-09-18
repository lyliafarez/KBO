const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  Id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Entreprise',
    unique: true,
    validate: {
      validator: function(v) {
        return /^\d{1,3}\.\d{3}\.\d{3}\.\d{3}$/.test(v);
      },
      message: props => `${props.value} is not a valid Branch ID!`
    }
  },
  StartDate: {
    type: Date,
    required: true
  },
  EnterpriseNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{4}\.\d{3}\.\d{3}$/.test(v);
      },
      message: props => `${props.value} is not a valid Enterprise Number!`
    }
  }
}, { timestamps: true });

// Index for faster queries
branchSchema.index({ EnterpriseNumber: 1 });

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;