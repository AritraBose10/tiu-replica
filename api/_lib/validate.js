import { z } from 'zod';

const strId = z.string().min(1).max(200);
const intId = z.coerce.number().int().positive();
const sortOrder = z.coerce.number().int().min(0).optional().default(0);
const optStr = (max) => z.string().max(max).optional().default('');
const reqStr = (min, max) => z.string().min(min).max(max);

export const schemas = {
    login: z.object({
        password: z.string().min(1).max(200),
    }),

    events: {
        create: z.object({
            id: strId,
            title: reqStr(1, 300),
            description: optStr(5000),
            date: optStr(50),
            time: optStr(50),
            location: optStr(300),
            category: optStr(100),
            image: optStr(1000),
            attendees: z.coerce.number().int().min(0).optional().default(0),
            featured: z.boolean().optional().default(false),
            status: z.string().max(50).optional().default('upcoming'),
            link: optStr(1000),
            sort_order: sortOrder,
        }),
        update: z.object({
            id: strId,
            title: reqStr(1, 300),
            description: z.string().max(5000).optional(),
            date: z.string().max(50).optional(),
            time: z.string().max(50).optional(),
            location: z.string().max(300).optional(),
            category: z.string().max(100).optional(),
            image: z.string().max(1000).optional(),
            attendees: z.coerce.number().int().min(0).optional(),
            featured: z.boolean().optional(),
            status: z.string().max(50).optional(),
            link: z.string().max(1000).optional(),
            sort_order: sortOrder,
        }),
        delete: z.object({ id: strId }),
    },

    courses: {
        create: z.object({
            id: strId,
            title: reqStr(1, 300),
            description: optStr(5000),
            category: optStr(100),
            link: optStr(1000),
            sort_order: sortOrder,
        }),
        update: z.object({
            id: strId,
            title: reqStr(1, 300),
            description: z.string().max(5000).optional(),
            category: z.string().max(100).optional(),
            link: z.string().max(1000).optional(),
            sort_order: sortOrder,
        }),
        delete: z.object({ id: strId }),
    },

    gallery: {
        create: z.object({
            src: reqStr(1, 1000),
            alt: optStr(500),
            caption: optStr(1000),
            category: optStr(100),
            span: optStr(100),
            sort_order: sortOrder,
        }),
        update: z.object({
            id: intId,
            src: reqStr(1, 1000),
            alt: z.string().max(500).optional(),
            caption: z.string().max(1000).optional(),
            category: z.string().max(100).optional(),
            span: z.string().max(100).optional(),
            sort_order: sortOrder,
        }),
        delete: z.object({ id: intId }),
    },

    faqs: {
        create: z.object({
            question: reqStr(1, 1000),
            answer: reqStr(1, 5000),
            sort_order: sortOrder,
        }),
        update: z.object({
            id: intId,
            question: reqStr(1, 1000),
            answer: reqStr(1, 5000),
            sort_order: sortOrder,
        }),
        delete: z.object({ id: intId }),
    },

    scholarships: {
        create: z.object({
            title: reqStr(1, 300),
            coverage: z.coerce.number().int().min(0).max(100).optional().default(0),
            coverage_label: optStr(200),
            criteria: optStr(2000),
            benefits: z.array(z.string().max(500)).optional().default([]),
            sort_order: sortOrder,
        }),
        update: z.object({
            id: intId,
            title: reqStr(1, 300),
            coverage: z.coerce.number().int().min(0).max(100).optional(),
            coverage_label: z.string().max(200).optional(),
            criteria: z.string().max(2000).optional(),
            benefits: z.array(z.string().max(500)).optional().default([]),
            sort_order: sortOrder,
        }),
        delete: z.object({ id: intId }),
    },

    partners: {
        create: z.object({
            name: reqStr(1, 300),
            logo_url: optStr(1000),
            sort_order: sortOrder,
        }),
        update: z.object({
            id: intId,
            name: reqStr(1, 300),
            logo_url: z.string().max(1000).optional(),
            sort_order: sortOrder,
        }),
        delete: z.object({ id: intId }),
    },

    testimonials: {
        create: z.object({
            name: reqStr(1, 200),
            course: optStr(200),
            quote: reqStr(1, 2000),
            rating: z.coerce.number().int().min(1).max(5).optional().default(5),
            image: optStr(1000),
            company: optStr(200),
            row_num: z.coerce.number().int().min(1).optional().default(1),
            sort_order: sortOrder,
        }),
        update: z.object({
            id: intId,
            name: reqStr(1, 200),
            course: z.string().max(200).optional(),
            quote: reqStr(1, 2000),
            rating: z.coerce.number().int().min(1).max(5).optional(),
            image: z.string().max(1000).optional(),
            company: z.string().max(200).optional(),
            row_num: z.coerce.number().int().min(1).optional(),
            sort_order: sortOrder,
        }),
        delete: z.object({ id: intId }),
    },

    recruiters: {
        create: z.object({
            name: reqStr(1, 300),
            sort_order: sortOrder,
        }),
        update: z.object({
            id: intId,
            name: reqStr(1, 300),
            sort_order: sortOrder,
        }),
        delete: z.object({ id: intId }),
    },

    approvals: {
        create: z.object({
            name: reqStr(1, 200),
            full_name: reqStr(1, 500),
            logo: optStr(1000),
            description: optStr(2000),
            sort_order: sortOrder,
        }),
        update: z.object({
            id: intId,
            name: reqStr(1, 200),
            full_name: reqStr(1, 500),
            logo: z.string().max(1000).optional(),
            description: z.string().max(2000).optional(),
            sort_order: sortOrder,
        }),
        delete: z.object({ id: intId }),
    },

    settings: {
        update: z.object({
            key: reqStr(1, 200),
            value: z.any(),
        }),
    },

    pgLeads: {
        create: z.object({
            name: reqStr(1, 200),
            mobile: z.string().regex(/^[0-9+\-\s()]{7,20}$/, 'Enter a valid phone number'),
            email: z.string().email().max(200),
            programme: z.enum(['MBA', 'M.Tech', 'M.Sc', 'Ph.D']),
            experience: reqStr(1, 50),
            state: reqStr(1, 200),
            city: reqStr(1, 200),
            source: optStr(100),
        }),
    },
};

export function validate(schema, data) {
    const result = schema.safeParse(data);
    if (!result.success) {
        return { ok: false, errors: result.error.flatten().fieldErrors };
    }
    return { ok: true, data: result.data };
}
