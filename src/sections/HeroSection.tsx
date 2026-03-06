import { Link } from 'react-router-dom';

import { siteConfig } from '../config/site';
import { ButtonLink } from '../components/ui/ButtonLink';
import { trackEvent } from '../utils/analytics';

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-copy__eyebrow">{siteConfig.hero.eyebrow}</p>
          <h1>{siteConfig.hero.title}</h1>
          <h2>{siteConfig.hero.subtitle}</h2>
          <p className="hero-copy__body">{siteConfig.hero.supportingCopy}</p>

          <div className="hero-actions">
            <ButtonLink
              href={siteConfig.contact.ctaHref}
              variant="primary"
              onClick={() => trackEvent({ event: 'cta_click', category: 'hero', label: 'solicitar-informacion' })}
            >
              {siteConfig.primaryCtaLabel}
            </ButtonLink>
            <a className="hero-contact-link" href={`mailto:${siteConfig.contact.productEmail}`}>
              {siteConfig.contact.productEmail}
            </a>
            <Link
              className="hero-contact-link"
              to={siteConfig.routes.captivaDemos}
              onClick={() => trackEvent({ event: 'internal_nav', category: 'hero', label: 'captiva-demos' })}
            >
              Ver ejemplos de landing pages
            </Link>
          </div>
        </div>

        <div className="hero-panel" aria-label="Resumen del producto">
          <p className="hero-panel__label">Qué resuelve</p>
          <ul className="hero-metrics">
            {siteConfig.hero.metrics.map((metric) => (
              <li key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
