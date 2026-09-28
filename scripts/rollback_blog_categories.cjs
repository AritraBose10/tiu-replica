/**
 * Auto-generated 2026-09-17T14:26:55.709Z by recategorize_blogs.cjs
 * Restores blog categories to their values before that run.
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
    "id": 1,
    "category": "General"
  },
  {
    "id": 2,
    "category": "General"
  },
  {
    "id": 3,
    "category": "General"
  },
  {
    "id": 5,
    "category": "General"
  },
  {
    "id": 6,
    "category": "General"
  },
  {
    "id": 7,
    "category": "General"
  },
  {
    "id": 8,
    "category": "General"
  },
  {
    "id": 9,
    "category": "General"
  },
  {
    "id": 10,
    "category": "General"
  },
  {
    "id": 11,
    "category": "General"
  },
  {
    "id": 12,
    "category": "General"
  },
  {
    "id": 13,
    "category": "General"
  },
  {
    "id": 14,
    "category": "General"
  },
  {
    "id": 15,
    "category": "General"
  },
  {
    "id": 16,
    "category": "General"
  },
  {
    "id": 17,
    "category": "General"
  },
  {
    "id": 18,
    "category": "General"
  },
  {
    "id": 19,
    "category": "General"
  },
  {
    "id": 20,
    "category": "General"
  },
  {
    "id": 21,
    "category": "General"
  },
  {
    "id": 22,
    "category": "General"
  },
  {
    "id": 23,
    "category": "General"
  },
  {
    "id": 24,
    "category": "General"
  },
  {
    "id": 25,
    "category": "General"
  },
  {
    "id": 26,
    "category": "General"
  },
  {
    "id": 27,
    "category": "General"
  },
  {
    "id": 28,
    "category": "General"
  }
];
  for (const p of prev) {
    await db.execute({ sql: 'UPDATE blogs SET category = ? WHERE id = ?', args: [p.category, p.id] });
  }
  console.log('Restored ' + prev.length + ' rows.');
})();
