import React, { useState } from 'react';
import { createClient } from '@sanity/client';

const uploadClient = createClient({
    projectId: 'tqbzon1l',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false, // We want fresh data for uploads
    token: import.meta.env.VITE_SANITY_API_TOKEN, // Should be set in .env
});

/**
 * Reusable Media Uploader for Admin
 * Supports Images and Videos.
 * 
 * Props:
 * - type: 'image' | 'video' (default: 'image')
 * - value: string (URL)
 * - onChange: (url: string) => void
 * - label: string (Button label text)
 * - onUploadStart: () => void
 * - onUploadEnd: () => void
 * - showToast: (msg: string, type: string) => void
 */
const MediaUploader = ({
    type = 'image',
    value,
    onChange,
    label,
    onUploadStart,
    onUploadEnd,
    showToast
}) => {
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            if (onUploadStart) onUploadStart();
            const assetType = type === 'video' ? 'file' : 'image';

            if (showToast) showToast(`Uploading ${type}...`, 'info');

            const asset = await uploadClient.assets.upload(assetType, file, {
                filename: file.name
            });

            onChange(asset.url);
            if (showToast) showToast(`${type === 'video' ? 'Video' : 'Image'} uploaded successfully`, 'success');
        } catch (err) {
            console.error('Upload failed:', err);
            if (showToast) showToast('Upload failed', 'error');
        } finally {
            if (onUploadEnd) onUploadEnd();
        }
    };

    return (
        <div className="admin-media-upload">
            {value && (
                <div className="media-preview">
                    {type === 'video' ? (
                        <video
                            src={value}
                            controls
                            className="admin-video-preview"
                            style={{ width: '100%', maxHeight: 200, borderRadius: 8, marginBottom: 10, backgroundColor: '#000' }}
                        />
                    ) : (
                        <img
                            src={value}
                            alt="Preview"
                            className="admin-image-preview"
                            style={{ height: 120, marginBottom: 10, borderRadius: 6, objectFit: 'contain', background: 'rgba(255,255,255,0.05)', border: '1px solid #333' }}
                        />
                    )}
                    <button
                        type="button"
                        className="remove-media-btn"
                        onClick={() => onChange('')}
                        style={{ display: 'block', padding: '4px 8px', fontSize: 12, background: 'rgba(255,50,50,0.2)', color: '#ff4444', border: 'none', borderRadius: 4, cursor: 'pointer', marginBottom: 10 }}
                    >
                        Remove {type === 'video' ? 'Video' : 'Image'}
                    </button>
                </div>
            )}

            <label className="admin-file-input-label" style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
                {value ? (label || `Replace ${type === 'video' ? 'Video' : 'Image'}`) : (label || `Upload ${type === 'video' ? 'Video' : 'Image'}`)}
                <input
                    type="file"
                    accept={type === 'video' ? "video/*" : "image/*"}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </label>
        </div>
    );
};

export default MediaUploader;
