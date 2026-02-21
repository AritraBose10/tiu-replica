import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const client = createClient({
  projectId: '412jcw3r', // Hardcoding from default
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: process.env.VITE_SANITY_API_TOKEN,
});

async function main() {
    console.log("Fetching approvals...");
    const approvals = await client.fetch('*[_type == "approval"]');
    
    const correctLogos = {
        'UGC': 'https://upload.wikimedia.org/wikipedia/en/4/4e/UGC_India_Logo.png',
        'AICTE': 'https://upload.wikimedia.org/wikipedia/en/e/eb/All_India_Council_for_Technical_Education_logo.png',
        'AIU': 'https://upload.wikimedia.org/wikipedia/en/5/53/Association_of_Indian_Universities_Logo.svg',
        'NIRF': 'https://upload.wikimedia.org/wikipedia/en/5/52/National_Institutional_Ranking_Framework_logo.png',
        'NAAC': '🏅',
        'ISO': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/ISO_Logo_%28Red_square%29.svg/120px-ISO_Logo_%28Red_square%29.svg.png'
    };

    let updated = 0;
    for (const app of approvals) {
        if (correctLogos[app.name]) {
            console.log(`Updating ${app.name} from ${app.logoUrl} to ${correctLogos[app.name]}`);
            await client.patch(app._id).set({ logoUrl: correctLogos[app.name] }).commit();
            updated++;
        }
    }
    console.log(`Done. Updated ${updated} logos.`);
}
main().catch(console.error);
