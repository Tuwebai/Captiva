import { resolve } from 'node:path';

export const DEFAULT_DEMO_PREVIEW = '/assets/placeholders/captiva-demo-preview.svg';
export const DEFAULT_DEMO_PREVIEW_PATH = resolve(
  process.cwd(),
  'public/assets/placeholders/captiva-demo-preview.svg',
);

export const DEFAULT_DEMO_SECTIONS = [
  'hero-premium',
  'benefits-enterprise',
  'process-premium',
  'services-catalog',
  'plans-premium',
  'gallery-premium',
  'testimonials-carousel',
  'faq-premium',
  'cta-final',
  'contact-split',
  'footer-corporate',
];
