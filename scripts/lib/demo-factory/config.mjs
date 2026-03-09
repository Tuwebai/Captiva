import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const projectRoot = process.cwd();
export const demosRoot = resolve(projectRoot, 'demos');
export const contractsRoot = resolve(projectRoot, 'scripts/contracts');
export const templatesRoot = resolve(projectRoot, 'scripts/templates');
export const blocksRoot = resolve(templatesRoot, 'blocks');
export const layoutsRoot = resolve(templatesRoot, 'layouts');
export const previewPlaceholderPath = resolve(templatesRoot, 'preview.placeholder.png');
export const templateRegistryPath = resolve(contractsRoot, 'template-registry.json');
export const blockRegistryPath = resolve(contractsRoot, 'block-registry.json');

export const layoutKeys = ['landing-a', 'landing-b', 'landing-c'];
export const variantToLayout = { v1: 'landing-a', v2: 'landing-b', v3: 'landing-c' };

export const templateAliases = {
  fitness: 'fitness',
  gym: 'fitness',
  gimnasio: 'fitness',
  health: 'health',
  salud: 'health',
  odontologia: 'health',
  dentista: 'health',
  dentist: 'health',
  'clinica-dental': 'health',
  veterinaria: 'health',
  legal: 'legal',
  abogados: 'legal',
  abogado: 'legal',
  business: 'business',
  b2b: 'business',
  'negocios-locales': 'business',
  restaurant: 'restaurant',
  gastronomia: 'restaurant',
  beauty: 'beauty',
  estetica: 'beauty',
  automotriz: 'automotriz',
  concesionaria: 'automotriz',
  autos: 'automotriz',
  inmobiliaria: 'business',
  'real-estate': 'business',
};

export const categoryTheme = {
  fitness: { label: 'Fitness', primaryColor: '#3f78ff', secondaryColor: '#f28f52' },
  health: { label: 'Salud', primaryColor: '#1f9f9a', secondaryColor: '#4b7cff' },
  legal: { label: 'Legal', primaryColor: '#4e68d9', secondaryColor: '#f28f52' },
  business: { label: 'Business', primaryColor: '#3f78ff', secondaryColor: '#f28f52' },
  restaurant: { label: 'Restaurant', primaryColor: '#f28f52', secondaryColor: '#3f78ff' },
  beauty: { label: 'Beauty', primaryColor: '#8f6cff', secondaryColor: '#f28f52' },
  automotriz: { label: 'Automotriz', primaryColor: '#3f78ff', secondaryColor: '#f4b860' },
};

export const goalByCategory = {
  fitness: 'memberships',
  health: 'appointments',
  legal: 'consultations',
  business: 'leads',
  restaurant: 'bookings',
  beauty: 'appointments',
  automotriz: 'test-drives',
};

export const variantProfiles = {
  default: {
    heroTag: 'Demo premium',
    proof: [
      { value: '120+', label: 'consultas mensuales' },
      { value: '24h', label: 'respuesta comercial' },
      { value: '4.9/5', label: 'satisfaccion cliente' },
    ],
    processTone: 'Estructura clara para transformar visitas en consultas comerciales.',
    servicesTitle: 'Servicios y propuesta',
    socialTitle: 'Prueba social orientada a conversion',
    socialDesc: 'Testimonios y senales de confianza para reforzar la decision antes del contacto.',
    ctaHeadlinePrefix: 'Solicita una landing para captar',
    ctaDesc: 'Recibe una propuesta clara, estructura de conversion y una ruta directa hacia el contacto.',
  },
  v1: {
    heroTag: 'Conversion first',
    proof: [
      { value: '+42%', label: 'mejor tasa de respuesta' },
      { value: '7 dias', label: 'salida operativa' },
      { value: 'Top CTA', label: 'flujo sin friccion' },
    ],
    processTone: 'Secuencia agresiva para mover la visita desde interes hasta accion visible en pocos pasos.',
    servicesTitle: 'Oferta principal y cierre comercial',
    socialTitle: 'Pruebas para acelerar decision',
    socialDesc: 'Bloques pensados para reducir dudas rapido y aumentar la intencion antes del contacto.',
    ctaHeadlinePrefix: 'Quiero una landing para conseguir',
    ctaDesc: 'Priorizamos mensaje, CTA y contacto directo para convertir trafico en oportunidades accionables.',
  },
  v2: {
    heroTag: 'Authority minimal',
    proof: [
      { value: '3 pasos', label: 'navegacion clara' },
      { value: 'CTA visible', label: 'decision simple' },
      { value: 'Marca solida', label: 'confianza inmediata' },
    ],
    processTone: 'Presentacion mas limpia y jerarquica para reforzar autoridad, claridad y un contacto simple.',
    servicesTitle: 'Servicios priorizados',
    socialTitle: 'Confianza y autoridad visibles',
    socialDesc: 'La prueba social acompana una experiencia mas sobria, profesional y facil de comparar.',
    ctaHeadlinePrefix: 'Necesito una landing para captar',
    ctaDesc: 'Una demo mas sobria, precisa y alineada con negocios que venden confianza desde el primer scroll.',
  },
  v3: {
    heroTag: 'Editorial premium',
    proof: [
      { value: 'Premium', label: 'presentacion visual' },
      { value: 'Lead ready', label: 'contacto guiado' },
      { value: 'Escalable', label: 'campanas y SEO' },
    ],
    processTone: 'Composicion editorial con mas aire visual, storytelling comercial y jerarquia premium.',
    servicesTitle: 'Experiencia, oferta y argumento',
    socialTitle: 'Reputacion que sostiene la propuesta',
    socialDesc: 'Una narrativa mas premium para negocios que necesitan elevar percepcion y calidad del lead.',
    ctaHeadlinePrefix: 'Busco una landing premium para captar',
    ctaDesc: 'Pensada para marcas que quieren mas presencia, mejor percepcion y un contacto comercial mas calificado.',
  },
};

export const categoryAssets = {
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
  automotriz: {
    heroImage:
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=80',
    serviceImages: [
      'https://images.unsplash.com/photo-1616788494672-ec7ca25fdda9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=900&q=80',
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80',
    ],
  },
};

export const defaultSectionCopy = {
  processTitle: 'Como trabajamos',
  processDesc: 'Estructura clara para transformar visitas en consultas comerciales.',
  steps: [
    { title: 'Diagnostico inicial', desc: 'Definimos objetivo, oferta y mensaje principal.' },
    { title: 'Estructura de conversion', desc: 'Ordenamos bloques y CTA para reducir friccion.' },
    { title: 'Activacion comercial', desc: 'Publicamos con foco en resultados medibles.' },
  ],
  plansTitle: 'Planes y propuestas',
  plansDesc: 'Opciones para distintos niveles de necesidad.',
  plans: [
    { name: 'Base', price: '$XX.XXX/mes', desc: 'Landing principal con estructura comercial.' },
    { name: 'Pro', price: '$XX.XXX/mes', desc: 'Incluye optimizacion de copy y conversion.' },
    { name: 'Escala', price: '$XX.XXX/mes', desc: 'Pensado para campanas y crecimiento continuo.' },
  ],
};

export const sectionCopyByProfile = {
  fitness: {
    processTitle: 'Como conviertes visitas en nuevas altas',
    processDesc: 'Una secuencia pensada para presentar el metodo, ordenar planes y llevar el interes a una prueba real.',
    steps: [
      { title: 'Diagnostico del alumno ideal', desc: 'Definimos perfil, objeciones y propuesta para captar consultas con mas intencion.' },
      { title: 'Oferta y planes visibles', desc: 'Jerarquizamos membresias, beneficios y CTA para que la decision sea simple.' },
      { title: 'Activacion de pruebas y seguimiento', desc: 'La landing queda lista para generar conversaciones por WhatsApp o formulario.' },
    ],
    plansTitle: 'Planes pensados para convertir',
    plansDesc: 'Paquetes claros para mostrar valor, diferenciar membresias y empujar la prueba inicial.',
    plans: [
      { name: 'Start', price: '$XX.XXX/mes', desc: 'Ideal para captar primeras pruebas de clase con una oferta simple.' },
      { name: 'Performance', price: '$XX.XXX/mes', desc: 'Combina copy, estructura y diferenciales para subir altas.' },
      { name: 'Scale', price: '$XX.XXX/mes', desc: 'Pensado para campanas, sedes multiples o nuevos programas.' },
    ],
  },
  health: {
    processTitle: 'Como ordenamos la captacion de pacientes',
    processDesc: 'Cada bloque busca transmitir confianza, explicar especialidades y facilitar la reserva del primer turno.',
    steps: [
      { title: 'Propuesta y autoridad medica', desc: 'Definimos mensaje, tratamientos y diferenciales que mejor transmiten respaldo.' },
      { title: 'Estructura para turnos y consultas', desc: 'Ordenamos prueba social, servicios y CTA para reducir dudas antes del contacto.' },
      { title: 'Publicacion y conversion directa', desc: 'La landing se entrega lista para generar solicitudes de turno desde cualquier dispositivo.' },
    ],
    plansTitle: 'Paquetes para consulta y reserva',
    plansDesc: 'Escenarios de trabajo orientados a consultas, turnos y seguimiento comercial inicial.',
    plans: [
      { name: 'Consulta', price: '$XX.XXX/mes', desc: 'Presenta la propuesta medica y facilita la solicitud de informacion.' },
      { name: 'Turnos', price: '$XX.XXX/mes', desc: 'Optimizado para tratamientos, confianza y reservas mas directas.' },
      { name: 'Expansion', price: '$XX.XXX/mes', desc: 'Listo para nuevas sedes, especialidades o campanas locales.' },
    ],
  },
  legal: {
    processTitle: 'Como ordenamos una consulta legal de calidad',
    processDesc: 'La estructura combina autoridad, especialidades y llamados a la accion concretos para captar casos con mas claridad.',
    steps: [
      { title: 'Definicion del caso y del cliente', desc: 'Aterrizamos las practicas clave y el tipo de consulta que conviene priorizar.' },
      { title: 'Jerarquia de servicios y respaldo', desc: 'Organizamos experiencia, areas de practica y CTA para transmitir criterio profesional.' },
      { title: 'Canal comercial listo para cerrar', desc: 'La landing sale publicada con contacto visible y ruta directa hacia la consulta inicial.' },
    ],
    plansTitle: 'Paquetes para estudios y practicas legales',
    plansDesc: 'Versiones enfocadas en consulta inicial, autoridad profesional y expansion por especialidad.',
    plans: [
      { name: 'Consulta inicial', price: '$XX.XXX/mes', desc: 'Ideal para ordenar practicas y empezar a captar consultas.' },
      { name: 'Autoridad', price: '$XX.XXX/mes', desc: 'Refuerza posicionamiento y claridad de la propuesta juridica.' },
      { name: 'Firma en crecimiento', price: '$XX.XXX/mes', desc: 'Pensado para varias areas de practica o nuevos canales de captacion.' },
    ],
  },
  business: {
    processTitle: 'Como convertimos trafico en oportunidades comerciales',
    processDesc: 'El sistema prioriza claridad, propuesta y contacto directo para transformar interes en leads accionables.',
    steps: [
      { title: 'Alineacion comercial', desc: 'Definimos oferta, segmento y promesa principal para que la landing venda sin friccion.' },
      { title: 'Diseño del embudo visible', desc: 'Armamos jerarquia, servicios, prueba social y CTA con logica de conversion.' },
      { title: 'Activacion y seguimiento', desc: 'La pagina se entrega lista para anuncios, SEO y primeras iteraciones de mejora.' },
    ],
    plansTitle: 'Paquetes de captacion para negocios y B2B',
    plansDesc: 'Distintos niveles de profundidad segun el volumen de leads y la madurez comercial del negocio.',
    plans: [
      { name: 'Lead start', price: '$XX.XXX/mes', desc: 'Landing clara para validar oferta y captar primeras consultas.' },
      { name: 'Growth', price: '$XX.XXX/mes', desc: 'Mayor foco en conversion, claridad de servicios y CTA prioritarios.' },
      { name: 'Pipeline', price: '$XX.XXX/mes', desc: 'Preparado para industrias, ciudades y un catalogo comercial mas amplio.' },
    ],
  },
  restaurant: {
    processTitle: 'Como llevamos visitas a reservas o pedidos',
    processDesc: 'La propuesta combina carta, experiencia y accion inmediata para que el usuario no se pierda en el camino.',
    steps: [
      { title: 'Concepto y propuesta del local', desc: 'Definimos lo que hace unico al restaurante y lo volvemos visible en el primer scroll.' },
      { title: 'Carta, experiencia y CTA', desc: 'Mostramos menu, promos y diferenciales con una ruta clara a reserva o pedido.' },
      { title: 'Cierre directo desde mobile', desc: 'La landing queda lista para convertir trafico en mesas, pedidos o mensajes.' },
    ],
    plansTitle: 'Paquetes para reservas y pedidos',
    plansDesc: 'Opciones para restaurantes, delivery y conceptos gastronomicos que necesitan contacto rapido.',
    plans: [
      { name: 'Reserva', price: '$XX.XXX/mes', desc: 'Ideal para restaurantes que priorizan mesas y turnos.' },
      { name: 'Carta activa', price: '$XX.XXX/mes', desc: 'Combina menu, experiencia y CTA visibles para mejorar conversion.' },
      { name: 'Delivery scale', price: '$XX.XXX/mes', desc: 'Pensado para multiples canales, promos y crecimiento local.' },
    ],
  },
  beauty: {
    processTitle: 'Como transformamos interes en reservas',
    processDesc: 'La landing pone foco en confianza visual, tratamientos y contacto directo para diagnosticos o turnos.',
    steps: [
      { title: 'Diagnostico de propuesta y publico', desc: 'Definimos tratamientos, objeciones y promesa principal para el centro.' },
      { title: 'Visual premium y conversion', desc: 'Ordenamos pruebas, resultados y CTA para generar mas seguridad en el primer vistazo.' },
      { title: 'Reserva y seguimiento inicial', desc: 'La landing queda lista para captar consultas desde redes, SEO o anuncios.' },
    ],
    plansTitle: 'Paquetes para estudios y clinicas esteticas',
    plansDesc: 'Distintos niveles de presentacion segun tratamientos, posicionamiento y volumen esperado.',
    plans: [
      { name: 'Diagnostico', price: '$XX.XXX/mes', desc: 'Landing premium para captar primeras reservas o consultas.' },
      { name: 'Glow', price: '$XX.XXX/mes', desc: 'Refuerza autoridad visual, tratamientos y resultados percibidos.' },
      { name: 'Premium care', price: '$XX.XXX/mes', desc: 'Preparado para mas servicios, promociones y crecimiento continuo.' },
    ],
  },
  automotriz: {
    processTitle: 'Como ordenamos el recorrido comercial automotriz',
    processDesc: 'Combinamos catalogo, diferenciales y contacto directo para llevar el interes a test drives o consultas.',
    steps: [
      { title: 'Oferta y stock prioritario', desc: 'Definimos las unidades, beneficios y promesas que mas conviene destacar.' },
      { title: 'Catalogo y argumento de venta', desc: 'Armamos una experiencia visual que ordena versiones, financiacion y CTA visibles.' },
      { title: 'Canal directo para cierre', desc: 'La demo queda lista para consultas, tasaciones o coordinacion de test drive.' },
    ],
    plansTitle: 'Paquetes para concesionarias y detalle automotriz',
    plansDesc: 'Pensado para mostrar catalogo, ventajas comerciales y contacto rapido con asesor.',
    plans: [
      { name: 'Showroom', price: '$XX.XXX/mes', desc: 'Ideal para presentar unidades destacadas y captar consultas.' },
      { name: 'Test drive', price: '$XX.XXX/mes', desc: 'Refuerza financiacion, argumentos de venta y citas comerciales.' },
      { name: 'Dealer scale', price: '$XX.XXX/mes', desc: 'Preparado para varias lineas, promos o nuevas sedes.' },
    ],
  },
};

export function fail(message) {
  console.error(`x ${message}`);
  process.exit(1);
}

export function loadJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

export function isKebabCase(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

export function hashString(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function toTitleCaseFromSlug(value) {
  return value
    .split('-')
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ');
}

export function resolveCategory(category) {
  const normalized = String(category).trim().toLowerCase();
  return templateAliases[normalized] ?? 'business';
}

export function resolveProfileKey(industry, category) {
  const industryKey = industry ? resolveCategory(industry) : null;
  if (industryKey && categoryTheme[industryKey]) return industryKey;
  const categoryKey = resolveCategory(category);
  if (categoryTheme[categoryKey]) return categoryKey;
  return 'business';
}

export function resolveContentContract(category) {
  const contractPath = resolve(contractsRoot, 'content', `${category}.json`);
  if (!existsSync(contractPath)) return loadJson(resolve(contractsRoot, 'content', 'business.json'));
  return loadJson(contractPath);
}

export function resolveContentContractWithIndustry(industry, category) {
  if (industry) {
    const industryPath = resolve(contractsRoot, 'content', `${industry.toLowerCase()}.json`);
    if (existsSync(industryPath)) return loadJson(industryPath);
  }
  return resolveContentContract(category);
}

export function normalizeVariantKey(value) {
  const normalized = String(value ?? '').trim().toLowerCase();
  if (!normalized || normalized === 'default') return 'default';
  if (normalized === 'landing-a') return 'v1';
  if (normalized === 'landing-b') return 'v2';
  if (normalized === 'landing-c') return 'v3';
  if (normalized === 'v1' || normalized === 'v2' || normalized === 'v3') return normalized;
  return 'default';
}
