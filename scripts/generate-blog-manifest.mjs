import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { loadBlogEntries } from './lib/blog-content.mjs';

const blogContentDir = resolve(process.cwd(), 'src/content/blog');
const indexOutputPath = resolve(process.cwd(), 'src/config/blog.index.generated.json');
const contentOutputDir = resolve(process.cwd(), 'src/content/blog-content');
const ogOutputDir = resolve(process.cwd(), 'public/blog-og');

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function wrapTitle(title, maxLineLength = 34) {
  const words = title.split(' ');
  const lines = [];
  let current = '';

  words.forEach((word) => {
    if (`${current} ${word}`.trim().length <= maxLineLength) {
      current = `${current} ${word}`.trim();
      return;
    }
    if (current) lines.push(current);
    current = word;
  });

  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function buildOgSvg(entry) {
  const lines = wrapTitle(entry.title).map(escapeXml);
  const lineMarkup = lines
    .map((line, index) => `<text x="78" y="${220 + index * 72}" fill="#f4f7ff" font-size="58" font-weight="700" font-family="Inter, Segoe UI, Arial">${line}</text>`)
    .join('');
  const tagMarkup = entry.tags
    .slice(0, 3)
    .map(
      (tag, index) =>
        `<text x="${78 + index * 230}" y="540" fill="#93a4d8" font-size="24" font-weight="600" font-family="Inter, Segoe UI, Arial">${escapeXml(tag)}</text>`,
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g1" cx="22%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#2f73ff" stop-opacity=".45" />
      <stop offset="100%" stop-color="#2f73ff" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="g2" cx="88%" cy="74%" r="58%">
      <stop offset="0%" stop-color="#e58d58" stop-opacity=".42" />
      <stop offset="100%" stop-color="#e58d58" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="g3" cx="75%" cy="10%" r="45%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity=".28" />
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#05070f" />
  <rect width="1200" height="630" fill="url(#g1)" />
  <rect width="1200" height="630" fill="url(#g2)" />
  <rect width="1200" height="630" fill="url(#g3)" />
  <rect x="56" y="54" width="1088" height="522" rx="28" fill="rgba(15,23,48,.62)" stroke="rgba(121,145,213,.28)" />
  <text x="78" y="130" fill="#8fa7ff" font-size="24" letter-spacing="4" font-weight="700" font-family="Inter, Segoe UI, Arial">BLOG CAPTIVA</text>
  ${lineMarkup}
  ${tagMarkup}
  <text x="78" y="588" fill="#f4f7ff" font-size="30" font-weight="700" font-family="Inter, Segoe UI, Arial">captiva.tuweb-ai.com</text>
</svg>
`;
}

async function main() {
  const entries = await loadBlogEntries(blogContentDir);
  const orderedEntries = [...entries].sort((left, right) => right.date.localeCompare(left.date));

  const indexEntries = orderedEntries.map((entry) => ({
    title: entry.title,
    description: entry.description,
    slug: entry.slug,
    date: entry.date,
    readingTime: entry.readingTime,
    tags: entry.tags,
    excerpt: entry.excerpt,
    ogImage: `/blog-og/${entry.slug}.svg`,
  }));

  mkdirSync(resolve(indexOutputPath, '..'), { recursive: true });
  writeFileSync(indexOutputPath, `${JSON.stringify(indexEntries, null, 2)}\n`.normalize('NFC'), 'utf8');

  rmSync(contentOutputDir, { recursive: true, force: true });
  mkdirSync(contentOutputDir, { recursive: true });
  rmSync(ogOutputDir, { recursive: true, force: true });
  mkdirSync(ogOutputDir, { recursive: true });

  orderedEntries.forEach((entry) => {
    const contentOutputPath = resolve(contentOutputDir, `${entry.slug}.json`);
    const payload = {
      slug: entry.slug,
      title: entry.title,
      contentHtml: entry.contentHtml,
      wordCount: entry.wordCount,
    };
    writeFileSync(contentOutputPath, `${JSON.stringify(payload, null, 2)}\n`.normalize('NFC'), 'utf8');

    const svgOutputPath = resolve(ogOutputDir, `${entry.slug}.svg`);
    writeFileSync(svgOutputPath, buildOgSvg(entry).normalize('NFC'), 'utf8');
  });

  const generatedContents = readdirSync(contentOutputDir).length;
  console.log(`Generated blog index with ${indexEntries.length} entries and ${generatedContents} content files.`);
}

try {
  await main();
} catch (error) {
  console.error(error);
  process.exit(1);
}
