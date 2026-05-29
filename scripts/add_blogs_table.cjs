// Run once: node scripts/add_blogs_table.cjs
require('dotenv').config();
const { createClient } = require('@libsql/client');

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function migrate() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS blogs (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,
      title            TEXT NOT NULL,
      slug             TEXT UNIQUE NOT NULL,
      excerpt          TEXT,
      body             TEXT,
      feature_image    TEXT,
      category         TEXT DEFAULT 'General',
      tags             TEXT DEFAULT '[]',
      author           TEXT DEFAULT 'Editorial Team',
      author_role      TEXT,
      meta_title       TEXT,
      meta_description TEXT,
      schema_html      TEXT,
      status           TEXT DEFAULT 'draft',
      featured         INTEGER DEFAULT 0,
      read_time        TEXT,
      created_at       TEXT DEFAULT (datetime('now')),
      updated_at       TEXT DEFAULT (datetime('now')),
      sort_order       INTEGER DEFAULT 0
    )
  `);
  console.log('✅ blogs table created (or already exists)');
  process.exit(0);
}

migrate().catch(err => { console.error('Migration failed:', err); process.exit(1); });
