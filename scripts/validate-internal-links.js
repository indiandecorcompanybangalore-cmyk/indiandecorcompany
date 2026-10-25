import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist');

// CLI formatting colors
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const GRAY = '\x1b[90m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

let totalPagesScanned = 0;
let totalLinksChecked = 0;
const errors = [];
const warnings = [];

// Cache of read file contents to avoid repeatedly reading HTML for anchor checks
const fileContentCache = new Map();

function findHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (item === 'index.html' || item.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

function resolveDestinationFile(targetPath) {
  let clean = targetPath.replace(/^\//, '');
  
  if (!clean) {
    const rootIndex = path.join(DIST_DIR, 'index.html');
    return fs.existsSync(rootIndex) ? rootIndex : null;
  }

  // 1. Check directory index: dist/[clean]/index.html
  const dirIndex = path.join(DIST_DIR, clean, 'index.html');
  if (fs.existsSync(dirIndex)) return dirIndex;

  // 2. Check direct html file: dist/[clean].html
  const directHtml = path.join(DIST_DIR, `${clean}.html`);
  if (fs.existsSync(directHtml)) return directHtml;

  // 3. Check exact static file: dist/[clean] (e.g., /favicon.svg, /sitemap.xml)
  const exactFile = path.join(DIST_DIR, clean);
  if (fs.existsSync(exactFile) && fs.statSync(exactFile).isFile()) return exactFile;

  return null;
}

function checkAnchorExists(targetFile, hash) {
  if (!fileContentCache.has(targetFile)) {
    fileContentCache.set(targetFile, fs.readFileSync(targetFile, 'utf8'));
  }
  const content = fileContentCache.get(targetFile);
  const idRegex = new RegExp(`\\b(id|name)=["']${hash}["']`, 'i');
  return idRegex.test(content);
}

function normalizeLink(href, currentRoute) {
  if (!href || typeof href !== 'string') return null;

  // Filter out external protocols, mailto, tel, javascript
  if (/^(mailto:|tel:|sms:|whatsapp:|javascript:|data:)/i.test(href)) return null;

  // Normalize absolute domain URLs if they point to the local domain
  let cleanHref = href.replace(/^https?:\/\/(www\.)?indiandecorcompany\.in/i, '');
  if (cleanHref.startsWith('http://') || cleanHref.startsWith('https://') || cleanHref.startsWith('//')) {
    return null; // External URL
  }

  const [urlWithoutHash, hash] = cleanHref.split('#');
  const [pathname] = urlWithoutHash.split('?');

  if (!pathname && hash) {
    return { targetPath: currentRoute, hash, isAnchorOnly: true, original: href };
  }

  if (!pathname) return null;

  let resolvedPath;
  if (pathname.startsWith('/')) {
    resolvedPath = path.posix.normalize(pathname);
  } else {
    resolvedPath = path.posix.normalize(path.posix.join(currentRoute, pathname));
  }

  return { targetPath: resolvedPath, hash, original: href, isAnchorOnly: false };
}

function validateLinksInFile(filePath) {
  totalPagesScanned++;
  const relPath = path.relative(DIST_DIR, filePath);
  const currentRoute = '/' + relPath.replace(/\/index\.html$/, '').replace(/^index\.html$/, '');
  const html = fs.readFileSync(filePath, 'utf8');

  // Extract all <a ... href="..." ...> tags with anchor text
  const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const matches = [...html.matchAll(linkRegex)];

  for (const match of matches) {
    const rawHref = match[1].trim();
    const rawText = match[2].replace(/<[^>]+>/g, '').trim().slice(0, 40) || '[No text / Image]';

    const normalized = normalizeLink(rawHref, currentRoute);
    if (!normalized) continue;

    totalLinksChecked++;
    const { targetPath, hash, original, isAnchorOnly } = normalized;

    const destFile = resolveDestinationFile(targetPath);

    if (!destFile) {
      errors.push({
        source: currentRoute,
        href: original,
        text: rawText,
        message: `Destination file not found in dist/ for "${targetPath}"`
      });
      continue;
    }

    // Trailing slash hygiene check on directory routes
    if (
      !isAnchorOnly &&
      !path.extname(targetPath) &&
      targetPath !== '/' &&
      !original.split('?')[0].split('#')[0].endsWith('/')
    ) {
      warnings.push({
        source: currentRoute,
        href: original,
        message: `Missing trailing slash (triggers 301 redirect hop on Cloudflare). Recommended: "${targetPath}/"`
      });
    }

    // Anchor hash verification
    if (hash && (destFile.endsWith('.html') || destFile.endsWith('.htm'))) {
      const anchorExists = checkAnchorExists(destFile, hash);
      if (!anchorExists) {
        warnings.push({
          source: currentRoute,
          href: original,
          message: `Anchor #${hash} not found in destination page`
        });
      }
    }
  }
}

function run() {
  console.log(`${BOLD}${CYAN}🔗 Crawling Prerendered Pages for Broken Internal Links...${RESET}\n`);

  if (!fs.existsSync(DIST_DIR)) {
    console.error(`${RED}❌ Error: dist/ directory not found. Run your build/prerender first.${RESET}`);
    process.exit(1);
  }

  const files = findHtmlFiles(DIST_DIR);
  if (files.length === 0) {
    console.error(`${RED}❌ Error: No HTML files found in dist/.${RESET}`);
    process.exit(1);
  }

  files.forEach(validateLinksInFile);

  console.log(`Scanned ${BOLD}${totalPagesScanned}${RESET} HTML files.`);
  console.log(`Verified ${BOLD}${totalLinksChecked}${RESET} internal link instances.\n`);

  if (warnings.length > 0) {
    console.log(`${BOLD}${YELLOW}⚠️  WARNINGS (${warnings.length}):${RESET}`);
    warnings.slice(0, 30).forEach(w => {
      console.log(`  ${YELLOW}[WARN]${RESET} ${CYAN}${w.source}${RESET} → ${GRAY}${w.href}${RESET}: ${w.message}`);
    });
    if (warnings.length > 30) {
      console.log(`  ${GRAY}...and ${warnings.length - 30} more trailing-slash/anchor warnings.${RESET}`);
    }
    console.log('');
  }

  if (errors.length > 0) {
    console.log(`${BOLD}${RED}❌  BROKEN INTERNAL LINKS DETECTED (${errors.length} fatal errors):${RESET}`);
    errors.forEach(e => {
      console.log(`  ${RED}[404]${RESET} ${CYAN}${e.source}${RESET} contains broken link: ${BOLD}${e.href}${RESET} (anchor text: "${e.text}")`);
      console.log(`        ${GRAY}Reason: ${e.message}${RESET}`);
    });
    console.log(`\n${RED}Deployment aborted to prevent publishing 404 links.${RESET}`);
    process.exit(1);
  }

  console.log(`${BOLD}${GREEN}✅ Zero broken internal links found! All destination routes exist.${RESET}\n`);
  process.exit(0);
}

run();
