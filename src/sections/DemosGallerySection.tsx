import { Link } from 'react-router-dom';

import { ButtonLink } from '../components/ui/ButtonLink';
import demosManifest from '../config/demos.generated.json';
import { siteConfig } from '../config/site';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import type { DemoManifestItem } from '../types/demo';
import { trackEvent } from '../utils/analytics';
import { groupDemosByCategory } from '../utils/demos';
import { getIndustryPages } from '../utils/industry';

const demoCategories = groupDemosByCategory(demosManifest as DemoManifestItem[]);
const placeholderPreview = '/demo-placeholder.svg';
const industryByCategory = new Map(getIndustryPages().map((item) => [item.category, item]));

export function DemosGallerySection() {
  return (
    <section className="content-section">
      <div className="container">
        <SectionHeading
          as="h1"
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
                <div className="demo-category__meta">
                  <p>{category.description}</p>
                  {industryByCategory.get(category.slug) ? (
                    <Link
                      className="text-link"
                      to={`/${industryByCategory.get(category.slug)?.slug ?? ''}`}
                      onClick={() => trackEvent({ event: 'internal_nav', category: category.slug, label: 'industry-page' })}
                    >
                      Ver landing page para {category.title.toLowerCase()}
                    </Link>
                  ) : null}
                </div>
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
                        decoding="async"
                        width={1600}
                        height={1000}
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
                      onClick={() => trackEvent({ event: 'demo_click', category: category.slug, label: item.publicSlug })}
                    >
                      Ver demo
                    </a>
                  </SurfaceCard>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="industry-cta">
          <h2>Necesitas una landing para tu negocio?</h2>
          <p>
            Solicita una propuesta y te mostramos la estructura recomendada segun tu industria y objetivo comercial.
          </p>
          <ButtonLink
            href={siteConfig.contact.ctaHref}
            variant="primary"
            onClick={() => trackEvent({ event: 'cta_click', category: 'demos', label: 'contactar' })}
          >
            Contactar
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
