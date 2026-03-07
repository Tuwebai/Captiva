import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const demosRoot = resolve(process.cwd(), 'demos');
const templatesRoot = resolve(process.cwd(), 'scripts/templates');
const blocksRoot = resolve(templatesRoot, 'blocks');
const layoutsRoot = resolve(templatesRoot, 'layouts');
const previewPlaceholderPath = resolve(templatesRoot, 'preview.placeholder.png');

const layoutKeys = ['landing-a', 'landing-b', 'landing-c'];
const variantToLayout = {
  v1: 'landing-a',
  v2: 'landing-b',
  v3: 'landing-c',
};

const templateAliases = {
  fitness: 'fitness',
  health: 'health',
  salud: 'health',
  odontologia: 'health',
  legal: 'legal',
  abogados: 'legal',
  business: 'business',
  b2b: 'business',
  'negocios-locales': 'business',
  restaurant: 'restaurant',
  gastronomia: 'restaurant',
  beauty: 'beauty',
  estetica: 'beauty',
};

const blockFiles = {
  hero: 'hero.html',
  features: 'features.html',
  methodology: 'methodology.html',
  services: 'services.html',
  plans: 'plans.html',
  experience: 'experience-banner.html',
  gallery: 'gallery.html',
  testimonials: 'testimonials.html',
  testimonialsCarousel: 'testimonials-carousel.html',
  trustLogos: 'trust-logos.html',
  contactSplit: 'contact-split.html',
  cta: 'cta.html',
  footer: 'footer.html',
};

const categoryTheme = {
  fitness: { label: 'Fitness', primaryColor: '#3f78ff', secondaryColor: '#f28f52' },
  health: { label: 'Salud', primaryColor: '#1f9f9a', secondaryColor: '#4b7cff' },
  legal: { label: 'Legal', primaryColor: '#4e68d9', secondaryColor: '#f28f52' },
  business: { label: 'Business', primaryColor: '#3f78ff', secondaryColor: '#f28f52' },
  restaurant: { label: 'Restaurant', primaryColor: '#f28f52', secondaryColor: '#3f78ff' },
  beauty: { label: 'Beauty', primaryColor: '#8f6cff', secondaryColor: '#f28f52' },
};

const categoryAssets = {
  fitness: {
    heroImage:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80',
    serviceImages: [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571019613914-85f342c55f09?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1599058918144-1ffabb6ab9a0?auto=format&fit=crop&w=900&q=80',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80',
    ],
  },
  health: {
    heroImage:
      'https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?auto=format&fit=crop&w=1400&q=80',
    serviceImages: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1580281658629-ef336f0c0f5a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=900&q=80',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?auto=format&fit=crop&w=900&q=80',
    ],
  },
  legal: {
    heroImage:
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=80',
    serviceImages: [
      'https://images.unsplash.com/photo-1453945619913-79ec89a82c51?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=900&q=80',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1555374018-13a8994ab246?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80',
    ],
  },
  business: {
    heroImage:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80',
    serviceImages: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80',
    ],
  },
  restaurant: {
    heroImage:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
    serviceImages: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80',
    ],
  },
  beauty: {
    heroImage:
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1400&q=80',
    serviceImages: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=900&q=80',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80',
    ],
  },
};

const categoryCopy = {
  fitness: {
    headline: 'Entrena con un sistema claro y convierte visitas en alumnos activos.',
    benefitTitles: ['Mas consultas', 'Oferta clara', 'Conversion directa'],
    benefitDescriptions: [
      'Personas interesadas entienden planes y pasos para empezar.',
      'Clases, horarios y propuesta quedan visibles sin friccion.',
      'La landing reduce dudas y acelera el contacto comercial.',
    ],
    serviceTitle: 'Planes y servicios estructurados para crecer',
    serviceDescription: 'Presenta membresias, clases y diferenciales en un flujo simple.',
    services: [
      { title: 'Planes de entrenamiento', description: 'Muestra opciones, objetivos y modalidad con claridad.' },
      { title: 'Clases y horarios', description: 'Facilita la decision con agenda visible y CTA directo.' },
      { title: 'Seguimiento y resultados', description: 'Refuerza confianza con metodologia y progreso esperado.' },
    ],
    socialTitle: 'Prueba social para validar confianza',
    socialDescription: 'Testimonios y estructura visual para reforzar credibilidad.',
    testimonials: [
      'Nos ayudaron a convertir mas visitas en consultas de prueba.',
      'La propuesta se entiende en segundos y subieron los contactos.',
      'Ahora los leads llegan con mejor contexto del servicio.',
    ],
    ctaHeadline: 'Tu gimnasio puede captar mas alumnos con una landing optimizada.',
    ctaDescription: 'Captiva estructura cada bloque para convertir trafico en consultas.',
  },
  health: {
    headline: 'Cuidamos tu presencia digital para aumentar consultas y turnos.',
    benefitTitles: ['Mas turnos', 'Autoridad profesional', 'Contacto rapido'],
    benefitDescriptions: [
      'Pacientes entienden servicios y agendan con menos friccion.',
      'La propuesta transmite confianza con estructura ordenada.',
      'Canales de contacto y llamados a accion son directos.',
    ],
    serviceTitle: 'Servicios medicos organizados para decidir rapido',
    serviceDescription: 'Informacion clave visible para facilitar la decision de consulta.',
    services: [
      { title: 'Atencion por especialidades', description: 'Explica que se resuelve y en que casos consultar.' },
      { title: 'Proceso de atencion', description: 'Alinea expectativas y mejora calidad del lead.' },
      { title: 'Canales de contacto', description: 'Simplifica reserva de turno con CTA visible.' },
    ],
    socialTitle: 'Experiencia clara para pacientes',
    socialDescription: 'Contenido jerarquizado para explicar especialidades y diferenciales.',
    testimonials: [
      'La landing nos trajo consultas mas claras y mejor calificadas.',
      'Se nota profesional y transmite confianza desde el inicio.',
      'Aumento la cantidad de turnos solicitados por WhatsApp.',
    ],
    ctaHeadline: 'Escala tus consultas con una landing profesional de salud.',
    ctaDescription: 'Diseno y estructura pensados para confianza y conversion.',
  },
  legal: {
    headline: 'Transmiti respaldo profesional con una pagina enfocada en consultas.',
    benefitTitles: ['Mas consultas calificadas', 'Respaldo institucional', 'Mensaje preciso'],
    benefitDescriptions: [
      'Tu estudio recibe contactos mejor alineados con tu servicio.',
      'La pagina transmite seriedad desde el primer scroll.',
      'Areas de practica y proceso de contacto quedan claros.',
    ],
    serviceTitle: 'Especialidades legales con estructura comercial',
    serviceDescription: 'Secciones claras para explicar alcance y propuesta de valor.',
    services: [
      { title: 'Areas de practica', description: 'Organiza servicios por necesidad del potencial cliente.' },
      { title: 'Proceso legal', description: 'Explica pasos y reduce friccion al momento de consultar.' },
      { title: 'Credenciales y respaldo', description: 'Refuerza confianza con evidencia profesional.' },
    ],
    socialTitle: 'Prueba social y credenciales',
    socialDescription: 'Bloques para trayectoria, casos y elementos de confianza.',
    testimonials: [
      'Recibimos consultas mejor enfocadas y con mayor urgencia real.',
      'La pagina transmite mucha mas autoridad que antes.',
      'El contacto por WhatsApp paso a ser mucho mas fluido.',
    ],
    ctaHeadline: 'Convierte trafico en consultas para tu estudio juridico.',
    ctaDescription: 'Implementa una landing enfocada en claridad y respuesta comercial.',
  },
  business: {
    headline: 'Una landing comercial para captar leads y acelerar ventas.',
    benefitTitles: ['Leads de calidad', 'Propuesta estructurada', 'Escalabilidad comercial'],
    benefitDescriptions: [
      'El sitio califica mejor cada consulta que llega al negocio.',
      'La oferta se presenta con foco en resultados y diferenciacion.',
      'Base preparada para campanas, SEO y conversion continua.',
    ],
    serviceTitle: 'Oferta comercial orientada a conversion',
    serviceDescription: 'Secciones claras para producto, beneficios y siguientes pasos.',
    services: [
      { title: 'Propuesta de valor', description: 'Presenta resultados y diferenciadores de forma concreta.' },
      { title: 'Servicios clave', description: 'Resume lo importante para activar contacto inmediato.' },
      { title: 'Proceso comercial', description: 'Alinea expectativas y mejora cierre de oportunidades.' },
    ],
    socialTitle: 'Confianza para decidir',
    socialDescription: 'Prueba social, argumentos y claridad para avanzar a contacto.',
    testimonials: [
      'La nueva estructura mejoro conversion desde la primera semana.',
      'Los leads llegan con mejor contexto comercial.',
      'La pagina se ve profesional y acelera decisiones.',
    ],
    ctaHeadline: 'Convierte tu demo en una pagina comercial lista para vender.',
    ctaDescription: 'Captiva combina estructura UX y copy orientado a negocio.',
  },
  restaurant: {
    headline: 'Mostra tu propuesta gastronomica y convierte visitas en reservas.',
    benefitTitles: ['Mas reservas', 'Carta y propuesta clara', 'Canal directo'],
    benefitDescriptions: [
      'La landing ayuda a transformar visitas en reservas concretas.',
      'Menu, horarios y experiencia del local se comunican mejor.',
      'El cliente llega rapido al canal de contacto correcto.',
    ],
    serviceTitle: 'Experiencia gastronomica bien presentada',
    serviceDescription: 'Organiza menu, ubicacion y diferenciales en un flujo simple.',
    services: [
      { title: 'Carta destacada', description: 'Presenta platos y propuestas mas rentables del negocio.' },
      { title: 'Ambiente y experiencia', description: 'Genera deseo con visuales y descripcion de valor.' },
      { title: 'Reservas inmediatas', description: 'Activa canales de contacto claros para reservar.' },
    ],
    socialTitle: 'Confianza visual y profesional',
    socialDescription: 'Una estructura limpia mejora percepcion y accion inmediata.',
    testimonials: [
      'Subieron las reservas de fin de semana desde la landing.',
      'Los clientes encuentran rapido menu y canal de contacto.',
      'La imagen de marca mejoro notablemente.',
    ],
    ctaHeadline: 'Activa una landing para que tu restaurante reciba mas reservas.',
    ctaDescription: 'Diseno y estructura pensados para conversion en gastronomia.',
  },
  beauty: {
    headline: 'Impulsa tu centro estetico con una landing que genere turnos.',
    benefitTitles: ['Mas consultas', 'Imagen premium', 'Mensaje claro'],
    benefitDescriptions: [
      'La pagina acelera el paso de visita a solicitud de turno.',
      'Servicios y resultados se muestran con presencia profesional.',
      'CTA visibles que reducen friccion para escribir y reservar.',
    ],
    serviceTitle: 'Servicios esteticos jerarquizados',
    serviceDescription: 'Destaca tratamientos, diferenciales y propuesta con claridad.',
    services: [
      { title: 'Tratamientos destacados', description: 'Ordena la oferta para que el cliente entienda rapido.' },
      { title: 'Resultados y confianza', description: 'Refuerza credibilidad con estructura visual profesional.' },
      { title: 'Reserva sin friccion', description: 'Canales directos para convertir visitas en consultas.' },
    ],
    socialTitle: 'Prueba social orientada a confianza',
    socialDescription: 'Testimonios y estructura visual para reforzar credibilidad.',
    testimonials: [
      'La landing nos trajo mas turnos en pocos dias.',
      'Ahora la propuesta se entiende mucho mejor.',
      'La pagina eleva la imagen del negocio desde el primer vistazo.',
    ],
    ctaHeadline: 'Tu centro estetico puede captar mas consultas con una landing optimizada.',
    ctaDescription: 'Captiva disena flujos simples para convertir trafico en clientes.',
  },
};

function fail(message) {
  console.error(`x ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith('--')) {
      fail(`Unexpected argument "${token}". Use --category --name --title --description.`);
    }

    const key = token.replace(/^--/, '');
    const value = argv[index + 1];
    if (!value || value.startsWith('--')) {
      fail(`Missing value for argument "${token}".`);
    }

    args[key] = value;
    index += 1;
  }

  return args;
}

function isKebabCase(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function toTitleCaseFromSlug(value) {
  return value
    .split('-')
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ');
}

function hashString(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function resolveTemplateCategory(category) {
  return templateAliases[category] ?? 'business';
}

function resolveLayout(inputVariant, name) {
  if (!inputVariant) {
    return layoutKeys[hashString(name) % layoutKeys.length];
  }

  const normalized = inputVariant.toLowerCase();
  if (variantToLayout[normalized]) {
    return variantToLayout[normalized];
  }

  if (layoutKeys.includes(normalized)) {
    return normalized;
  }

  fail('Argument --variant must be v1|v2|v3 or landing-a|landing-b|landing-c');
}

function resolveLayoutPath(layoutKey) {
  const filePath = resolve(layoutsRoot, `${layoutKey}.html`);
  if (!existsSync(filePath)) {
    fail(`Layout not found: ${filePath}`);
  }
  return filePath;
}

function collectExistingIndustries() {
  if (!existsSync(demosRoot)) {
    return new Map();
  }

  const byIndustry = new Map();
  const folders = readdirSync(demosRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory());

  folders.forEach((entry) => {
    const folderName = entry.name;
    const metaPath = join(demosRoot, folderName, 'meta.json');
    if (!existsSync(metaPath)) {
      return;
    }

    try {
      const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
      if (typeof meta.industry === 'string' && meta.industry.trim().length > 0) {
        const normalizedIndustry = meta.industry.trim().toLowerCase();
        byIndustry.set(normalizedIndustry, folderName);
      }
    } catch {
      // Legacy invalid files are validated in validate:demos.
    }
  });

  return byIndustry;
}

function validateInput(input) {
  const required = ['category', 'name', 'title', 'description'];
  required.forEach((field) => {
    if (typeof input[field] !== 'string' || input[field].trim().length === 0) {
      fail(`Argument --${field} is required.`);
    }
  });

  if (!isKebabCase(input.name)) {
    fail('Argument --name must be a valid slug (kebab-case). Example: gimnasio-premium');
  }

  if (!isKebabCase(input.category)) {
    fail('Argument --category must be kebab-case. Example: fitness');
  }

  if (input.industry && !isKebabCase(input.industry)) {
    fail('Argument --industry must be kebab-case. Example: gimnasio');
  }

  if (input.title.length < 12 || input.title.length > 120) {
    fail('Argument --title must contain between 12 and 120 characters.');
  }

  if (input.description.length < 30 || input.description.length > 320) {
    fail('Argument --description must contain between 30 and 320 characters.');
  }

  if (input.force && !['true', '1', 'yes'].includes(String(input.force).toLowerCase())) {
    fail('Argument --force must be true|1|yes when provided.');
  }
}

function buildIndustryFromName(name) {
  const [industry] = name.split('-');
  return industry;
}

function generateMeta(input, generationContext) {
  return {
    title: input.title,
    description: input.description,
    category: input.category,
    industry: input.industry ?? buildIndustryFromName(input.name),
    slug: input.name,
    preview: `/demos/${input.name}/preview.png`,
    template: 'builder',
    layout: generationContext.layoutKey,
    variant: generationContext.layoutKey,
  };
}

function renderTemplate(template, replacements, templatePath) {
  return template.replace(/{{([A-Z0-9_]+)}}/g, (_, key) => {
    if (!(key in replacements)) {
      fail(`Template ${templatePath} requires placeholder {{${key}}} but it was not provided.`);
    }
    return replacements[key];
  });
}

function getContextualCopy(templateCategory) {
  return categoryCopy[templateCategory] ?? categoryCopy.business;
}

function getCategoryAssets(templateCategory) {
  return categoryAssets[templateCategory] ?? categoryAssets.business;
}

function buildStructuredSectionCopy(templateCategory, categoryLabel) {
  const normalized = String(templateCategory).toLowerCase();
  const base = {
    processTitle: `Como trabajamos en ${categoryLabel}`,
    processDesc: 'Estructura clara para que cada visita avance a contacto y conversion.',
    steps: [
      { title: 'Diagnostico inicial', desc: 'Analizamos objetivo, contexto y mensaje principal del negocio.' },
      { title: 'Estructura de conversion', desc: 'Ordenamos secciones y CTA para reducir friccion en la decision.' },
      { title: 'Activacion comercial', desc: 'Publicamos la pagina lista para recibir consultas calificadas.' },
    ],
    plansTitle: 'Planes y propuestas',
    plansDesc: 'Opciones para distintos niveles de necesidad y presupuesto.',
    plans: [
      { name: 'Base', price: '$XX.XXX/mes', desc: 'Landing principal con estructura comercial enfocada en conversion.' },
      { name: 'Pro', price: '$XX.XXX/mes', desc: 'Incluye optimizacion de copy, bloques extra y mejora de conversion.' },
      { name: 'Escala', price: '$XX.XXX/mes', desc: 'Pensado para campañas activas y crecimiento sostenido.' },
    ],
    experienceTitle: 'Una experiencia pensada para convertir',
    experienceDesc: 'Diseno, copy y estructura alineados para que cada visita tenga un siguiente paso claro.',
    contactTitle: `Hablemos de tu proyecto ${categoryLabel.toLowerCase()}`,
    contactDesc: 'Completa el formulario y te contactamos con una propuesta clara para tu negocio.',
    contactGoals: ['Solicitar propuesta', 'Ver opciones de plan', 'Coordinar una llamada'],
  };

  if (normalized === 'fitness') {
    return {
      ...base,
      processDesc: 'Metodo orientado a captar alumnos y organizar propuesta de entrenamiento.',
      steps: [
        { title: 'Evaluacion de objetivo', desc: 'Definimos tipo de alumno y propuesta mas fuerte de tu gimnasio.' },
        { title: 'Oferta y clases visibles', desc: 'Mostramos planes, horarios y diferenciales para facilitar decision.' },
        { title: 'Activacion de consultas', desc: 'Publicamos y conectamos CTA para recibir WhatsApp de interesados.' },
      ],
      plansTitle: 'Membresias sugeridas',
      plans: [
        { name: 'Regular', price: '$XX.XXX/mes', desc: 'Landing orientada a captar pruebas y primeros alumnos.' },
        { name: 'Personalizado', price: '$XX.XXX/mes', desc: 'Incluye bloques de metodologia y seguimiento avanzado.' },
        { name: 'Masterclass', price: '$X.XXX/clase', desc: 'Ideal para promociones, eventos y clases destacadas.' },
      ],
      experienceTitle: 'Entrenar con estructura convierte mejor',
      experienceDesc: 'Presentamos tu propuesta con claridad para transformar visitas en alumnos activos.',
      contactGoals: ['Reservar clase de prueba', 'Consultar membresias', 'Quiero asesoramiento personalizado'],
    };
  }

  if (normalized === 'health') {
    return {
      ...base,
      processDesc: 'Flujo pensado para generar confianza y aumentar solicitudes de turno.',
      steps: [
        { title: 'Evaluacion del servicio', desc: 'Jerarquizamos especialidades y tipos de consulta principales.' },
        { title: 'Confianza y claridad', desc: 'Ordenamos beneficios, proceso y canales para decidir mas rapido.' },
        { title: 'Agenda activa', desc: 'Publicamos con CTA directos para captar turnos por WhatsApp.' },
      ],
      plansTitle: 'Paquetes de implementacion',
      plans: [
        { name: 'Consulta', price: '$XX.XXX/mes', desc: 'Base enfocada en consultas y presentacion de servicios.' },
        { name: 'Turnos Plus', price: '$XX.XXX/mes', desc: 'Optimiza flujo de reserva y secciones de autoridad.' },
        { name: 'Escala Medica', price: '$XX.XXX/mes', desc: 'Incluye bloques de crecimiento para campañas y SEO.' },
      ],
      experienceTitle: 'Confianza profesional desde el primer scroll',
      experienceDesc: 'Diseñamos una experiencia clara para que el paciente avance a la consulta.',
      contactGoals: ['Solicitar turno', 'Consultar tratamientos', 'Hablar con un asesor'],
    };
  }

  if (normalized === 'legal') {
    return {
      ...base,
      processDesc: 'Secuencia orientada a transmitir respaldo y captar casos cualificados.',
      steps: [
        { title: 'Analisis del caso', desc: 'Definimos areas de practica y perfil de consulta objetivo.' },
        { title: 'Mensaje juridico claro', desc: 'Ordenamos propuesta, especialidades y proceso de contacto.' },
        { title: 'Entrada de consultas', desc: 'Publicamos con CTA visibles para iniciar conversaciones legales.' },
      ],
      plansTitle: 'Planes para estudios legales',
      plans: [
        { name: 'Base Legal', price: '$XX.XXX/mes', desc: 'Landing clara para presentar areas y captar consultas.' },
        { name: 'Autoridad Pro', price: '$XX.XXX/mes', desc: 'Incluye bloques de credenciales y prueba social.' },
        { name: 'Escala Juridica', price: '$XX.XXX/mes', desc: 'Pensado para posicionamiento y campañas continuas.' },
      ],
      experienceTitle: 'Seriedad visual para decisiones importantes',
      experienceDesc: 'La estructura ayuda a filtrar y acelerar consultas con mejor contexto.',
      contactGoals: ['Solicitar evaluacion', 'Consultar area legal', 'Coordinar llamada inicial'],
    };
  }

  if (normalized === 'restaurant') {
    return {
      ...base,
      processDesc: 'Proceso orientado a reservas y contacto rapido para tu local.',
      steps: [
        { title: 'Identidad gastronomica', desc: 'Definimos propuesta, platos clave y experiencia del lugar.' },
        { title: 'Menu y oferta clara', desc: 'Estructuramos secciones para facilitar reserva inmediata.' },
        { title: 'Canal de reservas', desc: 'Activamos CTA directos para WhatsApp y conversion comercial.' },
      ],
      plansTitle: 'Opciones para gastronomia',
      plans: [
        { name: 'Menu Base', price: '$XX.XXX/mes', desc: 'Landing simple para mostrar carta y canal de reserva.' },
        { name: 'Reservas Pro', price: '$XX.XXX/mes', desc: 'Incluye experiencia, testimonios y oferta destacada.' },
        { name: 'Escala Local', price: '$XX.XXX/mes', desc: 'Ideal para campañas y posicionamiento local continuo.' },
      ],
      experienceTitle: 'Una experiencia digital que invita a reservar',
      experienceDesc: 'Diseño comercial para convertir visitas en mesas ocupadas.',
      contactGoals: ['Reservar mesa', 'Consultar menu', 'Solicitar propuesta comercial'],
    };
  }

  if (normalized === 'beauty') {
    return {
      ...base,
      processDesc: 'Flujo pensado para captar turnos y reforzar imagen profesional.',
      steps: [
        { title: 'Diagnostico de servicios', desc: 'Seleccionamos tratamientos clave y propuesta diferenciadora.' },
        { title: 'Imagen y confianza', desc: 'Organizamos visuales y copy para generar decision inmediata.' },
        { title: 'Agenda activa', desc: 'Conectamos CTA para transformar visitas en turnos reales.' },
      ],
      plansTitle: 'Planes para centros esteticos',
      plans: [
        { name: 'Base Estetica', price: '$XX.XXX/mes', desc: 'Landing para mostrar servicios y captar consultas.' },
        { name: 'Premium Beauty', price: '$XX.XXX/mes', desc: 'Incluye bloques de autoridad y experiencia visual.' },
        { name: 'Escala Beauty', price: '$XX.XXX/mes', desc: 'Pensado para campañas y crecimiento continuo.' },
      ],
      experienceTitle: 'Imagen premium que acelera la decision',
      experienceDesc: 'Combinamos claridad comercial y presencia visual para generar turnos.',
      contactGoals: ['Reservar turno', 'Consultar tratamientos', 'Solicitar asesoria'],
    };
  }

  return base;
}

function readBlockTemplates() {
  const blocks = {};
  Object.entries(blockFiles).forEach(([key, fileName]) => {
    const path = resolve(blocksRoot, fileName);
    if (!existsSync(path)) {
      fail(`Block template not found: ${path}`);
    }
    blocks[key] = { path, template: readFileSync(path, 'utf8') };
  });
  return blocks;
}

function buildReplacements(input, context) {
  const themeConfig = categoryTheme[context.templateCategory] ?? categoryTheme.business;
  const copy = getContextualCopy(context.templateCategory);
  const assets = getCategoryAssets(context.templateCategory);
  const structure = buildStructuredSectionCopy(context.templateCategory, themeConfig.label);
  const businessName = input['business-name'] ? input['business-name'].trim() : toTitleCaseFromSlug(input.name);
  const ctaText = input['cta-text'] ? input['cta-text'].trim() : 'Solicitar informacion';
  const ctaSecondary = input['cta-secondary'] ? input['cta-secondary'].trim() : 'Ver planes';
  const primaryColor = input['primary-color'] ? input['primary-color'].trim() : themeConfig.primaryColor;
  const secondaryColor = input['secondary-color'] ? input['secondary-color'].trim() : themeConfig.secondaryColor;

  return {
    TITLE: input.title,
    DESCRIPTION: input.description,
    CATEGORY: input.category,
    CATEGORY_LABEL: themeConfig.label,
    BUSINESS_NAME: businessName,
    CTA_TEXT: ctaText,
    CTA_SECONDARY: ctaSecondary,
    PRIMARY_COLOR: primaryColor,
    SECONDARY_COLOR: secondaryColor,
    HERO_IMAGE: assets.heroImage,
    BENEFIT_1_TITLE: copy.benefitTitles[0],
    BENEFIT_1_DESC: copy.benefitDescriptions[0],
    BENEFIT_2_TITLE: copy.benefitTitles[1],
    BENEFIT_2_DESC: copy.benefitDescriptions[1],
    BENEFIT_3_TITLE: copy.benefitTitles[2],
    BENEFIT_3_DESC: copy.benefitDescriptions[2],
    SERVICE_TITLE: copy.serviceTitle,
    SERVICE_DESC: copy.serviceDescription,
    SERVICE_1_TITLE: copy.services[0].title,
    SERVICE_1_DESC: copy.services[0].description,
    SERVICE_2_TITLE: copy.services[1].title,
    SERVICE_2_DESC: copy.services[1].description,
    SERVICE_3_TITLE: copy.services[2].title,
    SERVICE_3_DESC: copy.services[2].description,
    SERVICE_IMAGE_1: assets.serviceImages[0],
    SERVICE_IMAGE_2: assets.serviceImages[1],
    SERVICE_IMAGE_3: assets.serviceImages[2],
    GALLERY_IMAGE_1: assets.galleryImages[0],
    GALLERY_IMAGE_2: assets.galleryImages[1],
    GALLERY_IMAGE_3: assets.galleryImages[2],
    GALLERY_IMAGE_4: assets.galleryImages[3],
    SOCIAL_TITLE: copy.socialTitle,
    SOCIAL_DESC: copy.socialDescription,
    TESTIMONIAL_1_TEXT: copy.testimonials[0],
    TESTIMONIAL_2_TEXT: copy.testimonials[1],
    TESTIMONIAL_3_TEXT: copy.testimonials[2],
    TESTIMONIAL_NAME_1: 'Cliente Demo A',
    TESTIMONIAL_NAME_2: 'Cliente Demo B',
    TESTIMONIAL_NAME_3: 'Cliente Demo C',
    CTA_HEADLINE: copy.ctaHeadline,
    CTA_DESC: copy.ctaDescription,
    PROCESS_TITLE: structure.processTitle,
    PROCESS_DESC: structure.processDesc,
    STEP_1_TITLE: structure.steps[0].title,
    STEP_1_DESC: structure.steps[0].desc,
    STEP_2_TITLE: structure.steps[1].title,
    STEP_2_DESC: structure.steps[1].desc,
    STEP_3_TITLE: structure.steps[2].title,
    STEP_3_DESC: structure.steps[2].desc,
    PLANS_TITLE: structure.plansTitle,
    PLANS_DESC: structure.plansDesc,
    PLAN_1_NAME: structure.plans[0].name,
    PLAN_1_PRICE: structure.plans[0].price,
    PLAN_1_DESC: structure.plans[0].desc,
    PLAN_2_NAME: structure.plans[1].name,
    PLAN_2_PRICE: structure.plans[1].price,
    PLAN_2_DESC: structure.plans[1].desc,
    PLAN_3_NAME: structure.plans[2].name,
    PLAN_3_PRICE: structure.plans[2].price,
    PLAN_3_DESC: structure.plans[2].desc,
    EXPERIENCE_TITLE: structure.experienceTitle,
    EXPERIENCE_DESC: structure.experienceDesc,
    CONTACT_TITLE: structure.contactTitle,
    CONTACT_DESC: structure.contactDesc,
    CONTACT_EMAIL: `${input.name}@demo.captiva`,
    CONTACT_GOAL_1: structure.contactGoals[0],
    CONTACT_GOAL_2: structure.contactGoals[1],
    CONTACT_GOAL_3: structure.contactGoals[2],
    HERO_TAG: `${themeConfig.label} demo`,
    PROOF_VALUE: '120',
    PROOF_LABEL: 'consultas',
    BADGE_VALUE: 'Top',
    BADGE_TEXT: 'Conversion',
    WHATSAPP_TEXT: `Hola ${businessName}, quiero informacion sobre ${input.title}.`,
    HEADLINE: copy.headline,
  };
}

function assembleLanding(layoutPath, replacements) {
  const layoutTemplate = readFileSync(layoutPath, 'utf8');
  const blockTemplates = readBlockTemplates();

  const blockReplacements = {
    BLOCK_HERO: renderTemplate(blockTemplates.hero.template, replacements, blockTemplates.hero.path),
    BLOCK_FEATURES: renderTemplate(blockTemplates.features.template, replacements, blockTemplates.features.path),
    BLOCK_METHODOLOGY: renderTemplate(
      blockTemplates.methodology.template,
      replacements,
      blockTemplates.methodology.path,
    ),
    BLOCK_SERVICES: renderTemplate(blockTemplates.services.template, replacements, blockTemplates.services.path),
    BLOCK_PLANS: renderTemplate(blockTemplates.plans.template, replacements, blockTemplates.plans.path),
    BLOCK_EXPERIENCE: renderTemplate(blockTemplates.experience.template, replacements, blockTemplates.experience.path),
    BLOCK_GALLERY: renderTemplate(blockTemplates.gallery.template, replacements, blockTemplates.gallery.path),
    BLOCK_TESTIMONIALS: renderTemplate(
      blockTemplates.testimonials.template,
      replacements,
      blockTemplates.testimonials.path,
    ),
    BLOCK_TESTIMONIALS_CAROUSEL: renderTemplate(
      blockTemplates.testimonialsCarousel.template,
      replacements,
      blockTemplates.testimonialsCarousel.path,
    ),
    BLOCK_TRUST_LOGOS: renderTemplate(
      blockTemplates.trustLogos.template,
      replacements,
      blockTemplates.trustLogos.path,
    ),
    BLOCK_CONTACT_SPLIT: renderTemplate(
      blockTemplates.contactSplit.template,
      replacements,
      blockTemplates.contactSplit.path,
    ),
    BLOCK_CTA: renderTemplate(blockTemplates.cta.template, replacements, blockTemplates.cta.path),
    BLOCK_FOOTER: renderTemplate(blockTemplates.footer.template, replacements, blockTemplates.footer.path),
  };

  return renderTemplate(layoutTemplate, { ...replacements, ...blockReplacements }, layoutPath);
}

function writePreviewPlaceholder(demoDir) {
  if (existsSync(previewPlaceholderPath)) {
    copyFileSync(previewPlaceholderPath, join(demoDir, 'preview.png'));
    return;
  }

  fail(`Preview placeholder not found at ${previewPlaceholderPath}`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  validateInput(args);
  const forceOverwrite = ['true', '1', 'yes'].includes(String(args.force ?? '').toLowerCase());
  const requestedIndustry = (args.industry ?? buildIndustryFromName(args.name)).trim().toLowerCase();

  const demoDir = join(demosRoot, args.name);
  const demoExists = existsSync(demoDir);
  const isOverwriteSameDemo = forceOverwrite && demoExists;

  if (demoExists && !forceOverwrite) {
    fail(`Demo folder already exists: demos/${args.name}`);
  }

  const existingIndustries = collectExistingIndustries();
  const industryOwner = existingIndustries.get(requestedIndustry);
  if (industryOwner && industryOwner !== args.name && !isOverwriteSameDemo) {
    fail(
      `Industry "${requestedIndustry}" already exists in demos/${industryOwner}. Create a new demo for a non-existing industry.`,
    );
  }

  if (isOverwriteSameDemo) {
    rmSync(demoDir, { recursive: true, force: true });
  }

  const templateCategory = resolveTemplateCategory(args.category);
  const layoutKey = resolveLayout(args.variant, args.name);
  const layoutPath = resolveLayoutPath(layoutKey);
  const generationContext = { templateCategory, layoutKey };

  mkdirSync(demoDir, { recursive: true });

  const html = assembleLanding(layoutPath, buildReplacements(args, generationContext));
  const meta = generateMeta(args, generationContext);

  writeFileSync(join(demoDir, 'index.html'), html);
  writeFileSync(join(demoDir, 'meta.json'), `${JSON.stringify(meta, null, 2)}\n`);
  writePreviewPlaceholder(demoDir);

  console.log(`ok Demo created at demos/${args.name}`);
  console.log('  - index.html');
  console.log('  - meta.json');
  console.log('  - preview.png');
  console.log(`  - layout: ${layoutKey}`);
  console.log(`  - category profile: ${templateCategory}`);
  console.log('Next step: npm run generate:demos');
}

main();
