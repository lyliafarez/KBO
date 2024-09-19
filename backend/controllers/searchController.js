const Enterprise = require('../models/Enterprise');
const Denomination = require('../models/Denomination');

exports.search = async (req, res) => {
  const query = req.query.query;

  const isEntityNumber = /^\d{4}\.\d{3}\.\d{3}$/.test(query);
  console.log(`Query: ${query}`);
  console.log(`Is Entity Number: ${isEntityNumber}`);

  try {
    if (isEntityNumber) {
      // Rechercher par numéro d'entreprise
      const enterpriseResult = await Enterprise.findOne({ EnterpriseNumber: query });
      console.log('Enterprise Result:', enterpriseResult);
      const denominationResult = await Denomination.findOne({ EntityNumber: query });
      console.log('Denomination Result:', denominationResult);

      if (enterpriseResult || denominationResult) {
        res.json({
          enterprise: enterpriseResult,
          denomination: denominationResult,
        });
      } else {
        res.status(404).json({ message: 'Entreprise non trouvée' });
      }
    } else {
      // Rechercher par nom d'entreprise
      const denominationResults = await Denomination.find({ Denomination: { $regex: query, $options: 'i' } });
      if (denominationResults.length > 0) {
        res.json(denominationResults);
      } else {
        res.status(404).json({ message: 'Aucune entreprise avec ce nom trouvée' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
