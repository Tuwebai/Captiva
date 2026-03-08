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
          title="Hablar por WhatsApp con un brief listo"
          description="Completás este formulario y abrimos WhatsApp con toda la información ordenada para avanzar rápido."
        />
      </div>
    </section>
  );
}
