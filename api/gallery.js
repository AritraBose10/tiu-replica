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
            const result = await db.execute('SELECT * FROM gallery_images ORDER BY sort_order ASC, id ASC');
            return res.status(200).json(result.rows);
        }

        const auth = requireAuth(req);
        if (!auth.authorized) return res.status(auth.status).json({ error: auth.message });

        if (req.method === 'POST') {
            const { src, alt, caption, category, span, sort_order } = req.body;
            await db.execute({
                sql: 'INSERT INTO gallery_images (src, alt, caption, category, span, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
                args: [src, alt || '', caption || '', category || '', span || 'col-span-1 row-span-1', sort_order || 0],
            });
            return res.status(201).json({ success: true });
        }

        if (req.method === 'PUT') {
            const { id, src, alt, caption, category, span, sort_order } = req.body;
            await db.execute({
                sql: 'UPDATE gallery_images SET src=?, alt=?, caption=?, category=?, span=?, sort_order=? WHERE id=?',
                args: [src, alt, caption, category, span, sort_order || 0, id],
            });
            return res.status(200).json({ success: true });
        }

        if (req.method === 'DELETE') {
            const { id } = req.body;
            await db.execute({ sql: 'DELETE FROM gallery_images WHERE id = ?', args: [id] });
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (err) {
        console.error('API /gallery error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
