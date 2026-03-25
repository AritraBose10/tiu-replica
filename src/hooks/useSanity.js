import { useState, useEffect } from 'react';
import { sanityClient } from '../lib/sanityClient';

/**
 * Custom hook to fetch data from Sanity CMS.
 * Falls back to provided fallback data on error.
 *
 * @param {string} query - GROQ query string
 * @param {*} fallback - Fallback data if Sanity fetch fails
 * @param {object} [params] - Optional GROQ query params
 * @returns {{ data: *, loading: boolean, error: Error|null }}
 */
/**
 * Recursively search and transform Sanity CDN URLs to local paths.
 * Future-proof helper for when users export their dataset locally.
 */
function transformSanityUrls(obj) {
    if (!obj) return obj;
    if (typeof obj === 'string') {
        if (obj.includes('cdn.sanity.io')) {
            const parts = obj.split('/');
            const filename = parts[parts.length - 1].split('?')[0];
            // Check if local image exists (fallback to original if not, but we'll assume they will be in /public/sanity-images/)
            // For now, this is ready to be toggled once files are moved.
            return `/sanity-images/${filename}`;
        }
        return obj;
    }
    if (Array.isArray(obj)) return obj.map(transformSanityUrls);
    if (typeof obj === 'object') {
        const newObj = {};
        for (const [key, value] of Object.entries(obj)) {
            newObj[key] = transformSanityUrls(value);
        }
        return newObj;
    }
    return obj;
}

export function useSanity(query, fallback = null, params = {}) {
    const [data, setData] = useState(fallback);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        sanityClient
            .fetch(query, params)
            .then((result) => {
                if (!cancelled) {
                    // Toggled off by default until user specifically exports Sanity assets locally
                    // const finalData = transformSanityUrls(result);
                    const hasData = result && (Array.isArray(result) ? result.length > 0 : true);
                    setData(hasData ? result : fallback);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.warn('[Sanity] Fetch failed, using fallback:', err.message);
                if (!cancelled) {
                    setData(fallback);
                    setError(err);
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [query]);

    return { data, loading, error };
}

/**
 * Fetch a site setting value by key, parsed from JSON string.
 *
 * @param {string} key - The setting key
 * @param {*} fallback - Fallback value
 * @returns {{ data: *, loading: boolean, error: Error|null }}
 */
export function useSiteSetting(key, fallback = null) {
    const query = `*[_type == "siteSettings" && key == "${key}"][0].value`;
    const { data: raw, loading, error } = useSanity(query, null);

    const [parsed, setParsed] = useState(fallback);

    useEffect(() => {
        if (raw) {
            try {
                setParsed(JSON.parse(raw));
            } catch {
                // Value might be a plain string
                setParsed(raw);
            }
        }
    }, [raw]);

    return { data: loading ? fallback : parsed, loading, error };
}
