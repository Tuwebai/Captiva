import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { bootstrapGA, getAnalyticsMeasurementId, initGA, IS_ANALYTICS_ENABLED } from './gtag';

export function AnalyticsProvider({ children }: PropsWithChildren) {
  if (typeof window !== 'undefined' && IS_ANALYTICS_ENABLED) {
    bootstrapGA(getAnalyticsMeasurementId());
  }

  useEffect(() => {
    if (!IS_ANALYTICS_ENABLED) {
      return;
    }

    initGA(getAnalyticsMeasurementId());
  }, []);

  return children;
}
