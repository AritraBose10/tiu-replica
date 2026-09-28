/**
 * Auto-generated 2026-09-28T13:13:53.139Z by set_featured_blogs.cjs
 * Restores the featured flag to its value before that run.
 */
require('dotenv/config');
const { createClient } = require('@libsql/client');
(async () => {
  const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  const prev = [
  {
    "id": 7,
    "featured": 0
  },
  {
    "id": 12,
    "featured": 0
  },
  {
    "id": 20,
    "featured": 0
  },
  {
    "id": 28,
    "featured": 0
  }
];
  for (const p of prev) {
    await db.execute({ sql: 'UPDATE blogs SET featured = ? WHERE id = ?', args: [p.featured, p.id] });
  }
  console.log('Restored ' + prev.length + ' rows.');
})();
