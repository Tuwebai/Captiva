import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const generatedDir = resolve(process.cwd(), 'src/generated');
const industryCatalogPath = resolve(process.cwd(), 'src/config/industry.catalog.json');
const comparisonsPath = resolve(process.cwd(), 'src/config/comparisons.json');
const cityLandingsPath = resolve(generatedDir, 'city-landings.generated.json');
const landingExamplesPath = resolve(generatedDir, 'landing-examples.generated.json');
const demosManifestPath = resolve(process.cwd(), 'demos/manifest.json');
const blogIndexPath = resolve(generatedDir, 'blog-index.json');
const industriesIndexPath = resolve(generatedDir, 'industries-index.json');
const comparativesIndexPath = resolve(generatedDir, 'comparatives-index.json');
const seoManifestPath = resolve(generatedDir, 'seo-manifest.json');

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, payload) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
}

function buildIndustriesIndex(catalog) {
  return Object.entries(catalog)
    .map(([category, item]) => ({
      category,
      ...item,
    }))
    .sort((left, right) => left.title.localeCompare(right.title, 'es'));
}

function main() {
  const industryCatalog = readJson(industryCatalogPath);
  const comparisons = readJson(comparisonsPath);
  const cityLandings = readJson(cityLandingsPath);
  const landingExamples = readJson(landingExamplesPath);
  const demosManifest = readJson(demosManifestPath);
  const demos = demosManifest.demos ?? [];
  const blog = readJson(blogIndexPath);

  const industries = buildIndustriesIndex(industryCatalog);
  const seoManifest = {
    generatedAt: new Date().toISOString(),
    cityLandings,
    landingExamples,
    industries,
    comparatives: comparisons,
    demos,
    blog,
  };

  writeJson(industriesIndexPath, industries);
  writeJson(comparativesIndexPath, comparisons);
  writeJson(seoManifestPath, seoManifest);

  console.log(
    `Generated SEO indexes: ${industries.length} industries, ${comparisons.length} comparatives, ${cityLandings.length} city landings, ${landingExamples.length} examples.`,
  );
}

main();
