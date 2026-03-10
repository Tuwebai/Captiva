import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

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
      return {
        slug,
        path: `/${slug}`,
        title: buildSeoTitle(industry.name, city.name),
        description: buildSeoDescription(industry.description, city.name),
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
    }),
  );

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(combinations, null, 2)}\n`, 'utf8');
  console.log(`Generated city landings with ${combinations.length} entries.`);
}

generate();
