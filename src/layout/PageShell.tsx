import { type PropsWithChildren, type ReactEventHandler } from 'react';
import { useLocation } from 'react-router-dom';

import { Footer } from '../components/layout/Footer';
import { MainLayout } from '../components/layout/MainLayout';
import { Navbar } from '../components/layout/Navbar';
import { useClickTracking, usePageTracking, useScrollDepth } from '../lib/analytics';
import { useTheme } from '../components/ui/theme/useTheme';
import { siteConfig } from '../config/site';
import { useScrollRestoration } from '../hooks/useScrollRestoration';

export function PageShell({ children }: PropsWithChildren) {
  useClickTracking();
  usePageTracking();
  useScrollDepth();
  useScrollRestoration();
  const { resolvedTheme } = useTheme();
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/+$/, '') || '/';
  const isLegalContext =
    normalizedPath === siteConfig.routes.termsOfService || normalizedPath === siteConfig.routes.privacyPolicy;
  const isCaptivaContext =
    normalizedPath.startsWith(siteConfig.routes.captiva) ||
    normalizedPath.startsWith('/landing-page-para-') ||
    normalizedPath.startsWith('/blog');
  const isCaptivaHome = normalizedPath === siteConfig.routes.captiva;
  const isCaptivaDemos =
    normalizedPath === siteConfig.routes.captivaDemos ||
    normalizedPath.startsWith(`${siteConfig.routes.captivaDemos}/`);
  const usesLegacyRail = false;
  const isRailCollapsed = false;

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

  return (
    <div className="site-shell">
      <Navbar
        visible={(!isCaptivaContext || isCaptivaDemos) && !isLegalContext}
        fullLogoSrc={fullLogoSrc}
        onLogoError={handleLogoError}
      />

      <MainLayout isCaptivaContext={usesLegacyRail && isCaptivaContext && !isCaptivaHome} isRailCollapsed={isRailCollapsed}>
        {children}
      </MainLayout>

      <Footer
        isCaptivaContext={usesLegacyRail && isCaptivaContext && !isCaptivaHome}
        isRailCollapsed={isRailCollapsed}
        fullLogoSrc={fullLogoSrc}
        onLogoError={handleLogoError}
      />
    </div>
  );
}
