import type { ReactEventHandler } from 'react';
import { Link } from 'react-router-dom';

import { ANALYTICS_EVENTS, useAnalytics } from '../../lib/analytics';
import { siteConfig } from '../../config/site';

type FooterProps = {
  isCaptivaContext: boolean;
  isRailCollapsed: boolean;
  fullLogoSrc: string;
  onLogoError: ReactEventHandler<HTMLImageElement>;
};

export function Footer({ isCaptivaContext, isRailCollapsed, fullLogoSrc, onLogoError }: FooterProps) {
  const { trackEvent, trackWhatsApp } = useAnalytics();

  return (
    <footer
      className={`site-footer${isCaptivaContext ? ' site-footer--with-rail' : ''}${
        isRailCollapsed ? ' site-footer--rail-collapsed' : ''
      }`}
    >
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
            onError={onLogoError}
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
            onClick={() => trackEvent({ action: 'contact_click', category: 'footer', label: 'captiva-email' })}
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
                onClick={() => trackEvent({ action: 'outbound_click', category: 'footer', label: 'tuwebai-site' })}
              >
                Tuwebai
              </a>
            </span>
            <span className="footer-contact__value">
              <a
                href={`mailto:${siteConfig.contact.primaryEmail}`}
                onClick={() => trackEvent({ action: 'contact_click', category: 'footer', label: 'tuwebai-email' })}
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
            onClick={() => {
              trackEvent({ action: ANALYTICS_EVENTS.CTA_FOOTER_CLICK, category: 'footer', label: 'whatsapp' });
              trackWhatsApp('footer', 'whatsapp');
            }}
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
  );
}
