import type { SiteConfig } from '../types/site';

const baseRoute = '/captiva';
const captivaDemosRoute = `${baseRoute}/demos`;
const demosPublicBaseRoute = '/demos';
const siteUrl = 'https://captiva.tuweb-ai.com';
const defaultOgImage = '/LOGO-captiva.png';
const whatsappMessage = encodeURIComponent(
  'Hola, quiero solicitar informacion sobre Captiva. Me gustaria conocer opciones, tiempos de entrega y proximos pasos para mi landing page.',
);

export const siteConfig: SiteConfig = {
  productName: 'Captiva',
  companyName: 'Tuwebai',
  description:
    'Landing pages estrategicas enfocadas en conversion para ayudar a negocios a recibir mas consultas, convertir visitas en clientes y tener una presencia digital profesional.',
  primaryCtaLabel: 'Solicitar informacion',
  productBar: {
    title: 'Captiva',
    subtitle: 'Landing Pages de Alta Conversion',
    badge: 'Producto de Tuwebai',
    items: [
      { label: 'Demos', href: captivaDemosRoute, type: 'route' },
      { label: 'Como funciona', href: `${baseRoute}#como-funciona` },
      { label: 'Industrias', href: `${baseRoute}#industrias` },
      { label: 'Contacto', href: `${baseRoute}#contacto` },
    ],
  },
  navItems: [
    { label: 'Problema', href: `${baseRoute}#problema` },
    { label: 'Solucion', href: `${baseRoute}#solucion` },
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
    defaultTitle: 'Captiva | Plataforma de landing pages para conversion',
    defaultDescription:
      'Captiva es la plataforma de landing pages de Tuwebai para convertir visitas en consultas reales con estructura profesional.',
    defaultImage: defaultOgImage,
    twitterCard: 'summary_large_image',
  },
  hero: {
    badge: 'Producto de Tuwebai',
    eyebrow: 'Plataforma de landing pages para conversion',
    title: 'Captiva',
    subtitle: 'La plataforma de landing pages disenada para convertir clientes.',
    supportingCopy:
      'Explora ejemplos reales por industria y descubri como podria verse tu proxima landing, con estructura de conversion y contacto directo.',
    demosCtaLabel: 'Ver demos',
    primaryProductCtaLabel: 'Crear mi landing',
    metrics: [
      { value: 'Enfoque', label: 'Conversion por encima de la decoracion' },
      { value: 'Claridad', label: 'Mensaje, oferta y contacto sin friccion' },
      { value: 'Presencia', label: 'Imagen profesional desde el primer vistazo' },
    ],
  },
  howItWorks: {
    title: 'Como funciona Captiva',
    description: 'Un flujo simple para pasar de idea a una landing lista para captar consultas.',
    steps: [
      {
        step: '01',
        title: 'Elegis tu industria',
        description: 'Selecciona el rubro que mejor representa tu negocio y su contexto comercial.',
        icon: 'analysis',
      },
      {
        step: '02',
        title: 'Exploras una landing optimizada',
        description: 'Revisa ejemplos reales con estructura orientada a conversion para tu tipo de cliente.',
        icon: 'page',
      },
      {
        step: '03',
        title: 'Lanzamos tu landing en dias',
        description: 'Publicamos una version profesional lista para recibir consultas y generar oportunidades.',
        icon: 'launch',
      },
    ],
  },
  problem: {
    title: 'Muchos negocios siguen perdiendo oportunidades por no tener una pagina pensada para convertir.',
    description:
      'Cuando la presencia digital depende solo de redes sociales, la informacion se dispersa, el mensaje pierde claridad y el contacto se vuelve mas dificil de concretar.',
    items: [
      {
        title: 'Dependencia de redes sociales',
        description:
          'El negocio queda atado a publicaciones, mensajes dispersos y plataformas que no explican el servicio con orden.',
      },
      {
        title: 'Ausencia de una pagina profesional',
        description:
          'Sin una landing dedicada, la marca transmite menos confianza y genera dudas en personas listas para consultar.',
      },
      {
        title: 'Perdida de clientes potenciales',
        description:
          'Si la propuesta no se entiende rapido o contactar requiere esfuerzo, la visita se pierde antes de convertirse.',
      },
    ],
  },
  solution: {
    title: 'Captiva resuelve esa friccion con una landing clara, profesional y orientada a consulta.',
    description:
      'Disenamos paginas pensadas para explicar el servicio, ordenar la informacion clave y guiar al usuario hacia un contacto directo.',
    items: [
      {
        title: 'Landing optimizada para conversion',
        description: 'Estructuramos cada bloque para que la visita avance con logica hacia la accion.',
      },
      {
        title: 'Estructura clara',
        description: 'El contenido se organiza para responder que haces, para quien y como pueden contactarte.',
      },
      {
        title: 'Contacto directo',
        description: 'La llamada a la accion esta visible y conectada con un canal simple para consultar.',
      },
      {
        title: 'Diseno profesional',
        description: 'La presentacion transmite seriedad, orden y confianza desde el primer scroll.',
      },
    ],
  },
  benefits: {
    title: 'Una landing bien planteada mejora la forma en que el negocio se presenta y convierte.',
    description:
      'Captiva prioriza lectura rapida, confianza visual y estructura de decision para que la visita entienda y actue.',
    items: [
      {
        title: 'Mas consultas',
        description: 'Una propuesta clara facilita que mas personas pasen de visitar a escribir.',
      },
      {
        title: 'Pagina profesional',
        description: 'El negocio gana una presencia propia, cuidada y alineada con su servicio.',
      },
      {
        title: 'Experiencia clara para el cliente',
        description: 'La informacion importante aparece donde tiene que estar, sin ruido ni distracciones.',
      },
      {
        title: 'Presencia digital solida',
        description: 'La marca deja de depender solo de redes y suma un activo digital preparado para crecer.',
      },
    ],
  },
  demos: {
    eyebrow: 'Galeria de producto',
    title: 'Explora landing pages por industria',
    description:
      'Biblioteca de templates de Captiva orientados a distintos rubros para validar estructura, propuesta y CTA antes de implementar.',
    items: [
      {
        slug: 'gimnasios',
        title: 'Landing para gimnasios',
        description: 'Captacion de alumnos, planes y horarios con CTA de contacto directo.',
      },
      {
        slug: 'esteticas',
        title: 'Landing para esteticas',
        description: 'Servicios destacados, confianza visual y reserva de consulta.',
      },
      {
        slug: 'abogados',
        title: 'Landing para abogados',
        description: 'Autoridad profesional, areas de practica y consultas inmediatas.',
      },
      {
        slug: 'negocios-locales',
        title: 'Landing para negocios locales',
        description: 'Ubicacion, propuesta y canal de contacto para demanda cercana.',
      },
    ],
  },
  process: {
    title: 'Un proceso corto, ordenado y enfocado en salir a captar consultas.',
    description:
      'Captiva simplifica la implementacion para que el negocio tenga una pagina lista para operar sin friccion.',
    steps: [
      {
        step: '01',
        title: 'Analisis del negocio',
        description: 'Revisamos oferta, publico, objeciones y objetivo comercial.',
      },
      {
        step: '02',
        title: 'Diseno de la pagina',
        description: 'Construimos la estructura, el mensaje y la UI con foco en claridad.',
      },
      {
        step: '03',
        title: 'Publicacion',
        description: 'Dejamos la landing operativa, optimizada y lista para recibir trafico.',
      },
      {
        step: '04',
        title: 'Pagina lista para recibir consultas',
        description: 'El negocio queda con una presencia profesional activa y preparada para convertir.',
      },
    ],
  },
  finalCta: {
    title: 'Tu negocio merece una pagina que trabaje para vos.',
    description:
      'Captiva convierte una visita dispersa en una experiencia clara, profesional y orientada al contacto.',
  },
};
