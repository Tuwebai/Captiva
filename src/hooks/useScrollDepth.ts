import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { trackEvent } from '../utils/analytics';
import { resolvePageContextFromPath } from '../utils/page-context';

const DEPTH_MILESTONES = [25, 50, 75, 100] as const;

function readScrollPercent() {
  const doc = document.documentElement;
  const body = document.body;
  const scrollTop = window.scrollY || doc.scrollTop || body.scrollTop;
  const totalHeight = Math.max(doc.scrollHeight, body.scrollHeight) - window.innerHeight;
  if (totalHeight <= 0) return 100;
  return Math.min(100, Math.max(0, Math.round((scrollTop / totalHeight) * 100)));
}

export function useScrollDepth() {
  const location = useLocation();
  const triggeredMilestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    triggeredMilestones.current = new Set();

    const trackByPercent = () => {
      const percent = readScrollPercent();
      const context = resolvePageContextFromPath(location.pathname);

      DEPTH_MILESTONES.forEach((milestone) => {
        if (percent < milestone || triggeredMilestones.current.has(milestone)) return;

        triggeredMilestones.current.add(milestone);
        trackEvent('scroll_depth', {
          percent: milestone,
          path: `${location.pathname}${location.search}${location.hash}`,
          pageType: context.pageType,
          industry: context.industry ?? '',
          city: context.city ?? '',
          slug: context.slug ?? '',
        });
      });
    };

    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        trackByPercent();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    trackByPercent();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [location.pathname, location.search, location.hash]);
}
