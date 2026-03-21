export function estimateUniqueWordCount(...segments: Array<string | undefined>) {
  const tokens = segments
    .filter(Boolean)
    .flatMap((segment) =>
      String(segment)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .split(/[^a-z0-9]+/i)
        .filter(Boolean),
    );

  return new Set(tokens).size;
}

export function buildUniquenessFingerprint(fields: Record<string, string | undefined>) {
  return Object.entries(fields)
    .map(([key, value]) => `${key}:${String(value ?? '').trim().toLowerCase()}`)
    .join('|');
}

export function findDuplicateFingerprints(
  entries: Array<{ slug?: string; uniquenessFingerprint?: string }>,
): Array<[string, string]> {
  const seen = new Map<string, string>();
  const duplicates: Array<[string, string]> = [];

  entries.forEach((entry) => {
    const fingerprint = String(entry.uniquenessFingerprint ?? '').trim();
    if (!fingerprint) return;

    const existing = seen.get(fingerprint);
    if (existing) {
      duplicates.push([existing, String(entry.slug ?? '')]);
      return;
    }

    seen.set(fingerprint, String(entry.slug ?? ''));
  });

  return duplicates;
}
