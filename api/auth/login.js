import { signToken } from '../_lib/auth.js';
import { applyCors } from '../_lib/cors.js';
import { schemas, validate } from '../_lib/validate.js';

export default function handler(req, res) {
    if (applyCors(req, res, 'POST, OPTIONS')) return res.status(200).end();

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const v = validate(schemas.login, req.body || {});
    if (!v.ok) return res.status(400).json({ error: 'Validation failed', details: v.errors });

    const adminPassword = process.env.CMS_ADMIN_PASSWORD;
    if (!adminPassword) return res.status(500).json({ error: 'Server misconfiguration' });

    if (v.data.password !== adminPassword) {
        return res.status(401).json({ error: 'Invalid password' });
    }

    const token = signToken({ role: 'admin', iat: Date.now() });
    return res.status(200).json({ token });
}
