const fs = require('fs');

async function search(query) {
    const res = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=1`);
    const data = await res.json();
    if (data.query && data.query.pages) {
        const pages = data.query.pages;
        for (let id in pages) {
            console.log(`${query}: ${pages[id].imageinfo[0].url}`);
            return;
        }
    }
    console.log(`${query}: Not found`);
}

async function main() {
    await search("University Grants Commission (India) logo");
    await search("Association of Indian Universities logo");
    await search("NIRF logo");
    await search("National Assessment and Accreditation Council logo");
}
main();
