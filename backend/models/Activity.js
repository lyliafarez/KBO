const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  EntityNumber: {
    type: String,
    required: true,
    ref: 'Entreprise'
  },
  ActivityGroup: {
    type: String,
    required: true
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
activitySchema.index({ EntityNumber: 1 });
const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
