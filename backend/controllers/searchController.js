const Enterprise = require('../models/Enterprise');
const Denomination = require('../models/Denomination');
const Activity = require('../models/Activity');
const Address = require('../models/Address');
const Code = require('../models/Code');

exports.search = async (req, res) => {
  const query = req.query.query || '';
  const filters = req.query.filters ? req.query.filters.split(',') : [];

  console.log(`Query: ${query}`);
  console.log(`Filters: ${filters}`);

  try {
    let enterpriseNumbers = new Set();

    // Filter by enterprise number
    if (filters.includes('enterprise_number') || filters.length === 0) {
      const enterprises = await Enterprise.find({ EnterpriseNumber: { $regex: query, $options: 'i' } });
      enterprises.forEach(e => enterpriseNumbers.add(e.EnterpriseNumber));
    }

    // Filter by denomination (name)
    if (filters.includes('denomination') || filters.length === 0) {
      const denominations = await Denomination.find({ Denomination: { $regex: query, $options: 'i' } });
      denominations.forEach(d => enterpriseNumbers.add(d.EntityNumber));
    }

    // Filter by activity
    if (filters.includes('activity') || filters.length === 0) {
      const codeResults = await Code.find({
        Category: 'ActivityGroup',
        Description: { $regex: query, $options: 'i' }
      });
      const activityGroups = codeResults.map(code => code.Code);
      const activities = await Activity.find({ ActivityGroup: { $in: activityGroups } });
      activities.forEach(a => enterpriseNumbers.add(a.EntityNumber));
    }

    // Filter by address (zipcode)
    if (filters.includes('address') || filters.length === 0) {
      const addresses = await Address.find({ Zipcode: { $regex: query, $options: 'i' } });
      addresses.forEach(a => enterpriseNumbers.add(a.EntityNumber));
    }

    // Fetch enterprises based on collected enterprise numbers
    const enterprises = await Enterprise.find({ EnterpriseNumber: { $in: Array.from(enterpriseNumbers) } })
      .select('_id EnterpriseNumber Status');

    // Fetch the first denomination for each enterprise
    const enterprisesWithDenomination = await Promise.all(enterprises.map(async (enterprise) => {
      const denomination = await Denomination.findOne({ EntityNumber: enterprise.EnterpriseNumber })
        .sort({ _id: 1 })
        .select('Denomination -_id');
      
      return {
        ...enterprise.toObject(),
        FirstDenomination: denomination ? denomination.Denomination : null
      };
    }));

    if (enterprisesWithDenomination.length > 0) {
      res.json(enterprisesWithDenomination);
    } else {
      res.status(404).json({ message: 'No results found' });
    }
  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
}