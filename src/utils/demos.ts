import { demoCategoryContent } from '../config/demoCategories';
import type { DemoCategoryGroup, DemoManifestItem } from '../types/demo';

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
      description: 'Demos disponibles para esta categoría.',
    };

    return {
      slug,
      title: content.title,
      description: content.description,
      items: items.sort((left, right) => left.title.localeCompare(right.title, 'es')),
    };
  });
}
