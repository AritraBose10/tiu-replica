import fetch from 'node-fetch';

const BASE = 'http://localhost:3001';

// Convert Google Drive file links to direct image URLs
const gdrive = (id) => `https://drive.google.com/uc?export=view&id=${id}`;

const NEW_TESTIMONIALS = [
    {
        name: 'Anushka Mondal',
        course: 'B.Tech CSE (Data Science) — Batch 2024–2028',
        quote: 'The School of Future at Techno India University has offered me incredible opportunities, including a visit to Google, No-Code sessions, and an impactful ESD program, all supported by practical learning and dedicated mentorship that have greatly enhanced my academic and professional growth.',
        rating: 5,
        image: gdrive('1lgiSq1dbE3uXvIhuC-hb3vua0HA7AWvQ'),
        company: 'School of the Future',
        row_num: 1,
        sort_order: 1,
    },
    {
        name: 'Ahana Roy',
        course: 'B.Tech CSE (AI/ML) — Batch 2024–2028',
        quote: 'Being part of the School of Future has been an incredible journey where innovation thrives, offering endless learning opportunities and exploration across diverse fields, making me super duper happy and excited for the future.',
        rating: 5,
        image: gdrive('1dAWluREdKr-xLqTe0EfvEaPhZjGIFOXv'),
        company: 'School of the Future',
        row_num: 1,
        sort_order: 2,
    },
    {
        name: 'Priyanka Sen',
        course: 'B.Tech CSE (AI/ML) — Batch 2024–2028',
        quote: "I've gained valuable skills through a cutting-edge curriculum, exceptional mentors, and enriching experiences like no-code web development, the ESD course, and a visit to Google India headquarters — a dream come true.",
        rating: 5,
        image: gdrive('1MrJYK6ExT49WndJdw06qfSjf8DOl6CXr'),
        company: 'School of the Future',
        row_num: 1,
        sort_order: 3,
    },
    {
        name: 'Joyjit Das',
        course: 'B.Tech CSE (AI/ML) — Batch 2024–2028',
        quote: "I'm gaining industry-ready skills through cutting-edge tech sessions, startup ideation, and unique experiences like the industry immersion visit to Google India HQ — all in my very first year.",
        rating: 5,
        image: gdrive('140H00rasZhsZ5KnIoiAMi8HYQH5CMxnc'),
        company: 'School of the Future',
        row_num: 2,
        sort_order: 4,
    },
    {
        name: 'Shalini Kumar',
        course: 'B.Tech CSE (Core) — Batch 2024–2028',
        quote: 'It has been an enriching journey at Techno India University, where cutting-edge learning, innovation, and inspiration drive my growth and aspirations every single day.',
        rating: 5,
        image: gdrive('1LOkgTiqXQ9pvIC7Bxe-BmIeWvMFuy6e_'),
        company: 'School of the Future',
        row_num: 2,
        sort_order: 5,
    },
    {
        name: 'Suchismita Behera',
        course: 'B.Tech CSE (AI/ML) — Batch 2024–2028',
        quote: 'Joining School of the Future was a really good decision. Syllabuses aligned with industry trends, seminars on AI and entrepreneurship, supportive faculty, no-code web-dev classes — and an unforgettable visit to Google HQ in the very 1st semester!',
        rating: 5,
        image: gdrive('1cH-09L8RvZFUdDkwCnem8_ebVv34nGjw'),
        company: 'School of the Future',
        row_num: 2,
        sort_order: 6,
    },
    {
        name: 'Ashwika Singh',
        course: 'B.Tech CSE (Data Science) — Batch 2024–2028',
        quote: 'Being part of the School of the Future has been a transformative experience — from no-code sessions and passionate mentors to visiting Google and participating in the 15th World Confluence of Humanity, Power, and Spirituality.',
        rating: 5,
        image: gdrive('1cpWp0bNfF2OUdVG45SkNoL_2saIJEJw6'),
        company: 'School of the Future',
        row_num: 3,
        sort_order: 7,
    },
    {
        name: 'Sarannya Hore',
        course: 'B.Tech CSE (Data Science) — Batch 2024–2028',
        quote: 'My experience here has been exceptional — outstanding facilities, supportive faculty, and unique opportunities. Visiting Google in my first year was a dream come true, and the no-code web development sessions were equally wonderful highlights!',
        rating: 5,
        image: gdrive('1ySZVh5kUDcEuNC2chthiV0GdgkswWFjJ'),
        company: 'School of the Future',
        row_num: 3,
        sort_order: 8,
    },
];

async function getToken() {
    const res = await fetch(`${BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'admin123' }),
    });
    const data = await res.json();
    return data.token;
}

async function main() {
    const token = await getToken();
    if (!token) { console.error('Login failed'); process.exit(1); }
    console.log('✓ Authenticated');

    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

    // Get existing testimonials
    const existing = await (await fetch(`${BASE}/api/testimonials`)).json();
    console.log(`Found ${existing.length} existing testimonials — deleting...`);

    // Delete all
    for (const t of existing) {
        await fetch(`${BASE}/api/testimonials`, {
            method: 'DELETE',
            headers,
            body: JSON.stringify({ id: t.id }),
        });
    }
    console.log('✓ All deleted');

    // Insert new
    for (const t of NEW_TESTIMONIALS) {
        const res = await fetch(`${BASE}/api/testimonials`, {
            method: 'POST',
            headers,
            body: JSON.stringify(t),
        });
        const data = await res.json();
        console.log(`✓ Inserted: ${t.name}`, data);
    }

    console.log('\n✅ Done — 8 new testimonials added!');
}

main().catch(console.error);
