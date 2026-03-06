export default async (request: Request) => {
  const url = new URL(request.url);
  const slug = url.pathname.replace(/^\/demo\//, '').replace(/\/+$/, '');

  if (!slug || !/^[A-Za-z0-9-]+$/.test(slug)) {
    return Response.redirect(new URL('/captiva/demos', url), 302);
  }

  const target = new URL(`/demos/${slug}/index.html`, url);
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
  headers.set('x-frame-options', 'SAMEORIGIN');
  headers.set('x-content-type-options', 'nosniff');
  headers.set('referrer-policy', 'strict-origin-when-cross-origin');
  headers.set('permissions-policy', 'camera=(), microphone=(), geolocation=()');
  headers.set('content-security-policy', "frame-ancestors 'self'; object-src 'none'; base-uri 'self'");
  headers.set('cache-control', 'public, max-age=600');

  return new Response(html, {
    status: 200,
    headers,
  });
};
