import demosManifestFile from '../../../demos/manifest.json' with { type: 'json' };

type DemoManifestItem = {
  slug: string;
  folderName?: string;
  publicSlug?: string;
};

type DemoManifestFile = {
  demos?: DemoManifestItem[];
};

type DemoSlugMap = {
  canonicalToPublic: Record<string, string>;
  aliasToCanonical: Record<string, string>;
};

let cache: DemoSlugMap | null = null;

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function normalizeDemoKey(value: string): string {
  return safeDecode(value).trim().replace(/^\/+|\/+$/g, '').toLowerCase();
}

function buildDemoSlugMap(): DemoSlugMap {
  const manifest = (demosManifestFile as DemoManifestFile).demos ?? [];
  const canonicalToPublic: Record<string, string> = {};
  const aliasToCanonical: Record<string, string> = {};

  manifest.forEach((item) => {
    if (!item.slug || !item.publicSlug) return;

    canonicalToPublic[normalizeDemoKey(item.slug)] = item.publicSlug;

    [
      item.publicSlug,
      item.folderName,
      item.folderName?.replace(/\s+/g, '-'),
      item.folderName?.replace(/\s+/g, ''),
    ]
      .filter(Boolean)
      .forEach((alias) => {
        const normalizedAlias = normalizeDemoKey(String(alias));
        if (normalizedAlias && normalizedAlias !== normalizeDemoKey(item.slug)) {
          aliasToCanonical[normalizedAlias] = normalizeDemoKey(item.slug);
        }
      });
  });

  return {
    canonicalToPublic,
    aliasToCanonical,
  };
}

export async function loadDemoSlugMap(): Promise<DemoSlugMap> {
  if (cache) return cache;
  cache = buildDemoSlugMap();
  return cache;
}
