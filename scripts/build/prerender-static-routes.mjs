import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, 'dist');
const prerenderRoot = path.join(projectRoot, '.prerender');
const templatePath = path.join(distRoot, 'index.html');
const serverEntryPath = path.join(prerenderRoot, 'entry-server.js');
const seoManifestPath = path.join(projectRoot, 'src', 'generated', 'seo-manifest.json');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function collectRoutePaths(seoManifest) {
  const routePaths = new Set(['/captiva', '/blog', '/terminos-de-servicio', '/politica-de-privacidad']);

  for (const landing of seoManifest.cityLandings ?? []) {
    if (landing.path) routePaths.add(landing.path);
  }

  for (const example of seoManifest.landingExamples ?? []) {
    if (example.path) routePaths.add(example.path);
  }

  for (const industry of seoManifest.industries ?? []) {
    if (industry.slug) routePaths.add(`/${industry.slug}`);
  }

  for (const comparative of seoManifest.comparatives ?? []) {
    if (comparative.slug) routePaths.add(`/${comparative.slug}`);
  }

  for (const post of seoManifest.blog ?? []) {
    if (post.slug) routePaths.add(`/blog/${post.slug}`);
  }

  return [...routePaths];
}

function buildSupplementalHeadMarkup(metadata) {
  if (!metadata) return '';

  const lines = [
    metadata.keywords?.length
      ? `<meta name="keywords" content="${escapeHtml(metadata.keywords.join(', '))}" />`
      : null,
    metadata.prevUrl ? `<link rel="prev" href="${escapeHtml(metadata.prevUrl)}" />` : null,
    metadata.nextUrl ? `<link rel="next" href="${escapeHtml(metadata.nextUrl)}" />` : null,
    ...(metadata.structuredData ?? []).map(
      (item) =>
        `<script type="application/ld+json" data-seo-json-ld="true">${escapeHtml(JSON.stringify(item))}</script>`,
    ),
  ];

  return lines.filter(Boolean).join('\n    ');
}

function replaceTag(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html;
}

function injectMetadata(templateHtml, metadata) {
  if (!metadata) return templateHtml;

  let html = templateHtml;

  html = replaceTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(metadata.title)}</title>`);
  html = replaceTag(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(metadata.description)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="robots" content="${escapeHtml(metadata.robots)}" />`,
  );
  html = replaceTag(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtml(metadata.canonicalUrl)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="${escapeHtml(metadata.ogType)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${escapeHtml(metadata.canonicalUrl)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${escapeHtml(metadata.image)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${escapeHtml(metadata.image)}" />`,
  );

  html = html.replace(/<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>\s*/gi, '');
  html = html.replace(/<link\s+rel="prev"\s+href="[^"]*"\s*\/?>\s*/gi, '');
  html = html.replace(/<link\s+rel="next"\s+href="[^"]*"\s*\/?>\s*/gi, '');
  html = html.replace(/<script type="application\/ld\+json" data-seo-json-ld="true">[\s\S]*?<\/script>\s*/gi, '');
  const supplementalMarkup = buildSupplementalHeadMarkup(metadata);
  html = html.replace(/<\/head>/i, `${supplementalMarkup ? `    ${supplementalMarkup}\n` : ''}  </head>`);

  return html;
}

function injectAppHtml(templateHtml, appHtml) {
  return templateHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

async function writeRouteHtml(routePath, html) {
  const routeDir =
    routePath === '/captiva'
      ? path.join(distRoot, 'captiva')
      : path.join(distRoot, routePath.replace(/^\//, '').replaceAll('/', path.sep));

  await fs.mkdir(routeDir, { recursive: true });
  await fs.writeFile(path.join(routeDir, 'index.html'), html, 'utf8');
}

async function cleanupPrerenderArtifacts() {
  await fs.rm(prerenderRoot, { recursive: true, force: true });
}

async function main() {
  const [templateHtml, seoManifestRaw, serverModule] = await Promise.all([
    fs.readFile(templatePath, 'utf8'),
    fs.readFile(seoManifestPath, 'utf8'),
    import(pathToFileURL(serverEntryPath).href),
  ]);

  const seoManifest = JSON.parse(seoManifestRaw);
  const routePaths = collectRoutePaths(seoManifest);

  for (const routePath of routePaths) {
    const { appHtml, metadata } = await serverModule.render(routePath);
    const withApp = injectAppHtml(templateHtml, appHtml);
    const prerenderedHtml = injectMetadata(withApp, metadata);
    await writeRouteHtml(routePath, prerenderedHtml);
  }

  await cleanupPrerenderArtifacts();
  console.log(`Prerendered ${routePaths.length} public SEO routes.`);
}

main().catch(async (error) => {
  await cleanupPrerenderArtifacts();
  console.error(error);
  process.exitCode = 1;
});
