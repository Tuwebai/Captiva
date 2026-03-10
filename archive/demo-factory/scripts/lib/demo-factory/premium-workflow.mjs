import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { runPipeline } from '../../generate-demo.mjs';

const projectRoot = process.cwd();

export function fail(message) {
  console.error(`x ${message}`);
  process.exit(1);
}

export function parsePackCommandArgs(argv) {
  const keys = argv.filter((token) => !token.startsWith('--')).map((token) => token.trim()).filter(Boolean);
  const force = argv.includes('--force');
  const list = argv.includes('--list');

  return {
    key: keys[0] ?? '',
    force,
    list,
  };
}

export function loadStructuredPack(packRelativePath, collectionKey) {
  const packPath = resolve(projectRoot, packRelativePath);
  if (!existsSync(packPath)) {
    fail(`Pack not found: ${packPath}`);
  }

  const pack = JSON.parse(readFileSync(packPath, 'utf8'));
  if (!Array.isArray(pack?.[collectionKey]) || pack[collectionKey].length === 0) {
    fail(`Pack "${packRelativePath}" must contain a non-empty "${collectionKey}" array.`);
  }

  return pack;
}

export function buildPipelineArgs(entry, force) {
  return {
    category: entry.category,
    industry: entry.industry,
    name: entry.name,
    title: entry.title,
    description: entry.description,
    template: entry.template,
    goal: entry.goal,
    style: entry.style,
    status: entry.status ?? 'active',
    tier: entry.tier ?? '',
    variant: entry.variant ?? '',
    force: force ? 'true' : 'false',
    tags: Array.isArray(entry.tags) ? entry.tags.join(',') : '',
    'business-name': entry.businessName,
    'cta-text': entry.ctaText,
    'cta-secondary': entry.ctaSecondary,
  };
}

export function runNodeScript(scriptRelativePath, args = []) {
  const result = spawnSync(process.execPath, [resolve(projectRoot, scriptRelativePath), ...args], {
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

export function runPremiumWorkflow(entry, { force }) {
  const pipelineArgs = buildPipelineArgs(entry, force);
  const result = runPipeline(pipelineArgs);

  console.log(`ok Premium demo created at demos/${result.args.name}`);
  console.log(`  - key: ${entry.key}`);
  console.log(`  - template: ${result.selectedTemplate.id}`);
  console.log(`  - goal: ${result.goal}`);
  if (entry.tier) console.log(`  - tier: ${entry.tier}`);
  if (entry.variant) console.log(`  - variant: ${entry.variant}`);
  console.log('  - next: lint + preview + validate + manifest');

  runNodeScript('scripts/lint-demo-ux.mjs', [`--demo=${entry.name}`]);
  runNodeScript('scripts/generate-demo-previews.mjs', [`--demo=${entry.name}`]);
  runNodeScript('scripts/validate-demos.mjs');
  runNodeScript('scripts/generate-demos-manifest.mjs');

  console.log(`ok Premium workflow completed for "${entry.key}"`);
}
