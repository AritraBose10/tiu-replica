import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tiu-cms-default-secret';

export function signToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return null;
    }
}

/** Middleware: checks Authorization header and returns 401 if invalid */
export function requireAuth(req) {
    const authHeader = req.headers?.authorization || req.headers?.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { authorized: false, status: 401, message: 'Missing or invalid token' };
    }
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
        return { authorized: false, status: 401, message: 'Invalid or expired token' };
    }
    return { authorized: true, user: decoded };
}
