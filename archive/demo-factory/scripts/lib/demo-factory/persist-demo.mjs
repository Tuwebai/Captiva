import { copyFileSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fail } from './config.mjs';

export function persistDemo(context) {
  const demoExists = existsSync(context.demoDir);
  if (demoExists && !context.forceOverwrite) fail(`Demo folder already exists: demos/${context.args.name}`);
  if (demoExists && context.forceOverwrite) rmSync(context.demoDir, { recursive: true, force: true });

  mkdirSync(context.demoDir, { recursive: true });
  writeFileSync(join(context.demoDir, 'index.html'), context.html, 'utf8');
  writeFileSync(join(context.demoDir, 'meta.json'), `${JSON.stringify(context.meta, null, 2)}\n`, 'utf8');

  if (!existsSync(context.previewPlaceholderPath)) {
    fail(`Preview placeholder not found: ${context.previewPlaceholderPath}`);
  }

  copyFileSync(context.previewPlaceholderPath, join(context.demoDir, 'preview.png'));
  return context;
}
