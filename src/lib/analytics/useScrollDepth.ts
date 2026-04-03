import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { ANALYTICS_EVENTS } from './events';
import { useAnalytics } from './useAnalytics';

const MILESTONES = [
  { percent: 25, action: ANALYTICS_EVENTS.SCROLL_25 },
  { percent: 50, action: ANALYTICS_EVENTS.SCROLL_50 },
  { percent: 75, action: ANALYTICS_EVENTS.SCROLL_75 },
  { percent: 90, action: ANALYTICS_EVENTS.SCROLL_90 },
] as const;

function getScrollableHeight() {
  const documentHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  return Math.max(documentHeight - window.innerHeight, 0);
}

export function useScrollDepth() {
  const location = useLocation();
  const { trackEvent } = useAnalytics();
  const triggeredMilestonesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    triggeredMilestonesRef.current = new Set();

    const markers: HTMLDivElement[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const percent = Number(entry.target.getAttribute('data-scroll-depth'));
          const milestone = MILESTONES.find((item) => item.percent === percent);
          if (!milestone || triggeredMilestonesRef.current.has(percent)) {
            return;
          }

          triggeredMilestonesRef.current.add(percent);
          trackEvent({
            action: milestone.action,
            category: 'scroll_depth',
            label: `${percent}%`,
            page_path: `${location.pathname}${location.search}`,
            value: percent,
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.01 },
    );

    const scrollableHeight = getScrollableHeight();

    MILESTONES.forEach((milestone) => {
      const marker = document.createElement('div');
      marker.setAttribute('data-scroll-depth', String(milestone.percent));
      marker.setAttribute('aria-hidden', 'true');
      marker.style.position = 'absolute';
      marker.style.left = '0';
      marker.style.top = `${Math.max(1, Math.round((scrollableHeight * milestone.percent) / 100))}px`;
      marker.style.width = '1px';
      marker.style.height = '1px';
      marker.style.pointerEvents = 'none';
      marker.style.opacity = '0';
      document.body.appendChild(marker);
      markers.push(marker);
      observer.observe(marker);
    });

    return () => {
      observer.disconnect();
      markers.forEach((marker) => marker.remove());
    };
  }, [location.pathname, location.search, trackEvent]);
}
