/**
 * Local API development server
 * Run with: node api-dev-server.js
 * This simulates Vercel Serverless Functions locally.
 */
import 'dotenv/config';
import express from 'express';

const app = express();
app.use(express.json());

// CORS for local dev
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.status(200).end();
    next();
});

// Dynamically import and wire each API route
const routes = [
    { path: '/api/auth/login', module: './api/auth/login.js' },
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
        app.all(route.path, (req, res) => handler(req, res));
    }

    const PORT = process.env.API_PORT || 3001;
    app.listen(PORT, () => {
        console.log(`\n🚀 CMS API server running at http://localhost:${PORT}`);
        console.log('   Routes:', routes.map(r => r.path).join(', '));
        console.log('');
    });
}

start().catch(console.error);
