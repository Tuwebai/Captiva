import { gtagSend } from './gtag';

type LeadCurrency = 'ARS' | 'USD';
type LeadMethod = 'whatsapp' | 'form';

type LeadConversionParams = {
  currency: LeadCurrency;
  value: number;
  method: LeadMethod;
  source_section: string;
};

const SESSION_PREFIX = 'captiva:analytics:lead-conversion';

function buildLeadConversionKey(params: LeadConversionParams) {
  return `${SESSION_PREFIX}:${params.method}:${params.source_section}:${params.value}:${params.currency}`;
}

function hasSessionStorage() {
  return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
}

export function trackLeadConversion(params: LeadConversionParams) {
  if (typeof window === 'undefined') {
    return;
  }

  const sessionKey = buildLeadConversionKey(params);

  if (hasSessionStorage() && window.sessionStorage.getItem(sessionKey) === '1') {
    return;
  }

  gtagSend('event', 'generate_lead', params);
  gtagSend('event', 'captiva_lead', params);

  if (hasSessionStorage()) {
    window.sessionStorage.setItem(sessionKey, '1');
  }
}

export function trackDemoEngagement(slug: string, action: 'view' | 'cta_click'): void {
  gtagSend('event', 'captiva_demo_engagement', {
    demo_slug: slug,
    action,
  });
}
