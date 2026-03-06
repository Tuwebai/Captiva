import { type PropsWithChildren, type ReactEventHandler } from 'react';
import { Link } from 'react-router-dom';

import { siteConfig } from '../config/site';
import { ButtonLink } from '../components/ui/ButtonLink';
import { useAnalytics } from '../hooks/useAnalytics';
import { useScrollRestoration } from '../hooks/useScrollRestoration';
import { trackEvent } from '../utils/analytics';

export function PageShell({ children }: PropsWithChildren) {
  useAnalytics();
  useScrollRestoration();
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

          <nav className="site-nav" aria-label="Navegación principal">
            {siteConfig.navItems.map((item) => (
              item.type === 'route' ? (
                <Link key={item.href} to={item.href}>
                  {item.label}
                </Link>
              ) : (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              )
            ))}
          </nav>

          <ButtonLink
            href={siteConfig.contact.ctaHref}
            variant="primary"
            onClick={() => trackEvent({ event: 'cta_click', category: 'header', label: 'solicitar-informacion' })}
          >
            {siteConfig.primaryCtaLabel}
          </ButtonLink>
        </div>
      </header>

      <main>{children}</main>

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
