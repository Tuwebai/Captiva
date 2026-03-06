import { type PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import { siteConfig } from '../config/site';
import { ButtonLink } from '../components/ui/ButtonLink';

export function PageShell({ children }: PropsWithChildren) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container site-header__inner">
          <a className="brand-mark" href={siteConfig.routes.captiva}>
            <img className="brand-mark__logo" src="/LOGO-captiva.png" alt={siteConfig.productName} />
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

          <ButtonLink href={siteConfig.contact.ctaHref} variant="primary">
            {siteConfig.primaryCtaLabel}
          </ButtonLink>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div className="footer-brand">
            <img className="footer-brand__logo" src="/LOGO-captiva.png" alt={siteConfig.productName} />
            <p className="footer-title">
              {siteConfig.productName} by{' '}
              <a href="https://tuweb-ai.com" target="_blank" rel="noreferrer">
                {siteConfig.companyName}
              </a>
            </p>
            <p className="footer-copy">{siteConfig.description}</p>
          </div>

          <div className="footer-contact">
            <a className="footer-contact__card" href={`mailto:${siteConfig.contact.productEmail}`}>
              <span className="footer-contact__label">Captiva</span>
              <span className="footer-contact__value">{siteConfig.contact.productEmail}</span>
            </a>
            <a className="footer-contact__card" href={`mailto:${siteConfig.contact.primaryEmail}`}>
              <span className="footer-contact__label">Tuwebai</span>
              <span className="footer-contact__value">{siteConfig.contact.primaryEmail}</span>
            </a>
            <a className="footer-contact__card" href={siteConfig.contact.ctaHref} target="_blank" rel="noreferrer">
              <span className="footer-contact__label">WhatsApp</span>
              <span className="footer-contact__value">+{siteConfig.contact.whatsapp}</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
