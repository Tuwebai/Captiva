import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const demosRoot = resolve(process.cwd(), 'demos');
const errors = [];

function addError(message) {
  errors.push(message);
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

function normalizeFolderSlug(folderName) {
  return folderName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
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

  if (isNonEmptyString(meta.preview) && !meta.preview.startsWith('/')) {
    const previewPath = join(folderPath, meta.preview);
    if (!existsSync(previewPath)) {
      addError(`demos/${folderName}/meta.json preview file not found: ${meta.preview}`);
    }
  }

  const expectedSlug = normalizeFolderSlug(folderName);
  if (isNonEmptyString(meta.slug) && meta.slug !== expectedSlug) {
    addError(
      `demos/${folderName}/meta.json slug mismatch. expected "${expectedSlug}" from folder, got "${meta.slug}"`,
    );
  }

  console.log(`OK demos/${folderName} valid`);
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

if (errors.length > 0) {
  errors.forEach((message) => {
    console.error(`ERROR ${message}`);
  });
  process.exit(1);
}

console.log('Validation completed: 0 warning(s), 0 error(s).');
