import { loadDemoSlugMap, normalizeDemoKey } from './_shared/demo-slug-map';

export default async (request: Request) => {
  const url = new URL(request.url);
  const rawSlug = url.pathname.replace(/^\/demo\//, '').replace(/\/+$/, '');
  const slug = normalizeDemoKey(rawSlug);

  if (!slug) {
    return Response.redirect(new URL('/captiva/demos', url), 302);
  }

  const slugMap = await loadDemoSlugMap(url);
  const canonicalSlug = slugMap.aliasToCanonical[slug] ?? slug;
  const publicSlug = slugMap.canonicalToPublic[canonicalSlug];

  if (!publicSlug) {
    return Response.redirect(new URL('/captiva/demos', url), 302);
  }

  if (canonicalSlug !== slug) {
    return Response.redirect(new URL(`/demo/${canonicalSlug}`, url), 301);
  }

  const target = new URL(`/demos/${publicSlug}/index.html`, url);
  const upstream = await fetch(target.toString(), {
    headers: {
      'x-captiva-demo-internal': '1',
    },
  });

  if (!upstream.ok) {
    return Response.redirect(new URL('/captiva/demos', url), 302);
  }

  const html = await upstream.text();

  const headers = new Headers(upstream.headers);
  headers.set('content-type', 'text/html; charset=utf-8');
  headers.set('cache-control', 'public, max-age=600');
  headers.set('x-robots-tag', 'index, follow');
  headers.set('x-frame-options', 'SAMEORIGIN');
  headers.set('x-content-type-options', 'nosniff');
  headers.set('referrer-policy', 'strict-origin-when-cross-origin');
  headers.set('permissions-policy', 'camera=(), microphone=(), geolocation=()');
  headers.set(
    'content-security-policy',
    [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "img-src 'self' data: https:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline'",
      "font-src 'self' data: https:",
      "connect-src 'self'",
    ].join('; '),
  );

  return new Response(html, {
    status: 200,
    headers,
  });
};
