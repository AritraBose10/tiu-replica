import { getTurso } from './_lib/turso.js';
import { requireAuth } from './_lib/auth.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.status(200).end();

    const db = getTurso();

    try {
        if (req.method === 'GET') {
            const result = await db.execute('SELECT * FROM scholarships ORDER BY sort_order ASC, id ASC');
            // Parse benefits JSON
            const rows = result.rows.map(r => ({ ...r, benefits: JSON.parse(r.benefits || '[]') }));
            return res.status(200).json(rows);
        }

        const auth = requireAuth(req);
        if (!auth.authorized) return res.status(auth.status).json({ error: auth.message });

        if (req.method === 'POST') {
            const { title, coverage, coverage_label, criteria, benefits, sort_order } = req.body;
            await db.execute({
                sql: 'INSERT INTO scholarships (title, coverage, coverage_label, criteria, benefits, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
                args: [title, coverage || 0, coverage_label || '', criteria || '', JSON.stringify(benefits || []), sort_order || 0],
            });
            return res.status(201).json({ success: true });
        }

        if (req.method === 'PUT') {
            const { id, title, coverage, coverage_label, criteria, benefits, sort_order } = req.body;
            await db.execute({
                sql: 'UPDATE scholarships SET title=?, coverage=?, coverage_label=?, criteria=?, benefits=?, sort_order=? WHERE id=?',
                args: [title, coverage, coverage_label, criteria, JSON.stringify(benefits || []), sort_order || 0, id],
            });
            return res.status(200).json({ success: true });
        }

        if (req.method === 'DELETE') {
            const { id } = req.body;
            await db.execute({ sql: 'DELETE FROM scholarships WHERE id = ?', args: [id] });
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (err) {
        console.error('API /scholarships error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
