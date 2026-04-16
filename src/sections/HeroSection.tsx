import { ANALYTICS_EVENTS, useAnalytics } from '../lib/analytics';
import { FeatureIcon } from '../components/ui/FeatureIcon';
import { siteConfig } from '../config/site';
import { buildWhatsAppLeadUrl } from '../utils/lead-message';

export function HeroSection() {
  const { trackEvent } = useAnalytics();
  const metricIcons = ['conversion', 'clarity', 'design', 'contact'] as const;
  const [flowStart, flowMiddle, flowEnd] = siteConfig.hero.panelFlowNodes;
  const heroWhatsAppUrl = buildWhatsAppLeadUrl(
    siteConfig.contact.whatsapp,
    'Hola, vi Captiva y quiero una landing para mi negocio.\nRubro: [rubro del visitante]\n¿Cómo arrancamos?',
  );

  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <a
            className="hero-product-badge"
            href={siteConfig.hero.badgeHref}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent({ action: ANALYTICS_EVENTS.RESOURCE_OPEN, category: 'hero', label: 'tuwebai-product-badge' })}
          >
            {siteConfig.hero.badge}
          </a>
          <p className="hero-copy__eyebrow">{siteConfig.hero.eyebrow}</p>
          <h1>{siteConfig.hero.title}</h1>
          {siteConfig.hero.subtitle ? <h2>{siteConfig.hero.subtitle}</h2> : null}
          <p className="hero-copy__body">{siteConfig.hero.supportingCopy}</p>
          <p className="hero-copy__price">{siteConfig.hero.priceAnchor}</p>

          <div className="hero-actions">
            <a
              className="button-link button-link--primary"
              href={heroWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent({ action: ANALYTICS_EVENTS.CTA_SECTION_CLICK, category: 'hero', label: 'quiero-empezar-ahora' })}
            >
              {siteConfig.hero.primaryProductCtaLabel}
            </a>
            <a
              className="button-link button-link--secondary"
              href="#demos"
              data-tooltip="Explora ejemplos reales de landing pages por industria."
              onClick={() => trackEvent({ action: ANALYTICS_EVENTS.INTERNAL_NAV_CLICK, category: 'hero', label: 'ver-ejemplos-por-rubro' })}
            >
              {siteConfig.hero.demosCtaLabel}
            </a>
          </div>
          <p className="hero-actions__microcopy">{siteConfig.hero.ctaMicrocopy}</p>
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
            <div className="hero-conversion-kpi" data-tooltip="Tasa estimada de conversion basada en estructura optimizada.">
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
    </section>
  );
}
