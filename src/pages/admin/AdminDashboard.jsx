import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
 BookOpen, CalendarDays, HelpCircle, MessageSquareQuote,
 Handshake, ShieldCheck, Image, GraduationCap, Building2,
 ArrowUpRight, Settings, Globe
} from 'lucide-react';

const contentTypes = [
 { key: 'courses', label: 'Courses', icon: BookOpen, color: '#FF0000', endpoint: '/api/courses' },
 { key: 'events', label: 'Events', icon: CalendarDays, color: '#f97316', endpoint: '/api/events' },
 { key: 'faqs', label: 'FAQs', icon: HelpCircle, color: '#a855f7', endpoint: '/api/faqs' },
 { key: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote, color: '#06b6d4', endpoint: '/api/testimonials' },
 { key: 'partners', label: 'Partners', icon: Handshake, color: '#10b981', endpoint: '/api/partners' },
 { key: 'approvals', label: 'Approvals', icon: ShieldCheck, color: '#f59e0b', endpoint: '/api/approvals' },
 { key: 'gallery', label: 'Gallery', icon: Image, color: '#ec4899', endpoint: '/api/gallery' },
 { key: 'scholarships', label: 'Scholarships', icon: GraduationCap, color: '#8b5cf6', endpoint: '/api/scholarships' },
 { key: 'recruiters', label: 'Recruiters', icon: Building2, color: '#14b8a6', endpoint: '/api/recruiters' },
];

const quickActions = [
 { label: 'Manage Courses', path: '/admin/courses', icon: BookOpen, color: '#FF0000' },
 { label: 'Manage Events', path: '/admin/events', icon: CalendarDays, color: '#f97316' },
 { label: 'Site Settings', path: '/admin/settings', icon: Settings, color: '#a855f7' },
 { label: 'View Live Site', path: '/', icon: Globe, color: '#10b981', external: true },
];

export default function AdminDashboard() {
 const [counts, setCounts] = useState({});
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 const fetchCounts = async () => {
 const results = {};
 await Promise.all(
 contentTypes.map(async (ct) => {
 try {
 const res = await fetch(ct.endpoint);
 if (res.ok) {
 const data = await res.json();
 results[ct.key] = Array.isArray(data) ? data.length : 0;
 }
 } catch {
 results[ct.key] = 0;
 }
 })
 );
 setCounts(results);
 setLoading(false);
 };
 fetchCounts();
 }, []);

 return (
 <div className="admin-dashboard">
 <div className="admin-page-header">
 <h1>Dashboard</h1>
 <p>Overview of all managed content</p>
 </div>

 <div className="admin-stats-grid">
 {contentTypes.map((ct) => {
 const Icon = ct.icon;
 return (
 <Link
 key={ct.key}
 to={`/admin/${ct.key}`}
 className="admin-stat-card transition-transform hover:scale-105 hover:shadow-lg cursor-pointer block text-inherit no-underline"
 >
 <div
 className="admin-stat-icon-wrap"
 style={{ background: `${ct.color}15`, color: ct.color }}
 >
 <Icon />
 </div>
 <div className="admin-stat-info">
 <span className="admin-stat-count">
 {loading ? '...' : (counts[ct.key] ?? 0)}
 </span>
 <span className="admin-stat-label">{ct.label}</span>
 </div>
 </Link>
 );
 })}
 </div>

 <div className="admin-quick-actions">
 <h2>Quick Actions</h2>
 <div className="admin-actions-grid">
 {quickActions.map((action) => {
 const Icon = action.icon;
 const Wrapper = action.external ? 'a' : Link;
 const extraProps = action.external
 ? { href: action.path, target: '_blank', rel: 'noopener noreferrer' }
 : { to: action.path };
 return (
 <Wrapper key={action.label} className="admin-action-card" {...extraProps}>
 <div
 className="admin-action-icon"
 style={{ background: `${action.color}15`, color: action.color }}
 >
 <Icon />
 </div>
 <span>{action.label}</span>
 <ArrowUpRight style={{ width: 16, height: 16, marginLeft: 'auto', opacity: 0.3 }} />
 </Wrapper>
 );
 })}
 </div>
 </div>
 </div>
 );
}
