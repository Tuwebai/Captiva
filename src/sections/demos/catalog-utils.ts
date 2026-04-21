import { siteConfig } from '../../config/site';
import type { DemoCategoryGroup } from '../../types/demo';
import { getIndustryLabel } from '../../utils/demos';
import { activeDemos, categoryFilters, demoCategories } from './catalog-data';

export function buildCatalogPath(industryKey: string) {
  if (industryKey === 'all') return siteConfig.routes.captivaDemos;
  return `${siteConfig.routes.captivaDemos}/industria/${industryKey}`;
}

export function getVisibleCategories(filterKey: string, industryFilterKey: string, tagFilterKey: string) {
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

export function buildIndustryScopedCategory(
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
