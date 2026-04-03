import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { getAnalyticsMeasurementId, initGA, IS_ANALYTICS_ENABLED } from './gtag';

export function AnalyticsProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    if (!IS_ANALYTICS_ENABLED) {
      return;
    }

    initGA(getAnalyticsMeasurementId());
  }, []);

  return children;
}
