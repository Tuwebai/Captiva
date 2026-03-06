type AnalyticsEventPayload = {
  event: string;
  category?: string;
  label?: string;
  value?: number;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
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

  if (GA_MEASUREMENT_ID && window.gtag) {
    window.gtag('event', 'page_view', {
      page_location: `${window.location.origin}${path}`,
      page_path: path,
    });
  }
}

export function trackEvent(payload: AnalyticsEventPayload) {
  if (typeof window === 'undefined') return;

  if (GA_MEASUREMENT_ID && window.gtag) {
    window.gtag('event', payload.event, {
      event_category: payload.category,
      event_label: payload.label,
      value: payload.value,
    });
  }
}
