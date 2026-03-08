type AnalyticsEventName =
  | 'page_view'
  | 'cta_click'
  | 'demo_click'
  | 'lead_submit'
  | 'scroll_depth'
  | 'outbound_click'
  | 'internal_nav'
  | string;

type AnalyticsEventPayload = {
  event: AnalyticsEventName;
  category?: string;
  label?: string;
  value?: number;
  properties?: Record<string, unknown>;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;

let gaInitialized = false;
let plausibleInitialized = false;

function appendScript(src: string, attrs: Record<string, string> = {}) {
  if (document.querySelector(`script[src="${src}"]`)) return;

  const script = document.createElement('script');
  script.src = src;
  script.async = true;

  Object.entries(attrs).forEach(([key, value]) => {
    script.setAttribute(key, value);
  });

  document.head.appendChild(script);
}

export function initAnalytics() {
  if (typeof window === 'undefined') return;

  if (GA_MEASUREMENT_ID && !gaInitialized) {
    appendScript(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`);
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args as unknown as Record<string, unknown>);
    };

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
    gaInitialized = true;
  }

  if (PLAUSIBLE_DOMAIN && !plausibleInitialized) {
    appendScript('https://plausible.io/js/script.js', {
      'data-domain': PLAUSIBLE_DOMAIN,
    });
    plausibleInitialized = true;
  }
}

export function trackPageView(path: string) {
  if (typeof window === 'undefined') return;
  trackEvent('page_view', { path, page_path: path, page_location: `${window.location.origin}${path}` });
}

function toPlausibleProps(properties: Record<string, unknown> | undefined) {
  if (!properties) return undefined;

  const props: Record<string, string | number | boolean> = {};
  Object.entries(properties).forEach(([key, value]) => {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      props[key] = value;
      return;
    }
    if (value == null) return;
    props[key] = String(value);
  });
  return Object.keys(props).length ? props : undefined;
}

function normalizeEvent(
  eventOrPayload: AnalyticsEventName | AnalyticsEventPayload,
  payload: Record<string, unknown> = {},
): AnalyticsEventPayload {
  if (typeof eventOrPayload === 'string') {
    return {
      event: eventOrPayload,
      properties: payload,
    };
  }
  return eventOrPayload;
}

export function trackEvent(eventName: AnalyticsEventName, payload?: Record<string, unknown>): void;
export function trackEvent(payload: AnalyticsEventPayload): void;
export function trackEvent(
  eventOrPayload: AnalyticsEventName | AnalyticsEventPayload,
  payload?: Record<string, unknown>,
) {
  if (typeof window === 'undefined') return;
  const eventPayload = normalizeEvent(eventOrPayload, payload);
  const eventProperties = eventPayload.properties ?? {};
  const shouldLog = import.meta.env.DEV;
  const gaEnabled = Boolean(GA_MEASUREMENT_ID && window.gtag);
  const plausibleEnabled = Boolean(PLAUSIBLE_DOMAIN && window.plausible);

  if (gaEnabled && window.gtag) {
    window.gtag('event', eventPayload.event, {
      event_category: eventPayload.category,
      event_label: eventPayload.label,
      value: eventPayload.value,
      ...eventProperties,
    });
  }

  if (plausibleEnabled && window.plausible) {
    window.plausible(eventPayload.event, {
      props: toPlausibleProps({
        category: eventPayload.category ?? '',
        label: eventPayload.label ?? '',
        value: eventPayload.value ?? '',
        ...eventProperties,
      }),
    });
  }

  if (shouldLog && !gaEnabled && !plausibleEnabled) {
    // Useful local fallback when no analytics provider is configured.
    // Keeps instrumentation testable without external services.
    // eslint-disable-next-line no-console
    console.info('[analytics]', eventPayload.event, {
      category: eventPayload.category,
      label: eventPayload.label,
      value: eventPayload.value,
      ...eventProperties,
    });
  }
}
