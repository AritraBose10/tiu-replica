import { getTurso } from './_lib/turso.js';
import { requireAuth } from './_lib/auth.js';
import { applyCors } from './_lib/cors.js';
import { schemas, validate } from './_lib/validate.js';

export default async function handler(req, res) {
    if (applyCors(req, res)) return res.status(200).end();

    const db = getTurso();

    try {
        if (req.method === 'GET') {
            const result = await db.execute('SELECT * FROM gallery_images ORDER BY sort_order ASC, id ASC');
            return res.status(200).json(result.rows);
        }

        const auth = requireAuth(req);
        if (!auth.authorized) return res.status(auth.status).json({ error: auth.message });

        if (req.method === 'POST') {
            const v = validate(schemas.gallery.create, req.body);
            if (!v.ok) return res.status(400).json({ error: 'Validation failed', details: v.errors });
            const { src, alt, caption, category, span, sort_order } = v.data;
            await db.execute({
                sql: 'INSERT INTO gallery_images (src, alt, caption, category, span, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
                args: [src, alt, caption, category, span, sort_order],
            });
            return res.status(201).json({ success: true });
        }

        if (req.method === 'PUT') {
            const v = validate(schemas.gallery.update, req.body);
            if (!v.ok) return res.status(400).json({ error: 'Validation failed', details: v.errors });
            const { id, src, alt, caption, category, span, sort_order } = v.data;
            await db.execute({
                sql: 'UPDATE gallery_images SET src=?, alt=?, caption=?, category=?, span=?, sort_order=? WHERE id=?',
                args: [src, alt, caption, category, span, sort_order, id],
            });
            return res.status(200).json({ success: true });
        }

        if (req.method === 'DELETE') {
            const v = validate(schemas.gallery.delete, req.body);
            if (!v.ok) return res.status(400).json({ error: 'Validation failed', details: v.errors });
            await db.execute({ sql: 'DELETE FROM gallery_images WHERE id = ?', args: [v.data.id] });
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (err) {
        console.error('API /gallery error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
