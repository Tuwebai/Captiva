import { Link, useSearchParams } from 'react-router-dom';

import { ButtonLink } from '../components/ui/ButtonLink';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import demosManifest from '../config/demos.generated.json';
import { siteConfig } from '../config/site';
import type { DemoManifestItem } from '../types/demo';
import { trackEvent } from '../utils/analytics';
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
  { key: 'all', label: 'Todos', categories: [] },
  { key: 'fitness', label: 'Fitness', categories: ['fitness'] },
  { key: 'salud', label: 'Salud', categories: ['salud', 'odontologia'] },
  { key: 'legal', label: 'Legal', categories: ['legal'] },
  { key: 'belleza', label: 'Belleza', categories: ['estetica'] },
  { key: 'negocios', label: 'Negocios', categories: ['negocios-locales', 'b2b'] },
];

const validFilterKeys = new Set(categoryFilters.map((item) => item.key));

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
          eyebrow="Template Library"
          title="Explora Landing Pages por Industria"
          description="Biblioteca de templates listos para conversion. Filtra por categoria y revisa demos reales por rubro."
        />

        <div className="template-filters" role="tablist" aria-label="Filtrar demos por categoria">
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
            Solicitar mi landing
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
