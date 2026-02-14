import { getTurso } from './_lib/turso.js';
import { requireAuth } from './_lib/auth.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.status(200).end();

    const db = getTurso();

    try {
        // GET — list all courses
        if (req.method === 'GET') {
            const result = await db.execute('SELECT * FROM courses ORDER BY sort_order ASC, rowid ASC');
            return res.status(200).json(result.rows);
        }

        // Auth required for mutations
        const auth = requireAuth(req);
        if (!auth.authorized) return res.status(auth.status).json({ error: auth.message });

        // POST — create course
        if (req.method === 'POST') {
            const { id, title, description, category, link, sort_order } = req.body;
            await db.execute({
                sql: 'INSERT INTO courses (id, title, description, category, link, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
                args: [id, title, description || '', category || '', link || '#', sort_order || 0],
            });
            return res.status(201).json({ success: true });
        }

        // PUT — update course
        if (req.method === 'PUT') {
            const { id, title, description, category, link, sort_order } = req.body;
            await db.execute({
                sql: 'UPDATE courses SET title = ?, description = ?, category = ?, link = ?, sort_order = ? WHERE id = ?',
                args: [title, description, category, link, sort_order || 0, id],
            });
            return res.status(200).json({ success: true });
        }

        // DELETE — delete course
        if (req.method === 'DELETE') {
            const { id } = req.body;
            await db.execute({ sql: 'DELETE FROM courses WHERE id = ?', args: [id] });
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (err) {
        console.error('API /courses error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
