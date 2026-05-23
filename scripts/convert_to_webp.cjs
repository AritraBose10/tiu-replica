/**
 * convert_to_webp.cjs
 * Converts all JPG/JPEG/PNG images in public/assets/images and src/assets
 * to WebP format with 80% quality. Originals are kept as backups.
 * Run with: node scripts/convert_to_webp.cjs
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// ─── Config ─────────────────────────────────────────────────────────────────
const QUALITY = 80;                  // WebP quality (0–100)
const LARGE_THRESHOLD = 200 * 1024;  // Only convert files > 200 KB
const TARGET_DIRS = [
  path.resolve(__dirname, '../public/assets/images'),
  path.resolve(__dirname, '../public/assets/approvals'),
  path.resolve(__dirname, '../public/wireframes'),
  path.resolve(__dirname, '../src/assets'),
];
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];
// ─────────────────────────────────────────────────────────────────────────────

let totalSaved = 0;
let converted = 0;
let skipped = 0;
let errors = 0;

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function getAllFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => EXTENSIONS.includes(path.extname(f)))
    .map(f => path.join(dir, f));
}

async function convertFile(filePath) {
  const stat = fs.statSync(filePath);
  const originalSize = stat.size;

  // Skip files below threshold
  if (originalSize < LARGE_THRESHOLD) {
    console.log(`  ⏭  SKIP  ${path.basename(filePath)} (${formatBytes(originalSize)} — below threshold)`);
    skipped++;
    return;
  }

  const ext = path.extname(filePath);
  const webpPath = filePath.replace(new RegExp(ext + '$', 'i'), '.webp');

  // Skip if WebP already exists
  if (fs.existsSync(webpPath)) {
    console.log(`  ⏭  EXISTS ${path.basename(webpPath)} — already converted`);
    skipped++;
    return;
  }

  try {
    await sharp(filePath)
      .webp({ quality: QUALITY })
      .toFile(webpPath);

    const newSize = fs.statSync(webpPath).size;
    const saved = originalSize - newSize;
    const pct = ((saved / originalSize) * 100).toFixed(1);
    totalSaved += saved;
    converted++;

    console.log(
      `  ✅ DONE  ${path.basename(filePath).padEnd(35)} ${formatBytes(originalSize).padStart(8)} → ${formatBytes(newSize).padStart(8)}  saved ${pct}%`
    );
  } catch (err) {
    errors++;
    console.error(`  ❌ ERROR ${path.basename(filePath)}: ${err.message}`);
  }
}

async function main() {
  console.log('\n🔄 WebP Batch Converter — tiu-replica');
  console.log(`   Quality: ${QUALITY}%  |  Threshold: files > ${formatBytes(LARGE_THRESHOLD)}\n`);

  const allFiles = TARGET_DIRS.flatMap(getAllFiles);

  console.log(`📁 Found ${allFiles.length} image files across ${TARGET_DIRS.length} directories\n`);

  for (const file of allFiles) {
    await convertFile(file);
  }

  console.log('\n─────────────────────────────────────────────');
  console.log(`✅ Converted : ${converted} files`);
  console.log(`⏭  Skipped  : ${skipped} files`);
  console.log(`❌ Errors    : ${errors} files`);
  console.log(`💾 Total saved: ${formatBytes(totalSaved)}`);
  console.log('─────────────────────────────────────────────');
  console.log('\n⚠️  Original files are untouched. Update your JSX imports to use .webp paths when ready.\n');
}

main().catch(console.error);
