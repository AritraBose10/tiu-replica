import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('Starting server...');
  const server = spawn('node', ['server.js'], {
    cwd: __dirname,
    env: { ...process.env, PORT: '3005' },
    stdio: 'inherit'
  });

  // Wait 3 seconds for server to start
  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`BROWSER LOG [${msg.type()}]:`, msg.text());
  });

  page.on('pageerror', err => {
    console.error('BROWSER ERROR:', err);
  });

  console.log('Navigating to http://localhost:3005/apply...');
  await page.goto('http://localhost:3005/apply');

  console.log('Waiting 10 seconds for widget to load...');
  await page.waitForTimeout(10000);

  // Take screenshot of the form widget area
  const widgetSelector = '.ee-form-widget';
  const exists = await page.locator(widgetSelector).first().isVisible();
  console.log(`Widget element visible in DOM: ${exists}`);

  if (exists) {
    const html = await page.locator(widgetSelector).first().innerHTML();
    console.log('Widget inner HTML length:', html.length);
    console.log('Widget inner HTML preview:', html.substring(0, 500));
    await page.locator(widgetSelector).first().screenshot({ path: path.join(__dirname, 'widget-screenshot.png') });
    console.log('Saved widget-screenshot.png');
  } else {
    console.log('Widget element not found or not visible');
  }

  await browser.close();
  server.kill();
  process.exit(0);
}

run().catch(err => {
  console.error('Test run failed:', err);
  process.exit(1);
});
