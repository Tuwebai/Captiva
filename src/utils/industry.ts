import industryCatalog from '../config/industry.catalog.json';
import demosManifest from '../config/demos.generated.json';
import type { DemoManifestItem } from '../types/demo';
import type { IndustryCatalogItem, IndustryPageData } from '../types/industry';

const catalog = industryCatalog as Record<string, IndustryCatalogItem>;
const demos = demosManifest as DemoManifestItem[];

function fallbackFromCategory(category: string): IndustryPageData {
  const normalized = category.trim().toLowerCase();
  const industryName = normalized.replace(/-/g, ' ');

  return {
    category,
    slug: `landing-page-para-${normalized}`,
    industryName,
    title: `Landing Page para ${industryName}`,
    problem: `Sin una landing page profesional para ${industryName}, muchas visitas no avanzan a consulta.`,
    solution: `Captiva crea landings para ${industryName} con enfoque en conversion, mensaje claro y contacto directo.`,
    benefits: [
      `Mas consultas para ${industryName}`,
      'Presencia digital profesional',
      'Mejor conversion de visitas en clientes',
    ],
  };
}

export function getIndustryPages(): IndustryPageData[] {
  const categories = [...new Set(demos.map((item) => item.category))];

  return categories
    .map((category) => {
      const item = catalog[category];
      if (!item) return fallbackFromCategory(category);

      return {
        category,
        ...item,
      };
    })
    .sort((left, right) => left.title.localeCompare(right.title, 'es'));
}

export function getIndustryBySlug(slug: string): IndustryPageData | undefined {
  return getIndustryPages().find((item) => item.slug === slug);
}

export function getDemosByIndustry(category: string): DemoManifestItem[] {
  return demos
    .filter((item) => item.category === category)
    .sort((left, right) => left.title.localeCompare(right.title, 'es'));
}
