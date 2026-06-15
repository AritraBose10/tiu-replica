/**
 * prerender.js — Static Site Generation using React 19's prerenderToNodeStream
 *
 * Runs after `vite build` and `vite build --ssr` to pre-render all public routes
 * as static HTML. Meta tags, titles, canonical links become visible to crawlers
 * without JavaScript execution.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { prerenderToNodeStream } from 'react-dom/static';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.resolve(ROOT, 'dist');

async function prerender() {
  console.log('\n🚀 Starting static prerender...\n');

  // 1. Import the pre-built SSR bundle and route config
  const { render } = await import(path.join(DIST, 'server', 'entry-server.js'));
  const { routeMeta, HOSTNAME, EXCLUDED_ROUTES } = await import(
    path.join(ROOT, 'src', 'routeMeta.js')
  );

  // 2. Read the dist/index.html template (produced by vite build)
  const templatePath = path.join(DIST, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('❌ dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  // Fetch blogs dynamically to prerender them
  if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
    console.log('Fetching dynamic blogs for prerendering...');
    try {
      const { createClient } = await import('@libsql/client');
      const db = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
      });
      const rs = await db.execute("SELECT slug, title, meta_title, meta_description, excerpt, schema_html FROM blogs WHERE status = 'published'");
      for (const row of rs.rows) {
        if (row.slug) {
          const route = `/blogs/${row.slug}`;
          routeMeta[route] = {
            title: row.meta_title || row.title || 'TIU Blog',
            description: row.meta_description || row.excerpt || 'Read this article on Techno India University School of the Future.',
            changefreq: 'weekly',
            priority: 0.8,
            schema: row.schema_html || null
          };
        }
      }
      console.log(`✅ Added ${rs.rows.length} dynamic blog routes.`);
    } catch (err) {
      console.error('⚠️ Could not fetch blogs:', err.message);
    }
  }

  const routes = Object.keys(routeMeta);
  let successCount = 0;

  // 3. Pre-render each route
  for (const route of routes) {
    const meta = routeMeta[route];
    try {
      // Create the React element via the SSR entry
      const element = render(route);

      // Use React 19's prerenderToNodeStream
      const { prelude } = await prerenderToNodeStream(element);

      // Convert Node.js Readable stream to string
      const chunks = [];
      for await (const chunk of prelude) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
      }
      const appHtml = Buffer.concat(chunks).toString('utf-8');

      // 4. Inject meta tags and rendered HTML into the template
      let html = template;

      // Replace <title>
      html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);

      // Replace <meta name="description"> — handles multi-line tags and apostrophes in content
      html = html.replace(
        /<meta\s+name=["']description["']\s*[\s\S]*?content=["']([\s\S]*?)["']\s*\/?>/i,
        `<meta name="description" content="${meta.description.replace(/"/g, '&quot;')}" />`
      );

      // Inject or replace <link rel="canonical">
      const canonicalUrl = `${HOSTNAME}${route === '/' ? '' : route}`;
      if (html.includes('rel="canonical"')) {
        html = html.replace(
          /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
          `<link rel="canonical" href="${canonicalUrl}" />`
        );
      } else {
        html = html.replace(
          '</head>',
          `  <link rel="canonical" href="${canonicalUrl}" />\n  </head>`
        );
      }

      // Inject <meta name="robots"> if not present
      if (!html.includes('name="robots"')) {
        html = html.replace(
          '</head>',
          `  <meta name="robots" content="index, follow" />\n  </head>`
        );
      }

      // Inject Schema JSON-LD if present
      if (meta.schema) {
        html = html.replace(
          '</head>',
          `  ${meta.schema}\n  </head>`
        );
      }

      // Replace <div id="root"></div> with rendered content
      html = html.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );

      // 5. Write output to correct path
      const outDir = route === '/'
        ? DIST
        : path.join(DIST, route.slice(1));

      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'index.html'), html);

      successCount++;
      console.log(`  ✅ ${route}`);
    } catch (err) {
      console.error(`  ❌ ${route}: ${err.message}`);
      console.error(err.stack);
      process.exit(1); // Hard fail — never deploy broken output
    }
  }

  // 6. Generate sitemap.xml
  generateSitemap(routeMeta, HOSTNAME, EXCLUDED_ROUTES);

  console.log(`\n✅ Prerendered ${successCount}/${routes.length} routes successfully.`);
  console.log(`✅ sitemap.xml generated.\n`);
}

function generateSitemap(routeMeta, hostname, excludedRoutes) {
  const routes = Object.keys(routeMeta).filter(r => !excludedRoutes.includes(r));
  const today = new Date().toISOString().split('T')[0];

  const urls = routes.map(route => {
    const meta = routeMeta[route];
    const loc = `${hostname}${route === '/' ? '' : route}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${meta.changefreq || 'weekly'}</changefreq>
    <priority>${meta.priority || 0.5}</priority>
  </url>`;
  }).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
}

// Run
prerender().catch(err => {
  console.error('❌ Prerender failed:', err);
  process.exit(1);
});
