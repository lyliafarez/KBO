const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeEntrepriseweb(enterpriseNumber) {
    const url = `https://www.companyweb.be/search?query=${enterpriseNumber}`; 
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const EntrepriseName = $.text().trim();
    console.log($)
    return {
        EntrepriseName,
    };
}


async function scrapeKbo(enterpriseNumber) {
    const url = `https://kbopub.economie.fgov.be/kbopub-m/enterprise/${enterpriseNumber}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const EntrepriseName = $.text().trim();

    return {
        EntrepriseName,
        
    };
}

module.exports = {
    scrapeEntrepriseweb,
    scrapeKbo
};
