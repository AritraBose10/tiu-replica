import { applyCors } from './_lib/cors.js';
import { scrapeTechnoTimes } from './_lib/scrape-techno-times.js';

// Public endpoint: powers the Techno Times feed on the /events page (no auth).
export default async function handler(req, res) {
    if (applyCors(req, res, 'GET, OPTIONS')) return res.status(200).end();

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        res.status(200).json(await scrapeTechnoTimes());
    } catch (error) {
        console.error('Error scraping events:', error.message);
        res.status(500).json({ error: 'Failed to scrape events' });
    }
}
