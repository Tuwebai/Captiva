import { readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const roots = ['src', 'public', 'demos'];
const extensions = new Set(['.ts', '.tsx', '.json', '.md', '.html', '.xml', '.svg']);
const standaloneFiles = ['index.html', 'demos/manifest.json'];
const suspiciousFragments = ['Ã', 'Â', 'â€¦', 'â€™', 'â€œ', 'â€', 'â€“', 'â€”', 'â†', '�'];
const ignoredPathFragments = ['__pycache__', '.bak', 'public/demos'];

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

function shouldIgnore(filePath) {
  const normalizedPath = normalize(filePath).replaceAll('\\', '/');
  return ignoredPathFragments.some((fragment) => normalizedPath.includes(fragment));
}

function hasTrackedExtension(filePath) {
  return extensions.has(extname(filePath).toLowerCase());
}

function firstIssue(content) {
  const lines = content.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const match = suspiciousFragments.find((fragment) => line.includes(fragment));
    if (match) {
      return { line: index + 1, fragment: match };
    }
  }
  return null;
}

const candidates = [
  ...roots.flatMap((root) => walk(root).filter(hasTrackedExtension)),
  ...standaloneFiles,
].filter((filePath, index, all) => all.indexOf(filePath) === index && !shouldIgnore(filePath));

const issues = [];

for (const filePath of candidates) {
  const content = readFileSync(filePath, 'utf8');
  const issue = firstIssue(content);
  if (issue) {
    issues.push(`${filePath}:${issue.line} contains suspicious mojibake fragment "${issue.fragment}"`);
  }
}

if (issues.length > 0) {
  console.error('Text encoding check failed:');
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log('Text encoding check passed.');
