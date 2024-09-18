const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  EntityNumber: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Entreprise'
  },
  EntityContact: {
    type: String,
    required: true
  },
  ContactType: {
    type: String,
    required: true 
  },
  Value: {
    type: String,
    required: true
  }
});

const Contact = mongoose.model("contacts", contactSchema);
module.exports = Contact;

