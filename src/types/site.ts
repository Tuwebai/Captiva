export type NavItem = {
  label: string;
  href: string;
  type?: 'anchor' | 'route';
};

export type ProductTopBarItem = {
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

export type SocialProofMetric = {
  value: string;
  label: string;
};

export type SocialProofItem = {
  title: string;
  description: string;
};

export type WhyCaptivaItem = {
  title: string;
  description: string;
};

export type OfferIncludeItem = {
  title: string;
  description: string;
};

export type OfferPlan = {
  name: string;
  audience: string;
  includes: string[];
  highlight?: string;
  ctaLabel: string;
  whatsappMessage: string;
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

export type HowItWorksStep = {
  step: string;
  title: string;
  description: string;
  icon: 'analysis' | 'page' | 'launch';
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
  productBar: {
    title: string;
    subtitle: string;
    badge: string;
    items: ProductTopBarItem[];
  };
  navItems: NavItem[];
  contact: ContactInfo;
  routes: SiteRoutes;
  seo: SiteSeo;
  hero: {
    badge: string;
    badgeHref: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    supportingCopy: string;
    demosCtaLabel: string;
    primaryProductCtaLabel: string;
    exploreLinkLabel: string;
    panelAriaLabel: string;
    panelLabel: string;
    panelFlowNodes: [string, string, string];
    conversionKpiValue: string;
    conversionKpiLabel: string;
    metrics: HighlightMetric[];
  };
  howItWorks: {
    title: string;
    description: string;
    steps: HowItWorksStep[];
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
  socialProof: {
    eyebrow: string;
    title: string;
    description: string;
    metrics: SocialProofMetric[];
    items: SocialProofItem[];
  };
  whyCaptiva: {
    eyebrow: string;
    title: string;
    description: string;
    items: WhyCaptivaItem[];
  };
  offer: {
    eyebrow: string;
    title: string;
    description: string;
    includesTitle: string;
    includes: OfferIncludeItem[];
    notIncludesTitle: string;
    notIncludes: string[];
    deliveryTimeLabel: string;
    deliveryTimeValue: string;
    workflowTitle: string;
    workflowSteps: string[];
    plansTitle: string;
    plans: OfferPlan[];
    guarantee: string;
    guaranteeTitle: string;
    guaranteeDescription: string;
  };
  demos: {
    eyebrow: string;
    title: string;
    description: string;
    filtersAriaLabel: string;
    filterLabels: {
      all: string;
      fitness: string;
      salud: string;
      legal: string;
      belleza: string;
      negocios: string;
    };
    industryLinkPrefix: string;
    cardCtaLabel: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonLabel: string;
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
  pages: {
    industry: {
      eyebrow: string;
      sectorProblemTitle: string;
      solutionTitle: string;
      benefitsTitle: string;
      demosTitlePrefix: string;
      exploreOtherTitle: string;
      industryLinkLabel: string;
      ctaTitlePrefix: string;
      ctaDescription: string;
      ctaButtonLabel: string;
      demoCardCtaLabel: string;
    };
    demos: {
      collectionName: string;
      collectionDescription: string;
      breadcrumbDemosLabel: string;
      seoTitle: string;
      seoDescription: string;
      seoKeywords: string[];
    };
    blog: {
      eyebrow: string;
      title: string;
      description: string;
      cardDescription: string;
      readPostLabel: string;
      postEyebrow: string;
      sidebarAriaLabel: string;
      sidebarDemosTitle: string;
      sidebarDemosDescription: string;
      sidebarDemosLinkLabel: string;
      sidebarCtaTitle: string;
      sidebarCtaDescription: string;
      sidebarCtaButtonLabel: string;
      relatedTitle: string;
      seoTitle: string;
      seoDescription: string;
      seoKeywords: string[];
      plannedPosts: string[];
    };
    industryLinks: {
      eyebrow: string;
      title: string;
      description: string;
      seoBadgeLabel: string;
      ctaLabel: string;
    };
  };
};
