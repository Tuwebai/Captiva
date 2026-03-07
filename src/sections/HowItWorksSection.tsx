import { FeatureIcon } from '../components/ui/FeatureIcon';
import { SectionHeading } from '../components/ui/SectionHeading';
import { siteConfig } from '../config/site';

export function HowItWorksSection() {
  return (
    <section className="content-section" id="como-funciona">
      <div className="container">
        <SectionHeading
          eyebrow="Como funciona"
          title={siteConfig.howItWorks.title}
          description={siteConfig.howItWorks.description}
        />

        <ol className="process-list process-list--compact">
          {siteConfig.howItWorks.steps.map((step) => (
            <li key={step.step} className="process-list__item">
              <div className="process-list__step">
                <FeatureIcon name={step.icon} />
                <span>{step.step}</span>
              </div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
