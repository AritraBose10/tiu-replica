import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import axios from 'axios';
import * as cheerio from 'cheerio';

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));

// Event Scraper Endpoint
app.get('/api/scrape-events', async (req, res) => {
    try {
        const { data } = await axios.get('https://technotimes.info/?s=sof');
        const $ = cheerio.load(data);
        const events = [];

        $('.p-wrap').each((index, element) => {
            const title = $(element).find('.entry-title a').text().trim();
            const link = $(element).find('.entry-title a').attr('href');
            const image = $(element).find('.p-flink img').attr('src');
            const date = $(element).find('.meta-info-date abbr').text().trim();
            const category = $(element).find('.p-cat-info a').text().trim();

            if (title && link) {
                events.push({
                    title,
                    link,
                    image,
                    date,
                    category
                });
            }
        });

        res.json(events);
    } catch (error) {
        console.error('Error scraping events:', error);
        res.status(500).json({ error: 'Failed to scrape events' });
    }
});

// SPA Fallback - Serve index.html for any other route
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
