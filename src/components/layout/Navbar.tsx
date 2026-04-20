import type { ReactEventHandler } from 'react';

import { MessageCircle } from 'lucide-react';
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
              <MessageCircle size={16} strokeWidth={2.2} />
              <span>{siteConfig.primaryCtaLabel}</span>
            </span>
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
