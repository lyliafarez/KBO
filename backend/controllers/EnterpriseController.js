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
  /* getEnterpriseByNumber: async (req, res) => {
    try {
      const enterprise = await Enterprise.findOne({ EnterpriseNumber: req.params.enterpriseNumber });
      if (!enterprise) return res.status(404).json({ message: 'Enterprise not found' });
      res.json(enterprise);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }, */

  getEnterpriseByNumber : async (req, res) => {
    try {
      const { enterpriseNumber } = req.params;
      const language = req.query.lang || 'FR'; // Default to English if no language is specified
  
      const result = await Enterprise.aggregate([
        {
          $match: { EnterpriseNumber: enterpriseNumber }
        },
        {
          $lookup: {
            from: 'codes',
            let: { 
              status: '$Status', 
              juridicalSituation: '$JuridicalSituation',
              typeOfEnterprise: '$TypeOfEnterprise',
              juridicalForm: '$JuridicalForm'
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$Language', language] },
                      {
                        $or: [
                          { $and: [{ $eq: ['$Category', 'Status'] }, { $eq: ['$Code', '$$status'] }] },
                          { $and: [{ $eq: ['$Category', 'JuridicalSituation'] }, { $eq: ['$Code', '$$juridicalSituation'] }] },
                          { $and: [{ $eq: ['$Category', 'TypeOfEnterprise'] }, { $eq: ['$Code', '$$typeOfEnterprise'] }] },
                          { $and: [{ $eq: ['$Category', 'JuridicalForm'] }, { $eq: ['$Code', '$$juridicalForm'] }] }
                        ]
                      }
                    ]
                  }
                }
              }
            ],
            as: 'codes'
          }
        },
        {
          $addFields: {
            statusDescription: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: '$codes',
                    cond: { $eq: ['$$this.Category', 'Status'] }
                  }
                },
                0
              ]
            },
            juridicalSituationDescription: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: '$codes',
                    cond: { $eq: ['$$this.Category', 'JuridicalSituation'] }
                  }
                },
                0
              ]
            },
            typeOfEnterpriseDescription: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: '$codes',
                    cond: { $eq: ['$$this.Category', 'TypeOfEnterprise'] }
                  }
                },
                0
              ]
            },
            juridicalFormDescription: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: '$codes',
                    cond: { $eq: ['$$this.Category', 'JuridicalForm'] }
                  }
                },
                0
              ]
            }
          }
        },
        {
          $project: {
            _id: 1,
            EnterpriseNumber: 1,
            Status: 1,
            JuridicalSituation: 1,
            TypeOfEnterprise: 1,
            JuridicalForm: 1,
            JuridicalFormCAC: 1,
            startDate: 1,
            statusDescription: '$statusDescription.Description',
            juridicalSituationDescription: '$juridicalSituationDescription.Description',
            typeOfEnterpriseDescription: '$typeOfEnterpriseDescription.Description',
            juridicalFormDescription: '$juridicalFormDescription.Description'
          }
        }
      ]);
  
      if (result.length === 0) {
        return res.status(404).json({ message: 'Enterprise not found' });
      }
  
      res.json(result[0]);
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