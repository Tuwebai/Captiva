export default async (request: Request, context: { next: () => Promise<Response> }) => {
  const url = new URL(request.url);
  const internal = request.headers.get('x-captiva-demo-internal') === '1';
  const lowerPath = url.pathname.toLowerCase();
  const blockedFile = lowerPath.endsWith('/index.html') || lowerPath.endsWith('/meta.json');

  if (blockedFile && !internal) {
    return Response.redirect(new URL('/captiva/demos', url), 302);
  }

  return context.next();
};
