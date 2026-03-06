import { ButtonLink } from '../components/ui/ButtonLink';
import { siteConfig } from '../config/site';
import { trackEvent } from '../utils/analytics';

export function FinalCtaSection() {
  return (
    <section className="content-section content-section--cta">
      <div className="container">
        <div className="final-cta">
          <div>
            <p className="section-heading__eyebrow">CTA final</p>
            <h2>{siteConfig.finalCta.title}</h2>
            <p>{siteConfig.finalCta.description}</p>
          </div>

          <ButtonLink
            href={siteConfig.contact.ctaHref}
            variant="primary"
            onClick={() => trackEvent({ event: 'cta_click', category: 'final', label: 'solicitar-informacion' })}
          >
            {siteConfig.primaryCtaLabel}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
