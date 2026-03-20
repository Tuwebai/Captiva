import { loadDemoSlugMap, normalizeDemoKey } from './_shared/demo-slug-map.ts';

export default async (request: Request, context: { next: () => Promise<Response> }) => {
  const url = new URL(request.url);
  const internal = request.headers.get('x-captiva-demo-internal') === '1';
  const lowerPath = url.pathname.toLowerCase();
  const pathParts = url.pathname.split('/').filter(Boolean);
  const demoFolder = pathParts[1] ?? '';
  const lastSegment = pathParts[pathParts.length - 1] ?? '';

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
  const hasBlockedExtension = blockedExtensions.some((ext) => lastSegment.toLowerCase().endsWith(ext));
  const isDirectDemoRoot =
    pathParts[0] === 'demos' &&
    (pathParts.length === 2 || (pathParts.length === 3 && pathParts[2].toLowerCase() === 'index.html'));
  const isSensitiveFile =
    lowerPath.endsWith('/index.html') ||
    lowerPath.endsWith('/meta.json') ||
    /\.config$/i.test(lastSegment);
  const isAssetRequest = /\.[a-z0-9]+$/i.test(lastSegment);
  const isAllowedAsset = [...allowedExtensions].some((ext) => lastSegment.toLowerCase().endsWith(ext));

  if (!internal && (isDirectDemoRoot || isSensitiveFile || hasBlockedExtension)) {
    return new Response('Forbidden', {
      status: 403,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'x-robots-tag': 'noindex, nofollow',
      },
    });
  }

  if (!internal && isAssetRequest && !isAllowedAsset) {
    return new Response('Forbidden', {
      status: 403,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'x-robots-tag': 'noindex, nofollow',
      },
    });
  }

  if (!internal) {
    const isDirectDemoIndex =
      pathParts[0] === 'demos' &&
      (pathParts.length === 2 ||
        (pathParts.length === 3 && pathParts[2].toLowerCase() === 'index.html'));

    if (isDirectDemoIndex && demoFolder) {
      const slugMap = await loadDemoSlugMap();
      const directKey = normalizeDemoKey(demoFolder);
      const canonicalSlug = slugMap.aliasToCanonical[directKey] ?? directKey;
      if (slugMap.canonicalToPublic[canonicalSlug]) {
        return Response.redirect(new URL(`/demo/${canonicalSlug}`, url), 301);
      }

      return Response.redirect(new URL('/captiva/demos', url), 302);
    }
  }

  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set('x-robots-tag', 'noindex, nofollow');
  headers.set('x-content-type-options', 'nosniff');
  headers.set('x-frame-options', 'SAMEORIGIN');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};
