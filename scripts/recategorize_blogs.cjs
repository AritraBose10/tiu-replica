/**
 * recategorize_blogs.cjs — assign real categories to published blog posts.
 *
 * Every post was sitting on the admin's default 'General', which meant the
 * public archive offered category pills that matched nothing. This assigns
 * each post to the taxonomy the admin editor already exposes.
 *
 * Writes a rollback script to scripts/rollback_blog_categories.cjs before
 * changing anything. Run with `node scripts/recategorize_blogs.cjs`.
 */
require('dotenv/config');
const fs = require('node:fs');
const path = require('node:path');
const { createClient } = require('@libsql/client');

// Explicit slug -> category map. Deliberately not regex: with a set this
// small an explicit table is auditable, and pattern matching mis-filed three
// posts on the first pass ("...cse-ai-course" is a college listicle, not an
// AI article).
const CATEGORY_BY_SLUG = {
  // ── AI & Tech: the subject is the technology itself ──
  'ai-driven-automation-in-engineering-careers': 'AI & Tech',
  'btech-artificial-intelligence-college-kolkata': 'AI & Tech',
  'growing-dmand-ai-engineers-india': 'AI & Tech',
  'how-techno-india-university-prepares-data-scientists-ai-future': 'AI & Tech',
  'rise-of-ai-in-cse-skills': 'AI & Tech',
  'rise-of-artificial-intelligence-in-cse': 'AI & Tech',

  // ── Career: choosing a college, placements, career planning ──
  'benefits-of-studying-computer-science-engineering': 'Career',
  'best-engineering-college-kolkata-computer-science-engineering-course': 'Career',
  'best-engineering-college-kolkata-for-ai-courses': 'Career',
  'best-future-ready-degree-courses-after-12th': 'Career',
  'best-private-engineering-college-in-kolkata': 'Career',
  'common-mistakes-choosing-engineering-college': 'Career',
  'engineering-college-rankings-vs-placement-records': 'Career',
  'engineering-colleges-prepare-students-corporate-world': 'Career',
  'how-choose-btech-engineering-college-kolkata': 'Career',
  'how-engineering-colleges-prepare-students-for-placements': 'Career',
  'how-important-are-placements-engineering-college': 'Career',
  'how-to-compare-engineering-colleges-before-taking-admission': 'Career',
  'plan-successful-engineering-career': 'Career',
  'private-engineering-colleges-kolkata-cse-ai-course': 'Career',
  'roadmap-build-successful-career-after-btech-cse': 'Career',
  'what-makes-best-engineering-colleges-kolkata-stand-out': 'Career',
  'why-computer-science-engineering-most-in-demand-course': 'Career',

  // ── Industry: academia-industry linkage, sector direction ──
  'bridging-academia-industry-gap-techno-india-university': 'Industry',
  'future-of-engineering-education-india': 'Industry',
  'why-industry-integrated-curriculum-matters': 'Industry',

  // ── Campus Life ──
  'what-makes-a-smart-engineering-campus': 'Campus Life',
};

// Anything not in the table keeps whatever category it already has, so a post
// added after this script was written is never silently re-filed.
const categorize = (slug, current) => CATEGORY_BY_SLUG[slug] || current;

(async () => {
  const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  const rs = await db.execute("SELECT id, slug, title, category FROM blogs WHERE status = 'published'");
  const rows = rs.rows.map((r) => ({ ...r, next: categorize(r.slug, r.category) }));
  const changed = rows.filter((r) => r.next !== r.category);

  if (!changed.length) {
    console.log('Nothing to change.');
    return;
  }

  // Rollback script, written before any mutation
  const rollback = `/**
 * Auto-generated ${new Date().toISOString()} by recategorize_blogs.cjs
 * Restores blog categories to their values before that run.
 */
require('dotenv/config');
const { createClient } = require('@libsql/client');
(async () => {
  const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  const prev = ${JSON.stringify(changed.map((r) => ({ id: r.id, category: r.category })), null, 2)};
  for (const p of prev) {
    await db.execute({ sql: 'UPDATE blogs SET category = ? WHERE id = ?', args: [p.category, p.id] });
  }
  console.log('Restored ' + prev.length + ' rows.');
})();
`;
  const rollbackPath = path.join(__dirname, 'rollback_blog_categories.cjs');
  fs.writeFileSync(rollbackPath, rollback);
  console.log(`Rollback written to ${rollbackPath}\n`);

  for (const r of changed) {
    await db.execute({ sql: 'UPDATE blogs SET category = ? WHERE id = ?', args: [r.next, r.id] });
    console.log(`  ${r.next.padEnd(12)} ${r.title.slice(0, 68)}`);
  }

  console.log(`\nUpdated ${changed.length} posts.`);
  const after = await db.execute("SELECT category, COUNT(*) n FROM blogs WHERE status='published' GROUP BY category ORDER BY n DESC");
  console.log('\nResulting distribution:');
  for (const r of after.rows) console.log(`  ${String(r.category).padEnd(12)} ${r.n}`);
})();
