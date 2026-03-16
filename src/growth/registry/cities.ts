import seoManifestData from '../../generated/seo-manifest.json';
import type { CityLandingEntry } from '../../types/city-landing';

type CityRegistryEntry = CityLandingEntry['city'];

const cityLandings = (seoManifestData as { cityLandings: CityLandingEntry[] }).cityLandings;

export const cityLandingEntries = cityLandings;

const seenCities = new Map<string, CityRegistryEntry>();
cityLandings.forEach((entry) => {
  if (!seenCities.has(entry.city.slug)) {
    seenCities.set(entry.city.slug, entry.city);
  }
});

export const cities = Array.from(seenCities.values());
export const citySlugs = cities.map((entry) => entry.slug);
export const cityBySlug = new Map(cities.map((entry) => [entry.slug, entry] as const));
