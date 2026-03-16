import { blogPosts, blogTopics } from './blog-topics';
import { cities, cityLandingEntries } from './cities';
import { comparatives } from './comparatives';
import { demos } from './demos';
import { industries } from './industries';

export const growthRegistry = {
  industries,
  cities,
  cityLandings: cityLandingEntries,
  demos,
  comparatives,
  blogPosts,
  blogTopics,
} as const;

export type GrowthRegistry = typeof growthRegistry;
