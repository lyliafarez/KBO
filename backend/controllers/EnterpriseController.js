const Enterprise = require('../models/Enterprise');

const enterpriseController = {
  // Create a new enterprise
  createEnterprise: async (req, res) => {
    try {
      const newEnterprise = new Enterprise(req.body);
      const savedEnterprise = await newEnterprise.save();
      res.status(201).json(savedEnterprise);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all enterprises
  getAllEnterprises: async (req, res) => {
    try {
      const enterprises = await Enterprise.find();
      res.json(enterprises);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a specific enterprise by EnterpriseNumber
  getEnterpriseByNumber: async (req, res) => {
    try {
      const enterprise = await Enterprise.findOne({ EnterpriseNumber: req.params.enterpriseNumber });
      if (!enterprise) return res.status(404).json({ message: 'Enterprise not found' });
      res.json(enterprise);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update an enterprise
  updateEnterprise: async (req, res) => {
    try {
      const updatedEnterprise = await Enterprise.findOneAndUpdate(
        { EnterpriseNumber: req.params.enterpriseNumber },
        req.body,
        { new: true }
      );
      if (!updatedEnterprise) return res.status(404).json({ message: 'Enterprise not found' });
      res.json(updatedEnterprise);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete an enterprise
  deleteEnterprise: async (req, res) => {
    try {
      const deletedEnterprise = await Enterprise.findOneAndDelete({ EnterpriseNumber: req.params.enterpriseNumber });
      if (!deletedEnterprise) return res.status(404).json({ message: 'Enterprise not found' });
      res.json({ message: 'Enterprise deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get enterprises by Status
  getEnterprisesByStatus: async (req, res) => {
    try {
      const enterprises = await Enterprise.find({ Status: req.params.status });
      res.json(enterprises);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = enterpriseController;