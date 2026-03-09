import cityLandingsData from '../config/landing-city.generated.json';
import comparisonsData from '../config/comparisons.json';
import examplesData from '../config/landing-examples.generated.json';
import industryCatalogData from '../config/industry.catalog.json';
import type { CityLandingEntry } from '../types/city-landing';
import type { ComparisonEntry, LandingExample } from '../types/seo-cluster';

export type PageType =
  | 'home'
  | 'demos'
  | 'demo'
  | 'legal'
  | 'industry'
  | 'city'
  | 'example'
  | 'comparison'
  | 'blog'
  | 'blog-post'
  | 'unknown';

export type PageContext = {
  path: string;
  pageType: PageType;
  industry?: string;
  city?: string;
  slug?: string;
};

const cityLandings = cityLandingsData as CityLandingEntry[];
const landingExamples = examplesData as LandingExample[];
const comparisons = comparisonsData as ComparisonEntry[];
const industryCatalog = industryCatalogData as Record<string, { slug: string; industryName?: string; name?: string }>;

const cityByPath = new Map(cityLandings.map((entry) => [entry.path, entry]));
const exampleByPath = new Map(landingExamples.map((entry) => [`/${entry.slug}`, entry]));
const comparisonByPath = new Map(comparisons.map((entry) => [`/${entry.slug}`, entry]));
const industryByPath = new Map(
  Object.values(industryCatalog).map((entry) => [`/${entry.slug}`, entry]),
);

export function resolvePageContextFromPath(pathname: string): PageContext {
  const path = pathname || '/';

  if (path === '/captiva') {
    return { path, pageType: 'home' };
  }
  if (path === '/captiva/demos') {
    return { path, pageType: 'demos' };
  }
  if (path.startsWith('/demo/')) {
    return { path, pageType: 'demo', slug: path.split('/').filter(Boolean).at(1) };
  }
  if (path.startsWith('/demos/')) {
    return { path, pageType: 'demo', slug: path.split('/').filter(Boolean).at(1) };
  }
  if (path === '/blog' || path.startsWith('/blog/page/') || path.startsWith('/blog/tag/')) {
    return { path, pageType: 'blog' };
  }
  if (path.startsWith('/blog/')) {
    return { path, pageType: 'blog-post', slug: path.replace('/blog/', '') };
  }
  if (path === '/terminos-de-servicio' || path === '/politica-de-privacidad') {
    return { path, pageType: 'legal' };
  }

  const cityEntry = cityByPath.get(path);
  if (cityEntry) {
    return {
      path,
      pageType: 'city',
      industry: cityEntry.niche.slug,
      city: cityEntry.city.slug,
      slug: cityEntry.slug,
    };
  }

  const exampleEntry = exampleByPath.get(path);
  if (exampleEntry) {
    return {
      path,
      pageType: 'example',
      industry: exampleEntry.industry,
      slug: exampleEntry.slug,
    };
  }

  const comparisonEntry = comparisonByPath.get(path);
  if (comparisonEntry) {
    return {
      path,
      pageType: 'comparison',
      slug: comparisonEntry.slug,
    };
  }

  const industryEntry = industryByPath.get(path);
  if (industryEntry) {
    return {
      path,
      pageType: 'industry',
      industry: industryEntry.industryName ?? industryEntry.name,
      slug: industryEntry.slug,
    };
  }

  return { path, pageType: 'unknown' };
}

export function resolveCurrentPageContext(): PageContext {
  if (typeof window === 'undefined') {
    return { path: '/', pageType: 'unknown' };
  }

  return resolvePageContextFromPath(window.location.pathname);
}
