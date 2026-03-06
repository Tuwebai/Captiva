import { FeatureIcon } from '../components/ui/FeatureIcon';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { siteConfig } from '../config/site';

const problemIcons = ['social', 'missing', 'loss'] as const;

export function ProblemSection() {
  return (
    <section className="content-section" id="problema">
      <div className="container">
        <SectionHeading
          eyebrow="Problema"
          title={siteConfig.problem.title}
          description={siteConfig.problem.description}
        />

        <div className="card-grid card-grid--three">
          {siteConfig.problem.items.map((item, index) => (
            <SurfaceCard key={item.title}>
              <FeatureIcon name={problemIcons[index] ?? 'loss'} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </section>
  );
}
