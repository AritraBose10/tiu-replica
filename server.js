import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import axios from 'axios';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { requireAuth } from './api/_lib/auth.js';
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
import blogsHandler from './api/blogs.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Required for correct client IP detection behind Vercel / reverse proxies
app.set('trust proxy', 1);

app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(join(__dirname, 'dist')));

// Rate limiters
const globalApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: { error: 'Too many requests, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Progressive slow-down: delay responses 500ms after 50 req/15min, up to 20s max
const globalSlowDown = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 50,
    delayMs: (hits) => (hits - 50) * 500,
    maxDelayMs: 20000,
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: 'Too many login attempts, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Tighter limit for write operations (POST/PUT/PATCH/DELETE)
const mutationLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: { error: 'Too many write requests, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.method === 'GET' || req.method === 'HEAD',
});

const scrapeLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: { error: 'Too many scrape requests, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply global rate limit + slow-down + cache headers to all API routes
app.use('/api', globalSlowDown);
app.use('/api', globalApiLimiter);
app.use('/api', mutationLimiter);
app.use('/api', (req, res, next) => {
    if (req.method === 'GET') {
        res.setHeader('Cache-Control', 'public, max-age=30, s-maxage=30');
    } else {
        res.setHeader('Cache-Control', 'no-store');
    }
    next();
});

app.all('/api/auth/login', loginLimiter, authLoginHandler);
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
app.all('/api/blogs', blogsHandler);

app.get('/api/scrape-events', scrapeLimiter, async (req, res) => {
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

        res.json(events);
    } catch (error) {
        console.error('Error scraping events:', error);
        res.status(500).json({ error: 'Failed to scrape events' });
    }
});

app.get(/(.*)/, (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
