import type { NavItem, ProductTopBarItem } from '../types/site';

import { baseRoute, captivaDemosRoute } from './routes';

export const productBarItems: ProductTopBarItem[] = [
  { label: 'Demos', href: captivaDemosRoute, type: 'route' },
  { label: 'Cómo funciona', href: `${baseRoute}#como-funciona` },
  { label: 'Qué incluye', href: `${baseRoute}#oferta` },
  { label: 'Contacto', href: `${baseRoute}#contacto` },
];

export const navigationItems: NavItem[] = [
  { label: 'Demos', href: `${baseRoute}#demos` },
  { label: 'Cómo funciona', href: `${baseRoute}#como-funciona` },
  { label: 'Oferta', href: `${baseRoute}#oferta` },
  { label: 'Planes', href: `${baseRoute}#planes` },
  { label: 'Prueba social', href: `${baseRoute}#prueba-social` },
  { label: 'FAQ', href: `${baseRoute}#faq` },
  { label: 'Contacto', href: `${baseRoute}#contacto` },
];
