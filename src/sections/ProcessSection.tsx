import { FeatureIcon } from '../components/ui/FeatureIcon';
import { SectionHeading } from '../components/ui/SectionHeading';
import { siteConfig } from '../config/site';

const processIcons = ['analysis', 'build', 'launch', 'ready'] as const;

export function ProcessSection() {
  return (
    <section className="content-section" id="proceso">
      <div className="container">
        <SectionHeading
          eyebrow="Proceso"
          title={siteConfig.process.title}
          description={siteConfig.process.description}
        />

        <ol className="process-list">
          {siteConfig.process.steps.map((step, index) => (
            <li key={step.step} className="process-list__item">
              <div className="process-list__step">
                <FeatureIcon name={processIcons[index] ?? 'ready'} />
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
