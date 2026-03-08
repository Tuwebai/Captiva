import type { SiteConfig } from '../types/site';

const baseRoute = '/captiva';
const captivaDemosRoute = `${baseRoute}/demos`;
const demosPublicBaseRoute = '/demos';
const siteUrl = 'https://captiva.tuweb-ai.com';
const defaultOgImage = '/LOGO-captiva.png';
const whatsappMessage = encodeURIComponent(
  'Hola, quiero solicitar información sobre Captiva. Me gustaría conocer opciones, tiempos de entrega y próximos pasos para mi landing page.',
);

export const siteConfig: SiteConfig = {
  productName: 'Captiva',
  companyName: 'Tuwebai',
  description:
    'Landing pages estratégicas enfocadas en conversión para ayudar a negocios a recibir más consultas, convertir visitas en clientes y tener una presencia digital profesional.',
  primaryCtaLabel: 'Solicitar información',
  productBar: {
    title: 'Captiva',
    subtitle: 'Landing Pages de Alta Conversión',
    badge: 'Producto de Tuwebai',
    items: [
      { label: 'Demos', href: captivaDemosRoute, type: 'route' },
      { label: 'Cómo funciona', href: `${baseRoute}#como-funciona` },
      { label: 'Industrias', href: `${baseRoute}#industrias` },
      { label: 'Contacto', href: `${baseRoute}#contacto` },
    ],
  },
  navItems: [
    { label: 'Problema', href: `${baseRoute}#problema` },
    { label: 'Solución', href: `${baseRoute}#solucion` },
    { label: 'Beneficios', href: `${baseRoute}#beneficios` },
    { label: 'Demos', href: captivaDemosRoute, type: 'route' },
    { label: 'Proceso', href: `${baseRoute}#proceso` },
  ],
  contact: {
    primaryEmail: 'tuwebai@gmail.com',
    productEmail: 'captivaweb@gmail.com',
    whatsapp: '5493571417960',
    ctaHref: `https://wa.me/5493571417960?text=${whatsappMessage}`,
  },
  routes: {
    home: '/',
    captiva: baseRoute,
    captivaDemos: captivaDemosRoute,
    demosPublicBase: demosPublicBaseRoute,
  },
  seo: {
    siteUrl,
    defaultTitle: 'Captiva | Plataforma de landing pages para conversión',
    defaultDescription:
      'Captiva es la plataforma de landing pages de Tuwebai para convertir visitas en consultas reales con estructura profesional.',
    defaultImage: defaultOgImage,
    twitterCard: 'summary_large_image',
  },
  hero: {
    badge: 'Producto de Tuwebai',
    badgeHref: 'https://tuweb-ai.com/',
    eyebrow: 'Plataforma de landing pages para conversión',
    title: 'Captiva',
    subtitle: 'La plataforma de landing pages diseñada para convertir clientes.',
    supportingCopy:
      'Explorá ejemplos reales por industria y descubrí cómo podría verse tu próxima landing, con estructura de conversión y contacto directo.',
    demosCtaLabel: 'Ver demos',
    primaryProductCtaLabel: 'Crear mi landing',
    exploreLinkLabel: 'Explorar ejemplos reales por industria',
    panelAriaLabel: 'Resumen del producto',
    panelLabel: 'Qué resuelve',
    panelFlowNodes: ['Visitas', 'Landing', 'Consultas'],
    conversionKpiValue: '+42%',
    conversionKpiLabel: 'conversion rate',
    metrics: [
      { value: 'Enfoque', label: 'Conversión por encima de la decoración' },
      { value: 'Claridad', label: 'Mensaje, oferta y contacto sin fricción' },
      { value: 'Presencia', label: 'Imagen profesional desde el primer vistazo' },
      { value: 'Acción', label: 'CTA visible para transformar interés en consulta' },
    ],
  },
  howItWorks: {
    title: 'Cómo funciona Captiva',
    description: 'Un flujo simple para pasar de idea a una landing lista para captar consultas.',
    steps: [
      {
        step: '01',
        title: 'Elegís tu industria',
        description: 'Seleccioná el rubro que mejor representa tu negocio y su contexto comercial.',
        icon: 'analysis',
      },
      {
        step: '02',
        title: 'Explorás una landing optimizada',
        description: 'Revisá ejemplos reales con estructura orientada a conversión para tu tipo de cliente.',
        icon: 'page',
      },
      {
        step: '03',
        title: 'Lanzamos tu landing en días',
        description: 'Publicamos una versión profesional lista para recibir consultas y generar oportunidades.',
        icon: 'launch',
      },
    ],
  },
  problem: {
    title: 'Muchos negocios siguen perdiendo oportunidades por no tener una página pensada para convertir.',
    description:
      'Cuando la presencia digital depende solo de redes sociales, la información se dispersa, el mensaje pierde claridad y el contacto se vuelve más difícil de concretar.',
    items: [
      {
        title: 'Dependencia de redes sociales',
        description:
          'El negocio queda atado a publicaciones, mensajes dispersos y plataformas que no explican el servicio con orden.',
      },
      {
        title: 'Ausencia de una página profesional',
        description:
          'Sin una landing dedicada, la marca transmite menos confianza y genera dudas en personas listas para consultar.',
      },
      {
        title: 'Pérdida de clientes potenciales',
        description:
          'Si la propuesta no se entiende rápido o contactar requiere esfuerzo, la visita se pierde antes de convertirse.',
      },
    ],
  },
  solution: {
    title: 'Captiva resuelve esa fricción con una landing clara, profesional y orientada a consulta.',
    description:
      'Diseñamos páginas pensadas para explicar el servicio, ordenar la información clave y guiar al usuario hacia un contacto directo.',
    items: [
      {
        title: 'Landing optimizada para conversión',
        description: 'Estructuramos cada bloque para que la visita avance con lógica hacia la acción.',
      },
      {
        title: 'Estructura clara',
        description: 'El contenido se organiza para responder qué hacés, para quién y cómo pueden contactarte.',
      },
      {
        title: 'Contacto directo',
        description: 'La llamada a la acción está visible y conectada con un canal simple para consultar.',
      },
      {
        title: 'Diseño profesional',
        description: 'La presentación transmite seriedad, orden y confianza desde el primer scroll.',
      },
    ],
  },
  benefits: {
    title: 'Una landing bien planteada mejora la forma en que el negocio se presenta y convierte.',
    description:
      'Captiva prioriza lectura rápida, confianza visual y estructura de decisión para que la visita entienda y actúe.',
    items: [
      {
        title: 'Más consultas',
        description: 'Una propuesta clara facilita que más personas pasen de visitar a escribir.',
      },
      {
        title: 'Página profesional',
        description: 'El negocio gana una presencia propia, cuidada y alineada con su servicio.',
      },
      {
        title: 'Experiencia clara para el cliente',
        description: 'La información importante aparece donde tiene que estar, sin ruido ni distracciones.',
      },
      {
        title: 'Presencia digital sólida',
        description: 'La marca deja de depender solo de redes y suma un activo digital preparado para crecer.',
      },
    ],
  },
  demos: {
    eyebrow: 'Galería de producto',
    title: 'Explorá landing pages por industria',
    description:
      'Biblioteca de templates de Captiva orientados a distintos rubros para validar estructura, propuesta y CTA antes de implementar.',
    filtersAriaLabel: 'Filtrar demos por categoría',
    filterLabels: {
      all: 'Todos',
      fitness: 'Fitness',
      salud: 'Salud',
      legal: 'Legal',
      belleza: 'Belleza',
      negocios: 'Negocios',
    },
    industryLinkPrefix: 'Ver landing page para',
    cardCtaLabel: 'Ver demo',
    ctaTitle: '¿Necesitás una landing para tu negocio?',
    ctaDescription:
      'Solicitá una propuesta y te mostramos la estructura recomendada según tu industria y objetivo comercial.',
    ctaButtonLabel: 'Solicitar mi landing',
    items: [
      {
        slug: 'gimnasios',
        title: 'Landing para gimnasios',
        description: 'Captación de alumnos, planes y horarios con CTA de contacto directo.',
      },
      {
        slug: 'esteticas',
        title: 'Landing para estéticas',
        description: 'Servicios destacados, confianza visual y reserva de consulta.',
      },
      {
        slug: 'abogados',
        title: 'Landing para abogados',
        description: 'Autoridad profesional, áreas de práctica y consultas inmediatas.',
      },
      {
        slug: 'negocios-locales',
        title: 'Landing para negocios locales',
        description: 'Ubicación, propuesta y canal de contacto para demanda cercana.',
      },
    ],
  },
  process: {
    title: 'Un proceso corto, ordenado y enfocado en salir a captar consultas.',
    description:
      'Captiva simplifica la implementación para que el negocio tenga una página lista para operar sin fricción.',
    steps: [
      {
        step: '01',
        title: 'Análisis del negocio',
        description: 'Revisamos oferta, público, objeciones y objetivo comercial.',
      },
      {
        step: '02',
        title: 'Diseño de la página',
        description: 'Construimos la estructura, el mensaje y la UI con foco en claridad.',
      },
      {
        step: '03',
        title: 'Publicación',
        description: 'Dejamos la landing operativa, optimizada y lista para recibir tráfico.',
      },
      {
        step: '04',
        title: 'Página lista para recibir consultas',
        description: 'El negocio queda con una presencia profesional activa y preparada para convertir.',
      },
    ],
  },
  finalCta: {
    title: 'Tu negocio merece una página que trabaje para vos.',
    description:
      'Captiva convierte una visita dispersa en una experiencia clara, profesional y orientada al contacto.',
  },
  pages: {
    industry: {
      eyebrow: 'Landing por industria',
      sectorProblemTitle: 'Problema del sector',
      solutionTitle: 'Cómo lo resuelve Captiva',
      benefitsTitle: 'Beneficios de una landing optimizada',
      demosTitlePrefix: 'Ejemplos de landing pages para',
      exploreOtherTitle: 'Explorar otras industrias',
      industryLinkLabel: 'Ver página por industria',
      ctaTitlePrefix: 'Crear mi landing page para',
      ctaDescription: 'Solicitá información y te mostramos la estructura recomendada para captar consultas en tu rubro.',
      ctaButtonLabel: 'Crear mi landing page',
      demoCardCtaLabel: 'Ver demo',
    },
    demos: {
      collectionName: 'Biblioteca de Landing Pages',
      collectionDescription:
        'Galería de ejemplos de landing pages para negocios, optimizadas para conversión y captación de consultas.',
      breadcrumbDemosLabel: 'Demos',
      seoTitle: 'Biblioteca de Landing Pages',
      seoDescription:
        'Explorá la biblioteca de landing pages de Captiva por industria: fitness, salud, legal, belleza y negocios para convertir visitas en consultas.',
      seoKeywords: [
        'ejemplos de landing pages',
        'landing page para negocios',
        'ejemplos de páginas web profesionales',
        'demos de landing pages',
        'captiva demos',
      ],
    },
    blog: {
      readPostLabel: 'Leer artículo',
      postEyebrow: 'Artículo',
      sidebarAriaLabel: 'Recursos relacionados',
      sidebarDemosTitle: 'Ver ejemplos de landing pages',
      sidebarDemosDescription: 'Explorá demos reales por industria para validar estructura y propuesta antes de implementar.',
      sidebarDemosLinkLabel: 'Ir a /captiva/demos',
      sidebarCtaTitle: 'Crear mi landing',
      sidebarCtaDescription: 'Solicitá una propuesta y armamos una landing alineada a tu objetivo comercial.',
      sidebarCtaButtonLabel: 'Solicitar información',
      relatedTitle: 'Artículos relacionados',
      eyebrow: 'Blog',
      title: 'Blog de Captiva',
      description:
        'Guías prácticas de landing pages, conversión y estrategia digital para negocios que quieren captar más consultas.',
      cardDescription: 'Artículo técnico orientado a conversión y crecimiento orgánico.',
      seoTitle: 'Blog de Captiva',
      seoDescription:
        'Blog técnico de Captiva para crecimiento orgánico: conversión, landing pages y adquisición de clientes.',
      seoKeywords: ['blog landing pages', 'captiva blog', 'conversión web'],
      plannedPosts: [
        'Cómo conseguir clientes con una landing page',
        'Landing page vs sitio web: qué conviene para vender',
        'Ejemplos de landing pages que convierten',
        'Guía de landing pages para negocios locales',
      ],
    },
    industryLinks: {
      eyebrow: 'Industrias',
      title: 'Landing pages por industria para captar búsquedas long-tail.',
      description:
        'Cada rubro tiene una página SEO dedicada, con contenido orientado a conversión y enlaces directos a demos reales.',
      seoBadgeLabel: 'Página SEO',
      ctaLabel: 'Ver página por industria',
    },
  },
};
