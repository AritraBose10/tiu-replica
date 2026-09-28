/**
 * set_featured_blogs.cjs — flag the posts that appear in "Featured Reads".
 *
 * Every published post had featured = 0, so the blog page rendered the
 * "Featured Reads" heading above an empty grid. This flags a default editorial
 * set; the picks are editable any time from Admin → Blogs (the Featured
 * toggle), so this script is only needed to seed them.
 *
 * Four posts, because the featured grid is two columns.
 * Writes scripts/rollback_featured_blogs.cjs before changing anything.
 *
 * Run:  node scripts/set_featured_blogs.cjs
 */
require('dotenv/config');
const fs = require('node:fs');
const path = require('node:path');
const { createClient } = require('@libsql/client');

const FEATURED_SLUGS = [
  'btech-artificial-intelligence-college-kolkata',      // AI & Tech — flagship AI programme piece
  'growing-dmand-ai-engineers-india',                   // AI & Tech — demand / market story
  'roadmap-build-successful-career-after-btech-cse',     // Career — highest-intent career guide
  'best-future-ready-degree-courses-after-12th',         // Career — top-of-funnel for school leavers
];

(async () => {
  const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  const rs = await db.execute("SELECT id, slug, title, featured FROM blogs WHERE status = 'published'");
  const bySlug = new Map(rs.rows.map((r) => [r.slug, r]));

  const missing = FEATURED_SLUGS.filter((s) => !bySlug.has(s));
  if (missing.length) {
    console.error('Aborting — these slugs are not published:', missing);
    process.exit(1);
  }

  const target = new Set(FEATURED_SLUGS);
  const changed = rs.rows.filter((r) => (target.has(r.slug) ? 1 : 0) !== (r.featured ? 1 : 0));

  if (!changed.length) {
    console.log('Nothing to change.');
    return;
  }

  // Rollback script, written before any mutation
  const rollbackPath = path.join(__dirname, 'rollback_featured_blogs.cjs');
  fs.writeFileSync(rollbackPath, `/**
 * Auto-generated ${new Date().toISOString()} by set_featured_blogs.cjs
 * Restores the featured flag to its value before that run.
 */
require('dotenv/config');
const { createClient } = require('@libsql/client');
(async () => {
  const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  const prev = ${JSON.stringify(changed.map((r) => ({ id: r.id, featured: r.featured ? 1 : 0 })), null, 2)};
  for (const p of prev) {
    await db.execute({ sql: 'UPDATE blogs SET featured = ? WHERE id = ?', args: [p.featured, p.id] });
  }
  console.log('Restored ' + prev.length + ' rows.');
})();
`);
  console.log(`Rollback written to ${rollbackPath}\n`);

  for (const r of changed) {
    const next = target.has(r.slug) ? 1 : 0;
    await db.execute({ sql: 'UPDATE blogs SET featured = ? WHERE id = ?', args: [next, r.id] });
    console.log(`  featured=${next}  ${r.title.slice(0, 66)}`);
  }

  const after = await db.execute("SELECT title FROM blogs WHERE status='published' AND featured = 1");
  console.log(`\nFeatured Reads now shows ${after.rows.length} posts:`);
  after.rows.forEach((r) => console.log('  •', r.title));
})();
