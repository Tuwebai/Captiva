import { ANALYTICS_EVENTS, useAnalytics } from '../lib/analytics';
import { siteConfig } from '../config/site';
import { buildWhatsAppLeadUrl } from '../utils/lead-message';

export function HeroSection() {
  const { trackEvent } = useAnalytics();
  const [flowStart, flowMiddle, flowEnd] = siteConfig.hero.panelFlowNodes;
  const heroWhatsAppUrl = buildWhatsAppLeadUrl(
    siteConfig.contact.whatsapp,
    'Hola, vi Captiva y quiero una landing para mi negocio. ¿Cómo arrancamos?'
  );

  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <a className="hero-badge" href={siteConfig.hero.badgeHref} target="_blank" rel="noreferrer">
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
              onClick={() =>
                trackEvent({ action: ANALYTICS_EVENTS.WHATSAPP_CLICK, category: 'hero', label: 'quiero-empezar-ahora' })
              }
            >
              {siteConfig.hero.primaryProductCtaLabel}
            </a>
            <a
              className="button-link button-link--secondary"
              href="#demos"
              onClick={() =>
                trackEvent({ action: ANALYTICS_EVENTS.INTERNAL_NAV_CLICK, category: 'hero', label: 'ver-ejemplos-por-rubro' })
              }
            >
              {siteConfig.hero.demosCtaLabel}
            </a>
          </div>

          <p className="hero-actions__microcopy">{siteConfig.hero.ctaMicrocopy}</p>
          <div className="hero-trust-bar" aria-label="Beneficios clave">
            <span>✓ Hosting + dominio 1 año</span>
            <span>✓ En 5 días hábiles</span>
            <span>✓ Sin costos ocultos</span>
          </div>
        </div>

        <div className="hero-panel" aria-label={siteConfig.hero.panelAriaLabel}>
          <p className="hero-panel__label">{siteConfig.hero.panelLabel}</p>
          <div className="hero-panel__visual" aria-hidden="true">
            <div className="hero-preview-window">
              <div className="hero-preview-window__top">
                <span />
                <span />
                <span />
              </div>
              <div className="hero-preview-window__body">
                <div className="hero-preview-window__copy">
                  <span className="hero-preview-window__badge">Landing Captiva</span>
                  <strong>Tu negocio puede verse así</strong>
                  <p>Mensaje claro, oferta visible y CTA directo a WhatsApp.</p>
                  <div className="hero-preview-window__cta">Quiero empezar ahora</div>
                </div>
                <div className="hero-preview-window__phone">
                  <div className="hero-preview-window__phone-screen">
                    <span>{flowStart}</span>
                    <span>{flowMiddle}</span>
                    <span>{flowEnd}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-panel__footer">
            <strong>{siteConfig.hero.conversionKpiValue}</strong>
            <span>{siteConfig.hero.conversionKpiLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
