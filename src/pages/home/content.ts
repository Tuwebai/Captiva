import { siteConfig } from '../../config/site';
import { faqSchema } from '../../sections/FaqSection';
import { demosManifest } from '../../data/demosManifest';

type FaqEntry = {
  question: string;
  answer: string;
};

const categoryByShowcaseSlug: Record<string, string> = {
  gimnasios: 'fitness',
  esteticas: 'estetica',
  abogados: 'legal',
  'negocios-locales': 'negocios-locales',
};

function extractFaqItems(): FaqEntry[] {
  const entities = Array.isArray(faqSchema.mainEntity) ? faqSchema.mainEntity : [];
  return entities.map((item) => ({
    question: item.name,
    answer: item.acceptedAnswer.text,
  }));
}

function findDemoHrefByShowcaseSlug(showcaseSlug: string) {
  const category = categoryByShowcaseSlug[showcaseSlug];
  if (!category) return siteConfig.routes.captivaDemos;

  const demo = demosManifest.find((item: { category: string; href: string }) => item.category === category);
  return demo?.href ?? siteConfig.routes.captivaDemos;
}

export const homeContent = {
  hero: {
    badge: siteConfig.hero.badge,
    badgeHref: siteConfig.hero.badgeHref,
    title: siteConfig.hero.title,
    supportingCopy: siteConfig.hero.supportingCopy,
    priceAnchor: siteConfig.hero.priceAnchor,
    primaryCtaLabel: siteConfig.primaryCtaLabel,
    primaryCtaHref: siteConfig.contact.ctaHref,
    secondaryCtaLabel: siteConfig.hero.demosCtaLabel,
    secondaryCtaHref: '#demos',
    microcopy: siteConfig.hero.ctaMicrocopy,
    kicker: siteConfig.description,
    checks: ['✓ Dominio', '✓ Landing', '✓ WhatsApp'],
    stats: siteConfig.hero.metrics,
    flow: siteConfig.hero.panelFlowNodes,
    previewDomain: new URL(siteConfig.seo.siteUrl).hostname.replace(/^www\./, ''),
    resultsLabel: siteConfig.hero.metrics[0]?.value ?? siteConfig.hero.conversionKpiValue,
    resultsCaption: siteConfig.hero.metrics[0]?.label ?? siteConfig.hero.conversionKpiLabel,
  },
  navItems: [
    { label: 'Demos', href: '#demos' },
    { label: 'Cómo funciona', href: '#como-funciona' },
    { label: 'Planes', href: '#planes' },
    { label: 'FAQ', href: '#faq' },
  ],
  demos: siteConfig.demos.items.map((item) => ({
    title: item.title,
    eyebrow: siteConfig.demos.eyebrow,
    description: item.description,
    href: findDemoHrefByShowcaseSlug(item.slug),
    cta: siteConfig.demos.cardCtaLabel,
  })),
  howItWorks: siteConfig.howItWorks,
  plans: siteConfig.offer.plans,
  socialProof: siteConfig.socialProof,
  faq: {
    title: 'Preguntas frecuentes',
    description: 'Si tu duda no está acá, mandanos un WhatsApp y te respondemos en menos de 2 horas.',
    items: extractFaqItems(),
  },
  finalCta: {
    title: siteConfig.demos.ctaTitle,
    description: siteConfig.demos.ctaDescription,
    href: siteConfig.contact.ctaHref,
    label: siteConfig.primaryCtaLabel,
  },
};
