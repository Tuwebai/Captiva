import comparativesIndex from '../../generated/comparatives-index.json';
import type { ComparisonEntry } from '../../types/seo-cluster';

export const comparatives = comparativesIndex as ComparisonEntry[];

export const comparativeSlugs = comparatives.map((entry) => entry.slug);
export const comparativeBySlug = new Map(comparatives.map((entry) => [entry.slug, entry] as const));
