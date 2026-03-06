import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { minify } from 'html-minifier-terser';

const siteUrl = 'https://tuweb-ai.com';
const controlledDemoBase = '/demo';
const demosRoot = resolve(process.cwd(), 'demos');
const outputPath = resolve(process.cwd(), 'src/config/demos.generated.json');
const publicRoot = resolve(process.cwd(), 'public');
const industryCatalogPath = resolve(process.cwd(), 'src/config/industry.catalog.json');
const publicDemosRoot = resolve(publicRoot, 'demos');
const robotsPath = resolve(publicRoot, 'robots.txt');
const sitemapPath = resolve(publicRoot, 'sitemap.xml');
const staticRoutes = ['/captiva', '/captiva/demos'];
const industryCatalog = existsSync(industryCatalogPath)
  ? JSON.parse(readFileSync(industryCatalogPath, 'utf8'))
  : {};

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

function buildControlledHref(publicSlug) {
  return `${controlledDemoBase}/${publicSlug}`;
}

function normalizePreview(publicSlug, preview) {
  if (!preview) {
    return null;
  }

  if (preview.startsWith('/')) {
    return preview;
  }

  return `/demos/${publicSlug}/${preview}`;
}

function toAbsoluteUrl(pathname) {
  if (pathname.startsWith('http')) {
    return pathname;
  }

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
  if (normalized === 'estetica') return 'estetica';
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

function buildClientProtectionScript(item, categoryKeyword) {
  const watermarkText = `Demo generada por Captiva • ${item.title}`;
  const industrySlug = getIndustrySlug(item.category);

  return `
<script data-captiva-protection="true">
(() => {
  if (location.protocol === 'file:') {
    document.body.innerHTML = '<div style="min-height:100vh;display:grid;place-items:center;font-family:Inter,Arial,sans-serif;padding:24px;text-align:center"><div><h1 style="margin:0 0 12px;font-size:28px">Esta demo solo funciona desde Captiva.</h1><p style="margin:0;color:#475569">Ingresa desde https://tuweb-ai.com/captiva/demos para verla correctamente.</p></div></div>';
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

    const dynamic = document.getElementById('captiva-dynamic-slot');
    if (dynamic) {
      dynamic.innerHTML = '<p style="margin:0;font:500 13px/1.5 Inter,Arial,sans-serif;color:#334155">Esta demo de ${categoryKeyword} forma parte del catalogo de Captiva. Ver mas variantes en <a href="/captiva/demos">/captiva/demos</a> o en <a href="/${industrySlug}">/${industrySlug}</a>.</p>';
    }
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

  if (!existsSync(indexPath)) {
    return;
  }

  const categoryKeyword = inferBusinessKeyword(item.category);
  const canonical = `${siteUrl}${buildControlledHref(item.publicSlug)}`;
  const seoTitle = `${item.title} | Ejemplo de pagina web para ${categoryKeyword}`;
  const seoDescription = `${item.description} Ejemplo de landing page profesional para ${categoryKeyword}, optimizada para captar consultas.`;
  const ogImage = toAbsoluteUrl(item.preview ?? '/LOGO-captiva.png');
  const industrySlug = getIndustrySlug(item.category);

  let html = readFileSync(indexPath, 'utf8');

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seoTitle}</title>`);
  html = upsertMetaName(html, 'description', seoDescription);
  html = upsertMetaName(html, 'robots', 'index,follow');
  html = upsertMetaName(
    html,
    'keywords',
    `landing page ${categoryKeyword}, ejemplo pagina web ${categoryKeyword}, captiva demos`,
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

  const introBlock = [
    '<section id="captiva-seo-intro" data-captiva-seo="intro" style="max-width:920px;margin:24px auto 8px;padding:20px;border:1px solid rgba(15,23,42,0.12);border-radius:14px;background:#fff;color:#0f172a;font-family:Inter,Arial,sans-serif;line-height:1.6;">',
    `  <h2 style="margin:0 0 8px;font-size:1.35rem;">${item.title}: ejemplo de landing page para ${categoryKeyword}</h2>`,
    `  <p style="margin:0 0 10px;">${seoDescription}</p>`,
    `  <p style="margin:0;">Esta demo forma parte del sistema de Captiva para negocios de ${categoryKeyword}. Ver mas ejemplos en <a href="/captiva/demos">/captiva/demos</a> o la pagina por industria <a href="/${industrySlug}">/${industrySlug}</a>.</p>`,
    '</section>',
    '<div id="captiva-dynamic-slot" style="max-width:920px;margin:10px auto 16px;padding:0 2px;"></div>',
  ].join('\n');

  html = html.replace(/<section id="captiva-seo-intro" data-captiva-seo="intro"[\s\S]*?<\/section>/i, '');
  html = html.replace(/<div id="captiva-dynamic-slot"[\s\S]*?<\/div>/i, '');
  html = html.replace(/<body([^>]*)>/i, `<body$1>\n${introBlock}`);

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

  const protectionScript = buildClientProtectionScript(item, categoryKeyword);
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

function writeSitemap(manifest) {
  const industryRoutes = [
    ...new Set(manifest.map((item) => `/${getIndustrySlug(item.category)}`)),
  ];

  const urls = [
    ...staticRoutes,
    ...industryRoutes,
    ...manifest.map((item) => buildControlledHref(item.publicSlug)),
  ];
  const lastmod = new Date().toISOString().split('T')[0];

  const entries = urls
    .map((path) => {
      const priority =
        path === '/captiva'
          ? '1.0'
          : path === '/captiva/demos'
            ? '0.9'
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

async function main() {
  rmSync(publicDemosRoot, { recursive: true, force: true });
  mkdirSync(publicDemosRoot, { recursive: true });

  const folders = existsSync(demosRoot)
    ? readdirSync(demosRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory())
    : [];

  const manifest = [];

  for (const entry of folders) {
    const folderName = entry.name;
    const metaPath = join(demosRoot, folderName, 'meta.json');

    if (!existsSync(metaPath)) {
      continue;
    }

    const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
    const publicSlug = buildPublicSlug(folderName);

    cpSync(join(demosRoot, folderName), join(publicDemosRoot, publicSlug), { recursive: true });

    const item = {
      slug: slugify(folderName),
      folderName,
      publicSlug,
      title: meta.title,
      description: meta.description,
      category: meta.category,
      preview: normalizePreview(publicSlug, meta.preview),
      href: buildControlledHref(publicSlug),
    };

    await optimizeDemoHtml(item);
    manifest.push(item);
  }

  manifest.sort((left, right) => left.title.localeCompare(right.title, 'es'));

  writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
  writeSitemap(manifest);
  writeRobots();

  console.log(`Generated demos manifest with ${manifest.length} entries.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
