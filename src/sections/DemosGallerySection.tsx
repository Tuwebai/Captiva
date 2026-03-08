import { Link, useSearchParams } from 'react-router-dom';

import { PrimaryCTA } from '../components/cta/PrimaryCTA';
import { LeadFormSection } from '../components/forms/LeadFormSection';
import { RelatedLinksSection } from '../components/seo/RelatedLinksSection';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import demosManifest from '../config/demos.generated.json';
import { siteConfig } from '../config/site';
import type { DemoManifestItem } from '../types/demo';
import { trackEvent } from '../utils/analytics';
import { getTopCityLandings } from '../utils/city-landings';
import { groupDemosByCategory } from '../utils/demos';
import { getIndustryPages } from '../utils/industry';

const demoCategories = groupDemosByCategory(demosManifest as DemoManifestItem[]);
const placeholderPreview = '/demo-placeholder.svg';
const industryByCategory = new Map(getIndustryPages().map((item) => [item.category, item]));

type CategoryFilter = {
  key: string;
  label: string;
  categories: string[];
};

const categoryFilters: CategoryFilter[] = [
  { key: 'all', label: siteConfig.demos.filterLabels.all, categories: [] },
  { key: 'fitness', label: siteConfig.demos.filterLabels.fitness, categories: ['fitness'] },
  { key: 'salud', label: siteConfig.demos.filterLabels.salud, categories: ['salud', 'odontologia'] },
  { key: 'legal', label: siteConfig.demos.filterLabels.legal, categories: ['legal'] },
  { key: 'belleza', label: siteConfig.demos.filterLabels.belleza, categories: ['estetica'] },
  { key: 'negocios', label: siteConfig.demos.filterLabels.negocios, categories: ['negocios-locales', 'b2b'] },
];

const validFilterKeys = new Set(categoryFilters.map((item) => item.key));
const topCityLandings = getTopCityLandings(6);

function getVisibleCategories(filterKey: string) {
  if (filterKey === 'all') return demoCategories;

  const filter = categoryFilters.find((item) => item.key === filterKey);
  if (!filter) return demoCategories;

  return demoCategories.filter((category) => filter.categories.includes(category.slug));
}

export function DemosGallerySection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilterKey = searchParams.get('category') ?? 'all';
  const normalizedFilterKey = validFilterKeys.has(activeFilterKey) ? activeFilterKey : 'all';
  const visibleCategories = getVisibleCategories(normalizedFilterKey);

  const handleFilterClick = (filterKey: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (filterKey === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', filterKey);
    }

    setSearchParams(nextParams, { replace: true });
    trackEvent({ event: 'internal_nav', category: 'demos-filter', label: filterKey });
  };

  return (
    <section className="content-section">
      <div className="container">
        <SectionHeading
          as="h1"
          eyebrow={siteConfig.demos.eyebrow}
          title={siteConfig.demos.title}
          description={siteConfig.demos.description}
        />

        <div className="template-filters" role="tablist" aria-label={siteConfig.demos.filtersAriaLabel}>
          {categoryFilters.map((filter) => {
            const isActive = filter.key === normalizedFilterKey;

            return (
              <button
                key={filter.key}
                className={`template-filter-chip${isActive ? ' template-filter-chip--active' : ''}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleFilterClick(filter.key)}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="demos-gallery">
          {visibleCategories.map((category) => (
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
                      {siteConfig.demos.industryLinkPrefix} {category.title.toLowerCase()}
                    </Link>
                  ) : null}
                </div>
              </div>

              <div className="card-grid card-grid--three">
                {category.items.map((item) => (
                  <SurfaceCard key={item.slug} className="demo-gallery-card">
                    <a className="demo-gallery-card__preview" href={item.href} target="_blank" rel="noreferrer">
                      <img
                        src={item.preview ?? placeholderPreview}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        width={1600}
                        height={1000}
                      />
                    </a>

                    <h3>{item.title}</h3>
                    <p>{item.description}</p>

                    <a
                      className="text-link"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() =>
                        trackEvent('demo_click', {
                          demo: item.publicSlug,
                          category: category.slug,
                          source: 'demos_page',
                          path: siteConfig.routes.captivaDemos,
                        })
                      }
                    >
                      {siteConfig.demos.cardCtaLabel}
                    </a>
                  </SurfaceCard>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="industry-cta">
          <h2>{siteConfig.demos.ctaTitle}</h2>
          <p>{siteConfig.demos.ctaDescription}</p>
          <PrimaryCTA
            label={siteConfig.demos.ctaButtonLabel}
            variant="primary"
            mode="lead-form"
            leadFormId="lead-form-demos"
            source="demos"
            context="captiva-demos"
          />
        </div>

        <LeadFormSection
          id="lead-form-demos"
          source="demos"
          context="captiva-demos"
          title="Solicitar una landing basada en estas demos"
          description="Te contactamos por WhatsApp con una propuesta segun el rubro y la estructura que mas te guste."
        />

        {topCityLandings.length > 0 ? (
          <section className="industry-links">
            <h2>Landing pages por ciudad</h2>
            <div className="card-grid card-grid--three">
              {topCityLandings.map((item) => (
                <SurfaceCard key={item.slug}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link
                    className="text-link"
                    to={item.path}
                    onClick={() => trackEvent({ event: 'internal_nav', category: 'city-landing', label: item.slug })}
                  >
                    Ver pagina por ciudad
                  </Link>
                </SurfaceCard>
              ))}
            </div>
          </section>
        ) : null}

        <RelatedLinksSection title="Guias y recursos relacionados" maxLinks={7} />
      </div>
    </section>
  );
}
