const Establishment = require('../models/Establishment');

const establishmentController = {
  // Create a new establishment
  createEstablishment: async (req, res) => {
    try {
      const newEstablishment = new Establishment(req.body);
      const savedEstablishment = await newEstablishment.save();
      res.status(201).json(savedEstablishment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all establishments
  getAllEstablishments: async (req, res) => {
    try {
      const establishments = await Establishment.find();
      res.json(establishments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a specific establishment by EstablishmentNumber
  getEstablishmentByNumber: async (req, res) => {
    try {
      const establishment = await Establishment.findOne({ EstablishmentNumber: req.params.establishmentNumber });
      if (!establishment) return res.status(404).json({ message: 'Establishment not found' });
      res.json(establishment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update an establishment
  updateEstablishment: async (req, res) => {
    try {
      const updatedEstablishment = await Establishment.findOneAndUpdate(
        { EstablishmentNumber: req.params.establishmentNumber },
        req.body,
        { new: true }
      );
      if (!updatedEstablishment) return res.status(404).json({ message: 'Establishment not found' });
      res.json(updatedEstablishment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete an establishment
  deleteEstablishment: async (req, res) => {
    try {
      const deletedEstablishment = await Establishment.findOneAndDelete({ EstablishmentNumber: req.params.establishmentNumber });
      if (!deletedEstablishment) return res.status(404).json({ message: 'Establishment not found' });
      res.json({ message: 'Establishment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get establishments by EnterpriseNumber
  getEstablishmentsByEnterprise: async (req, res) => {
    try {
      const establishments = await Establishment.find({ EnterpriseNumber: req.params.enterpriseNumber });
      res.json(establishments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = establishmentController;