import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const requiredFiles = [
  'dist/index.html',
  'src/generated/blog-index.json',
  'src/generated/city-landings.generated.json',
  'src/generated/landing-examples.generated.json',
  'src/generated/seo-manifest.json',
  'public/sitemaps/sitemap-index.xml',
  'public/sitemaps/sitemap-pages.xml',
  'public/sitemaps/sitemap-blog.xml',
  'public/sitemaps/sitemap-demos.xml',
  'public/sitemaps/sitemap-industries.xml',
  'public/sitemaps/sitemap-comparatives.xml',
];

const missing = requiredFiles.filter((filePath) => !existsSync(resolve(process.cwd(), filePath)));

if (missing.length > 0) {
  console.error('Smoke check failed. Missing expected build artifacts:');
  missing.forEach((filePath) => console.error(`- ${filePath}`));
  process.exit(1);
}

console.log('Smoke check passed.');
