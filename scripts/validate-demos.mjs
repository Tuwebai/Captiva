import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const demosRoot = resolve(process.cwd(), 'demos');
const errors = [];
const warnings = [];
const industries = new Map();

function addError(message) {
  errors.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isKebabCase(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function validateMetaShape(folderName, meta) {
  const requiredFields = ['title', 'description', 'category', 'industry', 'slug'];

  requiredFields.forEach((field) => {
    if (!isNonEmptyString(meta[field])) {
      addError(`demos/${folderName}/meta.json missing required field "${field}"`);
    }
  });

  if (isNonEmptyString(meta.industry) && !isKebabCase(meta.industry)) {
    addError(`demos/${folderName}/meta.json has invalid "industry" slug "${meta.industry}"`);
  }

  if (isNonEmptyString(meta.category) && !isKebabCase(meta.category)) {
    addError(`demos/${folderName}/meta.json has invalid "category" slug "${meta.category}"`);
  }

  if (isNonEmptyString(meta.slug) && !isKebabCase(meta.slug)) {
    addError(`demos/${folderName}/meta.json has invalid "slug" "${meta.slug}"`);
  }

  if (meta.preview !== undefined && !isNonEmptyString(meta.preview)) {
    addError(`demos/${folderName}/meta.json has invalid optional field "preview"`);
  }
}

function validateDemoDirectory(folderName) {
  const folderPath = join(demosRoot, folderName);
  const indexPath = join(folderPath, 'index.html');
  const metaPath = join(folderPath, 'meta.json');

  if (!existsSync(indexPath)) {
    addError(`demos/${folderName} missing index.html`);
  }

  if (!existsSync(metaPath)) {
    addError(`demos/${folderName} missing meta.json`);
    return;
  }

  let meta = null;
  try {
    meta = JSON.parse(readFileSync(metaPath, 'utf8'));
  } catch (error) {
    addError(`demos/${folderName}/meta.json is not valid JSON: ${error.message}`);
    return;
  }

  validateMetaShape(folderName, meta);

  if (isNonEmptyString(meta.industry)) {
    const industryKey = meta.industry.trim().toLowerCase();
    if (industries.has(industryKey) && industries.get(industryKey) !== folderName) {
      addWarning(
        `duplicate industry "${meta.industry}" in demos/${folderName} and demos/${industries.get(industryKey)}`,
      );
    } else {
      industries.set(industryKey, folderName);
    }
  }

  if (isNonEmptyString(meta.preview) && !meta.preview.startsWith('/')) {
    const previewPath = join(folderPath, meta.preview);
    if (!existsSync(previewPath)) {
      addError(`demos/${folderName}/meta.json preview file not found: ${meta.preview}`);
    }
  }

  const normalizedFolderSlug = folderName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  if (isNonEmptyString(meta.slug) && meta.slug !== normalizedFolderSlug) {
    addError(
      `demos/${folderName}/meta.json slug mismatch. expected "${normalizedFolderSlug}" from folder, got "${meta.slug}"`,
    );
  }

  if (!isKebabCase(folderName)) {
    addWarning(
      `demos/${folderName} is not kebab-case. Convention target is demos/<slug>/ (legacy folders still supported).`,
    );
  }

  console.log(`✓ demos/${folderName} valid`);
}

if (!existsSync(demosRoot) || !statSync(demosRoot).isDirectory()) {
  addError('demos/ directory not found');
} else {
  const demoDirs = readdirSync(demosRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory());

  if (demoDirs.length === 0) {
    addError('demos/ contains no demo directories');
  } else {
    demoDirs.forEach((entry) => validateDemoDirectory(entry.name));
  }
}

warnings.forEach((message) => {
  console.warn(`! warning: ${message}`);
});

if (errors.length > 0) {
  errors.forEach((message) => {
    console.error(`✗ ${message}`);
  });
  process.exit(1);
}

console.log(`Validation completed: ${warnings.length} warning(s), 0 error(s).`);
