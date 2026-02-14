import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/admin/AuthProvider';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (isAuthenticated) {
        navigate('/admin/dashboard', { replace: true });
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(password);
            navigate('/admin/dashboard', { replace: true });
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-bg-grid" />
            <div className="admin-login-card">
                <div className="admin-login-header">
                    <div className="admin-login-icon">
                        <Lock />
                    </div>
                    <h1>TIU <span>CMS</span></h1>
                    <p>Content Management System</p>
                </div>
                <form onSubmit={handleSubmit} className="admin-login-form">
                    <div className="admin-input-group">
                        <label htmlFor="password">Admin Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                            autoFocus
                            required
                        />
                    </div>
                    {error && <div className="admin-error">{error}</div>}
                    <button type="submit" disabled={loading} className="admin-login-btn">
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
