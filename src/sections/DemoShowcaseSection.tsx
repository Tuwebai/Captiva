import { ANALYTICS_EVENTS, useAnalytics } from '../lib/analytics';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { siteConfig } from '../config/site';
import { demosManifest } from '../data/demosManifest';

const demos = demosManifest;

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
  const { trackEvent } = useAnalytics();

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
                  onClick={() =>
                    trackEvent({
                      action: ANALYTICS_EVENTS.DEMO_CTA_CLICK,
                      category: 'home-demos',
                      label: item.slug,
                      demo_slug: item.slug,
                      source_section: 'home-demos',
                    })
                  }
                >
                  {siteConfig.demos.cardCtaLabel}
                </a>
              </SurfaceCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
