import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist');

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

let totalFiles = 0;
const errors = [];
const warnings = [];

const seenTitles = new Map();
const seenDescriptions = new Map();

function findHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (file === 'index.html') {
      results.push(fullPath);
    }
  }
  return results;
}

function validateFile(filePath) {
  totalFiles++;
  const relPath = path.relative(DIST_DIR, filePath);
  const routePath = '/' + relPath.replace(/\/index\.html$/, '').replace(/^index\.html$/, '');
  const html = fs.readFileSync(filePath, 'utf8');

  // 1. Title verification
  const titleMatch = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  const title = titleMatch ? titleMatch[1].trim() : '';

  if (!title) {
    errors.push({ file: routePath, message: 'Missing <title> tag' });
  } else {
    if (title.length > 65 || title.length < 25) {
      warnings.push({
        file: routePath,
        message: `Review title length (${title.length} characters); search engines may rewrite titles and there is no fixed character limit: "${title}"`
      });
    }

    // Check for spammy unverified superlatives in titles
    const unverifiedSuperlatives = ['\\bbest\\b', '\\bno\\.?\\s*1\\b', '\\b#1\\b', '\\bguaranteed\\b'];
    for (const sup of unverifiedSuperlatives) {
      if (new RegExp(sup, 'i').test(title)) {
        warnings.push({
          file: routePath,
          message: `Unverified superlative detected in title: "${title}"`
        });
      }
    }

    // Uniqueness
    if (seenTitles.has(title)) {
      errors.push({
        file: routePath,
        message: `Duplicate title with ${seenTitles.get(title)}: "${title}"`
      });
    } else {
      seenTitles.set(title, routePath);
    }
  }

  // 2. Meta description verification
  const descMatch = /<meta\b[^>]*\bname=["']description["'][^>]*\bcontent="([^"]*)"[^>]*>/i.exec(html) ||
                    /<meta\b[^>]*\bname=["']description["'][^>]*\bcontent='([^']*)'[^>]*>/i.exec(html) ||
                    /<meta\b[^>]*\bcontent="([^"]*)"[^>]*\bname=["']description["'][^>]*>/i.exec(html) ||
                    /<meta\b[^>]*\bcontent='([^']*)'[^>]*\bname=["']description["'][^>]*>/i.exec(html);
  const description = descMatch ? descMatch[1].trim() : '';

  if (!description) {
    errors.push({ file: routePath, message: 'Missing meta description' });
  } else {
    if (description.length > 165 || description.length < 105) {
      warnings.push({
        file: routePath,
        message: `Review description length (${description.length} characters); snippet display varies by device/query and there is no fixed limit: "${description}"`
      });
    }

    // Uniqueness
    if (seenDescriptions.has(description)) {
      errors.push({
        file: routePath,
        message: `Duplicate meta description with ${seenDescriptions.get(description)}: "${description.slice(0, 50)}..."`
      });
    } else {
      seenDescriptions.set(description, routePath);
    }
  }

  // 3. Canonical verification
  const canonicalMatch = /<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i.exec(html) ||
                        /<link\s+[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["'][^>]*>/i.exec(html);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

  if (!canonical) {
    errors.push({ file: routePath, message: 'Missing canonical link tag' });
  } else {
    if (!canonical.startsWith('https://indiandecorcompany.in/')) {
      errors.push({ file: routePath, message: `Invalid canonical domain (expected https://indiandecorcompany.in/...): "${canonical}"` });
    }
    if (!canonical.endsWith('/') && !canonical.includes('?') && !canonical.includes('#')) {
      errors.push({ file: routePath, message: `Canonical URL must have a trailing slash for Cloudflare Pages: "${canonical}"` });
    }
  }

  // 4. H1 verification
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1Matches.length === 0) {
    errors.push({ file: routePath, message: 'Missing <h1> tag on page' });
  } else if (h1Matches.length > 1) {
    warnings.push({ file: routePath, message: `Multiple <h1> tags found (${h1Matches.length})` });
  }
}

function run() {
  console.log(`${BOLD}${CYAN}🎯 Validating Prerendered SEO Metadata (Titles, Descriptions, Canonicals, H1s)...${RESET}\n`);

  if (!fs.existsSync(DIST_DIR)) {
    console.error(`${RED}❌ Error: dist/ directory not found. Run your build/prerender first.${RESET}`);
    process.exit(1);
  }

  const files = findHtmlFiles(DIST_DIR);
  if (files.length === 0) {
    console.error(`${RED}❌ Error: No index.html files found in dist/.${RESET}`);
    process.exit(1);
  }

  files.forEach(validateFile);

  console.log(`Audited ${BOLD}${totalFiles}${RESET} prerendered pages.`);
  console.log(`Audited ${BOLD}${seenTitles.size}${RESET} unique page titles.`);
  console.log(`Audited ${BOLD}${seenDescriptions.size}${RESET} unique meta descriptions.\n`);

  if (warnings.length > 0) {
    console.log(`${BOLD}${YELLOW}⚠️  SEO WARNINGS (${warnings.length}):${RESET}`);
    warnings.forEach(w => {
      console.log(`  ${YELLOW}[WARN]${RESET} ${CYAN}${w.file}${RESET}: ${w.message}`);
    });
    console.log('');
  }

  if (errors.length > 0) {
    console.log(`${BOLD}${RED}❌  SEO METADATA FAILED (${errors.length} fatal errors):${RESET}`);
    errors.forEach(e => {
      console.log(`  ${RED}[FAIL]${RESET} ${CYAN}${e.file}${RESET}: ${e.message}`);
    });
    console.log(`\n${RED}Build failed due to SEO title/description/canonical errors.${RESET}`);
    process.exit(1);
  }

  console.log(`${BOLD}${GREEN}✅ All SEO metadata (titles, descriptions, canonicals, H1s) validated 100% clean!${RESET}\n`);
  process.exit(0);
}

run();
