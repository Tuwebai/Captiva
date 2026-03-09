import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';

const projectRoot = process.cwd();
const demosRoot = resolve(projectRoot, 'demos');
const publicRoot = resolve(projectRoot, 'public');
const demosManifestPath = resolve(projectRoot, 'demos/manifest.json');
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

  if (meta.template !== undefined && !isNonEmptyString(meta.template)) {
    addError(`demos/${folderName}/meta.json has invalid optional field "template"`);
  }

  if (meta.variant !== undefined && !isNonEmptyString(meta.variant)) {
    addError(`demos/${folderName}/meta.json has invalid optional field "variant"`);
  }

  if (meta.tier !== undefined && !isNonEmptyString(meta.tier)) {
    addError(`demos/${folderName}/meta.json has invalid optional field "tier"`);
  }

  if (meta.goal !== undefined && !isNonEmptyString(meta.goal)) {
    addError(`demos/${folderName}/meta.json has invalid optional field "goal"`);
  }

  if (meta.style !== undefined && !isNonEmptyString(meta.style)) {
    addError(`demos/${folderName}/meta.json has invalid optional field "style"`);
  }

  if (meta.status !== undefined && !isNonEmptyString(meta.status)) {
    addError(`demos/${folderName}/meta.json has invalid optional field "status"`);
  }

  if (meta.tags !== undefined && (!Array.isArray(meta.tags) || meta.tags.some((tag) => !isNonEmptyString(tag)))) {
    addError(`demos/${folderName}/meta.json has invalid optional field "tags"`);
  }

  if (
    meta.sections !== undefined &&
    (!Array.isArray(meta.sections) || meta.sections.some((section) => !isNonEmptyString(section)))
  ) {
    addError(`demos/${folderName}/meta.json has invalid optional field "sections"`);
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

function resolvePreviewPath(preview, folderPath, folderName) {
  if (!isNonEmptyString(preview)) return null;
  if (preview.startsWith('/demos/')) {
    const localPreview = folderName ? join(demosRoot, folderName, basename(preview)) : join(folderPath, basename(preview));
    if (existsSync(localPreview)) {
      return localPreview;
    }
    const relativePreview = preview.replace(/^\/demos\//, '').split('/').join('\\');
    return resolve(publicRoot, 'demos', relativePreview);
  }
  return join(folderPath, preview);
}

function validateCentralManifest() {
  if (!existsSync(demosManifestPath)) {
    return;
  }

  let manifest = null;
  try {
    manifest = JSON.parse(readFileSync(demosManifestPath, 'utf8'));
  } catch (error) {
    addError(`demos/manifest.json is not valid JSON: ${error.message}`);
    return;
  }

  if (!Array.isArray(manifest?.demos)) {
    addError('demos/manifest.json must contain a "demos" array');
    return;
  }

  manifest.demos.forEach((item, index) => {
    const prefix = `demos/manifest.json demos[${index}]`;

    ['slug', 'folderName', 'publicSlug', 'title', 'description', 'category', 'industry', 'href'].forEach((field) => {
      if (!isNonEmptyString(item?.[field])) {
        addError(`${prefix} missing required field "${field}"`);
      }
    });

    if (isNonEmptyString(item?.slug) && !isKebabCase(item.slug)) {
      addError(`${prefix} has invalid "slug" "${item.slug}"`);
    }

    if (isNonEmptyString(item?.industry) && !isKebabCase(item.industry)) {
      addError(`${prefix} has invalid "industry" "${item.industry}"`);
    }

    if (isNonEmptyString(item?.category) && !isKebabCase(item.category)) {
      addError(`${prefix} has invalid "category" "${item.category}"`);
    }

    if (isNonEmptyString(item?.href) && !item.href.startsWith('/demo/')) {
      addError(`${prefix} has invalid "href" "${item.href}"`);
    }

    if (isNonEmptyString(item?.preview)) {
      const previewPath = resolvePreviewPath(item.preview, demosRoot, item.folderName);
      if (!previewPath || !existsSync(previewPath)) {
        addError(`${prefix} preview file not found: "${item.preview}"`);
      }
    }
  });
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

  if (isNonEmptyString(meta.preview)) {
    const previewPath = resolvePreviewPath(meta.preview, folderPath, folderName);
    if (!previewPath || !existsSync(previewPath)) {
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

validateCentralManifest();

if (errors.length > 0) {
  errors.forEach((message) => {
    console.error(`ERROR ${message}`);
  });
  process.exit(1);
}

console.log('Validation completed: 0 warning(s), 0 error(s).');
