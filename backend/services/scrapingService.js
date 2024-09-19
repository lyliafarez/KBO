const axios = require('axios');
const cheerio = require('cheerio');


async function scrapeEntrepriseweb(enterpriseNumber) {
    const formattedNumber = enterpriseNumber.replace(/\./g, '');
    const url = `https://www.companyweb.be/fr/${formattedNumber}`;

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Crée un objet pour stocker toutes les données extraites
        const entrepriseData = {};

        // Extraire le nom de l'entreprise
        entrepriseData.name = $('#company-name').text().trim(); // Nom de l'entreprise

        // Extraire le statut de l'entreprise (le texte après le badge)
        entrepriseData.status = $('.ml-2.badge').text().trim(); // Status après "badge"

        // Extraire le numéro d'entreprise
        entrepriseData.businessNumber = $('h2[itemprop="vatID"]').text().trim(); // Numéro d'entreprise

        // Extraire l'adresse
        entrepriseData.address = $('#address').text().trim() + ', ' +
                                  $('#postalcode').text().trim() + ' ' +
                                  $('#locality').text().trim(); // Adresse complète

        // Extraire la date de création
        entrepriseData.creationDate = $('div[itemprop="foundingDate"]').text().trim(); // Date de création

        // Extraire l'activité principale
        entrepriseData.mainActivity = $('span[itemprop="description"]').text().trim(); // Activité principale

        // Extraire les années des en-têtes du tableau financier et les mettre dans titleFinancialData
        let titleFinancialData = [];
        $('table.data-table thead th').each((index, element) => {
            const year = $(element).text().trim();
            if (year && !isNaN(year)) { // Vérifie que c'est bien une année
                titleFinancialData.push(year);
            }
        });

        // Trier les années dans l'ordre décroissant
        titleFinancialData.sort((a, b) => b - a);

        // Ajouter les années triées aux données de l'entreprise
        entrepriseData.financialYears = titleFinancialData;

        // Générer une phrase avec les années financières
        if (titleFinancialData.length > 0) {
            entrepriseData.financialStatement = `Données financières et fluctuations en pourcentage de l'année ${titleFinancialData[0]} à l'année ${titleFinancialData[titleFinancialData.length - 1]}, de manière décroissante.`;
        } else {
            entrepriseData.financialStatement = 'Aucune donnée financière disponible.';
        }
        
        // Extraire les données financières
        entrepriseData.financialData = {};
        $('table.data-table tbody tr').each((index, element) => {
            const label = $(element).find('td.start-tab').text().trim();
            const values = $(element).find('td').slice(1).map((i, el) => $(el).text().trim()).get();
            entrepriseData.financialData[label] = values;
        });

          // Extraire les informations du modal Google Maps
        entrepriseData.mapData = {
            name: $('div.map').attr('data-name'),
            street: $('div.map').attr('data-street'),
            number: $('div.map').attr('data-number'),
            postcode: $('div.map').attr('data-postcode'),
            city: $('div.map').attr('data-city')
        };


        return entrepriseData;
    } catch (error) {
        console.error('Erreur lors du scraping:', error);
        return {
            error: 'Erreur lors du scraping'
        };
    }
}



async function scrapeKbo(enterpriseNumber) {
    const url = `https://kbopub.economie.fgov.be/kbopub-m/enterprise/${enterpriseNumber}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const EntrepriseName = $('h1').text().trim();

    return {
        EntrepriseName: EntrepriseNameFr,
        
    };
}

module.exports = {
    scrapeEntrepriseweb,
    scrapeKbo
};
