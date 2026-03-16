import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { validateCityPage } from './seo/quality-gates/city-page-validator.mjs';

const industryCatalogPath = resolve(process.cwd(), 'src/config/industry.catalog.json');
const citiesPath = resolve(process.cwd(), 'src/config/seo-cities.json');
const outputPath = resolve(process.cwd(), 'src/generated/city-landings.generated.json');

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function slugFromIndustryRoute(industrySlug) {
  return String(industrySlug).replace(/^landing-page-para-/, '');
}

function ensureUnique(items, key, label) {
  const seen = new Set();
  items.forEach((item) => {
    const value = String(item[key] ?? '');
    if (!value) {
      throw new Error(`Invalid ${label}: missing "${key}"`);
    }
    if (seen.has(value)) {
      throw new Error(`Duplicate ${label} ${key}: "${value}"`);
    }
    seen.add(value);
  });
}

function buildSeoTitle(industryName, cityName) {
  return `Landing page para ${industryName} en ${cityName}`;
}

function buildSeoDescription(heroDescription, cityName) {
  return `${heroDescription} Enfoque local para ${cityName}, con estructura clara, CTA directo y conversion orientada a consultas.`;
}

function buildMetaDescription(industryName, cityName, countryName) {
  return `Captiva crea landings para ${industryName} en ${cityName}, ${countryName}, con propuesta clara, CTA directo y enfoque comercial para captar consultas reales.`;
}

function buildCityIntro(industryName, cityName, countryName) {
  return `Si tu negocio de ${industryName} opera en ${cityName}, ${countryName}, necesitas una pagina orientada a conversion que ordene la oferta, destaque diferenciales y facilite el contacto desde el primer scroll.`;
}

function buildLocalHook(industryName, cityName) {
  return `Contexto local para ${industryName} en ${cityName}: mensaje adaptado, referencias geograficas y CTA pensada para trafico con intencion comercial.`;
}

function buildSectionVariant(city) {
  const normalized = String(city.country ?? '').toLowerCase();
  if (normalized.includes('espana')) return 'city-proof';
  if (normalized.includes('argentina')) return 'city-process';
  if (normalized.includes('mexico')) return 'city-offer';
  return 'city-trust';
}

function normalizeIndustries(catalog) {
  return Object.entries(catalog).map(([category, entry]) => ({
    category,
    routeSlug: entry.slug,
    slug: slugFromIndustryRoute(entry.slug),
    name: entry.industryName,
    title: entry.title,
    description: entry.heroDescription || entry.solution,
  }));
}

function generate() {
  const industryCatalog = readJson(industryCatalogPath);
  const cities = readJson(citiesPath);

  const industries = normalizeIndustries(industryCatalog);
  if (!industries.length) {
    throw new Error('industry.catalog.json must define at least one industry');
  }
  if (!Array.isArray(cities) || cities.length === 0) {
    throw new Error('seo-cities.json must be a non-empty array');
  }

  ensureUnique(industries, 'routeSlug', 'industry');
  ensureUnique(cities, 'slug', 'city');

  const combinations = industries.flatMap((industry) =>
    cities.map((city) => {
      const slug = `landing-page-para-${industry.slug}-${city.slug}`;
      const entry = {
        slug,
        path: `/${slug}`,
        title: buildSeoTitle(industry.name, city.name),
        description: buildSeoDescription(industry.description, city.name),
        metaDescription: buildMetaDescription(industry.name, city.name, city.country),
        intro: buildCityIntro(industry.name, city.name, city.country),
        localHook: buildLocalHook(industry.name, city.name),
        sectionVariant: buildSectionVariant(city),
        niche: {
          slug: industry.slug,
          name: industry.name,
          title: industry.title,
          industrySlug: industry.routeSlug,
          category: industry.category,
        },
        city: {
          slug: city.slug,
          name: city.name,
          country: city.country,
        },
      };

      const validation = validateCityPage(entry);
      if (!validation.valid) {
        throw new Error(`City landing "${slug}" failed quality gates: ${validation.issues.join(', ')}`);
      }

      return {
        ...entry,
        uniqueWordCount: validation.uniqueWordCount,
        uniquenessFingerprint: validation.fingerprint,
      };
    }),
  );

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(combinations, null, 2)}\n`, 'utf8');
  console.log(`Generated city landings with ${combinations.length} entries.`);
}

generate();
