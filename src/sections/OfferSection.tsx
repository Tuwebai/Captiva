import { ANALYTICS_EVENTS, useAnalytics } from '../lib/analytics';
import { ButtonLink } from '../components/ui/ButtonLink';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { siteConfig } from '../config/site';
import { buildWhatsAppLeadUrl } from '../utils/lead-message';

export function OfferSection() {
  const { trackEvent, trackWhatsApp } = useAnalytics();

  return (
    <section className="content-section" id="oferta">
      <div className="container">
        <SectionHeading
          eyebrow={siteConfig.offer.eyebrow}
          title={siteConfig.offer.title}
          description={siteConfig.offer.description}
        />

        <section className="offer-block">
          <div className="card-grid card-grid--two">
            <SurfaceCard>
              <h3>{siteConfig.offer.notIncludesTitle}</h3>
              <ul className="offer-plan-card__list">
                {siteConfig.offer.notIncludes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </SurfaceCard>
            <SurfaceCard>
              <h3>{siteConfig.offer.workflowTitle}</h3>
              <ol className="offer-workflow-list">
                {siteConfig.offer.workflowSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </SurfaceCard>
          </div>
        </section>

        <section className="offer-block" id="planes">
          <div className="offer-plans-head">
            <h3>{siteConfig.offer.plansTitle}</h3>
            <p>Compará rápido qué incluye cada plan y elegí el nivel según tu objetivo comercial.</p>
          </div>
          <div className="card-grid card-grid--three">
            {siteConfig.offer.plans.map((plan) => (
              <SurfaceCard key={plan.name} className={`offer-plan-card${plan.highlight ? ' offer-plan-card--highlight' : ''}`}>
                {plan.highlight ? <span className="offer-plan-card__badge">{plan.highlight}</span> : null}
                <span className="offer-plan-card__guarantee">Hosting + dominio 1 año</span>
                <h4>{plan.name}</h4>
                <p className="offer-plan-card__audience">{plan.audience}</p>
                <ul className="offer-plan-card__list">
                  <li>{`${siteConfig.offer.deliveryTimeLabel}: ${siteConfig.offer.deliveryTimeValue}`}</li>
                  {plan.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ButtonLink
                  href={buildWhatsAppLeadUrl(siteConfig.contact.whatsapp, plan.whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                  onClick={() => {
                    trackEvent({
                      action: ANALYTICS_EVENTS.CTA_SECTION_CLICK,
                      category: 'offer-plan',
                      label: plan.name.toLowerCase(),
                      cta_text: plan.ctaLabel,
                      location: 'offer',
                      mode: 'whatsapp',
                      context: `plan-${plan.name.toLowerCase()}`,
                    });
                    trackWhatsApp('offer', plan.ctaLabel, plan.name);
                  }}
                >
                  {plan.ctaLabel}
                </ButtonLink>
              </SurfaceCard>
            ))}
          </div>
          <p className="offer-guarantee">{siteConfig.offer.guarantee}</p>
        </section>

        <section className="offer-block">
          <SurfaceCard className="offer-guarantee-card">
            <h3>{siteConfig.offer.guaranteeTitle}</h3>
            <p>{siteConfig.offer.guaranteeDescription}</p>
          </SurfaceCard>
        </section>
      </div>
    </section>
  );
}
