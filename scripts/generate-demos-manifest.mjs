import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const demosRoot = resolve(process.cwd(), 'demos');
const outputPath = resolve(process.cwd(), 'src/config/demos.generated.json');
const publicDemosRoot = resolve(process.cwd(), 'public/demos');

const emptyManifest = [];

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function buildPublicSlug(folderName) {
  const raw = folderName.replace(/^demo\s+/i, '');
  const compact = raw.replace(/\s*&\s*/g, '-').replace(/\s+/g, '');
  return `DEMO-${compact.replace(/[^A-Za-z0-9-]/g, '')}`;
}

function buildHref(publicSlug) {
  return `/demos/${publicSlug}/index.html`;
}

function normalizePreview(publicSlug, preview) {
  if (!preview) {
    return null;
  }

  if (preview.startsWith('/')) {
    return preview;
  }

  return `/demos/${publicSlug}/${preview}`;
}

if (!existsSync(demosRoot)) {
  writeFileSync(outputPath, JSON.stringify(emptyManifest, null, 2));
  process.exit(0);
}

rmSync(publicDemosRoot, { recursive: true, force: true });
mkdirSync(publicDemosRoot, { recursive: true });

const manifest = readdirSync(demosRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => {
    const folderName = entry.name;
    const metaPath = join(demosRoot, folderName, 'meta.json');

    if (!existsSync(metaPath)) {
      return null;
    }

    const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
    const publicSlug = buildPublicSlug(folderName);

    cpSync(join(demosRoot, folderName), join(publicDemosRoot, publicSlug), { recursive: true });

    return {
      slug: slugify(folderName),
      folderName,
      publicSlug,
      title: meta.title,
      description: meta.description,
      category: meta.category,
      preview: normalizePreview(publicSlug, meta.preview),
      href: buildHref(publicSlug),
    };
  })
  .filter(Boolean)
  .sort((left, right) => left.title.localeCompare(right.title, 'es'));

writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated demos manifest with ${manifest.length} entries.`);
