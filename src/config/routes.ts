import type { SiteRoutes } from '../types/site';

export const baseRoute = '/captiva';
export const captivaDemosRoute = `${baseRoute}/demos`;
export const demosPublicBaseRoute = '/demos';

export const routes: SiteRoutes = {
  home: '/',
  captiva: baseRoute,
  captivaDemos: captivaDemosRoute,
  blog: '/blog',
  demosPublicBase: demosPublicBaseRoute,
  termsOfService: '/terminos-de-servicio',
  privacyPolicy: '/politica-de-privacidad',
};
