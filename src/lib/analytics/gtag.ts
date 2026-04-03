import { ANALYTICS_EVENTS } from './events';

type GtagCommand = 'config' | 'consent' | 'event' | 'js' | 'set';

type GtagControlParams = Record<string, string | number | boolean | undefined>;

type GtagConfigParams = {
  send_page_view?: boolean;
  page_title?: string;
  page_location?: string;
  page_path?: string;
  debug_mode?: boolean;
  user_properties?: Record<string, string>;
};

type GtagEventParams = GtagControlParams & {
  event_category?: string;
  event_label?: string;
  value?: number;
};

type GtagFunction = {
  (command: 'js', date: Date): void;
  (command: 'config', targetId: string, config?: GtagConfigParams): void;
  (command: 'event', eventName: string, params?: GtagEventParams): void;
  (command: 'set', params: GtagControlParams): void;
  (command: 'consent', action: string, params: GtagControlParams): void;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: GtagFunction;
    __captivaGaScriptQueued?: boolean;
    __captivaGaScriptLoaded?: boolean;
  }
}

const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_ID?.trim() ?? '';

export const IS_ANALYTICS_ENABLED = import.meta.env.PROD && isValidMeasurementId(GA4_MEASUREMENT_ID);

function isValidMeasurementId(measurementId: string) {
  return /^G-[A-Z0-9]+$/i.test(measurementId);
}

function getSiteType(pathname: string) {
  return pathname.startsWith('/demo/') || pathname.startsWith('/demos/') ? 'captiva_demo' : 'captiva_main';
}

function isAnalyticsDebugEnabled() {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const url = new URL(window.location.href);
    return url.searchParams.get('ga_debug') === '1' || window.localStorage.getItem('captiva:ga-debug') === '1';
  } catch {
    return false;
  }
}

function ensureDataLayer() {
  window.dataLayer = window.dataLayer ?? [];
}

function installGtagStub() {
  if (window.gtag) {
    return;
  }

  window.gtag = function gtag(command: GtagCommand, target: string | Date | GtagControlParams, params?: GtagControlParams) {
    window.dataLayer.push([command, target, params]);
  } as GtagFunction;
}

function injectScript(measurementId: string) {
  if (window.__captivaGaScriptLoaded) {
    return;
  }

  if (!document.querySelector(`script[data-captiva-ga="true"][src*="${measurementId}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.dataset.captivaGa = 'true';
    document.head.appendChild(script);
  }

  window.__captivaGaScriptLoaded = true;
}

function scheduleAfterLoad(callback: () => void) {
  if (document.readyState === 'complete') {
    callback();
    return;
  }

  if (window.__captivaGaScriptQueued) {
    return;
  }

  window.__captivaGaScriptQueued = true;
  window.addEventListener(
    'load',
    () => {
      callback();
    },
    { once: true },
  );
}

function scheduleIdle(callback: () => void) {
  const idleWindow = window as Window & {
    requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  };

  if (typeof idleWindow.requestIdleCallback === 'function') {
    idleWindow.requestIdleCallback(() => callback());
    return;
  }

  window.setTimeout(callback, 0);
}

export function bootstrapGA(measurementId: string = GA4_MEASUREMENT_ID): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  if (!IS_ANALYTICS_ENABLED || !isValidMeasurementId(measurementId)) {
    return false;
  }

  ensureDataLayer();
  installGtagStub();
  return true;
}

export function initGA(measurementId: string = GA4_MEASUREMENT_ID): void {
  if (!bootstrapGA(measurementId)) {
    return;
  }

  scheduleAfterLoad(() => {
    injectScript(measurementId);
  });

  window.gtag?.('js', new Date());

  scheduleIdle(() => {
    window.gtag?.('config', measurementId, {
      send_page_view: false,
      debug_mode: isAnalyticsDebugEnabled(),
      user_properties: {
        site_type: getSiteType(window.location.pathname),
      },
    });

    window.gtag?.('event', ANALYTICS_EVENTS.SESSION_BOOTSTRAP, {
      page_path: window.location.pathname,
      site_type: getSiteType(window.location.pathname),
      debug_mode: isAnalyticsDebugEnabled(),
    });
  });
}

export function gtagSend(command: 'js', date: Date): void;
export function gtagSend(command: 'config', targetId: string, config?: GtagConfigParams): void;
export function gtagSend(command: 'event', eventName: string, params?: GtagEventParams): void;
export function gtagSend(command: 'set', params: GtagControlParams): void;
export function gtagSend(command: 'consent', action: string, params: GtagControlParams): void;
export function gtagSend(...args: unknown[]): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  (window.gtag as (...gtagArgs: unknown[]) => void)(...args);
}

export function getAnalyticsMeasurementId() {
  return GA4_MEASUREMENT_ID;
}
