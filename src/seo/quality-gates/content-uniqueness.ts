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
