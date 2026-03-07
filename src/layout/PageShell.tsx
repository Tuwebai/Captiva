import { type PropsWithChildren, type ReactEventHandler, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ButtonLink } from '../components/ui/ButtonLink';
import { FeatureIcon } from '../components/ui/FeatureIcon';
import { siteConfig } from '../config/site';
import { useAnalytics } from '../hooks/useAnalytics';
import { useScrollRestoration } from '../hooks/useScrollRestoration';
import { trackEvent } from '../utils/analytics';

type RailItem = {
  label: string;
  href: string;
  type?: 'anchor' | 'route';
  icon: 'ready' | 'analysis' | 'missing' | 'conversion' | 'signal' | 'page' | 'launch' | 'contact' | 'structure';
};

export function PageShell({ children }: PropsWithChildren) {
  useAnalytics();
  useScrollRestoration();
  const location = useLocation();
  const isCaptivaContext = location.pathname.startsWith(siteConfig.routes.captiva);
  const [isRailCollapsed, setIsRailCollapsed] = useState(false);

  const railItems = useMemo<RailItem[]>(
    () => [
      { label: 'Inicio', href: siteConfig.routes.captiva, type: 'route', icon: 'ready' },
      { label: 'Como funciona', href: `${siteConfig.routes.captiva}#como-funciona`, icon: 'analysis' },
      { label: 'Demos', href: siteConfig.routes.captivaDemos, type: 'route', icon: 'page' },
      { label: 'Beneficios', href: `${siteConfig.routes.captiva}#beneficios`, icon: 'signal' },
      { label: 'Problema', href: `${siteConfig.routes.captiva}#problema`, icon: 'missing' },
      { label: 'Solucion', href: `${siteConfig.routes.captiva}#solucion`, icon: 'conversion' },
      { label: 'Industrias', href: `${siteConfig.routes.captiva}#industrias`, icon: 'structure' },
      { label: 'Proceso', href: `${siteConfig.routes.captiva}#proceso`, icon: 'launch' },
      { label: 'Contacto', href: `${siteConfig.routes.captiva}#contacto`, icon: 'contact' },
    ],
    [],
  );

  const handleLogoError: ReactEventHandler<HTMLImageElement> = (event) => {
    const img = event.currentTarget;

    if (!img.dataset.retry) {
      img.dataset.retry = '1';
      img.src = `/LOGO-captiva.png?retry=${Date.now()}`;
      return;
    }

    img.src = '/LOGO-captiva-icon.png';
  };

  return (
    <div className="site-shell">
      {!isCaptivaContext ? (
        <header className="site-header">
          <div className="container site-header__inner">
            <a className="brand-mark" href={siteConfig.routes.captiva}>
              <img
                className="brand-mark__logo"
                src="/LOGO-captiva.png"
                alt={siteConfig.productName}
                width={400}
                height={120}
                decoding="async"
                fetchPriority="high"
                onError={handleLogoError}
              />
            </a>

            <div className="site-header__actions">
              <ButtonLink
                href={siteConfig.contact.ctaHref}
                variant="primary"
                onClick={() => trackEvent({ event: 'cta_click', category: 'header', label: 'solicitar-informacion' })}
              >
                {siteConfig.primaryCtaLabel}
              </ButtonLink>
            </div>
          </div>
        </header>
      ) : null}

      {isCaptivaContext ? (
        <>
          <aside
            id="captiva-rail"
            className={`section-rail${isRailCollapsed ? ' section-rail--collapsed' : ''}`}
            aria-label="Navegacion de secciones"
          >
            <div className="section-rail__brand">
              <img
                className="section-rail__logo"
                src="/LOGO-captiva.png"
                alt={siteConfig.productName}
                width={280}
                height={84}
                loading="eager"
                decoding="async"
                onError={handleLogoError}
              />
              <div className="section-rail__brand-copy">
                <strong>{siteConfig.productBar.title}</strong>
                <span>{siteConfig.productBar.subtitle}</span>
                <em>{siteConfig.productBar.badge}</em>
              </div>
            </div>

            <button
              className="section-rail__toggle"
              type="button"
              onClick={() => {
                setIsRailCollapsed((previous) => !previous);
                trackEvent({ event: 'internal_nav', category: 'rail', label: isRailCollapsed ? 'expand' : 'collapse' });
              }}
            >
              {isRailCollapsed ? '>' : '<'}
            </button>

            <nav className="section-rail__nav">
              {railItems.map((item) => (
                item.type === 'route' ? (
                  <Link key={item.href} to={item.href} className="section-rail__link">
                    <FeatureIcon name={item.icon} />
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <a key={item.href} href={item.href} className="section-rail__link">
                    <FeatureIcon name={item.icon} />
                    <span>{item.label}</span>
                  </a>
                )
              ))}
            </nav>

            <ButtonLink
              className="section-rail__cta"
              href={siteConfig.contact.ctaHref}
              variant="primary"
              onClick={() => trackEvent({ event: 'cta_click', category: 'rail', label: 'solicitar-landing' })}
            >
              Solicitar landing
            </ButtonLink>
          </aside>
          <nav className="mobile-bottom-nav" aria-label="Navegacion movil">
            <Link
              className="mobile-bottom-nav__item"
              to={siteConfig.routes.captiva}
              onClick={() => trackEvent({ event: 'internal_nav', category: 'mobile-nav', label: 'inicio' })}
            >
              <FeatureIcon name="ready" />
              <span>Inicio</span>
            </Link>
            <Link
              className="mobile-bottom-nav__item"
              to={siteConfig.routes.captivaDemos}
              onClick={() => trackEvent({ event: 'internal_nav', category: 'mobile-nav', label: 'demos' })}
            >
              <FeatureIcon name="page" />
              <span>Demos</span>
            </Link>
            <a
              className="mobile-bottom-nav__cta"
              href={siteConfig.contact.ctaHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent({ event: 'cta_click', category: 'mobile-nav', label: 'whatsapp' })}
            >
              <span className="mobile-bottom-nav__whatsapp-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" focusable="false">
                  <path
                    d="M19.11 17.27c-.26-.13-1.53-.75-1.77-.84-.24-.09-.41-.13-.58.13-.17.26-.67.84-.82 1.01-.15.17-.3.19-.56.06-.26-.13-1.09-.4-2.07-1.27-.77-.68-1.29-1.52-1.44-1.78-.15-.26-.02-.4.11-.53.11-.11.26-.28.39-.41.13-.13.17-.22.26-.37.09-.15.04-.28-.02-.41-.06-.13-.58-1.4-.8-1.92-.21-.5-.43-.43-.58-.44-.15-.01-.33-.01-.5-.01s-.45.06-.69.32c-.24.26-.91.89-.91 2.17s.93 2.52 1.06 2.69c.13.17 1.84 2.81 4.45 3.94.62.27 1.11.43 1.49.55.63.2 1.2.17 1.65.1.5-.07 1.53-.62 1.74-1.23.22-.6.22-1.11.15-1.22-.06-.11-.24-.17-.5-.3Z"
                    fill="currentColor"
                  />
                  <path
                    d="M16 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.24.58 4.43 1.69 6.36L3.2 28.8l6.58-1.67a12.75 12.75 0 0 0 6.21 1.61c7.06 0 12.8-5.74 12.8-12.8S23.06 3.2 16 3.2Zm0 23.28c-2.01 0-3.98-.54-5.71-1.56l-.41-.24-3.91.99 1.04-3.81-.27-.43a10.53 10.53 0 0 1-1.64-5.61c0-5.86 4.77-10.63 10.63-10.63s10.63 4.77 10.63 10.63S21.86 26.48 16 26.48Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span>WhatsApp</span>
            </a>
            <a
              className="mobile-bottom-nav__item"
              href={`${siteConfig.routes.captiva}#industrias`}
              onClick={() => trackEvent({ event: 'internal_nav', category: 'mobile-nav', label: 'industrias' })}
            >
              <FeatureIcon name="structure" />
              <span>Industrias</span>
            </a>
            <a
              className="mobile-bottom-nav__item"
              href={`${siteConfig.routes.captiva}#proceso`}
              onClick={() => trackEvent({ event: 'internal_nav', category: 'mobile-nav', label: 'proceso' })}
            >
              <FeatureIcon name="launch" />
              <span>Proceso</span>
            </a>
          </nav>
        </>
      ) : null}

      <main className={`site-main${isCaptivaContext ? ' site-main--with-rail' : ''}${isRailCollapsed ? ' site-main--rail-collapsed' : ''}`}>
        {children}
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div className="footer-brand">
            <img
              className="footer-brand__logo"
              src="/LOGO-captiva.png"
              alt={siteConfig.productName}
              width={400}
              height={120}
              loading="lazy"
              decoding="async"
              onError={handleLogoError}
            />
            <p className="footer-title">
              {siteConfig.productName} by{' '}
              <a href="https://tuweb-ai.com" target="_blank" rel="noreferrer">
                {siteConfig.companyName}
              </a>
            </p>
            <p className="footer-copy">{siteConfig.description}</p>
          </div>

          <div className="footer-contact">
            <a
              className="footer-contact__card"
              href={`mailto:${siteConfig.contact.productEmail}`}
              onClick={() => trackEvent({ event: 'contact_click', category: 'footer', label: 'captiva-email' })}
            >
              <span className="footer-contact__label">Captiva</span>
              <span className="footer-contact__value">{siteConfig.contact.productEmail}</span>
            </a>
            <a
              className="footer-contact__card"
              href={`mailto:${siteConfig.contact.primaryEmail}`}
              onClick={() => trackEvent({ event: 'contact_click', category: 'footer', label: 'tuwebai-email' })}
            >
              <span className="footer-contact__label">Tuwebai</span>
              <span className="footer-contact__value">{siteConfig.contact.primaryEmail}</span>
            </a>
            <a
              className="footer-contact__card"
              href={siteConfig.contact.ctaHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent({ event: 'contact_click', category: 'footer', label: 'whatsapp' })}
            >
              <span className="footer-contact__label">WhatsApp</span>
              <span className="footer-contact__value">+{siteConfig.contact.whatsapp}</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
