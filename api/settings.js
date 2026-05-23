import { getTurso } from './_lib/turso.js';
import { requireAuth } from './_lib/auth.js';
import { applyCors } from './_lib/cors.js';
import { schemas, validate } from './_lib/validate.js';

export default async function handler(req, res) {
    if (applyCors(req, res, 'GET, PUT, OPTIONS')) return res.status(200).end();

    const db = getTurso();

    try {
        if (req.method === 'GET') {
            const { key } = req.query || {};
            if (key) {
                const result = await db.execute({ sql: 'SELECT value FROM site_settings WHERE key = ?', args: [key] });
                if (result.rows.length === 0) return res.status(404).json({ error: 'Setting not found' });
                return res.status(200).json(JSON.parse(result.rows[0].value));
            }
            const result = await db.execute('SELECT key, value FROM site_settings');
            const settings = {};
            for (const row of result.rows) {
                settings[row.key] = JSON.parse(row.value);
            }
            return res.status(200).json(settings);
        }

        const auth = requireAuth(req);
        if (!auth.authorized) return res.status(auth.status).json({ error: auth.message });

        if (req.method === 'PUT') {
            const v = validate(schemas.settings.update, req.body);
            if (!v.ok) return res.status(400).json({ error: 'Validation failed', details: v.errors });
            const { key, value } = v.data;
            await db.execute({
                sql: 'INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?',
                args: [key, JSON.stringify(value), JSON.stringify(value)],
            });
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (err) {
        console.error('API /settings error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
