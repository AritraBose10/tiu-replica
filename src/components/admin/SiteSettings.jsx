import React, { useState, useEffect } from 'react';
import { Save, Loader2, Upload, AlertCircle, Monitor, BookOpen, GraduationCap, LayoutTemplate, Briefcase, Sparkles } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { sanityClient } from '../../lib/sanityClient';
import MediaUploader from './MediaUploader';

const SiteSettings = () => {
    const { token } = useAuth();
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [toast, setToast] = useState(null);
    const [activeTab, setActiveTab] = useState('home'); // home, student, learning, admissions, branding, contact

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings');
            const data = await res.json();
            setSettings(data);
        } catch (err) {
            setError('Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSave = async () => {
        setSaving(true);
        setError('');
        try {
            // Save each setting individually
            for (const [key, value] of Object.entries(settings)) {
                const res = await fetch('/api/settings', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ key, value })
                });

                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.error || `Server error: ${res.status}`);
                }
            }
            showToast('Settings saved successfully!');
        } catch (err) {
            setError('Failed to save settings');
            showToast('Failed to save settings', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const tabs = [
        { id: 'home', label: 'Home Page', icon: Monitor },
        { id: 'about', label: 'About SoF', icon: Sparkles },
        { id: 'student', label: 'Student Work', icon: Briefcase },
        { id: 'learning', label: 'Learning', icon: BookOpen },
        { id: 'admissions', label: 'Admissions', icon: GraduationCap },
        { id: 'branding', label: 'Branding & Layout', icon: LayoutTemplate },
        { id: 'contact', label: 'Contact & Social', icon: Upload }
    ];

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Site Settings</h1>
                    <p className="text-gray-400">Manage global website content and images</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {error}
                </div>
            )}

            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === tab.id
                            ? 'bg-red-600 text-white shadow-lg shadow-red-900/20'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="space-y-8 bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">

                {/* --- HOME TAB --- */}
                {activeTab === 'home' && (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Hero Section Options</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <MediaUploader
                                    label="Exterior Wireframe"
                                    value={settings.hero_wireframe_exterior}
                                    onChange={(val) => handleChange('hero_wireframe_exterior', val)}
                                    showToast={showToast}
                                />
                                <MediaUploader
                                    label="Interior Wireframe"
                                    value={settings.hero_wireframe_interior}
                                    onChange={(val) => handleChange('hero_wireframe_interior', val)}
                                    showToast={showToast}
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">3D Carousel Content</h3>
                            <div className="space-y-6">
                                {[1, 2, 3, 4, 5].map(num => (
                                    <div key={num} className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6 p-4 bg-white/5 rounded-xl border border-white/10">
                                        <MediaUploader
                                            label={`Image ${num}`}
                                            value={settings[`home_carousel_img_${num}`]}
                                            onChange={(val) => handleChange(`home_carousel_img_${num}`, val)}
                                            showToast={showToast}
                                        />
                                        <div className="space-y-2">
                                            <label className="block text-gray-400 text-sm font-medium">Caption for Image {num}</label>
                                            <textarea
                                                value={settings[`home_carousel_caption_${num}`] || ''}
                                                onChange={(e) => handleChange(`home_carousel_caption_${num}`, e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors h-24 resize-none"
                                                placeholder="Enter a short description about this image..."
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- ABOUT SOF TAB --- */}
                {activeTab === 'about' && (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Homepage Narrative Section</h3>
                            <p className="text-gray-400 text-sm mb-6">This section appears on the homepage as "What is the School of the Future?"</p>
                            <MediaUploader
                                label="What Is SoF Section Image"
                                value={settings.what_is_sof_image}
                                onChange={(val) => handleChange('what_is_sof_image', val)}
                                showToast={showToast}
                            />
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">About Page Assets</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <MediaUploader
                                    label="About Page Hero Background"
                                    value={settings.about_hero_bg}
                                    onChange={(val) => handleChange('about_hero_bg', val)}
                                    showToast={showToast}
                                />
                                <MediaUploader
                                    label="About Page Mission Image"
                                    value={settings.about_campus_image}
                                    onChange={(val) => handleChange('about_campus_image', val)}
                                    showToast={showToast}
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Industry Partnership Section</h3>
                            <p className="text-gray-400 text-sm mb-6">This section displays global technology leaders and certifications.</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <MediaUploader
                                    label="Section Background Image"
                                    value={settings.admissions_google_ibm_bg}
                                    onChange={(val) => handleChange('admissions_google_ibm_bg', val)}
                                    showToast={showToast}
                                />
                                <MediaUploader
                                    label="Google Cloud Logo"
                                    value={settings.logo_google_cloud}
                                    onChange={(val) => handleChange('logo_google_cloud', val)}
                                    showToast={showToast}
                                />
                                <MediaUploader
                                    label="IBM Logo"
                                    value={settings.logo_ibm}
                                    onChange={(val) => handleChange('logo_ibm', val)}
                                    showToast={showToast}
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Campus Life Assets</h3>
                            <p className="text-gray-400 text-sm mb-6">Images for the homepage Campus Life grid.</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <MediaUploader
                                    label="Tech Fests & Hackathons"
                                    value={settings.campus_tech_fests_image}
                                    onChange={(val) => handleChange('campus_tech_fests_image', val)}
                                    showToast={showToast}
                                />
                                <MediaUploader
                                    label="Cultural Events"
                                    value={settings.campus_cultural_events_image}
                                    onChange={(val) => handleChange('campus_cultural_events_image', val)}
                                    showToast={showToast}
                                />
                                <MediaUploader
                                    label="Student Clubs"
                                    value={settings.campus_student_clubs_image}
                                    onChange={(val) => handleChange('campus_student_clubs_image', val)}
                                    showToast={showToast}
                                />
                                <MediaUploader
                                    label="Design Studios"
                                    value={settings.campus_design_studios_image}
                                    onChange={(val) => handleChange('campus_design_studios_image', val)}
                                    showToast={showToast}
                                />
                                <MediaUploader
                                    label="Workshops & Seminars"
                                    value={settings.campus_workshops_image}
                                    onChange={(val) => handleChange('campus_workshops_image', val)}
                                    showToast={showToast}
                                />
                                <MediaUploader
                                    label="Industry Exposure"
                                    value={settings.campus_industry_exposure_image}
                                    onChange={(val) => handleChange('campus_industry_exposure_image', val)}
                                    showToast={showToast}
                                />
                            </div>
                        </div>
                    </div>
                )}


                {/* --- STUDENT WORK TAB --- */}
                {activeTab === 'student' && (
                    <div className="space-y-8">
                        <h3 className="text-xl font-bold text-white mb-4">Student Work Gallery</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <MediaUploader
                                label="Live Coding Projects"
                                value={settings.student_work_coding_image}
                                onChange={(val) => handleChange('student_work_coding_image', val)}
                                showToast={showToast}
                            />
                            <MediaUploader
                                label="Hackathon Wins"
                                value={settings.student_work_hackathon_image}
                                onChange={(val) => handleChange('student_work_hackathon_image', val)}
                                showToast={showToast}
                            />
                            <MediaUploader
                                label="Industry Visits"
                                value={settings.student_work_visits_image}
                                onChange={(val) => handleChange('student_work_visits_image', val)}
                                showToast={showToast}
                            />
                            <MediaUploader
                                label="Startup Incubation"
                                value={settings.student_work_startup_image}
                                onChange={(val) => handleChange('student_work_startup_image', val)}
                                showToast={showToast}
                            />
                            <MediaUploader
                                label="Research Pubs"
                                value={settings.student_work_research_image}
                                onChange={(val) => handleChange('student_work_research_image', val)}
                                showToast={showToast}
                            />
                            <MediaUploader
                                label="Tech Community"
                                value={settings.student_work_community_image}
                                onChange={(val) => handleChange('student_work_community_image', val)}
                                showToast={showToast}
                            />
                        </div>
                    </div>
                )}


                {/* --- LEARNING TAB --- */}
                {activeTab === 'learning' && (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Learning Methodology</h3>
                            <div className="space-y-4 mb-6">
                                <label className="block text-gray-400 text-sm mb-2">Explainer Video URL (YouTube/MP4)</label>
                                <input
                                    type="text"
                                    value={settings.learning_video_url || ''}
                                    onChange={(e) => handleChange('learning_video_url', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                    placeholder="https://www.youtube.com/embed/..."
                                />
                            </div>

                            <h4 className="text-lg font-semibold text-white mb-3">Gallery Images</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                <MediaUploader
                                    label="Lab Environment"
                                    value={settings.learning_lab_image}
                                    onChange={(val) => handleChange('learning_lab_image', val)}
                                    showToast={showToast}
                                />
                                <MediaUploader
                                    label="Collaboration"
                                    value={settings.learning_collab_image}
                                    onChange={(val) => handleChange('learning_collab_image', val)}
                                    showToast={showToast}
                                />
                                <MediaUploader
                                    label="Mentorship"
                                    value={settings.learning_mentor_image}
                                    onChange={(val) => handleChange('learning_mentor_image', val)}
                                    showToast={showToast}
                                />
                                <MediaUploader
                                    label="Hackathon Action"
                                    value={settings.learning_hackathon_image}
                                    onChange={(val) => handleChange('learning_hackathon_image', val)}
                                    showToast={showToast}
                                />
                            </div>
                        </div>
                    </div>
                )}


                {/* --- ADMISSIONS TAB --- */}
                {activeTab === 'admissions' && (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Admissions Page Assets</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <MediaUploader
                                    type="video"
                                    label="Admissions Hero Video (MP4)"
                                    value={settings.admissions_hero_video}
                                    onChange={(val) => handleChange('admissions_hero_video', val)}
                                    showToast={showToast}
                                />
                                <div className="space-y-4">
                                    <MediaUploader
                                        label="Why SOF Background Image"
                                        value={settings.admissions_why_sof_bg}
                                        onChange={(val) => handleChange('admissions_why_sof_bg', val)}
                                        showToast={showToast}
                                    />
                                    <div className="space-y-2">
                                        <label className="block text-gray-400 text-sm">Campus Map URL (Google Maps Embed)</label>
                                        <input
                                            type="text"
                                            value={settings.admissions_campus_map_url || ''}
                                            onChange={(e) => handleChange('admissions_campus_map_url', e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                            placeholder="https://www.google.com/maps/embed?..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Campus Life Gallery</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                    <MediaUploader
                                        key={num}
                                        label={`Campus Life Image ${num}`}
                                        value={settings[`campus_life_image_${num}`]}
                                        onChange={(val) => handleChange(`campus_life_image_${num}`, val)}
                                        showToast={showToast}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'branding' && (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Logos & Identity</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <MediaUploader
                                    label="Main Site Logo"
                                    value={settings.logo}
                                    onChange={(val) => handleChange('logo', val)}
                                    showToast={showToast}
                                />
                                <MediaUploader
                                    type="video"
                                    label="Home Hero Video Loop"
                                    value={settings.hero_video}
                                    onChange={(val) => handleChange('hero_video', val)}
                                    showToast={showToast}
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Page Backgrounds</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <MediaUploader
                                    label="Events Page Hero"
                                    value={settings.events_hero_bg}
                                    onChange={(val) => handleChange('events_hero_bg', val)}
                                    showToast={showToast}
                                />
                                <MediaUploader
                                    label="FAQ Section Background"
                                    value={settings.faq_bg_image}
                                    onChange={(val) => handleChange('faq_bg_image', val)}
                                    showToast={showToast}
                                />
                            </div>
                        </div>
                    </div>
                )}


                {/* --- CONTACT TAB --- */}
                {activeTab === 'contact' && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white mb-4">Contact Information & Maps</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    value={settings.phone || ''}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={settings.email || ''}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-gray-400 text-sm mb-2">Admission Contact</label>
                                <input
                                    type="text"
                                    value={settings.admission_contact || ''}
                                    onChange={(e) => handleChange('admission_contact', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-gray-400 text-sm mb-2">Address</label>
                                <textarea
                                    value={settings.address || ''}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors h-24"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-gray-400 text-sm mb-2">Contact Page Map URL</label>
                                <input
                                    type="text"
                                    value={settings.contact_map_url || ''}
                                    onChange={(e) => handleChange('contact_map_url', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                />
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mt-8 mb-4">Social Media Links</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'].map(social => (
                                <div key={social}>
                                    <label className="block text-gray-400 text-sm mb-2 capitalize">{social}</label>
                                    <input
                                        type="text"
                                        value={settings[social] || ''}
                                        onChange={(e) => handleChange(social, e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                        placeholder={`https://${social}.com/...`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {
                toast && (
                    <div className={`fixed bottom-8 right-8 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 z-50 ${toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
                        }`}>
                        {toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                        <span className="font-medium">{toast.message}</span>
                    </div>
                )
            }
        </div >
    );
};

export default SiteSettings;
