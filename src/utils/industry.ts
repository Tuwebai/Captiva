import { demos } from '../growth/registry/demos';
import { industries } from '../growth/registry/industries';
import type { DemoManifestItem } from '../types/demo';
import type { IndustryPageData } from '../types/industry';

const catalogEntries = industries as IndustryPageData[];
const demoEntries = demos as DemoManifestItem[];

function fallbackFromCategory(category: string): IndustryPageData {
  const normalized = category.trim().toLowerCase();
  const industryName = normalized.replace(/-/g, ' ');

  return {
    category,
    slug: `landing-page-para-${normalized}`,
    name: industryName,
    industryName,
    title: `Landing Page para ${industryName}`,
    heroTitle: `Landing page para ${industryName} enfocada en conversion`,
    heroDescription: `Captiva crea landing pages para ${industryName} con estructura comercial y contacto directo.`,
    problem: `Sin una landing page profesional para ${industryName}, muchas visitas no avanzan a consulta.`,
    solution: `Captiva crea landings para ${industryName} con enfoque en conversion, mensaje claro y contacto directo.`,
    painPoints: [
      `Dependencia de canales dispersos para ${industryName}`,
      'Mensaje sin estructura de decision',
      'CTA poco visible para consultas',
    ],
    benefits: [
      `Mas consultas para ${industryName}`,
      'Presencia digital profesional',
      'Mejor conversion de visitas en clientes',
    ],
    faq: [
      {
        question: `Cuanto tarda una landing para ${industryName}?`,
        answer: 'El tiempo depende del alcance, pero suele resolverse en pocos dias con contenido disponible.',
      },
      {
        question: 'Que incluye la pagina?',
        answer: 'Incluye estructura de conversion, bloques de propuesta y CTA de contacto directo.',
      },
    ],
    demo: '',
  };
}

export function getAllIndustries(): IndustryPageData[] {
  return [...catalogEntries].sort((left, right) => left.title.localeCompare(right.title, 'es'));
}

export function getIndustryPages(): IndustryPageData[] {
  const catalogItems = getAllIndustries();
  const catalogCategories = new Set(catalogItems.map((item) => item.category));

  const fallbackItems = [...new Set(demoEntries.map((item) => item.category))]
    .filter((category) => !catalogCategories.has(category))
    .map((category) => fallbackFromCategory(category));

  return [...catalogItems, ...fallbackItems].sort((left, right) => left.title.localeCompare(right.title, 'es'));
}

export function getIndustryBySlug(slug: string): IndustryPageData | undefined {
  return getIndustryPages().find((item) => item.slug === slug);
}

export function getDemosByIndustry(category: string): DemoManifestItem[] {
  return demoEntries.filter((item) => item.category === category).sort((left, right) => left.title.localeCompare(right.title, 'es'));
}
