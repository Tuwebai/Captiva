import { siteConfig } from '../../config/site';
import { demosManifest } from '../../data/demosManifest';
import { getTopCityLandings } from '../../utils/city-landings';
import { getCatalogDemos, getIndustryFilterOptions, groupDemosByCategory } from '../../utils/demos';
import { getIndustryPages } from '../../utils/industry';

export type CategoryFilter = {
  key: string;
  label: string;
  categories: string[];
};

export const activeDemos = getCatalogDemos(demosManifest);
export const demoCategories = groupDemosByCategory(activeDemos);
export const industryByCategory = new Map(getIndustryPages().map((item) => [item.category, item]));
export const topCityLandings = getTopCityLandings(6);

export const showcaseMockupByIndustry: Record<
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

export const categoryFilters: CategoryFilter[] = [
  { key: 'all', label: siteConfig.demos.filterLabels.all, categories: [] },
  { key: 'fitness', label: siteConfig.demos.filterLabels.fitness, categories: ['fitness'] },
  { key: 'salud', label: siteConfig.demos.filterLabels.salud, categories: ['salud', 'odontologia'] },
  { key: 'legal', label: siteConfig.demos.filterLabels.legal, categories: ['legal'] },
  { key: 'belleza', label: siteConfig.demos.filterLabels.belleza, categories: ['estetica'] },
  { key: 'negocios', label: siteConfig.demos.filterLabels.negocios, categories: ['negocios-locales', 'b2b', 'automotriz'] },
];

export const validFilterKeys = new Set(categoryFilters.map((item) => item.key));
export const industryFilters = getIndustryFilterOptions(activeDemos);
export const validIndustryFilterKeys = new Set(industryFilters.map((item) => item.key));
