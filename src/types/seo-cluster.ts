export type LandingExample = {
  slug: string;
  path?: string;
  industry?: string;
  industrySlug: string;
  category: string;
  demo?: string;
  title: string;
  description: string;
  focus: string;
  highlights: string[];
};

export type ComparisonRow = {
  criteria: string;
  landingPage: string;
  alternative: string;
};

export type ComparisonEntry = {
  slug: string;
  title: string;
  description: string;
  rows: ComparisonRow[];
};
