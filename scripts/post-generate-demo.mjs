import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const demosRoot = resolve(process.cwd(), 'demos');
const recencyWindowMs = 5 * 60 * 1000;

function findMostRecentDemo() {
  if (!existsSync(demosRoot)) return null;

  const now = Date.now();
  const folders = readdirSync(demosRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  let picked = null;

  folders.forEach((folderName) => {
    const folderPath = join(demosRoot, folderName);
    const indexPath = join(folderPath, 'index.html');
    const metaPath = join(folderPath, 'meta.json');
    if (!existsSync(indexPath) || !existsSync(metaPath)) return;

    const latestMtime = Math.max(statSync(indexPath).mtimeMs, statSync(metaPath).mtimeMs);
    if (now - latestMtime > recencyWindowMs) return;

    if (!picked || latestMtime > picked.latestMtime) {
      picked = { folderName, latestMtime };
    }
  });

  return picked?.folderName ?? null;
}

function hasPlaywrightInstalled() {
  try {
    const resolved = resolve(process.cwd(), 'node_modules', 'playwright');
    return existsSync(resolved);
  } catch {
    return false;
  }
}

function main() {
  const targetDemo = findMostRecentDemo();
  if (!targetDemo) {
    console.log('post-generate-demo: no recent demo detected, skipping preview generation.');
    return;
  }

  const lintResult = spawnSync(
    process.execPath,
    [resolve(process.cwd(), 'scripts', 'lint-demo-ux.mjs'), `--demo=${targetDemo}`],
    { stdio: 'inherit' },
  );
  if (lintResult.status !== 0) {
    console.log(`post-generate-demo: UX lint failed for "${targetDemo}".`);
    process.exit(lintResult.status ?? 1);
  }

  if (!hasPlaywrightInstalled()) {
    console.log(
      `post-generate-demo: playwright not installed, skipping preview for "${targetDemo}". Run "npm i -D playwright && npx playwright install chromium".`,
    );
  } else {
    const result = spawnSync(
      process.execPath,
      [resolve(process.cwd(), 'scripts', 'generate-demo-previews.mjs'), `--demo=${targetDemo}`],
      { stdio: 'inherit' },
    );

    if (result.status !== 0) {
      console.log(`post-generate-demo: preview generation failed for "${targetDemo}".`);
      process.exit(result.status ?? 1);
    }

    console.log(`post-generate-demo: preview generated for "${targetDemo}".`);
  }

  const validateResult = spawnSync(process.execPath, [resolve(process.cwd(), 'scripts', 'validate-demos.mjs')], {
    stdio: 'inherit',
  });
  if (validateResult.status !== 0) {
    console.log(`post-generate-demo: validate:demos failed after generating "${targetDemo}".`);
    process.exit(validateResult.status ?? 1);
  }

  const manifestResult = spawnSync(
    process.execPath,
    [resolve(process.cwd(), 'scripts', 'generate-demos-manifest.mjs')],
    { stdio: 'inherit' },
  );
  if (manifestResult.status !== 0) {
    console.log(`post-generate-demo: generate:demos failed after generating "${targetDemo}".`);
    process.exit(manifestResult.status ?? 1);
  }

  console.log(
    `post-generate-demo: workflow completed for "${targetDemo}" (lint:ux -> preview -> validate:demos -> generate:demos).`,
  );
}

main();
