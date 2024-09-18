const Denomination = require('../models/Denomination');

// Create a new denomination
exports.createDenomination = async (req, res) => {
  try {
    const denomination = new Denomination(req.body);
    await denomination.save();
    res.status(201).json(denomination);
  } catch (error) {
    res.status(400).json({ message: 'Error creating denomination', error: error.message });
  }
};

// Get all denominations
exports.getAllDenominations = async (req, res) => {
  try {
    const denominations = await Denomination.find();
    res.json(denominations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching denominations', error: error.message });
  }
};

// Get a single denomination by ID
exports.getDenominationById = async (req, res) => {
  try {
    const denomination = await Denomination.findById(req.params.id);
    if (!denomination) {
      return res.status(404).json({ message: 'Denomination not found' });
    }
    res.json(denomination);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching denomination', error: error.message });
  }
};

// Update a denomination
exports.updateDenomination = async (req, res) => {
  try {
    const denomination = await Denomination.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!denomination) {
      return res.status(404).json({ message: 'Denomination not found' });
    }
    res.json(denomination);
  } catch (error) {
    res.status(400).json({ message: 'Error updating denomination', error: error.message });
  }
};

// Delete a denomination
exports.deleteDenomination = async (req, res) => {
  try {
    const denomination = await Denomination.findByIdAndDelete(req.params.id);
    if (!denomination) {
      return res.status(404).json({ message: 'Denomination not found' });
    }
    res.json({ message: 'Denomination deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting denomination', error: error.message });
  }
};