import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('cms_token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Validate token on mount (simple check — if it exists, user is logged in)
        if (token) {
            localStorage.setItem('cms_token', token);
        } else {
            localStorage.removeItem('cms_token');
        }
        setLoading(false);
    }, [token]);

    const login = async (password) => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || 'Login failed');
        }
        const data = await res.json();
        setToken(data.token);
        return data;
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, loading, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
