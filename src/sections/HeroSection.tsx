import { siteConfig } from '../config/site';
import { useAnalytics } from '../hooks/useAnalytics';

export function HeroSection() {
  const { trackEvent } = useAnalytics();
  const [flowStart, flowMiddle, flowEnd] = siteConfig.hero.panelFlowNodes;

  return (
    <section className="hero-section hero-section--redesign">
      <div className="hero-section__ambient" aria-hidden="true">
        <div className="hero-section__glow hero-section__glow--violet" />
        <div className="hero-section__glow hero-section__glow--emerald" />
        <div className="hero-section__grid" />
      </div>

      <div className="container hero-grid hero-grid--redesign">
        <div className="hero-copy hero-copy--redesign">
          <a className="hero-badge hero-badge--redesign" href={siteConfig.hero.badgeHref} target="_blank" rel="noreferrer">
            <span className="hero-badge__dot" aria-hidden="true" />
            {siteConfig.hero.badge}
          </a>

          <p className="hero-kicker">{siteConfig.hero.kicker}</p>
          <h1 className="hero-title hero-title--redesign">{siteConfig.hero.title}</h1>
          <p className="hero-description hero-description--redesign">{siteConfig.hero.supportingCopy}</p>

          <div className="hero-offer-pill" aria-label="Resumen comercial">
            <div>
              <span className="hero-offer-pill__label">Desde</span>
              <strong className="hero-offer-pill__price">{siteConfig.hero.priceAnchor.replace('Desde ', '').replace(' — sin mensualidades', '')}</strong>
            </div>
            <span className="hero-offer-pill__divider" aria-hidden="true" />
            <p>{siteConfig.hero.ctaMicrocopy}</p>
          </div>

          <div className="hero-actions hero-actions--redesign">
            <a
              className="button-link button-link--primary hero-cta-primary"
              href={siteConfig.contact.ctaHref}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent({
                  event: 'cta_whatsapp',
                  category: 'conversion',
                  label: 'hero_primary',
                })
              }
            >
              <span aria-hidden="true">◔</span>
              {siteConfig.primaryCtaLabel}
            </a>

            <a
              className="button-link button-link--secondary hero-cta-secondary"
              href="#demos"
              onClick={() =>
                trackEvent({
                  event: 'internal_nav',
                  category: 'navigation',
                  label: 'hero_secondary_demos',
                })
              }
            >
              {siteConfig.hero.demosCtaLabel}
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <p className="hero-actions__microcopy hero-actions__microcopy--redesign">{siteConfig.hero.ctaMicrocopy}</p>

          <div className="hero-proof hero-proof--redesign" aria-label="Beneficios incluidos">
            <span>🌐 Hosting + dominio 1 año</span>
            <span>⚡ En 5 días hábiles</span>
            <span>💰 Sin costos ocultos</span>
          </div>
        </div>

        <div className="hero-panel hero-panel--redesign" aria-label={siteConfig.hero.panelAriaLabel}>
          <div className="hero-panel-shell">
            <div className="hero-panel-card">
              <div className="hero-panel-card__topbar">
                <div className="hero-panel-card__dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="hero-panel-card__address">tuclinica.com.ar</div>
                <div className="hero-panel-card__status">
                  <span className="hero-panel-card__status-dot" />
                </div>
              </div>

              <p className="hero-panel__label hero-panel__label--redesign">{siteConfig.hero.panelLabel}</p>

              <div className="hero-panel__visual hero-panel__visual--redesign" aria-hidden="true">
                <div className="hero-panel__eyebrow" />
                <div className="hero-panel__browser-cta" />
                <div className="hero-panel__line hero-panel__line--short" />
                <div className="hero-panel__line hero-panel__line--full" />
                <div className="hero-panel__line hero-panel__line--mid" />
                <div className="hero-panel__line hero-panel__line--shorter" />

                <div className="hero-panel__actions">
                  <div className="hero-panel__button hero-panel__button--primary" />
                  <div className="hero-panel__button hero-panel__button--secondary" />
                </div>

                <div className="hero-panel__checks">
                  <span>{flowStart}</span>
                  <span>{flowMiddle}</span>
                  <span>{flowEnd}</span>
                </div>
              </div>

              <div className="hero-panel__footer hero-panel__footer--redesign">
                {siteConfig.hero.metrics.map((stat) => (
                  <article key={stat.label} className="hero-panel__stat">
                    <span className="hero-panel__stat-icon" aria-hidden="true">✦</span>
                    <strong className="hero-panel__stat-value">{stat.value}</strong>
                    <span className="hero-panel__stat-label">{stat.label}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className="hero-floating-card hero-floating-card--delivery">
              <span className="hero-floating-card__label">Tiempo de entrega</span>
              <strong>5 días</strong>
              <span className="hero-floating-card__accent">garantizados</span>
            </div>

            <div className="hero-floating-card hero-floating-card--results">
              <span className="hero-floating-card__label">WhatsApps recibidos</span>
              <strong>+24 ↑</strong>
              <span className="hero-floating-card__accent">esta semana</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
