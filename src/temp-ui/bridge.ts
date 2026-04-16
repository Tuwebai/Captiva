import { siteConfig } from '../config/site';
import { faqSchema } from '../sections/FaqSection';
import { findDemoHrefByShowcaseSlug } from '../utils/demo-showcase';
import { buildWhatsAppLeadUrl } from '../utils/lead-message';

type FaqEntry = {
  question: string;
  answer: string;
};

function extractFaqItems(): FaqEntry[] {
  const entities = Array.isArray(faqSchema.mainEntity) ? faqSchema.mainEntity : [];
  return entities.map((item) => ({
    question: item.name,
    answer: item.acceptedAnswer.text,
  }));
}

export const tempUiBridge = {
  siteConfig,
  waLink: siteConfig.contact.ctaHref,
  primaryWaByMessage: (message: string) => buildWhatsAppLeadUrl(siteConfig.contact.whatsapp, message),
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
    kicker: 'Para negocios en Argentina y Latinoamérica',
    checks: ['✓ Dominio', '✓ 5 días', '✓ WhatsApp'],
    stats: siteConfig.hero.metrics,
    flow: siteConfig.hero.panelFlowNodes,
  },
  navItems: [
    { label: 'Demos', href: '#demos' },
    { label: 'Cómo funciona', href: '#como-funciona' },
    { label: 'Planes', href: '#planes' },
    { label: 'FAQ', href: '#faq' },
  ],
  demos: siteConfig.demos.items.map((item) => ({
    title: item.title,
    description: item.description,
    href: findDemoHrefByShowcaseSlug(item.slug) ?? siteConfig.routes.captivaDemos,
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
    title: siteConfig.faq.ctaTitle,
    description: siteConfig.faq.ctaDescription,
    href: siteConfig.contact.ctaHref,
    label: siteConfig.primaryCtaLabel,
  },
};
