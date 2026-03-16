export type CityLandingNiche = {
  slug: string;
  name: string;
  title: string;
  industrySlug: string;
  category?: string;
};

export type CityLandingCity = {
  slug: string;
  name: string;
  country: string;
};

export type CityLandingEntry = {
  slug: string;
  path: string;
  title: string;
  description: string;
  metaDescription?: string;
  intro?: string;
  localHook?: string;
  sectionVariant?: string;
  uniqueWordCount?: number;
  uniquenessFingerprint?: string;
  niche: CityLandingNiche;
  city: CityLandingCity;
};
