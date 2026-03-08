import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { siteConfig } from '../config/site';

export function SocialProofSection() {
  return (
    <section className="content-section content-section--alt" id="prueba-social">
      <div className="container">
        <SectionHeading
          eyebrow={siteConfig.socialProof.eyebrow}
          title={siteConfig.socialProof.title}
          description={siteConfig.socialProof.description}
        />

        <div className="social-proof-metrics">
          {siteConfig.socialProof.metrics.map((item) => (
            <SurfaceCard key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </SurfaceCard>
          ))}
        </div>

        <div className="card-grid card-grid--three">
          {siteConfig.socialProof.items.map((item) => (
            <SurfaceCard key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </section>
  );
}
