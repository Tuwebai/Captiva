import { demosManifest } from '../../data/demosManifest';
import type { DemoManifestItem } from '../../types/demo';

export const demos = demosManifest as DemoManifestItem[];

export const demoSlugs = demos.map((entry) => entry.slug);
export const demoBySlug = new Map(demos.map((entry) => [entry.slug, entry] as const));
