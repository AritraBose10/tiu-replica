const https = require('https');

const urls = [
    'https://upload.wikimedia.org/wikipedia/en/4/49/University_Grants_Commission_%28India%29_logo.svg',
    'https://upload.wikimedia.org/wikipedia/en/e/eb/All_India_Council_for_Technical_Education_logo.png',
    'https://upload.wikimedia.org/wikipedia/en/d/da/Association_of_Indian_Universities_logo.png',
    'https://upload.wikimedia.org/wikipedia/commons/4/4e/NIRF_India_logo.svg',
    'https://upload.wikimedia.org/wikipedia/en/2/29/National_Assessment_and_Accreditation_Council_logo.png',
    'https://www.ugc.gov.in/img/logo.png',
    'https://www.aicte-india.org/sites/default/files/logo_new.png',
    'https://www.aiu.ac.in/images/logo.png',
    'https://www.nirfindia.org/images/logo.png',
    'http://www.naac.gov.in/images/naac_logo.png'
];

urls.forEach(url => {
    const lib = url.startsWith('https') ? https : require('http');
    lib.get(url, (res) => {
        console.log(`${res.statusCode} - ${url}`);
    }).on('error', (e) => {
        console.error(`Error with ${url}: ${e.message}`);
    });
});
