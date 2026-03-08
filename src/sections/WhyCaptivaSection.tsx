import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { siteConfig } from '../config/site';

export function WhyCaptivaSection() {
  return (
    <section className="content-section" id="por-que-captiva">
      <div className="container">
        <SectionHeading
          eyebrow={siteConfig.whyCaptiva.eyebrow}
          title={siteConfig.whyCaptiva.title}
          description={siteConfig.whyCaptiva.description}
        />

        <div className="card-grid card-grid--three">
          {siteConfig.whyCaptiva.items.map((item) => (
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
