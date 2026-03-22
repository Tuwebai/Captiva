import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadManualDemosManifest } from '../lib/demos/manual-manifest.mjs';

const repoRoot = process.cwd();
const demosSourceDir = resolve(repoRoot, 'demos');
const demosPublicDir = resolve(repoRoot, 'public', 'demos');

function main() {
  const manifest = loadManualDemosManifest();
  const demos = manifest.demos ?? [];

  rmSync(demosPublicDir, { recursive: true, force: true });
  mkdirSync(demosPublicDir, { recursive: true });

  demos.forEach((entry) => {
    const sourceDir = resolve(demosSourceDir, entry.folderName);
    const targetDir = resolve(demosPublicDir, entry.publicSlug);
    cpSync(sourceDir, targetDir, { recursive: true });
  });

  console.log(`Synced ${demos.length} demos into public/demos.`);
}

main();
