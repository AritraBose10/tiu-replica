export function applyCors(req, res, methods = 'GET, POST, PUT, DELETE, OPTIONS') {
    const origin = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', methods);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return req.method === 'OPTIONS';
}
