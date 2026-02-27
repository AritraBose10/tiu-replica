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

        // Set JSON-LD structured data
        let scriptTag = document.querySelector('script[data-seo-schema]');
        if (schema) {
            if (!scriptTag) {
                scriptTag = document.createElement('script');
                scriptTag.setAttribute('type', 'application/ld+json');
                scriptTag.setAttribute('data-seo-schema', 'true');
                document.head.appendChild(scriptTag);
            }
            scriptTag.textContent = JSON.stringify(schema);
        }

        // Cleanup on unmount
        return () => {
            if (scriptTag) {
                scriptTag.remove();
            }
        };
    }, [title, description, schema]);

    return null;
};

export default SEO;
