import React from 'react';
import { act } from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { trackLeadConversion } from '../conversions';
import { initGA, IS_ANALYTICS_ENABLED } from '../gtag';
import { useAnalytics } from '../useAnalytics';
import { useScrollDepth } from '../useScrollDepth';

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  callback: IntersectionObserverCallback;
  observed = new Set<Element>();

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }

  disconnect() {
    this.observed.clear();
  }

  observe(element: Element) {
    this.observed.add(element);
  }

  unobserve(element: Element) {
    this.observed.delete(element);
  }

  trigger(element: Element) {
    this.callback(
      [
        {
          isIntersecting: true,
          target: element,
        } as IntersectionObserverEntry,
      ],
      this as unknown as IntersectionObserver,
    );
  }
}

function ScrollDepthHarness() {
  useScrollDepth();
  return null;
}

function AnalyticsHarness({ onReady }: { onReady: (analytics: ReturnType<typeof useAnalytics>) => void }) {
  const analytics = useAnalytics();

  React.useEffect(() => {
    onReady(analytics);
  }, [analytics, onReady]);

  return null;
}

describe('analytics', () => {
  let rootNode: HTMLDivElement;
  let root: ReactDOM.Root;

  beforeEach(() => {
    rootNode = document.createElement('div');
    document.body.innerHTML = '';
    document.body.appendChild(rootNode);
    root = ReactDOM.createRoot(rootNode);
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: MockIntersectionObserver,
    });
    MockIntersectionObserver.instances = [];
    window.sessionStorage.clear();
    window.gtag = vi.fn() as unknown as typeof window.gtag;
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    vi.restoreAllMocks();
  });

  it('initGA no hace nada si analytics esta deshabilitado', () => {
    const appendSpy = vi.spyOn(document.head, 'appendChild');

    initGA('');

    expect(IS_ANALYTICS_ENABLED).toBe(false);
    expect(appendSpy).not.toHaveBeenCalled();
  });

  it('trackEvent no lanza si window.gtag no existe', () => {
    window.gtag = undefined;
    let analyticsApi: ReturnType<typeof useAnalytics> | null = null;

    act(() => {
      root.render(
        React.createElement(AnalyticsHarness, {
          onReady: (analytics) => {
            analyticsApi = analytics;
          },
        }),
      );
    });

    expect(() =>
      analyticsApi?.trackEvent({
        action: 'custom_event',
        category: 'test',
      }),
    ).not.toThrow();
  });

  it('useScrollDepth no trackea el mismo milestone dos veces', () => {
    const gtagMock = vi.fn();
    window.gtag = gtagMock as unknown as typeof window.gtag;

    act(() => {
      root.render(
        React.createElement(
          MemoryRouter,
          { initialEntries: ['/captiva'] },
          React.createElement(ScrollDepthHarness),
        ),
      );
    });

    const firstObserver = MockIntersectionObserver.instances[0];
    const marker25 = Array.from(firstObserver.observed).find(
      (element) => element.getAttribute('data-scroll-depth') === '25',
    );

    expect(marker25).toBeTruthy();

    firstObserver.trigger(marker25!);
    firstObserver.trigger(marker25!);

    expect(gtagMock).toHaveBeenCalledTimes(1);
  });

  it('trackLeadConversion envia generate_lead con parametros correctos', () => {
    const gtagMock = vi.fn();
    window.gtag = gtagMock as unknown as typeof window.gtag;

    trackLeadConversion({
      currency: 'ARS',
      value: 1500,
      method: 'form',
      source_section: 'contacto',
    });

    expect(gtagMock).toHaveBeenCalledWith('event', 'generate_lead', {
      currency: 'ARS',
      value: 1500,
      method: 'form',
      source_section: 'contacto',
    });
  });
});
