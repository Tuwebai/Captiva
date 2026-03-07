import { Link } from 'react-router-dom';

import { ButtonLink } from '../components/ui/ButtonLink';
import { FeatureIcon } from '../components/ui/FeatureIcon';
import { siteConfig } from '../config/site';
import { trackEvent } from '../utils/analytics';

export function HeroSection() {
  const metricIcons = ['conversion', 'clarity', 'design'] as const;

  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <a
            className="hero-product-badge"
            href="https://tuweb-ai.com"
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent({ event: 'outbound_click', category: 'hero', label: 'tuwebai-product-badge' })}
          >
            {siteConfig.hero.badge}
          </a>
          <p className="hero-copy__eyebrow">{siteConfig.hero.eyebrow}</p>
          <h1>{siteConfig.hero.title}</h1>
          <h2>{siteConfig.hero.subtitle}</h2>
          <p className="hero-copy__body">{siteConfig.hero.supportingCopy}</p>

          <div className="hero-actions">
            <Link
              className="button-link button-link--secondary"
              to={siteConfig.routes.captivaDemos}
              onClick={() => trackEvent({ event: 'internal_nav', category: 'hero', label: 'ver-demos' })}
            >
              {siteConfig.hero.demosCtaLabel}
            </Link>
            <ButtonLink
              href={siteConfig.contact.ctaHref}
              variant="primary"
              onClick={() => trackEvent({ event: 'cta_click', category: 'hero', label: 'crear-mi-landing' })}
            >
              {siteConfig.hero.primaryProductCtaLabel}
            </ButtonLink>
            <Link
              className="hero-contact-link"
              to={siteConfig.routes.captivaDemos}
              onClick={() => trackEvent({ event: 'internal_nav', category: 'hero', label: 'captiva-demos' })}
            >
              Explorar ejemplos reales por industria
            </Link>
          </div>
        </div>

        <div className="hero-panel" aria-label="Resumen del producto">
          <p className="hero-panel__label">Que resuelve</p>
          <div className="hero-panel__visual" aria-hidden="true">
            <div className="hero-flow">
              <span className="hero-flow__node">Visitas</span>
              <span className="hero-flow__arrow">→</span>
              <span className="hero-flow__node">Landing</span>
              <span className="hero-flow__arrow">→</span>
              <span className="hero-flow__node">Consultas</span>
            </div>
            <div className="hero-growth">
              <span className="hero-growth__bar hero-growth__bar--low" />
              <span className="hero-growth__bar hero-growth__bar--mid" />
              <span className="hero-growth__bar hero-growth__bar--high" />
            </div>
          </div>
          <ul className="hero-metrics">
            {siteConfig.hero.metrics.map((metric, index) => (
              <li key={metric.label}>
                <div className="hero-metrics__title">
                  <FeatureIcon name={metricIcons[index] ?? 'conversion'} />
                  <strong>{metric.value}</strong>
                </div>
                <span>{metric.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
