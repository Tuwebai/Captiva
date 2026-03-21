import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const roots = ['src', 'netlify'];
const extensions = new Set(['.js', '.jsx', '.ts', '.tsx']);
const disallowedPatterns = [
  { label: 'console.log', pattern: /\bconsole\.log\s*\(/ },
  { label: 'debugger', pattern: /\bdebugger\b/ },
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, out);
      continue;
    }
    out.push(full);
  }
  return out;
}

function hasTrackedExtension(filePath) {
  return [...extensions].some((extension) => filePath.endsWith(extension));
}

const issues = [];

roots
  .flatMap((root) => walk(root))
  .filter(hasTrackedExtension)
  .forEach((filePath) => {
    const content = readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      disallowedPatterns.forEach(({ label, pattern }) => {
        if (pattern.test(line)) {
          issues.push(`${filePath}:${index + 1} contains ${label}`);
        }
      });
    });
  });

if (issues.length > 0) {
  console.error('Project lint failed:');
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log('Project lint passed.');
