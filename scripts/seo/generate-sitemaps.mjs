import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const siteUrl = 'https://captiva.tuweb-ai.com';
const generatedDir = resolve(process.cwd(), 'src/generated');
const publicDir = resolve(process.cwd(), 'public');
const sitemapsDir = resolve(publicDir, 'sitemaps');
const robotsPath = resolve(publicDir, 'robots.txt');
const legacySitemapPath = resolve(publicDir, 'sitemap.xml');

const blogIndexPath = resolve(generatedDir, 'blog-index.json');
const demosManifestPath = resolve(process.cwd(), 'demos/manifest.json');
const industriesIndexPath = resolve(generatedDir, 'industries-index.json');
const comparativesIndexPath = resolve(generatedDir, 'comparatives-index.json');
const seoManifestPath = resolve(generatedDir, 'seo-manifest.json');

const staticRoutes = ['/captiva', '/captiva/demos'];
const blogPostsPerPage = 10;

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function writeText(filePath, content) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, content, 'utf8');
}

function slugify(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function toAbsoluteUrl(pathname) {
  return pathname.startsWith('http') ? pathname : `${siteUrl}${pathname}`;
}

function unique(paths) {
  return [...new Set(paths.filter(Boolean))];
}

function resolvePriority(pathname) {
  if (pathname === '/captiva') return '1.0';
  if (pathname === '/captiva/demos') return '0.9';
  if (pathname === '/blog') return '0.88';
  if (pathname.startsWith('/blog/')) return '0.82';
  if (pathname.startsWith('/landing-page-para-')) return '0.85';
  return '0.8';
}

function buildUrlSet(paths) {
  const lastmod = new Date().toISOString().split('T')[0];
  const entries = unique(paths)
    .map((pathname) =>
      [
        '  <url>',
        `    <loc>${toAbsoluteUrl(pathname)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        '    <changefreq>weekly</changefreq>',
        `    <priority>${resolvePriority(pathname)}</priority>`,
        '  </url>',
      ].join('\n'),
    )
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    '</urlset>',
    '',
  ].join('\n');
}

function buildSitemapIndex(files) {
  const entries = files
    .map((fileName) =>
      ['  <sitemap>', `    <loc>${toAbsoluteUrl(`/sitemaps/${fileName}`)}</loc>`, '  </sitemap>'].join('\n'),
    )
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    '</sitemapindex>',
    '',
  ].join('\n');
}

function buildBlogRoutes(blogEntries) {
  const totalBlogPages = Math.ceil(blogEntries.length / blogPostsPerPage);
  const pageRoutes =
    totalBlogPages > 1 ? Array.from({ length: totalBlogPages - 1 }, (_entry, index) => `/blog/page/${index + 2}`) : [];

  const tagMap = new Map();
  blogEntries.forEach((post) => {
    const tags = Array.isArray(post.tags) ? post.tags : [];
    tags.forEach((tag) => {
      const tagSlug = slugify(tag);
      if (!tagSlug) return;
      tagMap.set(tagSlug, (tagMap.get(tagSlug) ?? 0) + 1);
    });
  });

  const tagRoutes = [...tagMap.entries()].flatMap(([tagSlug, count]) => {
    const tagPages = Math.ceil(count / blogPostsPerPage);
    const paged =
      tagPages > 1 ? Array.from({ length: tagPages - 1 }, (_entry, index) => `/blog/tag/${tagSlug}/page/${index + 2}`) : [];
    return [`/blog/tag/${tagSlug}`, ...paged];
  });

  return ['/blog', ...pageRoutes, ...tagRoutes, ...blogEntries.map((post) => `/blog/${post.slug}`)];
}

function main() {
  const blog = existsSync(blogIndexPath) ? readJson(blogIndexPath) : [];
  const demosManifest = existsSync(demosManifestPath) ? readJson(demosManifestPath) : { demos: [] };
  const demos = demosManifest.demos ?? [];
  const industries = existsSync(industriesIndexPath) ? readJson(industriesIndexPath) : [];
  const comparatives = existsSync(comparativesIndexPath) ? readJson(comparativesIndexPath) : [];
  const seoManifest = existsSync(seoManifestPath) ? readJson(seoManifestPath) : { cityLandings: [], landingExamples: [] };

  const pagesRoutes = staticRoutes;
  const blogRoutes = buildBlogRoutes(blog);
  const demosRoutes = demos.map((entry) => entry.href);
  const industriesRoutes = [
    ...industries.map((entry) => `/${entry.slug}`),
    ...(seoManifest.cityLandings ?? []).map((entry) => entry.path),
    ...(seoManifest.landingExamples ?? []).map((entry) => `/${entry.slug}`),
  ];
  const comparativesRoutes = comparatives.map((entry) => `/${entry.slug}`);

  const sitemapFiles = {
    'sitemap-pages.xml': buildUrlSet(pagesRoutes),
    'sitemap-blog.xml': buildUrlSet(blogRoutes),
    'sitemap-demos.xml': buildUrlSet(demosRoutes),
    'sitemap-industries.xml': buildUrlSet(industriesRoutes),
    'sitemap-comparatives.xml': buildUrlSet(comparativesRoutes),
  };

  mkdirSync(sitemapsDir, { recursive: true });
  Object.entries(sitemapFiles).forEach(([fileName, content]) => {
    writeText(resolve(sitemapsDir, fileName), content);
  });

  const sitemapIndex = buildSitemapIndex(Object.keys(sitemapFiles));
  writeText(resolve(sitemapsDir, 'sitemap-index.xml'), sitemapIndex);
  writeText(legacySitemapPath, sitemapIndex);

  const robots = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${toAbsoluteUrl('/sitemaps/sitemap-index.xml')}`,
    '',
  ].join('\n');
  writeText(robotsPath, robots);

  console.log(
    `Generated sitemap index and ${Object.keys(sitemapFiles).length} segmented sitemaps (${pagesRoutes.length} pages, ${blogRoutes.length} blog, ${demosRoutes.length} demos, ${industriesRoutes.length} industries, ${comparativesRoutes.length} comparatives).`,
  );
}

main();
