import { resolve } from 'node:path';

export const DEFAULT_DEMO_PREVIEW = '/assets/placeholders/captiva-demo-preview.svg';
export const DEFAULT_DEMO_PREVIEW_PATH = resolve(
  process.cwd(),
  'public/assets/placeholders/captiva-demo-preview.svg',
);
