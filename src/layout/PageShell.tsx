import { type PropsWithChildren, type ReactEventHandler, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Footer } from '../components/layout/Footer';
import { MainLayout } from '../components/layout/MainLayout';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import type { RailItem } from '../components/layout/types';
import { useTheme } from '../components/ui/theme/useTheme';
import { siteConfig } from '../config/site';
import { useAnalytics } from '../hooks/useAnalytics';
import { usePageShellNavigation } from '../hooks/usePageShellNavigation';
import { useScrollRestoration } from '../hooks/useScrollRestoration';
import { trackEvent } from '../utils/analytics';

export function PageShell({ children }: PropsWithChildren) {
  useAnalytics();
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
      { label: 'Planes', href: `${siteConfig.routes.captiva}#planes`, icon: 'process' },
      { label: 'Garantía', href: `${siteConfig.routes.captiva}#garantia`, icon: 'process' },
      { label: 'FAQ', href: `${siteConfig.routes.captiva}#faq`, icon: 'process' },
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
    setIsRailCollapsed((previous) => !previous);
    trackEvent({ event: 'internal_nav', category: 'rail', label: isRailCollapsed ? 'expand' : 'collapse' });
  };

  return (
    <div className="site-shell">
      <Navbar visible={!isCaptivaContext && !isLegalContext} fullLogoSrc={fullLogoSrc} onLogoError={handleLogoError} />

      <Sidebar
        visible={isCaptivaContext}
        isRailCollapsed={isRailCollapsed}
        isHomeNavActive={isHomeNavActive}
        fullLogoSrc={fullLogoSrc}
        onLogoError={handleLogoError}
        railItems={railItems}
        isAnchorActive={isAnchorActive}
        onToggleRail={handleRailToggle}
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
