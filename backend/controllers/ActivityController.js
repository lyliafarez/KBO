const Activity = require('../models/Activity');

exports.createActivity = async (req, res) => {
  const { EntityNumber, ActivityGroup, NaceVersion, NaceCode, Classification } = req.body;

  const activity = new Activity({
    EntityNumber,
    ActivityGroup,
    NaceVersion,
    NaceCode,
    Classification
  });

  try {
    const savedActivity = await activity.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateActivity = async (req, res) => {
  const { id } = req.params;
  const { EntityNumber, ActivityGroup, NaceVersion, NaceCode, Classification } = req.body;

  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      { EntityNumber, ActivityGroup, NaceVersion, NaceCode, Classification },
      { new: true, runValidators: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.json(updatedActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
