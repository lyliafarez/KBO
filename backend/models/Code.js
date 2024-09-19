const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  Category: {
    type: String,
    required: true
  },
  Code: {
    type: String,
    required: true
  },
  Language: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  }
});

codeSchema.index({ Category: 1, Code: 1, Language: 1 });
const Code = mongoose.model("Codes", codeSchema);
module.exports = Code;