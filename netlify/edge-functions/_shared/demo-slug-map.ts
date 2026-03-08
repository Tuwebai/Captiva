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

export async function loadDemoSlugMap(requestUrl: URL): Promise<DemoSlugMap> {
  if (cache) return cache;

  const response = await fetch(new URL('/demo-slugs.json', requestUrl).toString(), {
    headers: { 'cache-control': 'no-cache' },
  });

  if (!response.ok) {
    cache = { canonicalToPublic: {}, aliasToCanonical: {} };
    return cache;
  }

  const json = await response.json();
  cache = {
    canonicalToPublic: json?.canonicalToPublic ?? {},
    aliasToCanonical: json?.aliasToCanonical ?? {},
  };
  return cache;
}
