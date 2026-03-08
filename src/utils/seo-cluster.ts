import comparisonsData from '../config/comparisons.json';
import examplesData from '../config/landing-examples.generated.json';
import demosManifest from '../config/demos.generated.json';
import type { DemoManifestItem } from '../types/demo';
import type { ComparisonEntry, LandingExample } from '../types/seo-cluster';

const landingExamples = examplesData as LandingExample[];
const comparisons = comparisonsData as ComparisonEntry[];
const demos = demosManifest as DemoManifestItem[];

export function getLandingExamples() {
  return landingExamples;
}

export function getLandingExampleBySlug(slug: string) {
  return landingExamples.find((item) => item.slug === slug);
}

export function getLandingExampleByIndustrySlug(industrySlug: string) {
  return landingExamples.find((item) => item.industrySlug === industrySlug);
}

export function getTopLandingExamples(limit = 3) {
  return landingExamples.slice(0, limit);
}

export function getComparisons() {
  return comparisons;
}

export function getComparisonBySlug(slug: string) {
  return comparisons.find((item) => item.slug === slug);
}

export function getTopComparisons(limit = 3) {
  return comparisons.slice(0, limit);
}

export function getDemoForCategory(category: string) {
  return demos.find((item) => item.category === category);
}
