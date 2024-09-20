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
    const url = `https://kbopub.economie.fgov.be/kbopub/zoeknummerform.html?lang=fr&nummer=${enterpriseNumber}&actionLu=Rechercher`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);


    // Extract specific information
    const entrepriseName = $('tr:contains("Dénomination:") td').eq(1).contents().filter((i, el) => el.nodeType === 3).text().trim();
    const status = $('td:contains("Statut")').next().text().trim();
    const numUniteEtab = $('td:contains("Numéro de l\'unité d\'établissement:")').next().text().trim();
    const SituationJuridique = $('tr:contains("Situation juridique:")').find('span.pageactief').text().trim();
    const SituationJuridiqueDate = $('tr:contains("Situation juridique:")').find('span.upd').text().replace('Depuis le ', '').trim();
    const numEntreprise = $('td:contains("Numéro d\'entreprise:")').next().contents().first().text().trim();
    const numEntrepriseDescription = $('td:contains("Numéro d\'entreprise:")').next().find('span.upd').text().replace(/^\s*\(\s*|\s*\)\s*$/g, '').trim();
    const DenominationDate = $('tr:contains("Dénomination:")').find('span.upd').text().replace('Dénomination en néerlandais, depuis le ', '').trim();
    const Abreviation = $('tr:contains("Abréviation:") td').eq(1).contents().filter(function() {
        return this.nodeType === 3; // Ignore span, only get text
    }).text().trim();
    const AbreviationDate = $('tr:contains("Abréviation:")').find('span.upd').text().replace('Dénomination en néerlandais, depuis le ', '').trim();
    const DateDebut = $('tr:contains("Date de début:") td').eq(1).text().trim();
    const TypeEntite = $('tr:contains("Type d\'entité") td').eq(1).text().trim();
    const NombreUE = $('tr:contains("Nombre d\'unités d\'établissement (UE):") td').eq(1).text().trim().match(/\d+/)?.[0] || '0';

     // Extract headquarters address
     const headquartersRow = $('tr').filter((i, el) => {
        return $(el).find('td.QL').first().text().includes('Adresse du siège:');
    });

    const fullHeadquartersAddress = headquartersRow.find('td.QL').eq(1).html().replace(/&nbsp;/g, ' ').trim();
    const addressParts = fullHeadquartersAddress.split('<br>').map(part => part.trim());

    const headquartersStreetWithNumber = addressParts[0].trim();
    const headquartersStreet = headquartersStreetWithNumber.replace(/\s*\d+\s*$/, '').trim();
    const headquartersStreetNumber = headquartersStreetWithNumber.match(/\d+/) ? headquartersStreetWithNumber.match(/\d+/)[0] : null;

    const headquartersPostalCode = addressParts[1].split(' ')[0].trim();
    const headquartersCity = addressParts[1].split(' ').slice(1).join(' ').trim();
    const cleanCity = headquartersCity.split('\n')[0].trim().replace(/<.*?>/g, '');
    const headquartersAddress = {
        street: headquartersStreet.replace(/\s+/g, ' '),
        streetNumber: headquartersStreetNumber,
        postalCode: headquartersPostalCode,
        city: cleanCity
    };

    let subCompanyInfo = {};
    // Check if there is only one establishment
    if (parseInt(NombreUE) === 1) {
        const url = `https://kbopub.economie.fgov.be/kbopub/toonvestigingps.html?lang=fr&ondernemingsnummer=${enterpriseNumber}`;
        console.log(`Fetching data from: ${url}`);
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const fullAddress = $('tr').find('td.QL:contains("Adresse de l\'unité")').next('td.QL').html().replace(/&nbsp;/g, ' ').trim();
        const addressParts = fullAddress.split('<br>').map(part => part.trim());

        // Extract street, postal code, and city
        const streetWithNumber = addressParts[0].trim();
        const street = streetWithNumber.replace(/\s*\d+\s*$/, '').trim();
        const postalCode = addressParts[1].split(' ')[0].trim();
        const city = addressParts[1].split(' ').slice(1).join(' ').trim();
        const streetNumber = streetWithNumber.match(/\d+/) ? streetWithNumber.match(/\d+/)[0] : null;
        subCompanyInfo = {
            entNum: $('a.QL').text().trim(),
            statusEntity: $('span.pageactief').eq(1).text().trim(),
            establishmentNumber: $('tr').find('td.QL:contains("Numéro de l\'unité")').next('td.QL').text().trim(),
            establishmentStatus: $('span.pageactief').eq(1).text().trim(),
            denomination: $('tr').find('td.RL:contains("Dénomination de l\'unité")').next('td.RL').contents().not('span').text().trim(),
            startDate: $('tr').find('td.QL:contains("Date de début:")').next('td.QL').text().trim(),
            entityName: $('td.RL').eq(1).contents().not('span').text().trim(),
            address: {
                street: street.replace(/\s+/g, ' '),
                postalCode: postalCode,
                city: city,
                streetNumber: streetNumber
            }
        };
    }
    const subCompaniesInfo = [];
    if(parseInt(NombreUE) >1){
        const url = `https://kbopub.economie.fgov.be/kbopub/vestiginglijst.html?lang=fr&sort=SORT_BY_ADDRESS&dir=asc&ondernemingsnummer=${enterpriseNumber}`;
        console.log(`Fetching data from: ${url}`);
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
    $('tbody tr').each((index, element) => {
        const uniteEtabNumber = $(element).find('td:nth-child(3) a').text().trim();
        const date = $(element).find('td:nth-child(4)').text().trim();
        const denomination = $(element).find('td:nth-child(5)').text().trim();
        
        // Extract address
        const fullAddress = $(element).find('td:nth-child(6)').html().replace(/&nbsp;/g, ' ').trim();
        const addressParts = fullAddress.split('<br>').map(part => part.trim());

        const streetWithNumber = addressParts[0].trim();
        const street = streetWithNumber.replace(/\s*\d+\s*$/, '').trim();
        const streetNumber = streetWithNumber.match(/\d+/) ? streetWithNumber.match(/\d+/)[0] : null;

        const postalCode = addressParts[1].split(' ')[0].trim();
        const city = addressParts[1].split(' ').slice(1).join(' ').trim();

        subCompaniesInfo.push({
            uniteEtabNumber,
            date,
            denomination,
            address: {
                street: street.replace(/\s+/g, ' '),
                streetNumber: streetNumber,
                postalCode: postalCode,
                city: city
            }
        });
    });

    
    
    }
    const formeLegale = $('tr:contains("Forme légale:")').find('td.QL').eq(1).contents().filter(function() {
        return this.nodeType === 3;
    }).text().trim();
    const formeLegaleDate = $('tr:contains("Forme légale:")').find('span.upd').text().replace('Depuis le ', '').trim();
    const capital = $('tr:contains("Capital") td').eq(1).text().trim();
    const generalAssembly = $('tr:contains("Assemblée générale") td').eq(1).text().trim();
    const accountingYearEnd = $('tr:contains("Date de fin de l\'année comptable") td').eq(1).text().trim();
    
    // Extract liquidators if available
    const liquidateurs = [];
    $('tr:contains("Liquidateur")').each((i, el) => {
        const fullName = $(el).find('td').eq(1).text().trim();
        const date = $(el).find('span.upd').text().replace('Depuis le ', '').trim();
        const [lastname, firstname] = fullName.split(',').map(part => part.trim());
        liquidateurs.push({ firstname, lastname, date });
    });

    // Phone and fax extraction
    let numTel = '';
    let dateTel = '';
    let numFax = '';
    let dateFax = '';

    $('tr').each(function() {
        const label = $(this).find('td.RL').first().text().trim();
        if (label.includes("Numéro de téléphone:")) {
            numTel = $(this).find('td.RL').eq(1).find('td').first().text().trim();
            dateTel = $(this).find('td.RL').eq(1).find('span.upd').text().replace(/.*Depuis le\s+/, '').trim();
            if (dateTel.match(/\s*\(\d+\)$/)) {
                dateTel = dateTel.replace(/\s*\(\d+\)$/, '').trim();
            }
        }
    });

    $('tr').each(function() {
        const label = $(this).find('td.QL').first().text().trim();
        if (label.includes("Numéro de fax:")) {
            numFax = $(this).find('td.QL').eq(1).find('td').first().text().trim();
            dateFax = $(this).find('td.QL').eq(1).find('td').eq(1).find('span.upd').text().replace(/.*Depuis le\s+/, '').trim();
            if (dateFax.match(/\s*\(\d+\)$/)) {
                dateFax = dateFax.replace(/\s*\(\d+\)$/, '').trim();
            }
        }
    });

    let email = '';
    $('tr').each(function() {
        const label = $(this).find('td.RL').first().text().trim();
        if (label.includes("E-mail:")) {
            email = $(this).find('td.RL').eq(1).text().trim();
        }
    });

    const webAddress = $('tr').filter(function() {
        return $(this).find('td.QL').first().text().trim().includes("Adresse web:");
    }).find('td.QL a').attr('href')?.trim() || '';
    
    // Return all data 
    return {
        entrepriseName,
        status,
        numUniteEtab,
        SituationJuridique,
        SituationJuridiqueDate,
        numEntreprise,
        numEntrepriseDescription,
        DenominationDate,
        Abreviation,
        AbreviationDate,
        numTel,
        dateTel,
        numFax,
        dateFax,
        email,
        webAddress,
        headquartersAddress,
        DateDebut,
        TypeEntite,
        NombreUE,
        subCompanyInfo, 
        subCompaniesInfo,
        financialData: {
            capital,
            generalAssembly,
            accountingYearEnd,
        },
        formeLegale,
        formeLegaleDate,
        functions: liquidateurs,
    };
}

module.exports = {
    scrapeKbo,
    scrapeEntrepriseweb

};
