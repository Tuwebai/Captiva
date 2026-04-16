import type { SiteConfig } from '../types/site';

import { contactConfig, primaryCtaLabel } from './cta';
import { copyConfig } from './copy';
import { navigationItems, productBarItems } from './navigation';
import { productConfig } from './product';
import { routes } from './routes';
import { seoConfig } from './seo';

export { contactConfig, copyConfig, navigationItems, primaryCtaLabel, productConfig, routes, seoConfig };

export const siteConfig: SiteConfig = {
  productName: productConfig.productName,
  companyName: productConfig.companyName,
  description: productConfig.description,
  primaryCtaLabel,
  productBar: {
    title: productConfig.productBar.title,
    subtitle: productConfig.productBar.subtitle,
    badge: productConfig.productBar.badge,
    items: productBarItems,
  },
  navItems: navigationItems,
  contact: contactConfig,
  routes,
  seo: seoConfig,
  hero: copyConfig.hero,
  howItWorks: copyConfig.howItWorks,
  socialProof: copyConfig.socialProof,
  offer: copyConfig.offer,
  demos: copyConfig.demos,
  process: copyConfig.process,
  finalCta: copyConfig.finalCta,
  pages: copyConfig.pages,
};
