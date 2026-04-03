import { useCallback } from 'react';

import { ANALYTICS_EVENTS } from './events';
import { trackLeadConversion } from './conversions';
import { IS_ANALYTICS_ENABLED, gtagSend } from './gtag';

export type TrackEventParams = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
};

export type TrackPageViewParams = {
  page_title: string;
  page_location: string;
  page_path: string;
  page_type?: string;
};

export type TrackConversionParams = {
  conversion_type: 'whatsapp_click' | 'form_submit' | 'cta_click' | 'demo_request';
  business_type?: string;
  source_section?: string;
  value?: number;
};

export function useAnalytics() {
  const canSendEvents = IS_ANALYTICS_ENABLED || (typeof window !== 'undefined' && typeof window.gtag === 'function');

  const trackEvent = useCallback((params: TrackEventParams) => {
    if (!canSendEvents) {
      return;
    }

    const { action, category, label, value, ...rest } = params;
    gtagSend('event', action, {
      event_category: category,
      event_label: label,
      value,
      ...rest,
    });
  }, [canSendEvents]);

  const trackPageView = useCallback((params: TrackPageViewParams) => {
    if (!canSendEvents) {
      return;
    }

    gtagSend('event', 'page_view', params);
  }, [canSendEvents]);

  const trackConversion = useCallback((params: TrackConversionParams) => {
    if (!canSendEvents) {
      return;
    }

    gtagSend('event', params.conversion_type, {
      business_type: params.business_type,
      source_section: params.source_section,
      value: params.value,
    });
  }, [canSendEvents]);

  const trackWhatsApp = useCallback(
    (sourceSection: string, label?: string, businessType?: string) => {
      trackEvent({
        action: ANALYTICS_EVENTS.WHATSAPP_CLICK,
        category: 'whatsapp',
        label,
        source_section: sourceSection,
        business_type: businessType,
      });

      trackConversion({
        conversion_type: 'whatsapp_click',
        business_type: businessType,
        source_section: sourceSection,
      });
    },
    [trackConversion, trackEvent],
  );

  const trackFormSubmit = useCallback(
    (sourceSection: string, businessType?: string, value?: number) => {
      trackEvent({
        action: ANALYTICS_EVENTS.FORM_SUBMIT,
        category: 'lead_form',
        source_section: sourceSection,
        business_type: businessType,
        value,
      });

      trackConversion({
        conversion_type: 'form_submit',
        business_type: businessType,
        source_section: sourceSection,
        value,
      });
    },
    [trackConversion, trackEvent],
  );

  return {
    trackEvent,
    trackPageView,
    trackConversion,
    trackWhatsApp,
    trackFormSubmit,
    trackLeadConversion,
  };
}
