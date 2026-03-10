import type { SiteSeo } from '../types/site';

export const siteUrl = 'https://captiva.tuweb-ai.com';
export const defaultOgImage = '/LOGO-captiva.png';

export const seoConfig: SiteSeo = {
  siteUrl,
  defaultTitle: 'Captiva | Plataforma de landing pages para conversión',
  defaultDescription:
    'Captiva es el sistema de Tuwebai para captar clientes con landing pages optimizadas en conversión y contacto directo.',
  defaultImage: defaultOgImage,
  twitterCard: 'summary_large_image',
};
