import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { resolvePageContextFromPath } from '../../utils/page-context';
import { getPageTitle } from './routeTitles';
import { useAnalytics } from './useAnalytics';

export function usePageTracking() {
  const location = useLocation();
  const { trackPageView } = useAnalytics();
  const timeoutRef = useRef<number | null>(null);
  const lastTrackedRef = useRef('');

  useEffect(() => {
    const routeKey = `${location.pathname}${location.search}${location.hash}`;

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      if (lastTrackedRef.current === routeKey) {
        return;
      }

      lastTrackedRef.current = routeKey;
      const pageContext = resolvePageContextFromPath(location.pathname);
      trackPageView({
        page_title: getPageTitle(location.pathname),
        page_location: window.location.href,
        page_path: `${location.pathname}${location.search}`,
        page_type: pageContext.pageType,
      });
    }, 100);

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [location.hash, location.pathname, location.search, trackPageView]);
}
