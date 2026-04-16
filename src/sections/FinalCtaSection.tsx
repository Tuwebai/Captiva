import { PrimaryCTA } from '../components/cta/PrimaryCTA';
import { LeadFormSection } from '../components/forms/LeadFormSection';
import { siteConfig } from '../config/site';

export function FinalCtaSection() {
  return (
    <section className="content-section content-section--cta" id="contacto">
      <div className="container">
        <div className="final-cta">
          <div>
            <h2>{siteConfig.finalCta.title}</h2>
            <p>{siteConfig.finalCta.description}</p>
          </div>

          <PrimaryCTA
            label={siteConfig.primaryCtaLabel}
            mode="lead-form"
            leadFormId="lead-form-final"
            source="final"
            context="captiva-home-final"
            variant="primary"
          />
        </div>

        <LeadFormSection
          id="lead-form-final"
          source="final"
          context="captiva-home-final"
          title="Quiero empezar ahora → WhatsApp"
          description="Sin contrato. Sin compromiso largo. Si no te gusta el resultado, lo rehacemos."
        />
      </div>
    </section>
  );
}
