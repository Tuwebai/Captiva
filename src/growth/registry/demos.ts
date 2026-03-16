import demosIndex from '../../generated/demos-index.json';
import type { DemoManifestItem } from '../../types/demo';

export const demos = demosIndex as DemoManifestItem[];

export const demoSlugs = demos.map((entry) => entry.slug);
export const demoBySlug = new Map(demos.map((entry) => [entry.slug, entry] as const));
