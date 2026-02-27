import { useEffect } from 'react';

/**
 * SEO Component — sets document title, meta description, and optional JSON-LD schema.
 * Lightweight alternative to react-helmet for SPAs.
 */
const SEO = ({ title, description, schema }) => {
    useEffect(() => {
        // Set document title
        if (title) {
            document.title = title;
        }

        // Set meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (description) {
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.setAttribute('name', 'description');
                document.head.appendChild(metaDescription);
            }
            metaDescription.setAttribute('content', description);
        }

        // Set Canonical Tag
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        // Automatically inject the clean URL without query parameters
        canonicalLink.setAttribute('href', `https://www.technoindiauniversity.ai${window.location.pathname}`);

        // Cleanup on unmount
        return () => {
            // No cleanup needed for canonical/meta created once per route during dev
        };
    }, [title, description]);

    return null;
};

export default SEO;
