import { applyCors } from './_lib/cors.js';
import { schemas, validate } from './_lib/validate.js';

// Forwards postgraduate working-professional enquiry leads to a Google Sheet
// via a Google Apps Script Web App bound to that sheet (set PG_LEADS_WEBHOOK_URL).
export default async function handler(req, res) {
    if (applyCors(req, res)) return res.status(200).end();

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const v = validate(schemas.pgLeads.create, req.body);
    if (!v.ok) return res.status(400).json({ error: 'Validation failed', details: v.errors });

    const webhookUrl = process.env.PG_LEADS_WEBHOOK_URL;
    if (!webhookUrl) {
        console.error('PG_LEADS_WEBHOOK_URL is not configured');
        return res.status(503).json({ error: 'Lead capture is not configured yet' });
    }

    try {
        const payload = {
            ...v.data,
            page: 'pg-programs-for-professionals',
            submittedAt: new Date().toISOString(),
        };

        const upstream = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!upstream.ok) {
            const text = await upstream.text().catch(() => '');
            console.error('PG lead webhook error:', upstream.status, text);
            return res.status(502).json({ error: 'Could not save enquiry, please try again' });
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('API /pg-leads error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
