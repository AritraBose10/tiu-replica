import { useState, useEffect } from 'react';
import { useAuth } from '../../components/admin/AuthProvider';
import { Check, AlertCircle, ChevronDown } from 'lucide-react';
import {
    Home, BarChart3, BookOpen, Sparkles, TrendingUp, Target, Phone,
    DollarSign, Briefcase, GraduationCap, Trophy, Video, Cloud, FileText,
    Link2, ClipboardList
} from 'lucide-react';

const settingsKeys = [
    { key: 'hero', label: 'Hero Section', icon: Home },
    { key: 'home_stats', label: 'Home Page Stats', icon: BarChart3 },
    { key: 'about_hero', label: 'About Hero', icon: BookOpen },
    { key: 'about_features', label: 'About Features', icon: Sparkles },
    { key: 'about_stats', label: 'About Stats', icon: TrendingUp },
    { key: 'about_mission', label: 'Mission & Vision', icon: Target },
    { key: 'contact_info', label: 'Contact Info', icon: Phone },
    { key: 'career_packages', label: 'Career Packages', icon: DollarSign },
    { key: 'career_stats', label: 'Career Stats', icon: BarChart3 },
    { key: 'career_ibm_text', label: 'IBM Internship Text', icon: Briefcase },
    { key: 'admissions_stats', label: 'Admissions Stats', icon: GraduationCap },
    { key: 'whysof_differentiators', label: 'WhySOF Differentiators', icon: Trophy },
    { key: 'whysof_video_url', label: 'WhySOF Video URL', icon: Video },
    { key: 'google_ibm_dark', label: 'Google/IBM Certifications', icon: Cloud },
    { key: 'footer', label: 'Footer', icon: FileText },
    { key: 'navbar_links', label: 'Navbar Links', icon: Link2 },
    { key: 'how_to_apply', label: 'How to Apply Steps', icon: ClipboardList },
];

export default function AdminSettings() {
    const { token } = useAuth();
    const [settings, setSettings] = useState({});
    const [editing, setEditing] = useState({});
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const [expanded, setExpanded] = useState({});

    const showToast = (msg, type = 'success') => {
        setToast({ message: msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    useEffect(() => {
        fetch('/api/settings')
            .then(r => r.json())
            .then(data => {
                setSettings(data);
                const editState = {};
                Object.entries(data).forEach(([key, value]) => {
                    editState[key] = JSON.stringify(value, null, 2);
                });
                setEditing(editState);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleSave = async (key) => {
        try {
            const parsed = JSON.parse(editing[key]);
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ key, value: parsed }),
            });
            if (!res.ok) throw new Error('Save failed');
            setSettings(prev => ({ ...prev, [key]: parsed }));
            showToast(`"${key}" saved successfully`);
        } catch (err) {
            if (err instanceof SyntaxError) {
                showToast('Invalid JSON format', 'error');
            } else {
                showToast(err.message, 'error');
            }
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
                <div className="admin-spinner" />
            </div>
        );
    }

    return (
        <div className="admin-content-page">
            <div className="admin-page-header">
                <h1>Site Settings</h1>
                <p>Edit site-wide content stored as JSON</p>
            </div>

            {settingsKeys.map(({ key, label, icon: Icon }, idx) => (
                <div
                    key={key}
                    className="admin-settings-section"
                    style={{ animationDelay: `${idx * 0.03}s` }}
                >
                    <div
                        className="admin-settings-header"
                        onClick={() => setExpanded(p => ({ ...p, [key]: !p[key] }))}
                    >
                        <h3>
                            <Icon />
                            {label}
                        </h3>
                        <ChevronDown className={`admin-settings-chevron ${expanded[key] ? 'expanded' : ''}`} />
                    </div>
                    {expanded[key] && (
                        <div className="admin-settings-body">
                            <textarea
                                className="admin-settings-json"
                                value={editing[key] || '{}'}
                                onChange={(e) => setEditing(prev => ({ ...prev, [key]: e.target.value }))}
                            />
                            <div className="admin-settings-save-row">
                                <button className="admin-btn-save" onClick={() => handleSave(key)}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {toast && (
                <div className={`admin-toast ${toast.type}`}>
                    {toast.type === 'success' ? <Check style={{ width: 18, height: 18 }} /> : <AlertCircle style={{ width: 18, height: 18 }} />}
                    {toast.message}
                </div>
            )}
        </div>
    );
}
