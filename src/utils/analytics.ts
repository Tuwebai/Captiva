import { getAnalyticsMeasurementId, gtagSend, initGA } from '../lib/analytics/gtag';

type AnalyticsEventName = string;

type AnalyticsEventPayload = {
  event: AnalyticsEventName;
  category?: string;
  label?: string;
  value?: number;
  properties?: Record<string, unknown>;
};

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

function toPrimitiveRecord(properties: Record<string, unknown>) {
  const normalized: Record<string, string | number | boolean | undefined> = {};

  Object.entries(properties).forEach(([key, value]) => {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === undefined) {
      normalized[key] = value;
      return;
    }

    if (value == null) {
      normalized[key] = undefined;
      return;
    }

    normalized[key] = String(value);
  });

  return normalized;
}

export function initAnalytics() {
  initGA(getAnalyticsMeasurementId());
}

export function trackPageView(path: string) {
  if (typeof window === 'undefined') {
    return;
  }

  gtagSend('event', 'page_view', {
    page_location: `${window.location.origin}${path}`,
    page_path: path,
    page_title: document.title || 'Captiva',
  });
}

export function trackEvent(eventName: AnalyticsEventName, payload?: Record<string, unknown>): void;
export function trackEvent(payload: AnalyticsEventPayload): void;
export function trackEvent(
  eventOrPayload: AnalyticsEventName | AnalyticsEventPayload,
  payload?: Record<string, unknown>,
) {
  if (typeof window === 'undefined') {
    return;
  }

  const eventPayload = normalizeEvent(eventOrPayload, payload);
  const eventProperties = toPrimitiveRecord(eventPayload.properties ?? {});

  gtagSend('event', eventPayload.event, {
    event_category: eventPayload.category,
    event_label: eventPayload.label,
    value: eventPayload.value,
    ...eventProperties,
  });
}
