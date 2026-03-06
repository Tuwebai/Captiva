import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { initAnalytics, trackPageView } from '../utils/analytics';

export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);
}
