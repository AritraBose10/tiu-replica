import { getTurso } from './_lib/turso.js';
import { requireAuth } from './_lib/auth.js';
import { applyCors } from './_lib/cors.js';
import { schemas, validate } from './_lib/validate.js';

export default async function handler(req, res) {
    if (applyCors(req, res)) return res.status(200).end();

    const db = getTurso();

    try {
        if (req.method === 'GET') {
            const result = await db.execute('SELECT * FROM events ORDER BY sort_order ASC, rowid ASC');
            return res.status(200).json(result.rows);
        }

        const auth = requireAuth(req);
        if (!auth.authorized) return res.status(auth.status).json({ error: auth.message });

        if (req.method === 'POST') {
            const v = validate(schemas.events.create, req.body);
            if (!v.ok) return res.status(400).json({ error: 'Validation failed', details: v.errors });
            const { id, title, description, date, time, location, category, image, attendees, featured, status, link, sort_order } = v.data;
            await db.execute({
                sql: 'INSERT INTO events (id, title, description, date, time, location, category, image, attendees, featured, status, link, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                args: [id, title, description, date, time, location, category, image, attendees, featured ? 1 : 0, status, link, sort_order],
            });
            return res.status(201).json({ success: true });
        }

        if (req.method === 'PUT') {
            const v = validate(schemas.events.update, req.body);
            if (!v.ok) return res.status(400).json({ error: 'Validation failed', details: v.errors });
            const { id, title, description, date, time, location, category, image, attendees, featured, status, link, sort_order } = v.data;
            await db.execute({
                sql: 'UPDATE events SET title=?, description=?, date=?, time=?, location=?, category=?, image=?, attendees=?, featured=?, status=?, link=?, sort_order=? WHERE id=?',
                args: [title, description, date, time, location, category, image, attendees ?? 0, featured ? 1 : 0, status, link, sort_order, id],
            });
            return res.status(200).json({ success: true });
        }

        if (req.method === 'DELETE') {
            const v = validate(schemas.events.delete, req.body);
            if (!v.ok) return res.status(400).json({ error: 'Validation failed', details: v.errors });
            await db.execute({ sql: 'DELETE FROM events WHERE id = ?', args: [v.data.id] });
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (err) {
        console.error('API /events error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
