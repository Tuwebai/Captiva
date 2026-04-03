import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { ANALYTICS_EVENTS } from './events';
import { useAnalytics } from './useAnalytics';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input[type="submit"], input[type="button"], summary';

function trimText(value: string | null | undefined) {
  if (!value) {
    return '';
  }

  return value.replace(/\s+/g, ' ').trim().slice(0, 120);
}

function getClickableElement(target: Element) {
  return target.closest(INTERACTIVE_SELECTOR) ?? target;
}

function resolveLabel(element: Element) {
  const htmlElement = element as HTMLElement;
  return (
    trimText(htmlElement.getAttribute('aria-label')) ||
    trimText(htmlElement.getAttribute('data-tooltip')) ||
    trimText(htmlElement.textContent) ||
    trimText(htmlElement.id) ||
    htmlElement.tagName.toLowerCase()
  );
}

function resolveSection(element: Element) {
  const sectionElement = element.closest('section[id], main[id], nav[id], footer[id], header[id], aside[id], form[id], article[id]');
  return sectionElement?.getAttribute('id') ?? 'unscoped';
}

function resolveRouteMeta(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute('href') ?? '';

  try {
    const url = new URL(anchor.href, window.location.origin);
    const isInternal = url.origin === window.location.origin;

    return {
      href,
      route_path: `${url.pathname}${url.search}${url.hash}`,
      route_kind: isInternal ? (url.hash ? 'internal-anchor' : 'internal-route') : 'external-route',
      is_internal_route: isInternal,
    };
  } catch {
    return {
      href,
      route_path: href,
      route_kind: href.startsWith('#') ? 'internal-anchor' : 'unknown',
      is_internal_route: href.startsWith('/') || href.startsWith('#'),
    };
  }
}

export function useClickTracking() {
  const location = useLocation();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const clickableElement = getClickableElement(target);
      const tagName = clickableElement.tagName.toLowerCase();
      const label = resolveLabel(clickableElement);
      const section = resolveSection(clickableElement);
      const className =
        clickableElement instanceof HTMLElement ? trimText(clickableElement.className) : '';

      trackEvent({
        action: ANALYTICS_EVENTS.CLICK_ANY,
        category: 'global-click',
        label,
        page_path: `${location.pathname}${location.search}${location.hash}`,
        element_tag: tagName,
        element_id: clickableElement.id || undefined,
        element_class: className || undefined,
        section_id: section,
      });

      if (clickableElement instanceof HTMLAnchorElement) {
        const routeMeta = resolveRouteMeta(clickableElement);

        trackEvent({
          action: ANALYTICS_EVENTS.CLICK_ROUTE,
          category: routeMeta.route_kind,
          label,
          page_path: `${location.pathname}${location.search}${location.hash}`,
          route_path: routeMeta.route_path,
          href: routeMeta.href,
          section_id: section,
          is_internal_route: routeMeta.is_internal_route,
        });
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [location.hash, location.pathname, location.search, trackEvent]);
}
