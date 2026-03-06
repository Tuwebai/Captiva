import demosManifest from '../config/demos.generated.json';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import type { DemoManifestItem } from '../types/demo';
import { groupDemosByCategory } from '../utils/demos';

const demoCategories = groupDemosByCategory(demosManifest as DemoManifestItem[]);
const placeholderPreview = '/demo-placeholder.svg';

export function DemosGallerySection() {
  return (
    <section className="content-section">
      <div className="container">
        <SectionHeading
          eyebrow="Demos"
          title="Demos de Landing Pages"
          description="Explora ejemplos de landing pages optimizadas para distintos tipos de negocios."
        />

        <div className="demos-gallery">
          {demoCategories.map((category) => (
            <section key={category.slug} className="demo-category">
              <div className="demo-category__header">
                <div>
                  <p className="section-heading__eyebrow">{category.title}</p>
                  <h2>{category.title}</h2>
                </div>
                <p>{category.description}</p>
              </div>

              <div className="card-grid card-grid--three">
                {category.items.map((item) => (
                  <SurfaceCard key={item.slug} className="demo-gallery-card">
                    <a
                      className="demo-gallery-card__preview"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={item.preview ?? placeholderPreview}
                        alt={item.title}
                        loading="lazy"
                      />
                    </a>

                    <div className="demo-card__header">
                      <span>{category.title}</span>
                      <code>{item.href}</code>
                    </div>

                    <h3>{item.title}</h3>
                    <p>{item.description}</p>

                    <a
                      className="text-link"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ver demo
                    </a>
                  </SurfaceCard>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
