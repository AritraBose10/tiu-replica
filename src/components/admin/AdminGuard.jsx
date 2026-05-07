import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function AdminGuard({ children }) {
 const { isAuthenticated, loading } = useAuth();

 if (loading) {
 return (
 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0a0a0a' }}>
 <div className="admin-spinner" />
 </div>
 );
 }

 if (!isAuthenticated) {
 return <Navigate to="/admin" replace />;
 }

 return children;
}
