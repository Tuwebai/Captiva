import { Link } from 'react-router-dom';

import { PrimaryCTA } from '../components/cta/PrimaryCTA';
import { LeadFormSection } from '../components/forms/LeadFormSection';
import { FeatureIcon } from '../components/ui/FeatureIcon';
import { siteConfig } from '../config/site';
import { trackEvent } from '../utils/analytics';

export function HeroSection() {
  const metricIcons = ['conversion', 'clarity', 'design', 'contact'] as const;
  const [flowStart, flowMiddle, flowEnd] = siteConfig.hero.panelFlowNodes;

  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <a
            className="hero-product-badge"
            href={siteConfig.hero.badgeHref}
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
            <PrimaryCTA
              label={siteConfig.hero.primaryProductCtaLabel}
              mode="lead-form"
              leadFormId="lead-form-hero"
              source="hero"
              variant="primary"
            />
            <Link
              className="hero-contact-link"
              to={siteConfig.routes.captivaDemos}
              onClick={() => trackEvent({ event: 'internal_nav', category: 'hero', label: 'captiva-demos' })}
            >
              {siteConfig.hero.exploreLinkLabel}
            </Link>
          </div>
        </div>

        <div className="hero-panel" aria-label={siteConfig.hero.panelAriaLabel}>
          <p className="hero-panel__label">{siteConfig.hero.panelLabel}</p>
          <div className="hero-panel__visual" aria-hidden="true">
            <div className="hero-flow">
              <span className="hero-flow__node">{flowStart}</span>
              <span className="hero-flow__arrow">&rarr;</span>
              <span className="hero-flow__node">{flowMiddle}</span>
              <span className="hero-flow__arrow">&rarr;</span>
              <span className="hero-flow__node">{flowEnd}</span>
            </div>
            <div className="hero-conversion-kpi">
              <strong>{siteConfig.hero.conversionKpiValue}</strong>
              <span>{siteConfig.hero.conversionKpiLabel}</span>
            </div>
            <div className="hero-conversion-chart">
              <svg viewBox="0 0 180 56" role="img" aria-label="Conversión en crecimiento">
                <path
                  className="hero-conversion-chart__line"
                  d="M12 44 L54 34 L96 26 L138 16 L168 10"
                />
                <circle className="hero-conversion-chart__dot" cx="12" cy="44" r="3" />
                <circle className="hero-conversion-chart__dot" cx="54" cy="34" r="3" />
                <circle className="hero-conversion-chart__dot" cx="96" cy="26" r="3" />
                <circle className="hero-conversion-chart__dot" cx="138" cy="16" r="3" />
                <circle className="hero-conversion-chart__dot" cx="168" cy="10" r="3" />
              </svg>
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
      <div className="container">
        <LeadFormSection
          id="lead-form-hero"
          source="hero"
          context="captiva-home-hero"
          title="Quiero una landing como esta"
          description="Dejanos tus datos y abrimos WhatsApp con un brief inicial ya estructurado."
        />
      </div>
    </section>
  );
}
