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
  niche: CityLandingNiche;
  city: CityLandingCity;
};
