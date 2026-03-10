export type RouteIntent = 'home' | 'blog' | 'industries' | 'comparatives' | 'demos';

type RouteCtaConfig = {
  primary: string;
  secondary?: string;
};

export const ctaStrategy: Record<RouteIntent, RouteCtaConfig> = {
  home: {
    primary: 'Ver demos',
    secondary: 'Crear mi landing',
  },
  blog: {
    primary: 'Ver ejemplos de landing',
    secondary: 'Quiero mi landing',
  },
  industries: {
    primary: 'Ver demo de esta industria',
    secondary: 'Quiero mi landing',
  },
  comparatives: {
    primary: 'Ver landing optimizada',
    secondary: 'Hablar por WhatsApp',
  },
  demos: {
    primary: 'Quiero una landing similar',
    secondary: 'Ver demos',
  },
};

export function getRouteCta(intent: RouteIntent): RouteCtaConfig {
  return ctaStrategy[intent];
}
