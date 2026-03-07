import demosManifest from '../config/demos.generated.json';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { siteConfig } from '../config/site';
import type { DemoManifestItem } from '../types/demo';
import { trackEvent } from '../utils/analytics';

const demos = demosManifest as DemoManifestItem[];

const categoryByShowcaseSlug: Record<string, string> = {
  gimnasios: 'fitness',
  esteticas: 'estetica',
  abogados: 'legal',
  'negocios-locales': 'negocios-locales',
};

function findDemoHrefByShowcaseSlug(showcaseSlug: string) {
  const category = categoryByShowcaseSlug[showcaseSlug];
  if (!category) return siteConfig.routes.captivaDemos;

  const demo = demos.find((item) => item.category === category);
  return demo?.href ?? siteConfig.routes.captivaDemos;
}

export function DemoShowcaseSection() {
  return (
    <section className="content-section content-section--alt" id="demos">
      <div className="container">
        <SectionHeading
          eyebrow={siteConfig.demos.eyebrow}
          title={siteConfig.demos.title}
          description={siteConfig.demos.description}
        />

        <div className="card-grid card-grid--two">
          {siteConfig.demos.items.map((item) => {
            const demoHref = findDemoHrefByShowcaseSlug(item.slug);

            return (
              <SurfaceCard key={item.slug}>
                <div className="demo-card__header">
                  <span>Ruta demo</span>
                  <code>{demoHref}</code>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a
                  className="text-link"
                  href={demoHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent({ event: 'demo_click', category: 'home-demos', label: item.slug })}
                >
                  Ver demo
                </a>
              </SurfaceCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
