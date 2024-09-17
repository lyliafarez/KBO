const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  EntityNumber: {
    type: String,
    required: true
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

module.exports = mongoose.model('Activity', activitySchema);
