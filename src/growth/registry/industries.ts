import industriesIndex from '../../generated/industries-index.json';
import type { IndustryPageData } from '../../types/industry';

export const industries = industriesIndex as IndustryPageData[];

export const industrySlugs = industries.map((entry) => entry.slug);

export const industryBySlug = new Map(industries.map((entry) => [entry.slug, entry] as const));
export const industryByCategory = new Map(industries.map((entry) => [entry.category, entry] as const));
