export type IndustryFaqItem = {
  question: string;
  answer: string;
};

export type IndustryCatalogItem = {
  slug: string;
  name: string;
  industryName: string;
  title: string;
  heroTitle: string;
  heroDescription: string;
  problem: string;
  solution: string;
  painPoints: string[];
  benefits: string[];
  faq: IndustryFaqItem[];
  demo: string;
};

export type IndustryPageData = IndustryCatalogItem & {
  category: string;
};
