import type { ReactEventHandler } from 'react';
import { useLocation } from 'react-router-dom';
import { ANALYTICS_EVENTS, useAnalytics } from '../../lib/analytics';
import { siteConfig } from '../../config/site';
import { ButtonLink } from '../ui/ButtonLink';

type NavbarProps = {
  visible: boolean;
  fullLogoSrc: string;
  onLogoError: ReactEventHandler<HTMLImageElement>;
};

export function Navbar({ visible, fullLogoSrc, onLogoError }: NavbarProps) {
  const { trackEvent, trackWhatsApp } = useAnalytics();
  const location = useLocation();
  const isDemosPage =
    location.pathname === siteConfig.routes.captivaDemos ||
    location.pathname.startsWith(`${siteConfig.routes.captivaDemos}/`);
  const demosNavItems = [
    { label: 'Hero', href: `${siteConfig.routes.captivaDemos}#demos-hero` },
    { label: 'Catálogo', href: `${siteConfig.routes.captivaDemos}#demos-catalogo` },
    { label: 'Rubros', href: `${siteConfig.routes.captivaDemos}#demos-rubros` },
    { label: 'Contacto', href: `${siteConfig.routes.captivaDemos}#lead-form-demos` },
  ];

  if (!visible) {
    return null;
  }

  return (
    <header className="site-header">
      <div className={`container site-header__inner${isDemosPage ? ' site-header__inner--demos' : ''}`}>
        <a className="brand-mark" href={siteConfig.routes.captiva}>
          <img
            className="brand-mark__logo"
            src={fullLogoSrc}
            alt={siteConfig.productName}
            width={400}
            height={120}
            decoding="async"
            fetchPriority="high"
            onError={onLogoError}
          />
        </a>

        {isDemosPage ? (
          <nav className="site-header__nav" aria-label="Secciones de demos">
            {demosNavItems.map((item) => (
              <a key={item.href} className="site-header__nav-link" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}

        <div className="site-header__actions">
          <ButtonLink
            href={siteConfig.contact.ctaHref}
            variant="primary"
            className="site-header__cta"
            onClick={() => {
              trackEvent({ action: ANALYTICS_EVENTS.CTA_HERO_CLICK, category: 'header', label: 'solicitar-informacion' });
              trackWhatsApp('header', 'solicitar-informacion');
            }}
          >
            <span className="site-header__cta-content">
              <span className="site-header__cta-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="currentColor" role="img">
                  <path d="M16.1 4C9.47 4 4.1 9.3 4.1 15.84c0 2.08.56 4.12 1.62 5.92L4 28l6.44-1.67a12.05 12.05 0 0 0 5.65 1.44h.01c6.63 0 12-5.31 12-11.84C28.1 9.3 22.73 4 16.1 4Zm0 21.72h-.01a9.95 9.95 0 0 1-5.09-1.39l-.36-.21-3.82.99 1.02-3.72-.24-.38a9.73 9.73 0 0 1-1.5-5.16c0-5.42 4.5-9.83 10.03-9.83 5.53 0 10.02 4.41 10.02 9.83 0 5.42-4.5 9.83-10.03 9.83Zm5.5-7.38c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.88-.78-1.48-1.74-1.65-2.04-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.57-.48-.5-.67-.51h-.57c-.2 0-.52.07-.8.37s-1.04 1.01-1.04 2.45c0 1.44 1.06 2.84 1.2 3.04.15.2 2.09 3.33 5.16 4.53.73.29 1.3.46 1.74.59.73.23 1.4.2 1.93.12.59-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                </svg>
              </span>
              <span>{siteConfig.primaryCtaLabel}</span>
            </span>
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
