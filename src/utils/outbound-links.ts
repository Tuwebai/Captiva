import { trackEvent } from './analytics';
import { resolveCurrentPageContext } from './page-context';

function isExternalAnchor(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute('href');
  if (!href) return false;
  if (href.startsWith('#') || href.startsWith('/')) return false;

  try {
    const targetUrl = new URL(href, window.location.origin);
    if (!['http:', 'https:'].includes(targetUrl.protocol)) return false;
    return targetUrl.origin !== window.location.origin;
  } catch {
    return false;
  }
}

export function setupOutboundLinkTracking() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => undefined;
  }

  const onClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    const anchor = target?.closest('a');
    if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
    if (!isExternalAnchor(anchor)) return;

    const page = resolveCurrentPageContext();
    trackEvent('outbound_click', {
      url: anchor.href,
      linkText: (anchor.textContent ?? '').trim(),
      sourcePage: page.path,
      pageType: page.pageType,
      industry: page.industry ?? '',
      city: page.city ?? '',
      slug: page.slug ?? '',
    });
  };

  document.addEventListener('click', onClick);
  return () => {
    document.removeEventListener('click', onClick);
  };
}
