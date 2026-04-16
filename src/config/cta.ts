import type { ContactInfo } from '../types/site';

export const primaryCtaLabel = 'Quiero empezar ahora';

const whatsappMessage = encodeURIComponent(
  'Hola, vi Captiva y quiero una landing para mi negocio. Rubro: [tu rubro]. ¿Cómo arrancamos?',
);

export const contactConfig: ContactInfo = {
  primaryEmail: 'captiva@tuweb-ai.com',
  productEmail: 'captiva@tuweb-ai.com',
  whatsapp: '5493571417960',
  ctaHref: `https://wa.me/5493571417960?text=${whatsappMessage}`,
};
