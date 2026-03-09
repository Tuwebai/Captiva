import { type PropsWithChildren, type ReactEventHandler, useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { ButtonLink } from '../components/ui/ButtonLink';
import { FeatureIcon } from '../components/ui/FeatureIcon';
import { PanelToggleIcon } from '../components/ui/PanelToggleIcon';
import { ThemeSwitch } from '../components/ui/theme/ThemeSwitch';
import { useTheme } from '../components/ui/theme/useTheme';
import { siteConfig } from '../config/site';
import { useAnalytics } from '../hooks/useAnalytics';
import { useScrollRestoration } from '../hooks/useScrollRestoration';
import { trackEvent } from '../utils/analytics';

type RailItem = {
  label: string;
  href: string;
  type?: 'anchor' | 'route';
  icon:
    | 'home'
    | 'how'
    | 'problem'
    | 'solution'
    | 'benefits'
    | 'demos'
    | 'blog'
    | 'industries'
    | 'process'
    | 'contact-nav';
};

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
  const [activeSectionId, setActiveSectionId] = useState('');
  const [isNearTop, setIsNearTop] = useState(true);

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

  useEffect(() => {
    if (!isCaptivaHome) {
      setActiveSectionId('');
      return;
    }

    const anchorIds = railItems
      .filter((item) => item.type !== 'route')
      .map((item) => item.href.split('#')[1])
      .filter((value): value is string => Boolean(value));

    if (!anchorIds.length) return;

    const sections = anchorIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!sections.length) return;

    const computeActiveSection = () => {
      const activationOffset = Math.max(120, window.innerHeight * 0.22);
      let currentId = sections[0].id;

      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;
        if (top - activationOffset <= 0) {
          currentId = section.id;
        }
      });

      const scrollBottom = window.scrollY + window.innerHeight;
      const documentBottom = document.documentElement.scrollHeight;
      if (documentBottom - scrollBottom <= 4) {
        currentId = sections.at(-1)?.id ?? currentId;
      }

      setActiveSectionId((previous) => (previous === currentId ? previous : currentId));
    };

    computeActiveSection();
    window.addEventListener('scroll', computeActiveSection, { passive: true });
    window.addEventListener('resize', computeActiveSection);
    return () => {
      window.removeEventListener('scroll', computeActiveSection);
      window.removeEventListener('resize', computeActiveSection);
    };
  }, [isCaptivaHome, railItems]);

  useEffect(() => {
    if (!isCaptivaHome) return;
    const hashId = location.hash.replace('#', '').trim();
    if (hashId) setActiveSectionId(hashId);
  }, [isCaptivaHome, location.hash]);

  useEffect(() => {
    if (!isCaptivaHome) {
      setIsNearTop(true);
      return;
    }

    const updateTopState = () => setIsNearTop(window.scrollY < 64);
    updateTopState();
    window.addEventListener('scroll', updateTopState, { passive: true });
    return () => window.removeEventListener('scroll', updateTopState);
  }, [isCaptivaHome]);

  const isAnchorActive = (href: string) => {
    if (!isCaptivaHome) return false;
    if (!location.hash && isNearTop) return false;
    const anchorId = href.split('#')[1];
    if (!anchorId) return false;
    return activeSectionId === anchorId;
  };

  const isHomeNavActive = isCaptivaHome && !location.hash && isNearTop;
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
      {!isCaptivaContext && !isLegalContext ? (
        <header className="site-header">
          <div className="container site-header__inner">
            <a className="brand-mark" href={siteConfig.routes.captiva}>
              <img
                className="brand-mark__logo"
                src={fullLogoSrc}
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
            aria-label="Navegación de secciones"
          >
            <div className="section-rail__brand">
              <img
                className="section-rail__logo"
                src={isRailCollapsed ? '/LOGO-captiva-icon.png' : fullLogoSrc}
                alt={siteConfig.productName}
                width={isRailCollapsed ? 64 : 280}
                height={isRailCollapsed ? 64 : 84}
                loading="eager"
                decoding="async"
                onError={handleLogoError}
              />
              <div className="section-rail__brand-copy">
                <strong>{siteConfig.productBar.title}</strong>
                <span>{siteConfig.productBar.subtitle}</span>
                <em>
                  Producto de{' '}
                  <a href="https://tuweb-ai.com/" target="_blank" rel="noreferrer">
                    {siteConfig.companyName}
                  </a>
                </em>
              </div>
            </div>

            <button
              className="section-rail__toggle"
              type="button"
              aria-label={isRailCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
              data-tooltip={isRailCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
              onClick={() => {
                setIsRailCollapsed((previous) => !previous);
                trackEvent({ event: 'internal_nav', category: 'rail', label: isRailCollapsed ? 'expand' : 'collapse' });
              }}
            >
              <PanelToggleIcon collapsed={isRailCollapsed} />
            </button>

            <nav className="section-rail__nav">
              {railItems.map((item) => (
                item.type === 'route' ? (
                  item.href === siteConfig.routes.captiva ? (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`section-rail__link${isHomeNavActive ? ' is-active' : ''}`}
                      aria-current={isHomeNavActive ? 'page' : undefined}
                      aria-label={isRailCollapsed ? item.label : undefined}
                      data-tooltip={item.label}
                    >
                      <FeatureIcon name={item.icon} />
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) => `section-rail__link${isActive ? ' is-active' : ''}`}
                    aria-label={isRailCollapsed ? item.label : undefined}
                    data-tooltip={item.label}
                  >
                    <FeatureIcon name={item.icon} />
                    <span>{item.label}</span>
                  </NavLink>
                  )
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`section-rail__link${isAnchorActive(item.href) ? ' is-active' : ''}`}
                    aria-current={isAnchorActive(item.href) ? 'location' : undefined}
                    aria-label={isRailCollapsed ? item.label : undefined}
                    data-tooltip={item.label}
                    onClick={() => {
                      const anchorId = item.href.split('#')[1];
                      if (anchorId) {
                        setActiveSectionId(anchorId);
                      }
                    }}
                  >
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
              data-tooltip="Hablar por WhatsApp y solicitar landing"
              onClick={() => trackEvent({ event: 'cta_click', category: 'rail', label: 'solicitar-landing' })}
            >
              Hablar por WhatsApp
            </ButtonLink>
            <ThemeSwitch source="sidebar" compact={isRailCollapsed} className="section-rail__theme-switch" />
          </aside>
          <ThemeSwitch source="mobile" compact className="mobile-floating-theme-switch" />
          <nav className="mobile-bottom-nav" aria-label="Navegación móvil">
            <Link
              className={`mobile-bottom-nav__item${isHomeNavActive ? ' is-active' : ''}`}
              aria-current={isHomeNavActive ? 'page' : undefined}
              to={siteConfig.routes.captiva}
              onClick={() => trackEvent({ event: 'internal_nav', category: 'mobile-nav', label: 'inicio' })}
            >
              <FeatureIcon name="home" />
              <span>Inicio</span>
            </Link>
            <NavLink
              className={({ isActive }) => `mobile-bottom-nav__item${isActive ? ' is-active' : ''}`}
              to={siteConfig.routes.captivaDemos}
              onClick={() => trackEvent({ event: 'internal_nav', category: 'mobile-nav', label: 'demos' })}
            >
              <FeatureIcon name="demos" />
              <span>Demos</span>
            </NavLink>
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
              className={`mobile-bottom-nav__item${isAnchorActive(`${siteConfig.routes.captiva}#oferta`) ? ' is-active' : ''}`}
              aria-current={isAnchorActive(`${siteConfig.routes.captiva}#oferta`) ? 'location' : undefined}
              href={`${siteConfig.routes.captiva}#oferta`}
              onClick={() => {
                setActiveSectionId('oferta');
                trackEvent({ event: 'internal_nav', category: 'mobile-nav', label: 'oferta' });
              }}
            >
              <FeatureIcon name="industries" />
              <span>Oferta</span>
            </a>
            <a
              className={`mobile-bottom-nav__item${isAnchorActive(`${siteConfig.routes.captiva}#contacto`) ? ' is-active' : ''}`}
              aria-current={isAnchorActive(`${siteConfig.routes.captiva}#contacto`) ? 'location' : undefined}
              href={`${siteConfig.routes.captiva}#contacto`}
              onClick={() => {
                setActiveSectionId('contacto');
                trackEvent({ event: 'internal_nav', category: 'mobile-nav', label: 'contacto' });
              }}
            >
              <FeatureIcon name="contact-nav" />
              <span>Contacto</span>
            </a>
          </nav>
        </>
      ) : null}

      <main className={`site-main${isCaptivaContext ? ' site-main--with-rail' : ''}${isRailCollapsed ? ' site-main--rail-collapsed' : ''}`}>
        {children}
      </main>

      <footer className={`site-footer${isCaptivaContext ? ' site-footer--with-rail' : ''}${isRailCollapsed ? ' site-footer--rail-collapsed' : ''}`}>
        <div className="container site-footer__inner">
          <div className="footer-brand">
            <img
              className="footer-brand__logo"
              src={fullLogoSrc}
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
            <div className="footer-contact__card">
              <span className="footer-contact__label">
                <a
                  href="https://tuweb-ai.com/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent({ event: 'outbound_click', category: 'footer', label: 'tuwebai-site' })}
                >
                  Tuwebai
                </a>
              </span>
              <span className="footer-contact__value">
                <a
                  href={`mailto:${siteConfig.contact.primaryEmail}`}
                  onClick={() => trackEvent({ event: 'contact_click', category: 'footer', label: 'tuwebai-email' })}
                >
                  {siteConfig.contact.primaryEmail}
                </a>
              </span>
            </div>
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
            <div className="footer-contact__card footer-contact__card--legal">
              <span className="footer-contact__label">Legal</span>
              <div className="footer-legal-links">
                <Link className="text-link" to={siteConfig.routes.termsOfService}>
                  Términos de servicio
                </Link>
                <Link className="text-link" to={siteConfig.routes.privacyPolicy}>
                  Política de privacidad
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
