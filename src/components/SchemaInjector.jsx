import { useEffect } from 'react';

/**
 * SchemaInjector — Injects a JSON-LD structured data block into the <head>.
 * Automatically cleans up on unmount / re-render.
 *
 * Usage:
 *   <SchemaInjector schema={{ "@context": "https://schema.org", ... }} />
 */
const SchemaInjector = ({ schema }) => {
    if (!schema) return null;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default SchemaInjector;
