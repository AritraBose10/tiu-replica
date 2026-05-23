/**
 * Local API development server
 * Run with: node api-dev-server.js
 * This simulates Vercel Serverless Functions locally.
 */
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(helmet());
app.use(express.json({ limit: '1mb' }));

// CORS for local dev — restrict to the Vite dev server origin
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.status(200).end();
    next();
});

// Rate limiters
const globalApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: { error: 'Too many requests, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: 'Too many login attempts, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
});

const scrapeLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: { error: 'Too many scrape requests, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply global rate limit + cache headers to all API routes
app.use('/api', globalApiLimiter);
app.use('/api', (req, res, next) => {
    if (req.method === 'GET') {
        res.setHeader('Cache-Control', 'public, max-age=30, s-maxage=30');
    } else {
        res.setHeader('Cache-Control', 'no-store');
    }
    next();
});

const routes = [
    { path: '/api/auth/login', module: './api/auth/login.js', limiter: loginLimiter },
    { path: '/api/scrape-events', module: './api/scrape-events.js', limiter: scrapeLimiter },
    { path: '/api/courses', module: './api/courses.js' },
    { path: '/api/events', module: './api/events.js' },
    { path: '/api/faqs', module: './api/faqs.js' },
    { path: '/api/testimonials', module: './api/testimonials.js' },
    { path: '/api/partners', module: './api/partners.js' },
    { path: '/api/approvals', module: './api/approvals.js' },
    { path: '/api/scholarships', module: './api/scholarships.js' },
    { path: '/api/recruiters', module: './api/recruiters.js' },
    { path: '/api/gallery', module: './api/gallery.js' },
    { path: '/api/settings', module: './api/settings.js' },
];

async function start() {
    for (const route of routes) {
        const mod = await import(route.module);
        const handler = mod.default;
        if (route.limiter) {
            app.all(route.path, route.limiter, (req, res) => handler(req, res));
        } else {
            app.all(route.path, (req, res) => handler(req, res));
        }
    }

    const PORT = process.env.API_PORT || 3001;
    app.listen(PORT, () => {
        console.log(`\nCMS API server running at http://localhost:${PORT}`);
        console.log('   Routes:', routes.map(r => r.path).join(', '));
        console.log('');
    });
}

start().catch(console.error);
