const allowedExtensions = new Set([
  '.css',
  '.js',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.svg',
  '.woff',
  '.woff2',
  '.ttf',
  '.gif',
  '.ico',
]);

const blockedExtensions = ['.html', '.json', '.md', '.config'];

export function isBlockedDemoAssetPath(pathname: string) {
  const parts = pathname.toLowerCase().split('/').filter(Boolean);
  if (parts[0] !== 'demos') return false;

  const lastSegment = parts[parts.length - 1] ?? '';
  const isDirectIndex =
    parts.length === 2 ||
    (parts.length === 3 && parts[2] === 'index.html');
  const isSensitiveFile =
    lastSegment === 'index.html' ||
    lastSegment === 'meta.json' ||
    /\.config$/i.test(lastSegment);
  const isBlockedExtension = blockedExtensions.some((extension) =>
    lastSegment.endsWith(extension),
  );

  return isDirectIndex || isSensitiveFile || isBlockedExtension;
}

export function isAllowedDemoAssetPath(pathname: string) {
  const parts = pathname.toLowerCase().split('/').filter(Boolean);
  if (parts[0] !== 'demos') return false;
  const lastSegment = parts[parts.length - 1] ?? '';
  if (!/\.[a-z0-9]+$/i.test(lastSegment)) return false;
  return [...allowedExtensions].some((extension) => lastSegment.endsWith(extension));
}
