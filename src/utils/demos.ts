import { demoCategoryContent } from '../config/demoCategories';
import type { DemoCategoryGroup, DemoManifestItem } from '../types/demo';

export type DemoFilterOption = {
  key: string;
  label: string;
  count: number;
};

const publishedStatuses = new Set(['active', 'required', 'pilot']);

const industryLabels: Record<string, string> = {
  abogado: 'Abogados',
  automotriz: 'Automotriz',
  b2b: 'Empresas B2B',
  'clinica-dental': 'Clinicas dentales',
  concesionaria: 'Concesionarias',
  dentista: 'Dentistas',
  detailing: 'Detailing',
  estetica: 'Estetica',
  gimnasio: 'Gimnasios',
  inmobiliaria: 'Inmobiliarias',
  odontologia: 'Odontologia',
  salud: 'Salud',
  veterinaria: 'Veterinarias',
};

const ignoredTagKeys = new Set([
  'captiva',
  'demo',
  'builder',
  'manual',
  'service-business',
  'real-estate-split',
  'health',
  'beauty',
  'business',
]);

const tagLabels: Record<string, string> = {
  abogado: 'Abogados',
  automotriz: 'Automotriz',
  b2b: 'B2B',
  builder: 'Builder',
  campaign: 'Campanas',
  clinica: 'Clinica',
  'clinica-dental': 'Clinica dental',
  concesionaria: 'Concesionaria',
  consultations: 'Consultas',
  dentista: 'Dentistas',
  detailing: 'Detailing',
  estetica: 'Estetica',
  fitness: 'Fitness',
  leads: 'Leads',
  memberships: 'Membresias',
  inmobiliaria: 'Inmobiliaria',
  local: 'Negocio local',
  odontologia: 'Odontologia',
  premium: 'Premium',
  salud: 'Salud',
  'test-drives': 'Test drives',
  veterinaria: 'Veterinaria',
};

function toTitleCase(value: string) {
  return value
    .split('-')
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ');
}

function countByKey(values: string[]) {
  const counts = new Map<string, number>();

  values.forEach((value) => {
    if (!value) return;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  });

  return counts;
}

export function getPublishedDemos(demos: DemoManifestItem[]) {
  const fallbackStatus = 'active';

  return demos.filter((demo) => publishedStatuses.has((demo.status ?? fallbackStatus).toLowerCase()));
}

export const getActiveDemos = getPublishedDemos;

export function getIndustryLabel(industry: string) {
  return industryLabels[industry] ?? toTitleCase(industry);
}

export function getTagLabel(tag: string) {
  return tagLabels[tag] ?? toTitleCase(tag);
}

export function getIndustryFilterOptions(demos: DemoManifestItem[]): DemoFilterOption[] {
  const counts = countByKey(demos.map((demo) => demo.industry).filter(Boolean));

  return [...counts.entries()]
    .sort((left, right) => {
      if (right[1] !== left[1]) return right[1] - left[1];
      return left[0].localeCompare(right[0], 'es');
    })
    .map(([industry, count]) => ({
      key: industry,
      label: getIndustryLabel(industry),
      count,
    }));
}

export function getTagFilterOptions(demos: DemoManifestItem[], industry = 'all'): DemoFilterOption[] {
  const scopedDemos = industry === 'all' ? demos : demos.filter((demo) => demo.industry === industry);
  const counts = countByKey(
    scopedDemos.flatMap((demo) => (demo.tags ?? []).filter((tag) => !ignoredTagKeys.has(tag))),
  );

  return [...counts.entries()]
    .sort((left, right) => {
      if (right[1] !== left[1]) return right[1] - left[1];
      return left[0].localeCompare(right[0], 'es');
    })
    .map(([tag, count]) => ({
      key: tag,
      label: getTagLabel(tag),
      count,
    }));
}

export function groupDemosByCategory(demos: DemoManifestItem[]): DemoCategoryGroup[] {
  const groups = new Map<string, DemoManifestItem[]>();

  demos.forEach((demo) => {
    const items = groups.get(demo.category) ?? [];
    items.push(demo);
    groups.set(demo.category, items);
  });

  return [...groups.entries()].map(([slug, items]) => {
    const content = demoCategoryContent[slug] ?? {
      title: slug,
      description: 'Demos disponibles para esta categoria.',
    };

    return {
      slug,
      title: content.title,
      description: content.description,
      items: items.sort((left, right) => left.title.localeCompare(right.title, 'es')),
    };
  });
}
