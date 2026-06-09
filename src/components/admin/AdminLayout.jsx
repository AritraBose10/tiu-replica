import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import {
 LayoutDashboard, BookOpen, CalendarDays, HelpCircle, MessageSquareQuote,
 Handshake, ShieldCheck, Image, GraduationCap, Building2, Settings,
 LogOut, ExternalLink, Zap, FileText
} from 'lucide-react';

const navItems = [
 { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
 { label: 'Blogs', path: '/admin/blogs', icon: FileText },
 { label: 'Courses', path: '/admin/courses', icon: BookOpen },
 { label: 'Events', path: '/admin/events', icon: CalendarDays },
 { label: 'FAQs', path: '/admin/faqs', icon: HelpCircle },
 { label: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
 { label: 'Partners', path: '/admin/partners', icon: Handshake },
 { label: 'Approvals', path: '/admin/approvals', icon: ShieldCheck },
 { label: 'Gallery', path: '/admin/gallery', icon: Image },
 { label: 'Scholarships', path: '/admin/scholarships', icon: GraduationCap },
 { label: 'Recruiters', path: '/admin/recruiters', icon: Building2 },
 { label: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
 const { logout } = useAuth();
 const navigate = useNavigate();

 const handleLogout = () => {
 logout();
 navigate('/admin');
 };

 return (
 <div className="admin-layout">
 <aside className="admin-sidebar">
 <div className="admin-sidebar-header">
 <div className="admin-logo">
 <div className="admin-logo-mark">
 <Zap />
 </div>
 <div className="admin-logo-text">
 <span className="admin-logo-title">TIU CMS</span>
 <span className="admin-logo-subtitle">Admin Panel</span>
 </div>
 </div>
 </div>

 <nav className="admin-nav">
 <div className="admin-nav-section">Content</div>
 {navItems.slice(0, 1).map(({ label, path, icon: Icon }) => (
 <NavLink
 key={path}
 to={path}
 className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
 >
 <Icon className="admin-nav-icon" />
 <span className="admin-nav-label">{label}</span>
 </NavLink>
 ))}

 <div className="admin-nav-section">Manage</div>
 {navItems.slice(1, 11).map(({ label, path, icon: Icon }) => (
 <NavLink
 key={path}
 to={path}
 className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
 >
 <Icon className="admin-nav-icon" />
 <span className="admin-nav-label">{label}</span>
 </NavLink>
 ))}

 <div className="admin-nav-section">System</div>
 {navItems.slice(11).map(({ label, path, icon: Icon }) => (
 <NavLink
 key={path}
 to={path}
 className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
 >
 <Icon className="admin-nav-icon" />
 <span className="admin-nav-label">{label}</span>
 </NavLink>
 ))}
 </nav>

 <div className="admin-sidebar-footer">
 <button onClick={handleLogout} className="admin-logout-btn">
 <LogOut className="admin-footer-icon" />
 <span>Logout</span>
 </button>
 <a href="/" target="_blank" rel="noopener noreferrer" className="admin-view-site">
 <ExternalLink className="admin-footer-icon" />
 <span>View Live Site</span>
 </a>
 </div>
 </aside>
 <main className="admin-main">
 <Outlet />
 </main>
 </div>
 );
}
