const { scrapeEntrepriseweb, scrapeKbo } = require('../services/scrapingService');
const Enterprise = require('../models/Enterprise');

async function scrapeEnterprise(req, res) {
    const { enterpriseNumber } = req.params;

    try {
        const enterprise = await Enterprise.findOne({ EnterpriseNumber: enterpriseNumber });

        if (!enterprise) {
            return res.status(404).json({ error: 'Entreprise non trouvée.' });
        }
        
        const EntrepriseDataEntrepriseweb = await scrapeEntrepriseweb(enterpriseNumber);
        

        res.json({
            EntrepriseDataEntrepriseweb,
            
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors du scraping.' });
    }
}
async function scrapeKboEntreprise(req, res){
    const { enterpriseNumber } = req.params;

    try {
        const enterprise = await Enterprise.findOne({ EnterpriseNumber: enterpriseNumber });

        if (!enterprise) {
            return res.status(404).json({ error: 'Entreprise non trouvée.' });
        }
    const EntrepriseDataKbo = await scrapeKbo(enterpriseNumber);
    res.json({
        EntrepriseDataKbo
    });}
    catch (error) {
        res.status(500).json({ error: 'Erreur lors du scraping.' });
    }
}

async function scrapeMultipleEnterprises(req, res) {
    try {
        const enterprises = await Enterprise.find({});

        const scrapingPromises = enterprises.map(async (enterprise) => {
            const enterpriseNumber = enterprise.EnterpriseNumber;
            const EntrepriseDataEntrepriseweb = await scrapeEntrepriseweb(enterpriseNumber);
           // const EntrepriseDataKbo = await scrapeKbo(enterpriseNumber);

            return {
                enterpriseNumber,
                EntrepriseDataEntrepriseweb
                //EntrepriseDataKbo
            };
        });

        const results = await Promise.all(scrapingPromises);

        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors du scraping.' });
    }
}

module.exports = {
    scrapeEnterprise,
    scrapeKboEntreprise,
    scrapeMultipleEnterprises
};
