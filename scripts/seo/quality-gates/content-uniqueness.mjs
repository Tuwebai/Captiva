export function estimateUniqueWordCount(...segments) {
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

export function buildUniquenessFingerprint(fields) {
  return Object.entries(fields)
    .map(([key, value]) => `${key}:${String(value ?? '').trim().toLowerCase()}`)
    .join('|');
}

export function findDuplicateFingerprints(entries) {
  const seen = new Map();
  const duplicates = [];

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
