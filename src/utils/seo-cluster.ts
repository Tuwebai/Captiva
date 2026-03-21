import seoManifestData from '../generated/seo-manifest.json';
import { comparatives } from '../growth/registry/comparatives';
import { demos } from '../growth/registry/demos';
import type { DemoManifestItem } from '../types/demo';
import type { ComparisonEntry, LandingExample } from '../types/seo-cluster';

const landingExamples = (seoManifestData as { landingExamples: LandingExample[] }).landingExamples;
const comparisonEntries = comparatives as ComparisonEntry[];
const demoEntries = demos as DemoManifestItem[];

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
  return comparisonEntries;
}

export function getComparisonBySlug(slug: string) {
  return comparisonEntries.find((item) => item.slug === slug);
}

export function getTopComparisons(limit = 3) {
  return comparisonEntries.slice(0, limit);
}

export function getDemoForCategory(category: string) {
  return demoEntries.find((item) => item.category === category);
}

export function getDemoByPublicSlug(publicSlug: string) {
  return demoEntries.find((item) => item.publicSlug === publicSlug);
}
