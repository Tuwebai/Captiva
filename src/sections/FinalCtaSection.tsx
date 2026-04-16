import { PrimaryCTA } from '../components/cta/PrimaryCTA';
import { siteConfig } from '../config/site';

export function FinalCtaSection() {
  return (
    <section className="content-section content-section--cta" id="contacto">
      <div className="container">
        <div className="final-cta">
          <div>
            <h2>{siteConfig.finalCta.title}</h2>
            <p>{siteConfig.finalCta.description}</p>
            <p className="hero-actions__microcopy">Sin contrato largo. Si no te gusta, lo rehacemos.</p>
          </div>

          <PrimaryCTA
            label={siteConfig.primaryCtaLabel}
            mode="whatsapp"
            source="final"
            context="captiva-home-final"
            variant="primary"
          />
        </div>
      </div>
    </section>
  );
}
