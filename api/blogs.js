import { getTurso } from './_lib/turso.js';
import { requireAuth } from './_lib/auth.js';
import { applyCors } from './_lib/cors.js';

export default async function handler(req, res) {
    if (applyCors(req, res)) return res.status(200).end();

    const db = getTurso();

    try {
        // ── GET ──────────────────────────────────────────────────────────────
        if (req.method === 'GET') {
            const { slug, all, id } = req.query || {};

            // Single blog by slug (public)
            if (slug) {
                const result = await db.execute({
                    sql: `SELECT * FROM blogs WHERE slug = ? AND status = 'published' LIMIT 1`,
                    args: [slug],
                });
                if (!result.rows.length) return res.status(404).json({ error: 'Not found' });
                const blog = result.rows[0];
                blog.tags = tryParseJSON(blog.tags, []);
                return res.status(200).json(blog);
            }

            // Single blog by id for admin editing (auth required)
            if (id) {
                const auth = requireAuth(req);
                if (!auth.authorized) return res.status(auth.status).json({ error: auth.message });
                const result = await db.execute({ sql: 'SELECT * FROM blogs WHERE id = ? LIMIT 1', args: [id] });
                if (!result.rows.length) return res.status(404).json({ error: 'Not found' });
                const blog = result.rows[0];
                blog.tags = tryParseJSON(blog.tags, []);
                return res.status(200).json(blog);
            }

            // Admin: all blogs including drafts
            if (all === '1') {
                const auth = requireAuth(req);
                if (!auth.authorized) return res.status(auth.status).json({ error: auth.message });
                res.setHeader('Cache-Control', 'no-store');
                const result = await db.execute('SELECT * FROM blogs ORDER BY sort_order ASC, id DESC');
                return res.status(200).json(result.rows.map(b => ({ ...b, tags: tryParseJSON(b.tags, []) })));
            }

            // Public: published only
            const result = await db.execute(`SELECT * FROM blogs WHERE status = 'published' ORDER BY sort_order ASC, id DESC`);
            return res.status(200).json(result.rows.map(b => ({ ...b, tags: tryParseJSON(b.tags, []) })));
        }

        // ── AUTH required for writes ──────────────────────────────────────────
        const auth = requireAuth(req);
        if (!auth.authorized) return res.status(auth.status).json({ error: auth.message });

        // ── POST (create) ─────────────────────────────────────────────────────
        if (req.method === 'POST') {
            const { title, slug, excerpt, body, feature_image, category, tags, author,
                    author_role, meta_title, meta_description, schema_html, status,
                    featured, read_time, sort_order } = req.body;

            if (!title || !slug) return res.status(400).json({ error: 'title and slug are required' });

            const tagsJson = Array.isArray(tags) ? JSON.stringify(tags) : (tags || '[]');

            await db.execute({
                sql: `INSERT INTO blogs
                        (title, slug, excerpt, body, feature_image, category, tags, author,
                         author_role, meta_title, meta_description, schema_html, status,
                         featured, read_time, sort_order)
                      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                args: [
                    title, slug, excerpt || '', body || '', feature_image || '',
                    category || 'General', tagsJson, author || 'Editorial Team',
                    author_role || '', meta_title || '', meta_description || '',
                    schema_html || '', status || 'draft', featured ? 1 : 0,
                    read_time || '', sort_order ?? 0,
                ],
            });

            const created = await db.execute({ sql: 'SELECT * FROM blogs WHERE slug = ? LIMIT 1', args: [slug] });
            return res.status(201).json(created.rows[0]);
        }

        // ── PUT (update) ──────────────────────────────────────────────────────
        if (req.method === 'PUT') {
            const { id, title, slug, excerpt, body, feature_image, category, tags, author,
                    author_role, meta_title, meta_description, schema_html, status,
                    featured, read_time, sort_order } = req.body;

            if (!id) return res.status(400).json({ error: 'id is required' });

            const tagsJson = Array.isArray(tags) ? JSON.stringify(tags) : (tags || '[]');

            await db.execute({
                sql: `UPDATE blogs SET
                        title=?, slug=?, excerpt=?, body=?, feature_image=?, category=?, tags=?,
                        author=?, author_role=?, meta_title=?, meta_description=?, schema_html=?,
                        status=?, featured=?, read_time=?, sort_order=?,
                        updated_at=datetime('now')
                      WHERE id=?`,
                args: [
                    title, slug, excerpt || '', body || '', feature_image || '',
                    category || 'General', tagsJson, author || 'Editorial Team',
                    author_role || '', meta_title || '', meta_description || '',
                    schema_html || '', status || 'draft', featured ? 1 : 0,
                    read_time || '', sort_order ?? 0, id,
                ],
            });

            return res.status(200).json({ success: true });
        }

        // ── DELETE ────────────────────────────────────────────────────────────
        if (req.method === 'DELETE') {
            const { id } = req.body;
            if (!id) return res.status(400).json({ error: 'id is required' });
            await db.execute({ sql: 'DELETE FROM blogs WHERE id = ?', args: [id] });
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (err) {
        console.error('API /blogs error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

function tryParseJSON(val, fallback) {
    try { return JSON.parse(val); } catch { return fallback; }
}
