import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const repoRoot = process.cwd();
const demosManifestPath = resolve(repoRoot, 'demos/manifest.json');
const demosSourceDir = resolve(repoRoot, 'demos');
const demosPublicDir = resolve(repoRoot, 'public/demos');

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function ensureUnique(entries, key) {
  const seen = new Set();

  entries.forEach((entry, index) => {
    const value = String(entry[key] ?? '').trim();
    assert(value, `Demo manifest entry ${index + 1} is missing "${key}".`);
    assert(!seen.has(value), `Demo manifest contains duplicate "${key}": ${value}`);
    seen.add(value);
  });
}

function validateDemoEntry(entry, index) {
  const slug = String(entry.slug ?? '').trim();
  const folderName = String(entry.folderName ?? '').trim();
  const publicSlug = String(entry.publicSlug ?? '').trim();
  const href = String(entry.href ?? '').trim();
  const sourceDemoDir = resolve(demosSourceDir, folderName);
  const publicDemoDir = resolve(demosPublicDir, publicSlug);
  const sourceMetaPath = resolve(sourceDemoDir, 'meta.json');
  const sourceIndexPath = resolve(sourceDemoDir, 'index.html');
  const publicMetaPath = resolve(publicDemoDir, 'meta.json');
  const publicIndexPath = resolve(publicDemoDir, 'index.html');

  assert(slug, `Demo manifest entry ${index + 1} is missing "slug".`);
  assert(folderName, `Demo "${slug}" is missing "folderName".`);
  assert(publicSlug, `Demo "${slug}" is missing "publicSlug".`);
  assert(href === `/demo/${slug}`, `Demo "${slug}" has invalid "href": ${href}`);

  assert(existsSync(sourceDemoDir), `Demo "${slug}" points to missing source folder: demos/${folderName}`);
  assert(existsSync(publicDemoDir), `Demo "${slug}" points to missing public folder: public/demos/${publicSlug}`);
  assert(existsSync(sourceIndexPath), `Demo "${slug}" is missing source index: demos/${folderName}/index.html`);
  assert(existsSync(sourceMetaPath), `Demo "${slug}" is missing source meta: demos/${folderName}/meta.json`);
  assert(existsSync(publicIndexPath), `Demo "${slug}" is missing public index: public/demos/${publicSlug}/index.html`);
  assert(existsSync(publicMetaPath), `Demo "${slug}" is missing public meta: public/demos/${publicSlug}/meta.json`);
}

export function loadManualDemosManifest() {
  const manifest = readJson(demosManifestPath);
  const demos = Array.isArray(manifest.demos) ? manifest.demos : [];

  assert(demos.length > 0, 'Demo manifest is empty or missing the "demos" array.');

  ensureUnique(demos, 'slug');
  ensureUnique(demos, 'folderName');
  ensureUnique(demos, 'publicSlug');
  demos.forEach(validateDemoEntry);

  return manifest;
}
