import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Route → human-readable label map for breadcrumbs.
 */
const ROUTE_LABELS = {
    '/': 'Home',
    '/courses': 'Programs & Courses',
    '/about': 'About Us',
    '/admissions': 'Admissions',
    '/contact': 'Contact',
    '/faq': 'FAQ',
    '/approvals': 'Approvals & Accreditations',
    '/events': 'Events & Happenings',
    '/search': 'Search',
};

const SITE_URL = 'https://www.technoindiauniversity.ai';

/**
 * BreadcrumbSchema — Injects a BreadcrumbList JSON-LD schema
 * into <head> based on the current route.
 *
 * Always generates: Home → Current Page
 * Placed once in the layout so every page gets breadcrumbs.
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

    useEffect(() => {
        if (!schema) return;

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        script.setAttribute('data-breadcrumb-schema', 'true');
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [schema]);

    return null;
};

export default BreadcrumbSchema;
