import { siteConfig } from '../../config/site';
import { buildWhatsAppLeadUrl } from '../../utils/lead-message';
import { homeContent } from './content';

export const homeBridge = {
  siteConfig,
  waLink: siteConfig.contact.ctaHref,
  primaryWaByMessage: (message: string) => buildWhatsAppLeadUrl(siteConfig.contact.whatsapp, message),
  ...homeContent,
};
