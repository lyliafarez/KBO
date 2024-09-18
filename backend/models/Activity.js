const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  EntityNumber: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Entreprise'
  },
  ActivityGroup: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Code' // check if code is realy same and category == 'activityGroup
  },
  NaceVersion: {
    type: String,
    required: true
  },
  NaceCode: {
    type: String,
    required: true
  },
  Classification: {
    type: String,
    required: true
  }
});
const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
