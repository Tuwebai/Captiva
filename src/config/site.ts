import type { SiteConfig } from '../types/site';

const baseRoute = '/captiva';
const captivaDemosRoute = `${baseRoute}/demos`;
const demosPublicBaseRoute = '/demos';
const whatsappMessage = encodeURIComponent(
  'Hola, quiero solicitar información sobre Captiva. Me gustaría conocer opciones, tiempos de entrega y próximos pasos para mi landing page.',
);

export const siteConfig: SiteConfig = {
  productName: 'Captiva',
  companyName: 'Tuwebai',
  description:
    'Landing pages estratégicas enfocadas en conversión para ayudar a negocios a recibir más consultas, convertir visitas en clientes y tener una presencia digital profesional.',
  primaryCtaLabel: 'Solicitar información',
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
  hero: {
    eyebrow: 'Landing pages estratégicas para negocios',
    title: 'Captiva',
    subtitle: 'Landing pages que convierten visitas en clientes.',
    supportingCopy:
      'Creamos páginas estratégicas diseñadas para que las personas que llegan a tu negocio entiendan tu servicio y puedan contactarte fácilmente.',
    metrics: [
      { value: 'Enfoque', label: 'Conversión por encima de la decoración' },
      { value: 'Claridad', label: 'Mensaje, oferta y contacto sin fricción' },
      { value: 'Presencia', label: 'Imagen profesional desde el primer vistazo' },
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
    title: 'Base preparada para demos por rubro y futuras extensiones.',
    description:
      'La arquitectura contempla una familia de demos bajo rutas específicas para mostrar variantes del producto según tipo de negocio.',
    items: [
      {
        slug: 'gimnasios',
        title: 'Landing para gimnasios',
        description: 'Orientada a clases, planes, horarios y contacto rápido.',
      },
      {
        slug: 'esteticas',
        title: 'Landing para estéticas',
        description: 'Pensada para servicios, confianza visual y reserva de consulta.',
      },
      {
        slug: 'abogados',
        title: 'Landing para abogados',
        description: 'Estructurada para transmitir claridad, respaldo y profesionalismo.',
      },
      {
        slug: 'negocios-locales',
        title: 'Landing para negocios locales',
        description: 'Enfocada en ubicación, propuesta de valor y canal de contacto inmediato.',
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
};
