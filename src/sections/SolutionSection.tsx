import { FeatureIcon } from '../components/ui/FeatureIcon';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { siteConfig } from '../config/site';

const solutionIcons = ['conversion', 'structure', 'contact', 'design'] as const;

export function SolutionSection() {
  return (
    <section className="content-section content-section--alt" id="solucion">
      <div className="container">
        <SectionHeading
          eyebrow="Solución"
          title={siteConfig.solution.title}
          description={siteConfig.solution.description}
        />

        <div className="card-grid card-grid--two">
          {siteConfig.solution.items.map((item, index) => (
            <SurfaceCard key={item.title}>
              <FeatureIcon name={solutionIcons[index] ?? 'design'} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </section>
  );
}
