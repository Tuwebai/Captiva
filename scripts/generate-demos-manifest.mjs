import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { minify } from 'html-minifier-terser';
import { loadBlogEntries } from './lib/blog-content.mjs';
import { DEFAULT_DEMO_PREVIEW, DEFAULT_DEMO_PREVIEW_PATH, DEFAULT_DEMO_SECTIONS } from './lib/demos/constants.mjs';

const siteUrl = 'https://captiva.tuweb-ai.com';
const controlledDemoBase = '/demo';
const demosRoot = resolve(process.cwd(), 'demos');
const outputPath = resolve(process.cwd(), 'src/config/demos.generated.json');
const publicRoot = resolve(process.cwd(), 'public');
const industryCatalogPath = resolve(process.cwd(), 'src/config/industry.catalog.json');
const publicDemosRoot = resolve(publicRoot, 'demos');
const robotsPath = resolve(publicRoot, 'robots.txt');
const sitemapPath = resolve(publicRoot, 'sitemap.xml');
const slugMapPath = resolve(publicRoot, 'demo-slugs.json');
const demosManifestPath = resolve(process.cwd(), 'demos/manifest.json');
const cityLandingsPath = resolve(process.cwd(), 'src/config/landing-city.generated.json');
const examplesPath = resolve(process.cwd(), 'src/config/landing-examples.generated.json');
const comparisonsPath = resolve(process.cwd(), 'src/config/comparisons.json');
const staticRoutes = ['/captiva', '/captiva/demos'];
const blogContentDir = resolve(process.cwd(), 'src/content/blog');
const industryCatalog = existsSync(industryCatalogPath)
  ? JSON.parse(readFileSync(industryCatalogPath, 'utf8'))
  : {};
const archivedGeneratedCatalogSlugs = new Set([
  'aesthetic-clinic',
  'aesthetic-premium',
  'coach-personal-brand',
  'consulting-b2b',
  'dentist-minimal',
  'dentist-modern',
  'gym-membership',
  'lawyer-litigation',
  'real-estate-investment',
  'restaurant-delivery',
]);

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function buildPublicSlug(folderName) {
  const raw = folderName.replace(/^demo\s+/i, '');
  const compact = raw.replace(/\s*&\s*/g, '-').replace(/\s+/g, '');
  return `DEMO-${compact.replace(/[^A-Za-z0-9-]/g, '')}`;
}

function buildControlledHref(canonicalSlug) {
  return `${controlledDemoBase}/${canonicalSlug}`;
}

function normalizePreview(publicSlug, preview) {
  if (!preview) return null;
  if (preview === DEFAULT_DEMO_PREVIEW) return DEFAULT_DEMO_PREVIEW;
  if (preview.startsWith('/')) {
    return `/demos/${publicSlug}/${basename(preview)}`;
  }
  return `/demos/${publicSlug}/${preview}`;
}

function resolveManifestPreview(item) {
  return DEFAULT_DEMO_PREVIEW;
}

function inferGoal(category) {
  const normalized = String(category ?? '').toLowerCase();
  if (normalized === 'fitness') return 'memberships';
  if (normalized === 'salud' || normalized === 'odontologia' || normalized === 'estetica') return 'appointments';
  if (normalized === 'legal') return 'consultations';
  if (normalized === 'automotriz') return 'test-drives';
  if (normalized === 'restaurant') return 'bookings';
  return 'leads';
}

function inferTemplate(category, meta) {
  if (typeof meta.template === 'string' && meta.template.trim()) return meta.template.trim();
  const normalized = String(category ?? '').toLowerCase();
  if (normalized === 'automotriz') return 'catalog-premium';
  if (normalized === 'negocios-locales' && String(meta.industry ?? '').toLowerCase() === 'inmobiliaria') {
    return 'real-estate-split';
  }
  return 'service-business';
}

function inferStyle(meta) {
  if (typeof meta.style === 'string' && meta.style.trim()) return meta.style.trim();
  return 'premium';
}

function inferStatus(meta, canonicalSlug) {
  const slug = String(canonicalSlug ?? meta.slug ?? '').trim().toLowerCase();
  const tier = inferTier(meta).toLowerCase();

  if (
    tier === 'pilot' ||
    slug.includes('phase1-pilot') ||
    slug.endsWith('-pilot') ||
    archivedGeneratedCatalogSlugs.has(slug)
  ) {
    return 'archived';
  }

  if (typeof meta.status === 'string' && meta.status.trim()) return meta.status.trim();
  return 'active';
}

function inferTier(meta) {
  if (typeof meta.tier === 'string' && meta.tier.trim()) return meta.tier.trim();
  if (Array.isArray(meta.tags) && meta.tags.includes('pilot')) return 'pilot';
  return 'legacy';
}

function inferVariant(meta, template) {
  if (typeof meta.variant === 'string' && meta.variant.trim()) return meta.variant.trim();
  if (typeof meta.layout === 'string' && meta.layout.trim()) return meta.layout.trim();
  return template === 'real-estate-split' ? 'landing-c' : 'default';
}

function inferTags(meta, item) {
  if (Array.isArray(meta.tags) && meta.tags.length > 0) {
    return meta.tags.filter((tag) => typeof tag === 'string' && tag.trim()).map((tag) => tag.trim());
  }

  return [...new Set(['captiva', 'demo', item.category, item.industry].filter(Boolean))];
}

function inferSections(meta, template) {
  if (Array.isArray(meta.sections) && meta.sections.length > 0) {
    return meta.sections.filter((section) => typeof section === 'string' && section.trim()).map((section) => section.trim());
  }
  void template;
  return DEFAULT_DEMO_SECTIONS;
}

function toAbsoluteUrl(pathname) {
  if (pathname.startsWith('http')) return pathname;
  return `${siteUrl}${pathname}`;
}

function upsertTag(html, matcher, tag) {
  if (matcher.test(html)) {
    return html.replace(matcher, tag);
  }
  return html.replace('</head>', `  ${tag}\n</head>`);
}

function upsertMetaName(html, name, content) {
  return upsertTag(
    html,
    new RegExp(`<meta\\s+name=["']${name}["'][^>]*>`, 'i'),
    `<meta name="${name}" content="${content}">`,
  );
}

function upsertMetaProperty(html, property, content) {
  return upsertTag(
    html,
    new RegExp(`<meta\\s+property=["']${property}["'][^>]*>`, 'i'),
    `<meta property="${property}" content="${content}">`,
  );
}

function upsertCanonical(html, href) {
  return upsertTag(
    html,
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${href}">`,
  );
}

function inferBusinessKeyword(category) {
  const normalized = String(category ?? '').toLowerCase();
  if (normalized === 'fitness') return 'gimnasios';
  if (normalized === 'salud') return 'servicios de salud';
  if (normalized === 'odontologia') return 'dentistas';
  if (normalized === 'estetica') return 'estética';
  if (normalized === 'legal') return 'abogados';
  if (normalized === 'b2b') return 'negocios b2b';
  return 'negocios';
}

function getIndustrySlug(category) {
  const catalogItem = industryCatalog[category];
  if (catalogItem?.slug) return catalogItem.slug;
  return `landing-page-para-${String(category).toLowerCase()}`;
}

function injectBeforeBodyClose(html, content) {
  return html.replace('</body>', `${content}\n</body>`);
}

function buildClientProtectionScript(item) {
  const watermarkText = `Demo generada por Captiva • ${item.title}`;

  return `
<script data-captiva-protection="true">
(() => {
  if (location.protocol === 'file:') {
    document.body.innerHTML = '<div style="min-height:100vh;display:grid;place-items:center;font-family:Inter,Arial,sans-serif;padding:24px;text-align:center"><div><h1 style="margin:0 0 12px;font-size:28px">Esta demo solo funciona desde Captiva.</h1><p style="margin:0;color:#475569">Ingresá desde https://captiva.tuweb-ai.com/captiva/demos para verla correctamente.</p></div></div>';
    return;
  }

  document.addEventListener('contextmenu', (event) => event.preventDefault());
  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    const blocked =
      key === 'f12' ||
      (event.ctrlKey && ['u', 's'].includes(key)) ||
      (event.ctrlKey && event.shiftKey && ['i', 'j', 'c'].includes(key));

    if (blocked) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  let devtoolsOpened = false;
  setInterval(() => {
    const threshold = 170;
    const opened = (window.outerWidth - window.innerWidth > threshold) || (window.outerHeight - window.innerHeight > threshold);
    if (opened && !devtoolsOpened) {
      devtoolsOpened = true;
      console.clear();
      console.log('Demo protegida de Captiva.');
    }
    if (!opened) {
      devtoolsOpened = false;
    }
  }, 900);

  const mountWatermark = () => {
    if (document.getElementById('captiva-dynamic-watermark')) return;

    const badge = document.createElement('a');
    badge.id = 'captiva-dynamic-watermark';
    badge.href = '/captiva';
    badge.target = '_blank';
    badge.rel = 'noreferrer';
    badge.textContent = ${JSON.stringify(watermarkText)};
    badge.style.cssText = 'position:fixed;right:12px;bottom:12px;z-index:2147483647;padding:8px 12px;border-radius:999px;background:rgba(10,16,34,0.88);border:1px solid rgba(88,133,255,0.45);color:#f8fbff;font:600 12px/1.2 Inter,Arial,sans-serif;letter-spacing:.02em;box-shadow:0 10px 28px rgba(0,0,0,.28);backdrop-filter:blur(6px);text-decoration:none;';
    document.body.appendChild(badge);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountWatermark);
  } else {
    mountWatermark();
  }
})();
</script>`;
}

async function optimizeDemoHtml(item) {
  const indexPath = resolve(publicDemosRoot, item.publicSlug, 'index.html');
  if (!existsSync(indexPath)) return;

  const categoryKeyword = inferBusinessKeyword(item.category);
  const canonical = `${siteUrl}${buildControlledHref(item.slug)}`;
  const seoTitle = `${item.title} | Ejemplo de página web para ${categoryKeyword}`;
  const seoDescription = `${item.description} Ejemplo de landing page profesional para ${categoryKeyword}, optimizada para captar consultas.`;
  const ogImage = toAbsoluteUrl(item.preview ?? '/LOGO-captiva.png');
  let html = readFileSync(indexPath, 'utf8');

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seoTitle}</title>`);
  html = upsertMetaName(html, 'description', seoDescription);
  html = upsertMetaName(html, 'robots', 'index,follow');
  html = upsertMetaName(
    html,
    'keywords',
    `landing page ${categoryKeyword}, ejemplo página web ${categoryKeyword}, captiva demos`,
  );
  html = upsertCanonical(html, canonical);
  html = upsertMetaProperty(html, 'og:title', seoTitle);
  html = upsertMetaProperty(html, 'og:description', seoDescription);
  html = upsertMetaProperty(html, 'og:type', 'website');
  html = upsertMetaProperty(html, 'og:url', canonical);
  html = upsertMetaProperty(html, 'og:image', ogImage);
  html = upsertMetaName(html, 'twitter:card', 'summary_large_image');
  html = upsertMetaName(html, 'twitter:title', seoTitle);
  html = upsertMetaName(html, 'twitter:description', seoDescription);
  html = upsertMetaName(html, 'twitter:image', ogImage);

  const htmlTagMatch = html.match(/<html[^>]*>/i);
  if (htmlTagMatch && !/lang\s*=/i.test(htmlTagMatch[0])) {
    html = html.replace(/<html([^>]*)>/i, '<html$1 lang="es">');
  }

  if (!/<h1[\s>]/i.test(html)) {
    const fallbackH1 = `<h1 style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">${item.title}</h1>`;
    html = html.replace(/<body([^>]*)>/i, `<body$1>\n  ${fallbackH1}`);
  }

  html = html.replace(/<section[^>]*id=["']captiva-seo-intro["'][\s\S]*?<\/section>/gi, '');
  html = html.replace(/<div[^>]*id=["']captiva-seo-intro["'][\s\S]*?<\/div>/gi, '');
  html = html.replace(/<div[^>]*id=["']captiva-dynamic-slot["'][\s\S]*?<\/div>/gi, '');
  html = html.replace(
    /<section[\s\S]*?Esta demo forma parte del sistema de Captiva[\s\S]*?<\/section>/gi,
    '',
  );
  html = html.replace(
    /<div[\s\S]*?Esta demo forma parte del sistema de Captiva[\s\S]*?<\/div>/gi,
    '',
  );

  const demoSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: seoTitle,
    description: seoDescription,
    url: canonical,
    inLanguage: 'es',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Captiva',
      url: `${siteUrl}/captiva`,
    },
  };

  const schemaTag = `<script type="application/ld+json" data-captiva-seo="demo">${JSON.stringify(demoSchema).replace(/<\/script/gi, '<\\/script')}</script>`;
  html = html.replace(
    /<script type="application\/ld\+json" data-captiva-seo="demo">[\s\S]*?<\/script>/i,
    '',
  );
  html = html.replace('</head>', `  ${schemaTag}\n</head>`);

  const protectionScript = buildClientProtectionScript(item);
  html = html.replace(/<script data-captiva-protection="true">[\s\S]*?<\/script>/i, '');
  html = injectBeforeBodyClose(html, protectionScript);

  const minified = await minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    sortAttributes: true,
    sortClassName: true,
  });

  writeFileSync(indexPath, minified);
}

async function writeSitemap(manifest) {
  const cityRoutes = existsSync(cityLandingsPath)
    ? JSON.parse(readFileSync(cityLandingsPath, 'utf8')).map((entry) => entry.path)
    : [];
  const exampleRoutes = existsSync(examplesPath)
    ? JSON.parse(readFileSync(examplesPath, 'utf8')).map((entry) => `/${entry.slug}`)
    : [];
  const comparisonRoutes = existsSync(comparisonsPath)
    ? JSON.parse(readFileSync(comparisonsPath, 'utf8')).map((entry) => `/${entry.slug}`)
    : [];
  const industryRoutes = [...new Set(manifest.map((item) => `/${getIndustrySlug(item.category)}`))];
  const blogEntries = await loadBlogEntries(blogContentDir);
  const blogPostsPerPage = 10;
  const totalBlogPages = Math.ceil(blogEntries.length / blogPostsPerPage);
  const blogPageRoutes =
    totalBlogPages > 1 ? Array.from({ length: totalBlogPages - 1 }, (_entry, index) => `/blog/page/${index + 2}`) : [];
  const tagMap = new Map();
  blogEntries.forEach((post) => {
    post.tags.forEach((tag) => {
      const tagSlug = slugify(tag);
      if (!tagSlug) return;
      tagMap.set(tagSlug, (tagMap.get(tagSlug) ?? 0) + 1);
    });
  });
  const blogTagRoutes = [...tagMap.entries()].flatMap(([tagSlug, count]) => {
    const tagPages = Math.ceil(count / blogPostsPerPage);
    const paged = tagPages > 1 ? Array.from({ length: tagPages - 1 }, (_entry, index) => `/blog/tag/${tagSlug}/page/${index + 2}`) : [];
    return [`/blog/tag/${tagSlug}`, ...paged];
  });
  const blogRoutes = [
    '/blog',
    ...blogPageRoutes,
    ...blogTagRoutes,
    ...blogEntries.map((post) => `/blog/${post.slug}`),
  ];

  const urls = [
    ...staticRoutes,
    ...blogRoutes,
    ...industryRoutes,
    ...cityRoutes,
    ...exampleRoutes,
    ...comparisonRoutes,
    ...manifest.map((item) => buildControlledHref(item.slug)),
  ];
  const uniqueUrls = [...new Set(urls)];
  const lastmod = new Date().toISOString().split('T')[0];

  const entries = uniqueUrls
    .map((path) => {
      const priority =
        path === '/captiva'
          ? '1.0'
          : path === '/captiva/demos'
            ? '0.9'
            : path === '/blog'
              ? '0.88'
              : path.startsWith('/blog/')
                ? '0.82'
              : path.startsWith('/landing-page-para-')
                ? '0.85'
                : '0.8';
      return [
        '  <url>',
        `    <loc>${toAbsoluteUrl(path)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        '    <changefreq>weekly</changefreq>',
        `    <priority>${priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    '</urlset>',
    '',
  ].join('\n');

  writeFileSync(sitemapPath, xml);
}

function writeRobots() {
  const robots = ['User-agent: *', 'Allow: /', '', `Sitemap: ${toAbsoluteUrl('/sitemap.xml')}`, ''].join('\n');
  writeFileSync(robotsPath, robots);
}

function normalizeAliasKey(value) {
  const sanitized = String(value).trim().replace(/^\/+|\/+$/g, '');
  try {
    return decodeURIComponent(sanitized).toLowerCase();
  } catch {
    return sanitized.toLowerCase();
  }
}

function writeDemoSlugMap(manifest) {
  const canonicalToPublic = {};
  const aliasToCanonical = {};

  manifest.forEach((item) => {
    canonicalToPublic[item.slug] = item.publicSlug;

    const aliases = new Set([
      item.publicSlug,
      item.folderName,
      item.folderName.replace(/\s+/g, '-'),
      item.folderName.replace(/\s+/g, ''),
    ]);

    aliases.forEach((alias) => {
      if (!alias || alias.toLowerCase() === item.slug.toLowerCase()) return;
      aliasToCanonical[normalizeAliasKey(alias)] = item.slug;
    });
  });

  const payload = {
    generatedAt: new Date().toISOString(),
    canonicalToPublic,
    aliasToCanonical,
  };

  writeFileSync(slugMapPath, `${JSON.stringify(payload, null, 2)}\n`);
}

function buildDemosManifestPayload(manifest) {
  return {
    generatedAt: new Date().toISOString(),
    demos: manifest.map((item) => ({
      slug: item.slug,
      folderName: item.folderName,
      publicSlug: item.publicSlug,
      title: item.title,
      description: item.description,
      category: item.category,
      industry: item.industry,
      goal: item.goal,
      template: item.template,
      variant: item.variant,
      tier: item.tier,
      style: item.style,
      tags: item.tags,
      sections: item.sections,
      preview: item.preview,
      status: item.status,
      href: item.href,
    })),
  };
}

function writeDemosManifest(payload) {
  writeFileSync(demosManifestPath, `${JSON.stringify(payload, null, 2)}\n`);
}

async function main() {
  if (!existsSync(DEFAULT_DEMO_PREVIEW_PATH)) {
    throw new Error(`Default demo preview not found: ${DEFAULT_DEMO_PREVIEW_PATH}`);
  }

  rmSync(publicDemosRoot, { recursive: true, force: true });
  mkdirSync(publicDemosRoot, { recursive: true });

  const folders = existsSync(demosRoot)
    ? readdirSync(demosRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory())
    : [];

  const manifest = [];
  const usedCanonicalSlugs = new Set();

  for (const entry of folders) {
    const folderName = entry.name;
    const metaPath = join(demosRoot, folderName, 'meta.json');
    if (!existsSync(metaPath)) continue;

    const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
    const required = ['title', 'description', 'industry'];
    required.forEach((field) => {
      if (typeof meta[field] !== 'string' || meta[field].trim().length === 0) {
        throw new Error(`Invalid meta.json in demos/${folderName}: missing required "${field}"`);
      }
    });

    const canonicalSlug = slugify(meta.slug || folderName);
    if (!canonicalSlug) {
      throw new Error(`Invalid canonical slug for demos/${folderName}`);
    }
    if (usedCanonicalSlugs.has(canonicalSlug)) {
      throw new Error(`Duplicate canonical slug "${canonicalSlug}" detected in demos/${folderName}`);
    }
    usedCanonicalSlugs.add(canonicalSlug);

    const publicSlug = buildPublicSlug(folderName);
    cpSync(join(demosRoot, folderName), join(publicDemosRoot, publicSlug), { recursive: true });

    const template = inferTemplate(meta.category || meta.industry, meta);
    const item = {
      slug: canonicalSlug,
      folderName,
      publicSlug,
      title: meta.title,
      description: meta.description,
      industry: meta.industry,
      category: meta.category,
      goal: inferGoal(meta.category || meta.industry),
      template,
      variant: inferVariant(meta, template),
      tier: inferTier(meta),
      style: inferStyle(meta),
      status: inferStatus(meta, canonicalSlug),
      tags: [],
      sections: [],
      preview: meta.preview ?? DEFAULT_DEMO_PREVIEW,
      href: buildControlledHref(canonicalSlug),
    };

    item.tags = inferTags(meta, item);
    item.sections = inferSections(meta, template);
    item.preview = resolveManifestPreview(item);

    await optimizeDemoHtml(item);
    manifest.push(item);
  }

  manifest.sort((left, right) => left.title.localeCompare(right.title, 'es'));

  const centralManifest = buildDemosManifestPayload(manifest);
  writeDemosManifest(centralManifest);
  writeFileSync(outputPath, `${JSON.stringify(centralManifest.demos, null, 2)}\n`);
  writeDemoSlugMap(manifest);
  await writeSitemap(manifest);
  writeRobots();

  console.log(`Generated demos manifest with ${manifest.length} entries.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
