export type IndustryCatalogItem = {
  slug: string;
  industryName: string;
  title: string;
  problem: string;
  solution: string;
  benefits: string[];
};

export type IndustryPageData = IndustryCatalogItem & {
  category: string;
};
