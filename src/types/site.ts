export type NavItem = {
  label: string;
  href: string;
  type?: 'anchor' | 'route';
};

export type HighlightMetric = {
  value: string;
  label: string;
};

export type ProblemItem = {
  title: string;
  description: string;
};

export type SolutionItem = {
  title: string;
  description: string;
};

export type BenefitItem = {
  title: string;
  description: string;
};

export type DemoItem = {
  slug: string;
  title: string;
  description: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type ContactInfo = {
  primaryEmail: string;
  productEmail: string;
  whatsapp: string;
  ctaHref: string;
};

export type SiteRoutes = {
  home: string;
  captiva: string;
  captivaDemos: string;
  demosPublicBase: string;
};

export type SiteSeo = {
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultImage: string;
  twitterCard: 'summary' | 'summary_large_image';
};

export type SiteConfig = {
  productName: string;
  companyName: string;
  description: string;
  primaryCtaLabel: string;
  navItems: NavItem[];
  contact: ContactInfo;
  routes: SiteRoutes;
  seo: SiteSeo;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    supportingCopy: string;
    metrics: HighlightMetric[];
  };
  problem: {
    title: string;
    description: string;
    items: ProblemItem[];
  };
  solution: {
    title: string;
    description: string;
    items: SolutionItem[];
  };
  benefits: {
    title: string;
    description: string;
    items: BenefitItem[];
  };
  demos: {
    title: string;
    description: string;
    items: DemoItem[];
  };
  process: {
    title: string;
    description: string;
    steps: ProcessStep[];
  };
  finalCta: {
    title: string;
    description: string;
  };
};
