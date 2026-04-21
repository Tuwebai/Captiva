import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { ANALYTICS_EVENTS, useAnalytics } from '../lib/analytics';
import { PrimaryCTA } from '../components/cta/PrimaryCTA';
import { LeadFormSection } from '../components/forms/LeadFormSection';
import { RelatedLinksSection } from '../components/seo/RelatedLinksSection';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { getRouteCta } from '../config/cta-strategy';
import { siteConfig } from '../config/site';
import { demosManifest } from '../data/demosManifest';
import type { DemoCategoryGroup } from '../types/demo';
import { getTopCityLandings } from '../utils/city-landings';
import {
  getCatalogDemos,
  getIndustryFilterOptions,
  getIndustryLabel,
  getTagFilterOptions,
  groupDemosByCategory,
} from '../utils/demos';
import { getIndustryPages } from '../utils/industry';
const activeDemos = getCatalogDemos(demosManifest);
const demoCategories = groupDemosByCategory(activeDemos);
const industryByCategory = new Map(getIndustryPages().map((item) => [item.category, item]));
const topCityLandings = getTopCityLandings(6);

const showcaseMockupByIndustry: Record<
  string,
  {
    domain: string;
    icon: string;
    color: string;
    accent: string;
    topBar: string;
    accentBg: string;
  }
> = {
  odontologia: {
    domain: 'clinicasanchez.com.ar',
    icon: '🦷',
    color: 'from-blue-500/20 to-cyan-500/10',
    accent: 'text-blue-400',
    topBar: 'from-blue-500 to-cyan-400',
    accentBg: 'bg-blue-500/10 border-blue-500/20',
  },
  estetica: {
    domain: 'beautystudiovaleria.com',
    icon: '💆‍♀️',
    color: 'from-pink-500/20 to-rose-500/10',
    accent: 'text-pink-400',
    topBar: 'from-pink-500 to-rose-400',
    accentBg: 'bg-pink-500/10 border-pink-500/20',
  },
  gimnasio: {
    domain: 'fitprocentro.com.ar',
    icon: '🏋️',
    color: 'from-orange-500/20 to-amber-500/10',
    accent: 'text-orange-400',
    topBar: 'from-orange-500 to-amber-400',
    accentBg: 'bg-orange-500/10 border-orange-500/20',
  },
  abogados: {
    domain: 'estudiomendez.com.ar',
    icon: '⚖️',
    color: 'from-violet-500/20 to-purple-500/10',
    accent: 'text-violet-400',
    topBar: 'from-violet-500 to-purple-400',
    accentBg: 'bg-violet-500/10 border-violet-500/20',
  },
};

function DemoIndustryMockup({ industry }: { industry: string }) {
  const mockup = showcaseMockupByIndustry[industry] ?? showcaseMockupByIndustry.odontologia;

  return (
    <div className="bg-[#0D0D0F]/80 rounded-xl p-3 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <div className="flex-1 bg-[#1A1A1F] rounded-md px-2 py-1 text-[10px] text-zinc-500 font-mono truncate">
          {mockup.domain}
        </div>
      </div>

      <div className="space-y-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-base">{mockup.icon}</span>
          <div className="w-20 h-3 bg-zinc-700 rounded-full" />
        </div>
        <div className="w-full h-4 bg-zinc-600/40 rounded" />
        <div className="w-4/5 h-4 bg-zinc-600/40 rounded" />
        <div className="w-3/5 h-3 bg-zinc-700/40 rounded" />
        <div className="mt-3 flex gap-2">
          <div className="flex-1 h-8 bg-violet-600/70 rounded-lg flex items-center justify-center">
            <div className="w-16 h-2 bg-white/50 rounded" />
          </div>
          <div className="w-20 h-8 border border-zinc-600/50 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function DemoCatalogCard({
  item,
  index,
  onOpen,
}: {
  item: DemoCategoryGroup['items'][number];
  index: number;
  onOpen: () => void;
}) {
  const mockup = showcaseMockupByIndustry[item.industry] ?? showcaseMockupByIndustry.odontologia;

  return (
    <div className="group relative bg-surface border border-border rounded-3xl overflow-hidden hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl" style={{ animationDelay: `${index * 100}ms` }}>
      <div className={`h-1 w-full bg-linear-to-r ${mockup.topBar}`} />

      <a
        className={`block p-5 bg-linear-to-br ${
          item.industry === 'odontologia'
            ? 'from-blue-500/20 to-cyan-500/10'
            : item.industry === 'estetica'
              ? 'from-pink-500/20 to-rose-500/10'
              : item.industry === 'gimnasio'
                ? 'from-orange-500/20 to-amber-500/10'
                : 'from-violet-500/20 to-purple-500/10'
        }`}
        href={item.href}
        target="_blank"
        rel="noreferrer"
        data-tooltip="Ver esta landing page en modo interactivo."
        onClick={onOpen}
      >
        <DemoIndustryMockup industry={item.industry} />

        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${mockup.accentBg}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 inline-block" />
        </div>
      </a>

      <div className="p-5 space-y-3">
        <div>
          <div className="text-xs text-zinc-500 font-medium uppercase tracking-wide mb-1">{getIndustryLabel(item.industry)}</div>
          <h3 className="text-base font-bold text-white">{item.title}</h3>
          <p className="text-sm text-zinc-400 mt-1 leading-snug">"{item.description}"</p>
        </div>

        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 group-hover:border-opacity-60 ${mockup.accentBg} hover:opacity-80`}
          data-tooltip="Ver esta landing page en modo interactivo."
          onClick={onOpen}
        >
          Ver esta landing
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 8h8M9 5l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

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

function buildIndustryScopedCategory(
  industryKey: string,
  filterKey: string,
  tagFilterKey: string,
): DemoCategoryGroup[] {
  const scopedDemos = activeDemos.filter((item) => {
    if (item.industry !== industryKey) return false;
    if (tagFilterKey !== 'all' && !(item.tags ?? []).includes(tagFilterKey)) return false;
    if (filterKey === 'all') return true;

    const filter = categoryFilters.find((item) => item.key === filterKey);
    if (!filter) return true;
    return filter.categories.includes(item.category);
  });

  if (scopedDemos.length === 0) {
    return [];
  }

  return [
    {
      slug: industryKey,
      title: getIndustryLabel(industryKey),
      description: `Demos para ${getIndustryLabel(industryKey).toLowerCase()} con estructura clara, CTA visible y contacto orientado a conversion.`,
      items: scopedDemos.sort((left, right) => left.title.localeCompare(right.title, 'es')),
    },
  ];
}

type DemosGallerySectionProps = {
  industrySlug?: string;
};

export function DemosGallerySection({ industrySlug }: DemosGallerySectionProps) {
  const { trackEvent } = useAnalytics();
  const demosCta = getRouteCta('demos');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const params = useParams();
  const activeFilterKey = searchParams.get('category') ?? 'all';
  const routeIndustryKey = industrySlug ?? params.industry;
  const activeIndustryFilterKey = routeIndustryKey ?? searchParams.get('industry') ?? 'all';
  const normalizedFilterKey = validFilterKeys.has(activeFilterKey) ? activeFilterKey : 'all';
  const normalizedIndustryFilterKey = validIndustryFilterKeys.has(activeIndustryFilterKey) ? activeIndustryFilterKey : 'all';
  const tagFilters = getTagFilterOptions(activeDemos, normalizedIndustryFilterKey);
  const validTagFilterKeys = new Set(tagFilters.map((item) => item.key));
  const activeTagFilterKey = searchParams.get('tag') ?? 'all';
  const normalizedTagFilterKey = validTagFilterKeys.has(activeTagFilterKey) ? activeTagFilterKey : 'all';
  const visibleCategories =
    normalizedIndustryFilterKey === 'all'
      ? getVisibleCategories(
          normalizedFilterKey,
          normalizedIndustryFilterKey,
          normalizedTagFilterKey,
        )
      : buildIndustryScopedCategory(
          normalizedIndustryFilterKey,
          normalizedFilterKey,
          normalizedTagFilterKey,
        );
  const visibleCount = visibleCategories.reduce((total, category) => total + category.items.length, 0);
  const activeIndustryOption = industryFilters.find((item) => item.key === normalizedIndustryFilterKey);
  const activeTagOption = tagFilters.find((item) => item.key === normalizedTagFilterKey);
  const heroIndustryLabel = activeIndustryOption?.label ?? 'tu rubro';
  const heroDescription = activeIndustryOption
    ? `Explorá demos reales para ${activeIndustryOption.label.toLowerCase()}, compará estructuras y elegí la base visual que querés adaptar a tu landing.`
    : 'Explorá demos reales, compará estructuras y elegí la base visual que querés adaptar a tu landing en Captiva.';

  const handleCategoryFilterClick = (filterKey: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (filterKey === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', filterKey);
    }

    setSearchParams(nextParams, { replace: true });
    trackEvent({ action: ANALYTICS_EVENTS.DEMO_FILTER_APPLY, category: 'demos-filter', label: filterKey });
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

    trackEvent({ action: ANALYTICS_EVENTS.DEMO_FILTER_APPLY, category: 'demos-industry-filter', label: industryKey });
  };

  const handleTagFilterClick = (tagKey: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (tagKey === 'all') {
      nextParams.delete('tag');
    } else {
      nextParams.set('tag', tagKey);
    }

    setSearchParams(nextParams, { replace: true });
    trackEvent({ action: ANALYTICS_EVENTS.DEMO_FILTER_APPLY, category: 'demos-tag-filter', label: tagKey });
  };

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

                {(normalizedIndustryFilterKey !== 'all' || normalizedFilterKey !== 'all' || normalizedTagFilterKey !== 'all') ? (
                  <div className="flex">
                    <Link className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-7 py-4 text-base font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/5" to={siteConfig.routes.captivaDemos}>
                      Limpiar filtros
                    </Link>
                  </div>
                ) : null}
              </div>

              <div className="ui-card grid-bg rounded-[32px] p-6">
                <DemoIndustryMockup industry={normalizedIndustryFilterKey === 'all' ? 'odontologia' : normalizedIndustryFilterKey} />
              </div>
            </section>

            <SurfaceCard className="space-y-6 rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(20,18,35,0.28)] backdrop-blur">
              <div className="space-y-3">
                <p className="section-heading__eyebrow !mb-0">Explorar catálogo</p>
                <h2 className="text-2xl font-semibold text-white">Filtrá demos sin sidebar</h2>
                <p className="text-sm text-zinc-300">
                  Todo el catálogo ahora vive en el flujo principal, igual que el home: más limpio, más ancho y con foco total en las cards.
                </p>
              </div>

              <div className="space-y-5">
                <div className="space-y-3">
                  <span className="section-heading__eyebrow !mb-0">Industrias</span>
                  <div className="template-filters" role="tablist" aria-label="Filtrar demos por industria">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={normalizedIndustryFilterKey === 'all'}
                      className={`template-filter-chip${normalizedIndustryFilterKey === 'all' ? ' template-filter-chip--active' : ''}`}
                      onClick={() => handleIndustryFilterClick('all')}
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
                        onClick={() => handleIndustryFilterClick(industry.key)}
                      >
                        {industry.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="section-heading__eyebrow !mb-0">Categorías</span>
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
                          onClick={() => handleCategoryFilterClick(filter.key)}
                        >
                          {filter.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {tagFilters.length > 0 ? (
                  <div className="space-y-3">
                    <span className="section-heading__eyebrow !mb-0">Etiquetas</span>
                    <div className="template-filters" role="tablist" aria-label="Filtrar demos por etiqueta">
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
                ) : null}
              </div>
            </SurfaceCard>

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
                          <Link
                            className="text-link"
                            to={`/${industryByCategory.get(category.slug)?.slug ?? ''}`}
                            onClick={() => trackEvent({ action: ANALYTICS_EVENTS.INTERNAL_NAV_CLICK, category: category.slug, label: 'industry-page' })}
                          >
                            {siteConfig.demos.industryLinkPrefix} {category.title.toLowerCase()}
                          </Link>
                        ) : null}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {category.items.map((item, index) => (
                        <DemoCatalogCard
                          key={item.slug}
                          item={item}
                          index={index}
                          onOpen={() =>
                            trackEvent({
                              action: ANALYTICS_EVENTS.DEMO_VIEW,
                              category: item.category,
                              label: item.slug,
                              path: siteConfig.routes.captivaDemos,
                            })
                          }
                        />
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

            <div className="demos-catalog-followup">
              <div className="industry-cta">
                <h2>{siteConfig.demos.ctaTitle}</h2>
                <p>{siteConfig.demos.ctaDescription}</p>
                <span data-tooltip="Solicita una landing optimizada para captar clientes.">
                  <PrimaryCTA
                    label={demosCta.primary}
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
                          onClick={() => trackEvent({ action: ANALYTICS_EVENTS.INTERNAL_NAV_CLICK, category: 'city-landing', label: item.slug })}
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
          </div>
        </div>
      </div>
    </section>
  );
}
