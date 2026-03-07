import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Route → human-readable label map for breadcrumbs.
 */
const ROUTE_LABELS = {
    '/': 'Home',
    '/courses': 'Programs & Courses',
    '/about': 'About Us',
    '/apply': 'Admissions',
    '/cloud-ai-certification-courses-kolkata': 'Google Cloud & IBM Certification Courses',
    '/contact': 'Contact',
    '/faq': 'FAQ',
    '/approvals': 'Approvals & Accreditations',
    '/events': 'Events & Happenings',
    '/search': 'Search',
};

const SITE_URL = 'https://www.technoindiauniversity.ai';

/**
 * BreadcrumbSchema — Renders a BreadcrumbList JSON-LD schema
 * as an inline <script> so it's included in SSR/prerender output.
 */
const BreadcrumbSchema = () => {
    const { pathname } = useLocation();

    const schema = useMemo(() => {
        // Don't inject for admin routes
        if (pathname.startsWith('/admin')) return null;

        const items = [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": SITE_URL
            }
        ];

        // If we're not on the homepage, add the current page
        if (pathname !== '/') {
            const label = ROUTE_LABELS[pathname] || pathname.replace(/^\//, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            items.push({
                "@type": "ListItem",
                "position": 2,
                "name": label,
                "item": `${SITE_URL}${pathname}`
            });
        }

        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": items
        };
    }, [pathname]);

    if (!schema) return null;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default BreadcrumbSchema;

