import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { loadManualDemosManifest } from './lib/demos/manual-manifest.mjs';

const industryCatalogPath = resolve(process.cwd(), 'src/config/industry.catalog.json');
const outputPath = resolve(process.cwd(), 'src/generated/landing-examples.generated.json');

function stripIndustryPrefix(slug) {
  return String(slug).replace(/^landing-page-para-/, '');
}

function toExampleSlug(industryRouteSlug) {
  return `ejemplo-landing-page-${stripIndustryPrefix(industryRouteSlug)}`;
}

function buildTitle(industryName) {
  return `Ejemplo de landing page para ${industryName}`;
}

function buildDescription(industryName) {
  return `Descubri como es una landing page optimizada para ${industryName}, enfocada en captar consultas y convertir visitas en clientes.`;
}

function generate() {
  const catalog = JSON.parse(readFileSync(industryCatalogPath, 'utf8'));
  const demosManifest = loadManualDemosManifest();
  const demosByPublicSlug = new Map((demosManifest.demos ?? []).map((entry) => [entry.publicSlug, entry]));
  const industries = Object.entries(catalog).map(([category, item]) => ({
    category,
    ...item,
  }));

  if (!industries.length) {
    throw new Error('industry.catalog.json must contain at least one industry');
  }

  const examples = industries.map((industry) => {
    if (industry.demo && !demosByPublicSlug.has(industry.demo)) {
      throw new Error(`Industry "${industry.slug}" references missing demo "${industry.demo}"`);
    }

    const slug = toExampleSlug(industry.slug);
    return {
      slug,
      path: `/${slug}`,
      industry: stripIndustryPrefix(industry.slug),
      industrySlug: industry.slug,
      category: industry.category,
      demo: industry.demo ?? '',
      title: buildTitle(industry.industryName),
      description: buildDescription(industry.industryName),
      focus: industry.heroDescription ?? industry.solution,
      highlights: Array.isArray(industry.benefits) ? industry.benefits.slice(0, 3) : [],
    };
  });

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(examples, null, 2)}\n`, 'utf8');
  console.log(`Generated landing examples with ${examples.length} entries.`);
}

generate();
