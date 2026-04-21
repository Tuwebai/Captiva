import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { ANALYTICS_EVENTS, useAnalytics } from '../lib/analytics';
import { getRouteCta } from '../config/cta-strategy';
import { getTagFilterOptions } from '../utils/demos';
import { DemosCatalogContent } from './demos/DemosCatalogContent';
import {
  activeDemos,
  categoryFilters,
  industryByCategory,
  industryFilters,
  topCityLandings,
  validFilterKeys,
  validIndustryFilterKeys,
} from './demos/catalog-data';
import { buildCatalogPath, buildIndustryScopedCategory, getVisibleCategories } from './demos/catalog-utils';

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
      ? getVisibleCategories(normalizedFilterKey, normalizedIndustryFilterKey, normalizedTagFilterKey)
      : buildIndustryScopedCategory(normalizedIndustryFilterKey, normalizedFilterKey, normalizedTagFilterKey);
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
    <DemosCatalogContent
      activeIndustryOption={activeIndustryOption}
      activeTagOption={activeTagOption}
      categoryFilters={categoryFilters}
      demosCtaLabel={demosCta.primary}
      heroDescription={heroDescription}
      heroIndustryLabel={heroIndustryLabel}
      industryByCategory={industryByCategory}
      industryFilters={industryFilters}
      normalizedFilterKey={normalizedFilterKey}
      normalizedIndustryFilterKey={normalizedIndustryFilterKey}
      normalizedTagFilterKey={normalizedTagFilterKey}
      onCategoryFilterClick={handleCategoryFilterClick}
      onIndustryFilterClick={handleIndustryFilterClick}
      onTagFilterClick={handleTagFilterClick}
      onOpenIndustryPage={(categorySlug) =>
        trackEvent({ action: ANALYTICS_EVENTS.INTERNAL_NAV_CLICK, category: categorySlug, label: 'industry-page' })
      }
      onOpenItem={(category, slug) =>
        trackEvent({
          action: category === 'city-landing' ? ANALYTICS_EVENTS.INTERNAL_NAV_CLICK : ANALYTICS_EVENTS.DEMO_VIEW,
          category,
          label: slug,
          path: category === 'city-landing' ? undefined : '/captiva/demos',
        })
      }
      onResetFilters={() => navigate('/captiva/demos')}
      tagFilters={tagFilters}
      topCityLandings={topCityLandings}
      visibleCategories={visibleCategories}
      visibleCount={visibleCount}
    />
  );
}
