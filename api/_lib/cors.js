export function applyCors(req, res, methods = 'GET, POST, PUT, DELETE, OPTIONS') {
    // Allow the configured origin, or fall back to the request's origin, or '*'
    const allowedOrigin = process.env.ALLOWED_ORIGIN || req.headers.origin || '*';
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', methods);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return req.method === 'OPTIONS';
}
