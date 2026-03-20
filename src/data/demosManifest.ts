import demosManifestFile from '../../demos/manifest.json';

import type { DemoManifestItem } from '../types/demo';

type DemoManifestFile = {
  demos?: DemoManifestItem[];
};

export const demosManifest = ((demosManifestFile as DemoManifestFile).demos ?? []) as DemoManifestItem[];
