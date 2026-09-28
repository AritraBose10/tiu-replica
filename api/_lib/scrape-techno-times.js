import axios from 'axios';
import * as cheerio from 'cheerio';

const SOURCE_URL = 'https://technotimes.info/?s=sof';

// Checked in order — the first bucket whose keywords appear in the title wins,
// so specific formats (workshop, panel) beat generic ones (fest, celebration).
// A trailing * matches a word stem ('celebrat*' → celebrate/celebrated/celebration);
// everything else must match a whole word, so 'sports' does not match 'esports'.
const CATEGORY_RULES = [
    ['Workshop', ['workshop*', 'bootcamp*', 'masterclass*', 'training', 'hands-on']],
    ['Sports', ['sports', 'tournament*', 'athletic*', 'championship*', 'match']],
    ['Seminar', ['seminar*', 'panel', 'discussion', 'symposium', 'conclave', 'lecture', 'talk', 'talks', 'spotlight', 'inauguration', 'summit']],
    ['Technical', ['hackathon*', 'make-a-thon', 'makeathon', 'coding', 'devx', 'technical', 'technolog*', 'engineer*', 'robotic*', 'esports', 'innovation', 'ai', 'artificial intelligence', 'startup*', 'entrepreneur*']],
    ['Cultural', ['cultural', 'fest', 'fests', 'celebrat*', 'rhythm', 'music*', 'dance', 'photography', 'art', 'arts', 'drama']],
];

const COMPILED_RULES = CATEGORY_RULES.map(([category, keywords]) => [
    category,
    keywords.map((k) => {
        const stem = k.endsWith('*');
        const body = (stem ? k.slice(0, -1) : k).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp(`\\b${body}${stem ? '' : '\\b'}`, 'i');
    }),
]);

// The site's own taxonomy is publication sections ("Admission News 2025", "Healthcare"),
// not event types, so categories are always derived from the headline instead.
function categorize(title) {
    const t = title || '';
    for (const [category, patterns] of COMPILED_RULES) {
        if (patterns.some((re) => re.test(t))) return category;
    }
    return 'Event';
}

const DATE_FORMAT = { day: 'numeric', month: 'short', year: 'numeric' };

// Both sources give a calendar date with no timezone, so everything is parsed and
// formatted in local time — parsing as UTC would shift dates a day backwards.
function formatDate(d) {
    return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-IN', DATE_FORMAT);
}

// Some cards carry a meta block ("September 5, 2026"); the rest carry none, and the
// permalink (/index.php/2026/09/17/slug/) is the only date available. Both are
// normalised to one format so the cards read consistently.
function resolveDate($card, link) {
    const meta = $card.find('.meta-info-date abbr').text().trim();
    if (meta) {
        const formatted = formatDate(new Date(meta));
        if (formatted) return formatted;
    }
    const m = /\/(\d{4})\/(\d{2})\/(\d{2})\//.exec(link || '');
    return m ? formatDate(new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))) : '';
}

/** Scrapes SOF coverage from Techno Times. Returns events newest-first, deduped by link. */
export async function scrapeTechnoTimes() {
    const { data } = await axios.get(SOURCE_URL, { timeout: 10000 });
    const $ = cheerio.load(data);

    // The search page renders the same post in several blocks (featured strip, grid,
    // sidebar), so dedupe on the permalink and keep the first occurrence.
    const byLink = new Map();

    $('.p-wrap').each((index, element) => {
        const title = $(element).find('.entry-title a').text().trim();
        const link = $(element).find('.entry-title a').attr('href');
        if (!title || !link || byLink.has(link)) return;

        byLink.set(link, {
            title,
            link,
            image: $(element).find('.p-flink img').attr('src'),
            date: resolveDate($(element), link),
            category: categorize(title),
        });
    });

    return [...byLink.values()];
}
