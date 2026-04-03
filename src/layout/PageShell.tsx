import { type PropsWithChildren, type ReactEventHandler, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Footer } from '../components/layout/Footer';
import { MainLayout } from '../components/layout/MainLayout';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import type { RailItem } from '../components/layout/types';
import { useAnalytics, usePageTracking, useScrollDepth } from '../lib/analytics';
import { useTheme } from '../components/ui/theme/useTheme';
import { siteConfig } from '../config/site';
import { usePageShellNavigation } from '../hooks/usePageShellNavigation';
import { useScrollRestoration } from '../hooks/useScrollRestoration';

export function PageShell({ children }: PropsWithChildren) {
  const { trackEvent } = useAnalytics();
  usePageTracking();
  useScrollDepth();
  useScrollRestoration();
  const { resolvedTheme } = useTheme();
  const location = useLocation();
  const isLegalContext =
    location.pathname === siteConfig.routes.termsOfService || location.pathname === siteConfig.routes.privacyPolicy;
  const isCaptivaContext =
    location.pathname.startsWith(siteConfig.routes.captiva) ||
    location.pathname.startsWith('/landing-page-para-') ||
    location.pathname.startsWith('/blog');
  const isCaptivaHome = location.pathname === siteConfig.routes.captiva;
  const [isRailCollapsed, setIsRailCollapsed] = useState(false);
  const [isMobileRailOpen, setIsMobileRailOpen] = useState(false);

  const railItems = useMemo<RailItem[]>(
    () => [
      { label: 'Inicio', href: siteConfig.routes.captiva, type: 'route', icon: 'home' },
      { label: 'Cómo funciona', href: `${siteConfig.routes.captiva}#como-funciona`, icon: 'how' },
      { label: 'Demos', href: siteConfig.routes.captivaDemos, type: 'route', icon: 'demos' },
      { label: 'Blog', href: '/blog', type: 'route', icon: 'blog' },
      { label: 'Beneficios', href: `${siteConfig.routes.captiva}#beneficios`, icon: 'benefits' },
      { label: 'Por qué Captiva', href: `${siteConfig.routes.captiva}#por-que-captiva`, icon: 'solution' },
      { label: 'Prueba social', href: `${siteConfig.routes.captiva}#prueba-social`, icon: 'benefits' },
      { label: 'Qué incluye', href: `${siteConfig.routes.captiva}#oferta`, icon: 'industries' },
      { label: 'Planes', href: `${siteConfig.routes.captiva}#planes`, icon: 'page' },
      { label: 'Garantía', href: `${siteConfig.routes.captiva}#garantia`, icon: 'ready' },
      { label: 'FAQ', href: `${siteConfig.routes.captiva}#faq`, icon: 'clarity' },
      { label: 'Contacto', href: `${siteConfig.routes.captiva}#contacto`, icon: 'contact-nav' },
    ],
    [],
  );

  const { handleAnchorSelect, isAnchorActive, isHomeNavActive } = usePageShellNavigation({
    isCaptivaHome,
    hash: location.hash,
    railItems,
  });
  const fullLogoSrc = resolvedTheme === 'light' ? '/LOGO-captiva-light.png' : '/LOGO-captiva.png';

  const handleLogoError: ReactEventHandler<HTMLImageElement> = (event) => {
    const img = event.currentTarget;

    if (!img.dataset.retry) {
      img.dataset.retry = '1';
      img.src = `${fullLogoSrc}?retry=${Date.now()}`;
      return;
    }

    img.src = '/LOGO-captiva-icon.png';
  };

  const handleRailToggle = () => {
    const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;

    if (isMobileViewport) {
      setIsMobileRailOpen((previous) => {
        const next = !previous;
        trackEvent({ action: 'internal_nav', category: 'rail', label: next ? 'open-mobile' : 'close-mobile' });
        return next;
      });
      return;
    }

    setIsRailCollapsed((previous) => {
      const next = !previous;
      trackEvent({ action: 'internal_nav', category: 'rail', label: next ? 'collapse' : 'expand' });
      return next;
    });
  };

  const handleCloseMobileRail = () => {
    setIsMobileRailOpen(false);
  };

  useEffect(() => {
    setIsMobileRailOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <div className="site-shell">
      <Navbar visible={!isCaptivaContext && !isLegalContext} fullLogoSrc={fullLogoSrc} onLogoError={handleLogoError} />

      <Sidebar
        visible={isCaptivaContext}
        isRailCollapsed={isRailCollapsed}
        isMobileRailOpen={isMobileRailOpen}
        isHomeNavActive={isHomeNavActive}
        fullLogoSrc={fullLogoSrc}
        onLogoError={handleLogoError}
        railItems={railItems}
        isAnchorActive={isAnchorActive}
        onToggleRail={handleRailToggle}
        onCloseMobileRail={handleCloseMobileRail}
        onSelectAnchor={handleAnchorSelect}
      />

      <MainLayout isCaptivaContext={isCaptivaContext} isRailCollapsed={isRailCollapsed}>
        {children}
      </MainLayout>

      <Footer
        isCaptivaContext={isCaptivaContext}
        isRailCollapsed={isRailCollapsed}
        fullLogoSrc={fullLogoSrc}
        onLogoError={handleLogoError}
      />
    </div>
  );
}
