import { Link } from 'react-router-dom';

import { PrimaryCTA } from '../../components/cta/PrimaryCTA';
import { LeadFormSection } from '../../components/forms/LeadFormSection';
import { RelatedLinksSection } from '../../components/seo/RelatedLinksSection';
import { SurfaceCard } from '../../components/ui/SurfaceCard';
import { siteConfig } from '../../config/site';
import type { DemoCategoryGroup } from '../../types/demo';
import { DemoCatalogCard } from './DemoCatalogCard';
import { DemoIndustryMockup } from './DemoIndustryMockup';

type FilterOption = {
  key: string;
  label: string;
};

type DemosCatalogContentProps = {
  activeIndustryOption?: FilterOption;
  activeTagOption?: FilterOption;
  categoryFilters: FilterOption[];
  demosCtaLabel: string;
  heroDescription: string;
  heroIndustryLabel: string;
  industryByCategory: Map<string, { slug: string }>;
  industryFilters: FilterOption[];
  normalizedFilterKey: string;
  normalizedIndustryFilterKey: string;
  normalizedTagFilterKey: string;
  onCategoryFilterClick: (filterKey: string) => void;
  onIndustryFilterClick: (industryKey: string) => void;
  onTagFilterClick: (tagKey: string) => void;
  onOpenIndustryPage: (categorySlug: string) => void;
  onOpenItem: (categorySlug: string, itemSlug: string) => void;
  onResetFilters: () => void;
  tagFilters: FilterOption[];
  topCityLandings: Array<{ slug: string; title: string; description: string; path: string }>;
  visibleCategories: DemoCategoryGroup[];
  visibleCount: number;
};

export function DemosCatalogContent({
  activeIndustryOption,
  activeTagOption,
  categoryFilters,
  demosCtaLabel,
  heroDescription,
  heroIndustryLabel,
  industryByCategory,
  industryFilters,
  normalizedFilterKey,
  normalizedIndustryFilterKey,
  normalizedTagFilterKey,
  onCategoryFilterClick,
  onIndustryFilterClick,
  onTagFilterClick,
  onOpenIndustryPage,
  onOpenItem,
  onResetFilters,
  tagFilters,
  topCityLandings,
  visibleCategories,
  visibleCount,
}: DemosCatalogContentProps) {
  const hasActiveFilters =
    normalizedIndustryFilterKey !== 'all' || normalizedFilterKey !== 'all' || normalizedTagFilterKey !== 'all';
  const leadContext = normalizedIndustryFilterKey === 'all' ? 'captiva-demos' : `captiva-demos-${normalizedIndustryFilterKey}`;
  const leadIndustry = normalizedIndustryFilterKey === 'all' ? undefined : normalizedIndustryFilterKey;

  return (
    <section id="demos-catalogo" className="content-section">
      <div className="container">
        <div className="space-y-8">
          <div className="demos-catalog-main">
            <section id="demos-hero" className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-400">
                  {siteConfig.demos.eyebrow}
                </div>

                <div className="space-y-4">
                  <h1 className="max-w-[11ch] text-4xl font-black leading-none tracking-[-0.04em] text-white md:text-6xl">
                    Elegí la demo ideal para <span className="gradient-text">{heroIndustryLabel}</span>
                  </h1>
                  <p className="max-w-[62ch] text-base leading-relaxed text-zinc-300 md:text-lg">{heroDescription}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="ui-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white">
                    <span className="pulse-dot" />
                    {visibleCount} demos activas
                  </span>
                  {activeIndustryOption ? <span className="ui-chip rounded-full px-4 py-2 text-sm font-semibold text-white">{activeIndustryOption.label}</span> : null}
                  {activeTagOption ? <span className="ui-chip rounded-full px-4 py-2 text-sm font-semibold text-white">{activeTagOption.label}</span> : null}
                </div>

                {hasActiveFilters ? (
                  <div className="flex">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-7 py-4 text-base font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/5"
                      onClick={onResetFilters}
                    >
                      Limpiar filtros
                    </button>
                  </div>
                ) : null}
              </div>

              <div className="ui-card grid-bg rounded-[32px] p-6">
                <DemoIndustryMockup industry={normalizedIndustryFilterKey === 'all' ? 'odontologia' : normalizedIndustryFilterKey} />
              </div>
            </section>

            <div className="demos-catalog-layout">
              <aside className="demos-filter-sidebar" aria-label="Filtros del catálogo">
                <div className="demos-filter-sidebar__inner">
                  <div className="demos-filter-toolbar__header">
                    <p className="section-heading__eyebrow mb-0">Explorar catálogo</p>
                    <p className="demos-filter-toolbar__summary">Filtrá por rubro, categoría o etiqueta.</p>
                  </div>

                  <div className="demos-filter-toolbar__groups">
                    <div className="demos-filter-toolbar__group">
                      <span className="section-heading__eyebrow mb-0">Industrias</span>
                      <div className="template-filters template-filters--stacked template-filters--sidebar" role="tablist" aria-label="Filtrar demos por industria">
                        <button
                          type="button"
                          role="tab"
                          aria-selected={normalizedIndustryFilterKey === 'all'}
                          className={`template-filter-chip${normalizedIndustryFilterKey === 'all' ? ' template-filter-chip--active' : ''}`}
                          onClick={() => onIndustryFilterClick('all')}
                        >
                          Todas las industrias
                        </button>
                        {industryFilters.map((industry) => (
                          <button
                            key={industry.key}
                            type="button"
                            role="tab"
                            aria-selected={industry.key === normalizedIndustryFilterKey}
                            className={`template-filter-chip${industry.key === normalizedIndustryFilterKey ? ' template-filter-chip--active' : ''}`}
                            onClick={() => onIndustryFilterClick(industry.key)}
                          >
                            {industry.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="demos-filter-toolbar__group">
                      <span className="section-heading__eyebrow mb-0">Categorías</span>
                      <div className="template-filters template-filters--stacked template-filters--sidebar" role="tablist" aria-label={siteConfig.demos.filtersAriaLabel}>
                        {categoryFilters.map((filter) => {
                          const isActive = filter.key === normalizedFilterKey;

                          return (
                            <button
                              key={filter.key}
                              className={`template-filter-chip${isActive ? ' template-filter-chip--active' : ''}`}
                              type="button"
                              role="tab"
                              aria-selected={isActive}
                              onClick={() => onCategoryFilterClick(filter.key)}
                            >
                              {filter.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {tagFilters.length > 0 ? (
                      <div className="demos-filter-toolbar__group">
                        <span className="section-heading__eyebrow mb-0">Etiquetas</span>
                        <div className="template-filters template-filters--stacked template-filters--sidebar" role="tablist" aria-label="Filtrar demos por etiqueta">
                          <button
                            className={`template-filter-chip${normalizedTagFilterKey === 'all' ? ' template-filter-chip--active' : ''}`}
                            type="button"
                            role="tab"
                            aria-selected={normalizedTagFilterKey === 'all'}
                            onClick={() => onTagFilterClick('all')}
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
                                onClick={() => onTagFilterClick(filter.key)}
                              >
                                {filter.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}

                    {hasActiveFilters ? (
                      <button type="button" className="demos-filter-sidebar__reset" onClick={onResetFilters}>
                        Limpiar filtros
                      </button>
                    ) : null}
                  </div>
                </div>
              </aside>

              <div id="demos-rubros" className="demos-gallery">
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
                            <Link className="text-link" to={`/${industryByCategory.get(category.slug)?.slug ?? ''}`} onClick={() => onOpenIndustryPage(category.slug)}>
                              {siteConfig.demos.industryLinkPrefix} {category.title.toLowerCase()}
                            </Link>
                          ) : null}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {category.items.map((item, index) => (
                          <DemoCatalogCard key={item.slug} item={item} index={index} onOpen={() => onOpenItem(item.category, item.slug)} />
                        ))}
                      </div>
                    </section>
                  ))
                ) : (
                  <SurfaceCard className="demos-empty-state">
                    <p className="section-heading__eyebrow">Sin coincidencias</p>
                    <h2>No encontramos demos para esta combinacion de filtros.</h2>
                    <p>Proba cambiando la industria o la etiqueta para volver a ver demos activas.</p>
                    <button type="button" className="template-filter-chip template-filter-chip--active" onClick={onResetFilters}>
                      Ver todo el catalogo
                    </button>
                  </SurfaceCard>
                )}
              </div>
            </div>

            <div className="demos-catalog-followup">
              <div className="industry-cta">
                <h2>{siteConfig.demos.ctaTitle}</h2>
                <p>{siteConfig.demos.ctaDescription}</p>
                <span data-tooltip="Solicita una landing optimizada para captar clientes.">
                  <PrimaryCTA label={demosCtaLabel} variant="primary" mode="lead-form" leadFormId="lead-form-demos" source="demos" context={leadContext} industry={leadIndustry} />
                </span>
              </div>

              <LeadFormSection
                id="lead-form-demos"
                source="demos"
                context={leadContext}
                industry={leadIndustry}
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
                        <Link className="text-link" to={item.path} onClick={() => onOpenItem('city-landing', item.slug)}>
                          Ver pagina por ciudad
                        </Link>
                      </SurfaceCard>
                    ))}
                  </div>
                </section>
              ) : null}

              <RelatedLinksSection title="Guias y recursos relacionados" maxLinks={7} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
