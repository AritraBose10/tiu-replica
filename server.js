import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import axios from 'axios';
import * as cheerio from 'cheerio';

// Import API Handlers
import authLoginHandler from './api/auth/login.js';
import settingsHandler from './api/settings.js';
import eventsHandler from './api/events.js';
import partnersHandler from './api/partners.js';
import faqsHandler from './api/faqs.js';
import testimonialsHandler from './api/testimonials.js';
import approvalsHandler from './api/approvals.js';
import galleryHandler from './api/gallery.js';
import scholarshipsHandler from './api/scholarships.js';
import recruitersHandler from './api/recruiters.js';
import coursesHandler from './api/courses.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json()); // Essential for parsing JSON bodies

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));

// API Routes - Mount handlers
app.all('/api/auth/login', authLoginHandler);
app.all('/api/settings', settingsHandler);
app.all('/api/events', eventsHandler);
app.all('/api/partners', partnersHandler);
app.all('/api/faqs', faqsHandler);
app.all('/api/testimonials', testimonialsHandler);
app.all('/api/approvals', approvalsHandler);
app.all('/api/gallery', galleryHandler);
app.all('/api/scholarships', scholarshipsHandler);
app.all('/api/recruiters', recruitersHandler);
app.all('/api/courses', coursesHandler);

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
    console.log(`API routes registered:`);
    console.log(`- /api/auth/login`);
    console.log(`- /api/settings`);
    console.log(`- /api/events`);
    // ... listing others not strictly necessary but helpful for debug
});
