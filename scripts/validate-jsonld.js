import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist');
const SITEMAP_PATH = path.resolve('public/sitemap.xml');

// ANSI colors for clean CLI reporting
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

let totalFiles = 0;
let totalSchemas = 0;
const errors = [];
const warnings = [];

// Helper: Find all prerendered index.html files
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

// Helper: Check for placeholder tokens
function containsBadTokens(value) {
  if (typeof value !== 'string') return false;
  const bad = ['undefined', 'null', '[object Object]', 'NaN', 'TODO', 'DUMMY'];
  return bad.some(token => value.trim() === token || value.includes('[object Object]'));
}

function validateSchemaObject(schema, filePath, routePath) {
  // 1. Context validation
  if (!schema['@context'] || !schema['@context'].includes('schema.org')) {
    errors.push({
      file: routePath,
      message: `Invalid or missing @context: expected "https://schema.org", received "${schema['@context']}"`
    });
  }

  // 2. Type validation
  const type = schema['@type'];
  if (!type) {
    errors.push({ file: routePath, message: 'Missing @type property on schema object' });
    return;
  }

  // 3. Recursive inspection for placeholders
  function inspectValues(obj, parentKey = '') {
    for (const [key, val] of Object.entries(obj)) {
      if (typeof val === 'string') {
        if (containsBadTokens(val)) {
          errors.push({
            file: routePath,
            message: `Placeholder or corrupt token found in "${parentKey}${key}": "${val}"`
          });
        }
      } else if (typeof val === 'object' && val !== null) {
        inspectValues(val, `${parentKey}${key}.`);
      }
    }
  }
  inspectValues(schema);

  // 4. Type-specific Google Rich Result checks
  if (type === 'BreadcrumbList') {
    const items = schema.itemListElement;
    if (!Array.isArray(items) || items.length === 0) {
      errors.push({ file: routePath, message: 'BreadcrumbList has no itemListElement array' });
    } else {
      items.forEach((item, idx) => {
        const expectedPos = idx + 1;
        if (item.position !== expectedPos) {
          warnings.push({
            file: routePath,
            message: `Breadcrumb position out of sequence: item "${item.name}" has position ${item.position}, expected ${expectedPos}`
          });
        }
        if (!item.name || typeof item.name !== 'string' || !item.name.trim()) {
          errors.push({ file: routePath, message: `Breadcrumb item #${expectedPos} is missing a valid name` });
        }
        if (!item.item || typeof item.item !== 'string' || !item.item.startsWith('http')) {
          warnings.push({ file: routePath, message: `Breadcrumb item #${expectedPos} has a non-absolute or missing URL: "${item.item}"` });
        }
      });
    }
  }

  if (type === 'Service') {
    if (!schema.name) errors.push({ file: routePath, message: 'Service schema missing "name"' });
    if (!schema.description && !schema.serviceType) {
      warnings.push({ file: routePath, message: 'Service schema missing "description" or "serviceType"' });
    }
    if (!schema.provider && !schema.areaServed) {
      warnings.push({ file: routePath, message: 'Service schema missing "provider" or "areaServed"' });
    }
  }

  if (type === 'HomeAndConstructionBusiness' || type === 'LocalBusiness') {
    if (!schema.name) errors.push({ file: routePath, message: `${type} missing "name"` });
    if (!schema.telephone) warnings.push({ file: routePath, message: `${type} missing "telephone"` });
    if (!schema.address) {
      errors.push({ file: routePath, message: `${type} missing "address"` });
    } else if (typeof schema.address === 'object') {
      if (!schema.address.addressLocality || !schema.address.addressCountry) {
        warnings.push({ file: routePath, message: `${type} address missing "addressLocality" or "addressCountry"` });
      }
    }
  }

  if (type === 'BlogPosting' || type === 'Article') {
    if (!schema.headline) errors.push({ file: routePath, message: `${type} missing "headline"` });
    if (!schema.image) warnings.push({ file: routePath, message: `${type} missing "image"` });
    if (!schema.datePublished) warnings.push({ file: routePath, message: `${type} missing "datePublished"` });
    if (!schema.author) warnings.push({ file: routePath, message: `${type} missing "author"` });
  }

  if (type === 'Product') {
    if (!schema.name) errors.push({ file: routePath, message: 'Product missing "name"' });
    if (!schema.offers) warnings.push({ file: routePath, message: 'Product missing "offers"' });
  }
}

function validateFile(filePath) {
  totalFiles++;
  const relPath = path.relative(DIST_DIR, filePath);
  const routePath = '/' + relPath.replace(/\/index\.html$/, '').replace(/^index\.html$/, '');
  const html = fs.readFileSync(filePath, 'utf8');

  const scriptRegex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const matches = [...html.matchAll(scriptRegex)];

  if (matches.length === 0) {
    errors.push({ file: routePath, message: 'No JSON-LD structured data tag found' });
    return;
  }

  const foundTypes = new Set();

  for (let i = 0; i < matches.length; i++) {
    const rawJson = matches[i][1].trim();
    totalSchemas++;

    let parsed;
    try {
      parsed = JSON.parse(rawJson);
    } catch (err) {
      errors.push({
        file: routePath,
        message: `Malformed JSON in script tag #${i + 1}: ${err.message}`
      });
      continue;
    }

    if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
      for (const item of parsed['@graph']) {
        if (!item['@context']) item['@context'] = parsed['@context'];
        if (item['@type']) foundTypes.add(item['@type']);
        validateSchemaObject(item, filePath, routePath);
      }
    } else {
      if (parsed['@type']) foundTypes.add(parsed['@type']);
      validateSchemaObject(parsed, filePath, routePath);
    }
  }

  // Route-specific missing schema checks
  const isSubPage = routePath !== '/' && routePath.length > 1;

  if (isSubPage && !foundTypes.has('BreadcrumbList')) {
    warnings.push({ file: routePath, message: 'Missing BreadcrumbList schema on sub-page' });
  }

  if (routePath.startsWith('/services/') && routePath !== '/services') {
    if (!foundTypes.has('Service')) {
      errors.push({ file: routePath, message: 'Missing "Service" schema on service detail route' });
    }
  }

  if (routePath.startsWith('/locations/') && routePath !== '/locations') {
    if (!foundTypes.has('HomeAndConstructionBusiness') && !foundTypes.has('LocalBusiness')) {
      errors.push({ file: routePath, message: 'Missing location-specific LocalBusiness schema' });
    }
  }

  if (routePath.startsWith('/blog/') && routePath !== '/blog') {
    if (!foundTypes.has('BlogPosting') && !foundTypes.has('Article')) {
      warnings.push({ file: routePath, message: 'Missing "Article" or "BlogPosting" schema on blog detail route' });
    }
  }
}

function run() {
  console.log(`${BOLD}${CYAN}🔍 Validating Prerendered Structured Data (JSON-LD)...${RESET}\n`);

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

  console.log(`Scanned ${BOLD}${totalFiles}${RESET} prerendered HTML pages.`);
  console.log(`Inspected ${BOLD}${totalSchemas}${RESET} JSON-LD script blocks.\n`);

  if (warnings.length > 0) {
    console.log(`${BOLD}${YELLOW}⚠️  WARNINGS (${warnings.length}):${RESET}`);
    warnings.forEach(w => {
      console.log(`  ${YELLOW}[WARN]${RESET} ${CYAN}${w.file}${RESET}: ${w.message}`);
    });
    console.log('');
  }

  if (errors.length > 0) {
    console.log(`${BOLD}${RED}❌  VALIDATION FAILED (${errors.length} fatal errors):${RESET}`);
    errors.forEach(e => {
      console.log(`  ${RED}[FAIL]${RESET} ${CYAN}${e.file}${RESET}: ${e.message}`);
    });
    console.log(`\n${RED}Deployment aborted due to structured-data errors.${RESET}`);
    process.exit(1);
  }

  console.log(`${BOLD}${GREEN}✅ All structured data validated successfully! Safe to deploy.${RESET}\n`);
  process.exit(0);
}

run();
