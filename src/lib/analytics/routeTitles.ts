import { resolvePageContextFromPath } from '../../utils/page-context';

export const ROUTE_TITLES: Record<string, string> = {
  '/captiva': 'Captiva | Landing Pages de Alta Conversion',
  '/captiva/demos': 'Demos de Captiva',
  '/blog': 'Blog de Captiva',
  '/terminos-de-servicio': 'Terminos de servicio | Captiva',
  '/politica-de-privacidad': 'Politica de privacidad | Captiva',
};

export function getPageTitle(pathname: string): string {
  const exactTitle = ROUTE_TITLES[pathname];
  if (exactTitle) {
    return exactTitle;
  }

  const pageContext = resolvePageContextFromPath(pathname);

  switch (pageContext.pageType) {
    case 'demo':
      return `Demo ${pageContext.slug ?? ''}`.trim();
    case 'industry':
      return `Landing page para ${pageContext.industry ?? 'tu negocio'}`;
    case 'city':
      return `Landing page en ${pageContext.city ?? 'tu ciudad'}`;
    case 'comparison':
      return 'Comparativa de landing pages | Captiva';
    case 'example':
      return 'Ejemplo de landing page | Captiva';
    case 'blog-post':
      return document.title || 'Articulo de Captiva';
    default:
      return document.title || 'Captiva';
  }
}
