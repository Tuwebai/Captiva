import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { trackEvent } from '../utils/analytics';
import { resolvePageContextFromPath } from '../utils/page-context';

export function usePageTracking() {
  const location = useLocation();
  const previousKeyRef = useRef<string>('');

  useEffect(() => {
    const routeKey = `${location.pathname}${location.search}${location.hash}`;
    if (previousKeyRef.current === routeKey) return;
    previousKeyRef.current = routeKey;

    const context = resolvePageContextFromPath(location.pathname);

    trackEvent('page_view', {
      path: routeKey,
      pathname: location.pathname,
      hash: location.hash,
      pageType: context.pageType,
      industry: context.industry ?? '',
      city: context.city ?? '',
      slug: context.slug ?? '',
    });
  }, [location.pathname, location.search, location.hash]);
}
