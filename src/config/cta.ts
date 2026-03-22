import type { ContactInfo } from '../types/site';

export const primaryCtaLabel = 'Quiero mi landing';

const whatsappMessage = encodeURIComponent(
  'Hola, quiero información sobre Captiva como sistema de captación de clientes. Quiero conocer opciones, tiempos de entrega y próximos pasos.',
);

export const contactConfig: ContactInfo = {
  primaryEmail: 'captiva@tuweb-ai.com',
  productEmail: 'captiva@tuweb-ai.com',
  whatsapp: '5493571417960',
  ctaHref: `https://wa.me/5493571417960?text=${whatsappMessage}`,
};
