import { homeBridge } from '../bridge';

export type HomePlan = {
  id: string;
  name: string;
  audience: string;
  price: string;
  currency: string;
  badge: string | null;
  highlighted: boolean;
  waLink: string;
  cta: string;
  microcopy: string;
  features: string[];
  notIncluded: string[];
};

export const homePlanCatalog: HomePlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    audience: 'Empezar a captar clientes',
    price: '$320',
    currency: 'USD',
    badge: null,
    highlighted: false,
    waLink: homeBridge.primaryWaByMessage('Hola, me interesa el plan Starter de Captiva.'),
    cta: 'Quiero el Starter',
    microcopy: 'Hosting + dominio incluidos. Sin sorpresas.',
    features: [
      'Landing page de 1 página',
      'Diseño profesional personalizado',
      'Copy orientado a conversión',
      'WhatsApp integrado',
      'Hosting + dominio 1er año',
      'Formulario de contacto',
      'Adaptado para mobile',
      '1 revisión incluida',
    ],
    notIncluded: [
      'Blog o contenido múltiple',
      'Integración con ads',
      'Múltiples idiomas',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    audience: 'El más elegido por negocios nuevos',
    price: '$490',
    currency: 'USD',
    badge: 'Recomendado',
    highlighted: true,
    waLink: homeBridge.primaryWaByMessage('Hola, quiero el plan Growth de Captiva.'),
    cta: 'Quiero el Growth',
    microcopy: 'El más elegido. Podés empezar esta semana.',
    features: [
      'Todo lo de Starter, más:',
      'Secciones adicionales (FAQ, testimonios)',
      'SEO básico configurado',
      'Integración Google Analytics',
      'Pixel de Facebook/Meta',
      'Copy A/B optimizado',
      '3 revisiones incluidas',
      'Soporte 30 días post-lanzamiento',
    ],
    notIncluded: [
      'Múltiples idiomas',
      'E-commerce',
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    audience: 'Para campañas pagas o varios rubros',
    price: '$720',
    currency: 'USD',
    badge: null,
    highlighted: false,
    waLink: homeBridge.primaryWaByMessage('Hola, me interesa el plan Scale de Captiva.'),
    cta: 'Quiero el Scale',
    microcopy: 'Ideal para campañas pagas o varios frentes.',
    features: [
      'Todo lo de Growth, más:',
      'Hasta 2 landings distintas',
      'Páginas de campaña (Ads)',
      'Integración CRM básica',
      'Thank you page personalizada',
      'Setup completo de conversiones',
      'Revisiones ilimitadas (30 días)',
      'Reporte mensual básico',
    ],
    notIncluded: [
      'E-commerce completo',
    ],
  },
];
