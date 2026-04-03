export const ANALYTICS_EVENTS = {
  CTA_HERO_CLICK: 'cta_hero_click',
  CTA_SECTION_CLICK: 'cta_section_click',
  CTA_STICKY_CLICK: 'cta_sticky_click',
  CTA_FOOTER_CLICK: 'cta_footer_click',
  WHATSAPP_CLICK: 'whatsapp_click',
  WHATSAPP_FLOAT_CLICK: 'whatsapp_float_click',
  FORM_START: 'form_start',
  FORM_SUBMIT: 'form_submit',
  FORM_ERROR: 'form_error',
  SCROLL_25: 'scroll_25',
  SCROLL_50: 'scroll_50',
  SCROLL_75: 'scroll_75',
  SCROLL_90: 'scroll_90',
  DEMO_VIEW: 'demo_view',
  DEMO_CTA_CLICK: 'demo_cta_click',
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
