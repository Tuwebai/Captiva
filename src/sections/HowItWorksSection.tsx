import { ButtonLink } from '../components/ui/ButtonLink';
import { SectionHeading } from '../components/ui/SectionHeading';
import { siteConfig } from '../config/site';
import { useAnalytics } from '../lib/analytics';

export function HowItWorksSection() {
  const { trackWhatsApp } = useAnalytics();

  return (
    <section className="content-section" id="como-funciona">
      <div className="container">
        <SectionHeading title={siteConfig.howItWorks.title} description={siteConfig.howItWorks.description} />
        <div className="card-grid card-grid--three">
          {siteConfig.howItWorks.steps.map((step) => (
            <article key={step.step} className="surface-card step-card">
              <span className="step-card__index">{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
        <div className="faq-cta">
          <ButtonLink href={siteConfig.contact.ctaHref} variant="primary" onClick={() => trackWhatsApp('how-it-works', 'quiero-la-mia')}>
            Quiero la mía
          </ButtonLink>
          <p className="hero-actions__microcopy">Te respondemos por WhatsApp y ordenamos el siguiente paso.</p>
        </div>
      </div>
    </section>
  );
}
