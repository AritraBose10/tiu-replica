import axios from 'axios';
import * as cheerio from 'cheerio';
import { requireAuth } from './_lib/auth.js';
import { applyCors } from './_lib/cors.js';

export default async function handler(req, res) {
    if (applyCors(req, res, 'GET, OPTIONS')) return res.status(200).end();

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const auth = requireAuth(req);
    if (!auth.authorized) return res.status(auth.status).json({ error: auth.message });

    try {
        const { data } = await axios.get('https://technotimes.info/?s=sof', { timeout: 5000 });
        const $ = cheerio.load(data);
        const events = [];

        $('.p-wrap').each((index, element) => {
            const title = $(element).find('.entry-title a').text().trim();
            const link = $(element).find('.entry-title a').attr('href');
            const image = $(element).find('.p-flink img').attr('src');
            const date = $(element).find('.meta-info-date abbr').text().trim();
            const category = $(element).find('.p-cat-info a').text().trim();

            if (title && link) {
                events.push({ title, link, image, date, category });
            }
        });

        res.status(200).json(events);
    } catch (error) {
        console.error('Error scraping events:', error.message);
        res.status(500).json({ error: 'Failed to scrape events' });
    }
}
