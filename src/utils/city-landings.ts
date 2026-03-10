import seoManifestData from '../generated/seo-manifest.json';
import type { CityLandingEntry } from '../types/city-landing';

const cityLandings = (seoManifestData as { cityLandings: CityLandingEntry[] }).cityLandings;

export function getCityLandingBySlug(slug: string): CityLandingEntry | undefined {
  return cityLandings.find((entry) => entry.slug === slug);
}

export function getCityLandingsByIndustrySlug(industrySlug: string, limit = 3): CityLandingEntry[] {
  return cityLandings.filter((entry) => entry.niche.industrySlug === industrySlug).slice(0, limit);
}

export function getTopCityLandings(limit = 6): CityLandingEntry[] {
  return cityLandings.slice(0, limit);
}
