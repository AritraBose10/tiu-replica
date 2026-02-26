import { useEffect } from 'react';

/**
 * SchemaInjector — Injects a JSON-LD structured data block into the <head>.
 * Automatically cleans up on unmount / re-render.
 *
 * Usage:
 *   <SchemaInjector schema={{ "@context": "https://schema.org", ... }} />
 */
const SchemaInjector = ({ schema }) => {
    useEffect(() => {
        if (!schema) return;

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        script.setAttribute('data-schema-injector', 'true');
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [JSON.stringify(schema)]);

    return null;
};

export default SchemaInjector;
