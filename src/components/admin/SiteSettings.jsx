import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { Save, Loader2, Check, AlertCircle } from 'lucide-react';
import { sanityClient } from '../../lib/sanityClient';
import MediaUploader from './MediaUploader';

export default function SiteSettings() {
    const { token } = useAuth();
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);

    // Initial state matching expected keys
    const initialSettings = {
        logo: '',
        favicon: '',
        hero_video: '',
        contact_email: '',
        contact_phone: '',
        address: '',
        social_facebook: '',
        social_twitter: '',
        social_linkedin: '',
        social_instagram: '',
        // Home Page Images
        hero_wireframe_exterior: '',
        hero_wireframe_interior: '',
        what_is_sof_image: '',
        home_carousel_img_1: '',
        home_carousel_img_2: '',
        home_carousel_img_3: '',
        home_carousel_img_4: '',
        home_carousel_img_5: '',
        // About Page Images
        about_hero_bg: '',
        about_campus_image: '',
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings');
            if (res.ok) {
                const data = await res.json();
                // Convert array [{key, value}] to object {key: value}
                const settingsObj = { ...initialSettings };
                data.forEach(item => {
                    settingsObj[item.key] = item.value;
                });
                setSettings(settingsObj);
            }
        } catch (err) {
            console.error('Failed to fetch settings:', err);
            showToast('Failed to load settings', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (file, key, type = 'image') => {
        try {
            setSaving(true);
            showToast(`Uploading ${type}...`, 'info');

            // Sanity upload
            const assetType = type === 'video' ? 'file' : 'image';
            const asset = await sanityClient.assets.upload(assetType, file, {
                filename: file.name
            });

            // Update local state
            setSettings(prev => ({ ...prev, [key]: asset.url }));
            showToast(`${type === 'video' ? 'Video' : 'Image'} uploaded`, 'success');
        } catch (err) {
            console.error('Upload failed:', err);
            showToast('Upload failed', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        let successCount = 0;
        let failCount = 0;

        try {
            // Save each setting individually
            const promises = Object.entries(settings).map(async ([key, value]) => {
                const res = await fetch('/api/settings', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ key, value }),
                });
                if (res.ok) successCount++; else failCount++;
            });

            await Promise.all(promises);

            if (failCount === 0) {
                showToast('All settings saved successfully', 'success');
            } else if (successCount > 0) {
                showToast(`Saved ${successCount} settings, ${failCount} failed`, 'warning');
            } else {
                showToast('Failed to save settings', 'error');
            }
        } catch (err) {
            console.error('Save error:', err);
            showToast('Error saving settings', 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        </div>
    );

    return (
        <div className="admin-content-page">
            <div className="admin-page-header">
                <h1>Site Settings</h1>
                <p>Manage clear global configuration and assets.</p>
            </div>

            <form onSubmit={handleSave} className="admin-settings-form max-w-4xl">
                {/* ─── Branding ─── */}
                <div className="bg-[#0a0a12] border border-white/10 rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-[#FF0000] rounded-full" />
                        Branding & Assets
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Logo */}
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Website Logo</label>
                            <MediaUploader
                                type="image"
                                value={settings.logo}
                                onChange={(url) => setSettings(prev => ({ ...prev, logo: url }))}
                                showToast={showToast}
                            />
                        </div>

                        {/* Hero Video */}
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Hero Background Video</label>
                            <MediaUploader
                                type="video"
                                value={settings.hero_video}
                                onChange={(url) => setSettings(prev => ({ ...prev, hero_video: url }))}
                                showToast={showToast}
                            />
                        </div>
                    </div>
                </div>

                {/* ─── Page Images ─── */}
                <div className="bg-[#0a0a12] border border-white/10 rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-pink-500 rounded-full" />
                        Page Images
                    </h2>

                    <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">Home Page</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Wireframe Exterior (Left)</label>
                            <MediaUploader
                                type="image"
                                value={settings.hero_wireframe_exterior}
                                onChange={(url) => setSettings(prev => ({ ...prev, hero_wireframe_exterior: url }))}
                                showToast={showToast}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Wireframe Interior (Right)</label>
                            <MediaUploader
                                type="image"
                                value={settings.hero_wireframe_interior}
                                onChange={(url) => setSettings(prev => ({ ...prev, hero_wireframe_interior: url }))}
                                showToast={showToast}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">"What is SoF" Section Image</label>
                            <MediaUploader
                                type="image"
                                value={settings.what_is_sof_image}
                                onChange={(url) => setSettings(prev => ({ ...prev, what_is_sof_image: url }))}
                                showToast={showToast}
                            />
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">Home Carousel (3D)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                        {[1, 2, 3, 4, 5].map(num => (
                            <div key={num}>
                                <label className="block text-xs text-gray-400 mb-2">Image {num}</label>
                                <MediaUploader
                                    type="image"
                                    value={settings[`home_carousel_img_${num}`]}
                                    onChange={(url) => setSettings(prev => ({ ...prev, [`home_carousel_img_${num}`]: url }))}
                                    showToast={showToast}
                                />
                            </div>
                        ))}
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">About Page</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Hero Background</label>
                            <MediaUploader
                                type="image"
                                value={settings.about_hero_bg}
                                onChange={(url) => setSettings(prev => ({ ...prev, about_hero_bg: url }))}
                                showToast={showToast}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Campus Image (Mission Section)</label>
                            <MediaUploader
                                type="image"
                                value={settings.about_campus_image}
                                onChange={(url) => setSettings(prev => ({ ...prev, about_campus_image: url }))}
                                showToast={showToast}
                            />
                        </div>
                    </div>
                </div>

                {/* ─── Contact Info ─── */}
                <div className="bg-[#0a0a12] border border-white/10 rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-500 rounded-full" />
                        Contact Information
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                            <input
                                type="email"
                                value={settings.contact_email}
                                onChange={e => setSettings(prev => ({ ...prev, contact_email: e.target.value }))}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none transition-colors"
                                placeholder="admissions@techno.edu"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
                            <input
                                type="text"
                                value={settings.contact_phone}
                                onChange={e => setSettings(prev => ({ ...prev, contact_phone: e.target.value }))}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none transition-colors"
                                placeholder="+91 98765 43210"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm text-gray-400 mb-1">Office Address</label>
                            <textarea
                                value={settings.address}
                                onChange={e => setSettings(prev => ({ ...prev, address: e.target.value }))}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none transition-colors h-24 resize-none"
                                placeholder="Plot No. 123, Sector V, Salt Lake..."
                            />
                        </div>
                    </div>
                </div>

                {/* ─── Social Links ─── */}
                <div className="bg-[#0a0a12] border border-white/10 rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-purple-500 rounded-full" />
                        Social Media
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Facebook URL</label>
                            <input
                                type="url"
                                value={settings.social_facebook}
                                onChange={e => setSettings(prev => ({ ...prev, social_facebook: e.target.value }))}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-purple-500 outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Twitter (X) URL</label>
                            <input
                                type="url"
                                value={settings.social_twitter}
                                onChange={e => setSettings(prev => ({ ...prev, social_twitter: e.target.value }))}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-purple-500 outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">LinkedIn URL</label>
                            <input
                                type="url"
                                value={settings.social_linkedin}
                                onChange={e => setSettings(prev => ({ ...prev, social_linkedin: e.target.value }))}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-purple-500 outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Instagram URL</label>
                            <input
                                type="url"
                                value={settings.social_instagram}
                                onChange={e => setSettings(prev => ({ ...prev, social_instagram: e.target.value }))}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-purple-500 outline-none transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* ─── Advanced Settings (JSON Only) ─── */}
                <div className="admin-page-header mt-12 mb-6">
                    <h2>Advanced Configuration</h2>
                    <p>Edit complex data structures directly (JSON)</p>
                </div>

                {Object.entries(settings)
                    .filter(([key]) => ![
                        'logo', 'favicon', 'hero_video', 'contact_email', 'contact_phone',
                        'address', 'social_facebook', 'social_twitter', 'social_linkedin', 'social_instagram',
                        'hero_wireframe_exterior', 'hero_wireframe_interior', 'what_is_sof_image',
                        'about_hero_bg', 'about_campus_image',
                        'home_carousel_img_1', 'home_carousel_img_2', 'home_carousel_img_3', 'home_carousel_img_4', 'home_carousel_img_5'
                    ].includes(key))
                    .map(([key, value]) => (
                        <div key={key} className="bg-[#0a0a12] border border-white/10 rounded-xl p-4 mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold text-white capitalize">{key.replace(/_/g, ' ')}</h3>
                                <button
                                    type="button"
                                    onClick={async () => {
                                        // Placeholder for future JSON editor modal
                                    }}
                                    className="text-xs bg-white/10 px-2 py-1 rounded"
                                >
                                    Edit JSON
                                </button>
                            </div>
                            <textarea
                                className="w-full bg-black/40 border border-white/10 rounded p-2 text-xs font-mono text-gray-300 h-32"
                                value={typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                                onChange={(e) => {
                                    let newVal = e.target.value;
                                    try {
                                        newVal = JSON.parse(e.target.value);
                                    } catch (err) {
                                        // keep as string if not valid json
                                    }
                                    setSettings(prev => ({ ...prev, [key]: newVal }));
                                }}
                            />
                        </div>
                    ))}

                {/* Footer Actions */}
                <div className="sticky bottom-4 z-50 flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-[#FF0000] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-red-900/20 hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                        {saving ? 'Saving Changes...' : 'Save All Settings'}
                    </button>
                </div>
            </form>

            {/* Toast Notification */}
            {toast && (
                <div className={`fixed bottom-8 right-8 z-[100] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border border-white/10 backdrop-blur-xl animate-slide-up ${toast.type === 'error' ? 'bg-red-900/90 text-red-200' :
                    toast.type === 'warning' ? 'bg-amber-900/90 text-amber-200' :
                        'bg-emerald-900/90 text-emerald-200'
                    }`}>
                    {toast.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <span className="font-medium">{toast.message}</span>
                </div>
            )}
        </div>
    );
}
