import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

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
import {
  getIndustryFilterOptions,
  getIndustryLabel,
  getPublishedDemos,
  getTagFilterOptions,
  groupDemosByCategory,
} from '../utils/demos';
import { getIndustryPages } from '../utils/industry';

const activeDemos = getPublishedDemos(demosManifest as DemoManifestItem[]);
const demoCategories = groupDemosByCategory(activeDemos);
const placeholderPreview = '/demo-placeholder.svg';
const industryByCategory = new Map(getIndustryPages().map((item) => [item.category, item]));
const topCityLandings = getTopCityLandings(6);

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
  { key: 'negocios', label: siteConfig.demos.filterLabels.negocios, categories: ['negocios-locales', 'b2b', 'automotriz'] },
];

const validFilterKeys = new Set(categoryFilters.map((item) => item.key));
const industryFilters = getIndustryFilterOptions(activeDemos);
const validIndustryFilterKeys = new Set(industryFilters.map((item) => item.key));

function buildCatalogPath(industryKey: string) {
  if (industryKey === 'all') return siteConfig.routes.captivaDemos;
  return `${siteConfig.routes.captivaDemos}/industria/${industryKey}`;
}

function getVisibleCategories(filterKey: string, industryFilterKey: string, tagFilterKey: string) {
  const categoryFiltered = (() => {
    if (filterKey === 'all') return demoCategories;

    const filter = categoryFilters.find((item) => item.key === filterKey);
    if (!filter) return demoCategories;

    return demoCategories.filter((category) => filter.categories.includes(category.slug));
  })();

  return categoryFiltered
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => {
        if (industryFilterKey !== 'all' && item.industry !== industryFilterKey) return false;
        if (tagFilterKey !== 'all' && !(item.tags ?? []).includes(tagFilterKey)) return false;
        return true;
      }),
    }))
    .filter((category) => category.items.length > 0);
}

type DemosGallerySectionProps = {
  industrySlug?: string;
};

export function DemosGallerySection({ industrySlug }: DemosGallerySectionProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const params = useParams();
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [sidebarSections, setSidebarSections] = useState({
    collections: true,
    categories: true,
    tags: true,
  });
  const activeFilterKey = searchParams.get('category') ?? 'all';
  const routeIndustryKey = industrySlug ?? params.industry;
  const activeIndustryFilterKey = routeIndustryKey ?? searchParams.get('industry') ?? 'all';
  const normalizedFilterKey = validFilterKeys.has(activeFilterKey) ? activeFilterKey : 'all';
  const normalizedIndustryFilterKey = validIndustryFilterKeys.has(activeIndustryFilterKey) ? activeIndustryFilterKey : 'all';
  const tagFilters = getTagFilterOptions(activeDemos, normalizedIndustryFilterKey);
  const validTagFilterKeys = new Set(tagFilters.map((item) => item.key));
  const activeTagFilterKey = searchParams.get('tag') ?? 'all';
  const normalizedTagFilterKey = validTagFilterKeys.has(activeTagFilterKey) ? activeTagFilterKey : 'all';
  const visibleCategories = getVisibleCategories(
    normalizedFilterKey,
    normalizedIndustryFilterKey,
    normalizedTagFilterKey,
  );
  const visibleCount = visibleCategories.reduce((total, category) => total + category.items.length, 0);
  const activeIndustryOption = industryFilters.find((item) => item.key === normalizedIndustryFilterKey);
  const activeTagOption = tagFilters.find((item) => item.key === normalizedTagFilterKey);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedMinimized = window.localStorage.getItem('captiva:demos-sidebar-minimized');
    if (savedMinimized === 'true' || savedMinimized === 'false') {
      setIsSidebarMinimized(savedMinimized === 'true');
    }

    const savedValue = window.localStorage.getItem('captiva:demos-sidebar-sections');
    if (!savedValue) return;

    try {
      const parsed = JSON.parse(savedValue) as Partial<typeof sidebarSections>;
      setSidebarSections((current) => ({
        collections: parsed.collections ?? current.collections,
        categories: parsed.categories ?? current.categories,
        tags: parsed.tags ?? current.tags,
      }));
    } catch {
      window.localStorage.removeItem('captiva:demos-sidebar-sections');
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.localStorage.setItem('captiva:demos-sidebar-minimized', String(isSidebarMinimized));
  }, [isSidebarMinimized]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.localStorage.setItem('captiva:demos-sidebar-sections', JSON.stringify(sidebarSections));
  }, [sidebarSections]);

  const handleCategoryFilterClick = (filterKey: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (filterKey === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', filterKey);
    }

    setSearchParams(nextParams, { replace: true });
    trackEvent({ event: 'internal_nav', category: 'demos-filter', label: filterKey });
  };

  const handleIndustryFilterClick = (industryKey: string) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('industry');
    const targetPath = buildCatalogPath(industryKey);
    const search = nextParams.toString();

    navigate(
      {
        pathname: targetPath,
        search: search ? `?${search}` : '',
      },
      { replace: true },
    );

    trackEvent({ event: 'internal_nav', category: 'demos-industry-filter', label: industryKey });
  };

  const handleTagFilterClick = (tagKey: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (tagKey === 'all') {
      nextParams.delete('tag');
    } else {
      nextParams.set('tag', tagKey);
    }

    setSearchParams(nextParams, { replace: true });
    trackEvent({ event: 'internal_nav', category: 'demos-tag-filter', label: tagKey });
  };

  const toggleSidebarSection = (section: 'collections' | 'categories' | 'tags') => {
    setSidebarSections((current) => ({ ...current, [section]: !current[section] }));
  };

  return (
    <section className="content-section">
      <div className="container">
        <div className="demos-catalog-layout">
          <div className="demos-catalog-main">
            <SectionHeading
              as="h1"
              eyebrow={siteConfig.demos.eyebrow}
              title={activeIndustryOption ? `Demos para ${activeIndustryOption.label}` : siteConfig.demos.title}
              description={
                activeIndustryOption
                  ? `Explora ejemplos reales de landing pages para ${activeIndustryOption.label.toLowerCase()}, con estructura de conversion, CTA visible y contacto orientado a lead.`
                  : siteConfig.demos.description
              }
            />

            <div className="demos-catalog-toolbar demos-catalog-toolbar--hero">
              <div className="demos-catalog-toolbar__summary">
                <span className="demos-catalog-toolbar__count">{visibleCount} demos activas</span>
                {activeIndustryOption ? <span className="demos-catalog-toolbar__chip">{activeIndustryOption.label}</span> : null}
                {activeTagOption ? <span className="demos-catalog-toolbar__chip">{activeTagOption.label}</span> : null}
              </div>

              {(normalizedIndustryFilterKey !== 'all' || normalizedFilterKey !== 'all' || normalizedTagFilterKey !== 'all') ? (
                <Link className="text-link" to={siteConfig.routes.captivaDemos}>
                  Limpiar filtros
                </Link>
              ) : null}
            </div>

            <div className="demos-gallery">
              {visibleCategories.length > 0 ? (
                visibleCategories.map((category) => (
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
                          <a
                            className="demo-gallery-card__preview"
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            data-tooltip="Ver esta landing page en modo interactivo."
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

                          <div className="demo-gallery-card__meta">
                            <div className="demo-gallery-card__chips">
                              <span className="demo-gallery-card__chip">{getIndustryLabel(item.industry)}</span>
                              {item.goal ? <span className="demo-gallery-card__chip">{item.goal}</span> : null}
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                          </div>

                          <a
                            className="text-link"
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            data-tooltip="Ver esta landing page en modo interactivo."
                            onClick={() =>
                              trackEvent('demo_click', {
                                demo: item.publicSlug ?? item.slug,
                                category: category.slug,
                                industry: item.industry,
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
                ))
              ) : (
                <SurfaceCard className="demos-empty-state">
                  <p className="section-heading__eyebrow">Sin coincidencias</p>
                  <h2>No encontramos demos para esta combinacion de filtros.</h2>
                  <p>Proba cambiando la industria o la etiqueta para volver a ver demos activas.</p>
                  <button type="button" className="template-filter-chip template-filter-chip--active" onClick={() => navigate(siteConfig.routes.captivaDemos)}>
                    Ver todo el catalogo
                  </button>
                </SurfaceCard>
              )}
            </div>
          </div>

          <aside
            className={`demos-catalog-sidebar${isSidebarMinimized ? ' demos-catalog-sidebar--minimized' : ''}`}
            aria-label="Explorar catalogo de demos por industria y etiquetas"
          >
            <SurfaceCard className="demos-catalog-sidebar__panel">
              <div className="demos-catalog-sidebar__header">
                <div className="demos-catalog-sidebar__section">
                  <p className="section-heading__eyebrow">Catalogo</p>
                  <h2>Explorar demos</h2>
                  {!isSidebarMinimized ? (
                    <p>Filtra el catalogo sin comprimir las cards ni perder la vista del grid principal.</p>
                  ) : null}
                </div>

                <button
                  type="button"
                  className="demos-catalog-sidebar__minimize"
                  aria-label={isSidebarMinimized ? 'Expandir catalogo' : 'Minimizar catalogo'}
                  aria-pressed={isSidebarMinimized}
                  onClick={() => setIsSidebarMinimized((current) => !current)}
                >
                  {isSidebarMinimized ? '>' : '<'}
                </button>
              </div>

              {!isSidebarMinimized ? (
                <>
                  <section className={`demos-sidebar-group${sidebarSections.collections ? ' demos-sidebar-group--open' : ''}`}>
                <button
                  type="button"
                  className="demos-sidebar-group__toggle"
                  aria-expanded={sidebarSections.collections}
                  onClick={() => toggleSidebarSection('collections')}
                >
                  <span>Colecciones</span>
                  <span className="demos-sidebar-group__chevron" aria-hidden="true">
                    {sidebarSections.collections ? '−' : '+'}
                  </span>
                </button>

                <div
                  className={`demos-sidebar-group__content${sidebarSections.collections ? ' demos-sidebar-group__content--open' : ''}`}
                >
                  <div className="demos-catalog-sidebar__collection-list">
                    <button
                      type="button"
                      className={`demos-catalog-pill${normalizedIndustryFilterKey === 'all' ? ' demos-catalog-pill--active' : ''}`}
                      onClick={() => handleIndustryFilterClick('all')}
                    >
                      <span>Todas las industrias</span>
                      <strong>{activeDemos.length}</strong>
                    </button>

                    {industryFilters.map((industry) => (
                      <button
                        key={industry.key}
                        type="button"
                        className={`demos-catalog-pill${industry.key === normalizedIndustryFilterKey ? ' demos-catalog-pill--active' : ''}`}
                        onClick={() => handleIndustryFilterClick(industry.key)}
                      >
                        <span>{industry.label}</span>
                        <strong>{industry.count}</strong>
                      </button>
                    ))}
                  </div>
                </div>
                  </section>

                  <section className={`demos-sidebar-group${sidebarSections.categories ? ' demos-sidebar-group--open' : ''}`}>
                <button
                  type="button"
                  className="demos-sidebar-group__toggle"
                  aria-expanded={sidebarSections.categories}
                  onClick={() => toggleSidebarSection('categories')}
                >
                  <span>Categorias</span>
                  <span className="demos-sidebar-group__chevron" aria-hidden="true">
                    {sidebarSections.categories ? '−' : '+'}
                  </span>
                </button>

                <div
                  className={`demos-sidebar-group__content${sidebarSections.categories ? ' demos-sidebar-group__content--open' : ''}`}
                >
                  <div className="template-filters template-filters--stacked" role="tablist" aria-label={siteConfig.demos.filtersAriaLabel}>
                    {categoryFilters.map((filter) => {
                      const isActive = filter.key === normalizedFilterKey;

                      return (
                        <button
                          key={filter.key}
                          className={`template-filter-chip${isActive ? ' template-filter-chip--active' : ''}`}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => handleCategoryFilterClick(filter.key)}
                        >
                          {filter.label}
                        </button>
                        );
                      })}
                  </div>
                  </div>
                  </section>

                  {tagFilters.length > 0 ? (
                    <section className={`demos-sidebar-group${sidebarSections.tags ? ' demos-sidebar-group--open' : ''}`}>
                  <button
                    type="button"
                    className="demos-sidebar-group__toggle"
                    aria-expanded={sidebarSections.tags}
                    onClick={() => toggleSidebarSection('tags')}
                  >
                    <span>Etiquetas</span>
                    <span className="demos-sidebar-group__chevron" aria-hidden="true">
                      {sidebarSections.tags ? '−' : '+'}
                    </span>
                  </button>

                  <div
                    className={`demos-sidebar-group__content${sidebarSections.tags ? ' demos-sidebar-group__content--open' : ''}`}
                  >
                    <div className="template-filters template-filters--stacked" role="tablist" aria-label="Filtrar demos por etiqueta">
                      <button
                        className={`template-filter-chip${normalizedTagFilterKey === 'all' ? ' template-filter-chip--active' : ''}`}
                        type="button"
                        role="tab"
                        aria-selected={normalizedTagFilterKey === 'all'}
                        onClick={() => handleTagFilterClick('all')}
                      >
                        Todas las etiquetas
                      </button>

                      {tagFilters.slice(0, 10).map((filter) => {
                        const isActive = filter.key === normalizedTagFilterKey;

                        return (
                          <button
                            key={filter.key}
                            className={`template-filter-chip${isActive ? ' template-filter-chip--active' : ''}`}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => handleTagFilterClick(filter.key)}
                          >
                            {filter.label}
                          </button>
                        );
                      })}
                    </div>
                    </div>
                    </section>
                  ) : null}

                  {(normalizedIndustryFilterKey !== 'all' || normalizedFilterKey !== 'all' || normalizedTagFilterKey !== 'all') ? (
                    <div className="demos-catalog-sidebar__footer">
                      <Link className="text-link" to={siteConfig.routes.captivaDemos}>
                        Limpiar todos los filtros
                      </Link>
                    </div>
                  ) : null}
                </>
              ) : null}
            </SurfaceCard>
          </aside>
        </div>

        <div className="industry-cta">
          <h2>{siteConfig.demos.ctaTitle}</h2>
          <p>{siteConfig.demos.ctaDescription}</p>
          <span data-tooltip="Solicita una landing optimizada para captar clientes.">
            <PrimaryCTA
              label={siteConfig.demos.ctaButtonLabel}
              variant="primary"
              mode="lead-form"
              leadFormId="lead-form-demos"
              source="demos"
              context={normalizedIndustryFilterKey === 'all' ? 'captiva-demos' : `captiva-demos-${normalizedIndustryFilterKey}`}
              industry={normalizedIndustryFilterKey === 'all' ? undefined : normalizedIndustryFilterKey}
            />
          </span>
        </div>

        <LeadFormSection
          id="lead-form-demos"
          source="demos"
          context={normalizedIndustryFilterKey === 'all' ? 'captiva-demos' : `captiva-demos-${normalizedIndustryFilterKey}`}
          industry={normalizedIndustryFilterKey === 'all' ? undefined : normalizedIndustryFilterKey}
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
