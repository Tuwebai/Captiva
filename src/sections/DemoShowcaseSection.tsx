import { Link } from 'react-router-dom';

import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { siteConfig } from '../config/site';

export function DemoShowcaseSection() {
  return (
    <section className="content-section content-section--alt" id="demos">
      <div className="container">
        <SectionHeading
          eyebrow="Demos"
          title={siteConfig.demos.title}
          description={siteConfig.demos.description}
        />

        <div className="card-grid card-grid--two">
          {siteConfig.demos.items.map((item) => (
            <SurfaceCard key={item.slug}>
              <div className="demo-card__header">
                <span>Categoría</span>
                <code>{siteConfig.routes.captivaDemos}</code>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link className="text-link" to={siteConfig.routes.captivaDemos}>
                Ver demos disponibles
              </Link>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </section>
  );
}
