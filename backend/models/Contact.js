const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  EntityNumber: {
    type: String,
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
contactSchema.index({ EntityNumber: 1 });
const Contact = mongoose.model("contacts", contactSchema);
module.exports = Contact;

