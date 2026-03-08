import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { evaluateDemoQuality, loadDesignContract } from './lib/demo-quality-gates.mjs';

const projectRoot = process.cwd();
const demosRoot = resolve(projectRoot, 'demos');
const contractsRoot = resolve(projectRoot, 'scripts/contracts');
const templatesRoot = resolve(projectRoot, 'scripts/templates');
const blocksRoot = resolve(templatesRoot, 'blocks');
const layoutsRoot = resolve(templatesRoot, 'layouts');
const previewPlaceholderPath = resolve(templatesRoot, 'preview.placeholder.png');

const layoutKeys = ['landing-a', 'landing-b', 'landing-c'];
const variantToLayout = { v1: 'landing-a', v2: 'landing-b', v3: 'landing-c' };

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
  automotriz: 'automotriz',
  concesionaria: 'automotriz',
  autos: 'automotriz',
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
  faq: 'faq.html',
  cta: 'cta.html',
  contactSplit: 'contact-split.html',
  footer: 'footer.html',
};

const categoryTheme = {
  fitness: { label: 'Fitness', primaryColor: '#3f78ff', secondaryColor: '#f28f52' },
  health: { label: 'Salud', primaryColor: '#1f9f9a', secondaryColor: '#4b7cff' },
  legal: { label: 'Legal', primaryColor: '#4e68d9', secondaryColor: '#f28f52' },
  business: { label: 'Business', primaryColor: '#3f78ff', secondaryColor: '#f28f52' },
  restaurant: { label: 'Restaurant', primaryColor: '#f28f52', secondaryColor: '#3f78ff' },
  beauty: { label: 'Beauty', primaryColor: '#8f6cff', secondaryColor: '#f28f52' },
  automotriz: { label: 'Automotriz', primaryColor: '#3f78ff', secondaryColor: '#f4b860' },
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

const defaultSectionCopy = {
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

function fail(message) {
  console.error(`x ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith('--')) fail(`Unexpected argument "${token}".`);
    const key = token.replace(/^--/, '');
    const value = argv[index + 1];
    if (!value || value.startsWith('--')) fail(`Missing value for ${token}.`);
    args[key] = value;
    index += 1;
  }
  return args;
}

function isKebabCase(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function hashString(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function normalizeFolderSlug(folderName) {
  return folderName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function toTitleCaseFromSlug(value) {
  return value
    .split('-')
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ');
}

function loadJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function collectExistingIndustries() {
  if (!existsSync(demosRoot)) return new Map();

  const byIndustry = new Map();
  const folders = readdirSync(demosRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory());
  for (const folder of folders) {
    const metaPath = join(demosRoot, folder.name, 'meta.json');
    if (!existsSync(metaPath)) continue;
    try {
      const meta = loadJson(metaPath);
      if (typeof meta.industry === 'string' && meta.industry.trim()) {
        byIndustry.set(meta.industry.trim().toLowerCase(), folder.name);
      }
    } catch {
      // validated elsewhere
    }
  }
  return byIndustry;
}

function resolveLayout(requestedVariant, demoSlug) {
  if (!requestedVariant) return layoutKeys[hashString(demoSlug) % layoutKeys.length];
  const normalized = requestedVariant.toLowerCase();
  if (variantToLayout[normalized]) return variantToLayout[normalized];
  if (layoutKeys.includes(normalized)) return normalized;
  fail('Argument --variant must be v1|v2|v3 or landing-a|landing-b|landing-c');
}

function resolveCategory(category) {
  const normalized = String(category).trim().toLowerCase();
  return templateAliases[normalized] ?? 'business';
}

function resolveProfileKey(industry, category) {
  const industryKey = industry ? resolveCategory(industry) : null;
  if (industryKey && categoryTheme[industryKey]) return industryKey;
  const categoryKey = resolveCategory(category);
  if (categoryTheme[categoryKey]) return categoryKey;
  return 'business';
}

function resolveContentContract(category) {
  const contractPath = resolve(contractsRoot, 'content', `${category}.json`);
  if (!existsSync(contractPath)) return loadJson(resolve(contractsRoot, 'content', 'business.json'));
  return loadJson(contractPath);
}

function resolveContentContractWithIndustry(industry, category) {
  if (industry) {
    const industryPath = resolve(contractsRoot, 'content', `${industry.toLowerCase()}.json`);
    if (existsSync(industryPath)) return loadJson(industryPath);
  }
  return resolveContentContract(category);
}

function validateInput(input) {
  for (const required of ['category', 'name', 'title', 'description']) {
    if (typeof input[required] !== 'string' || input[required].trim().length === 0) {
      fail(`Argument --${required} is required.`);
    }
  }
  if (!isKebabCase(input.name)) fail('Argument --name must be kebab-case.');
  if (!isKebabCase(input.category)) fail('Argument --category must be kebab-case.');
  if (input.industry && !isKebabCase(input.industry)) fail('Argument --industry must be kebab-case.');
  if (input.title.length < 12 || input.title.length > 120) fail('Argument --title must contain 12-120 chars.');
  if (input.description.length < 30 || input.description.length > 320) {
    fail('Argument --description must contain 30-320 chars.');
  }
}

function resolveConfig(args) {
  const templateCategory = resolveCategory(args.category);
  const profileKey = resolveProfileKey(args.industry, args.category);
  const designContract = loadDesignContract(projectRoot);
  const contentContract = resolveContentContractWithIndustry(args.industry, templateCategory);
  const layoutKey = resolveLayout(args.variant, args.name);
  const layoutPath = resolve(layoutsRoot, `${layoutKey}.html`);
  if (!existsSync(layoutPath)) fail(`Layout not found: ${layoutPath}`);

  const demoDir = join(demosRoot, args.name);
  const forceOverwrite = ['true', '1', 'yes'].includes(String(args.force ?? '').toLowerCase());
  const requestedIndustry = (args.industry ?? args.name.split('-')[0]).trim().toLowerCase();
  return {
    args,
    templateCategory,
    profileKey,
    designContract,
    contentContract,
    layoutKey,
    layoutPath,
    demoDir,
    forceOverwrite,
    requestedIndustry,
  };
}

function composeLayout(context) {
  const layoutTemplate = readFileSync(context.layoutPath, 'utf8');
  const blockTemplates = {};

  for (const [key, filename] of Object.entries(blockFiles)) {
    const blockPath = resolve(blocksRoot, filename);
    if (!existsSync(blockPath)) fail(`Block template not found: ${blockPath}`);
    blockTemplates[key] = { path: blockPath, template: readFileSync(blockPath, 'utf8') };
  }

  return { ...context, layoutTemplate, blockTemplates };
}

function composeSections(context) {
  const themeConfig = categoryTheme[context.profileKey] ?? categoryTheme.business;
  const assets = categoryAssets[context.profileKey] ?? categoryAssets.business;
  const businessName = context.args['business-name']
    ? context.args['business-name'].trim()
    : toTitleCaseFromSlug(context.args.name);
  const ctaPrimary = context.args['cta-text'] ? context.args['cta-text'].trim() : context.contentContract.cta.primary;
  const ctaSecondary = context.args['cta-secondary']
    ? context.args['cta-secondary'].trim()
    : context.contentContract.cta.secondary;

  const proposal = context.contentContract.valueProposition;
  const benefits = context.contentContract.benefits;
  const objections = context.contentContract.objections;
  const trustMessages = context.contentContract.trustMessages;
  const faq = context.contentContract.faq;
  const sectionCopy = defaultSectionCopy;

  return {
    ...context,
    sectionData: {
      themeConfig,
      assets,
      businessName,
      ctaPrimary,
      ctaSecondary,
      proposal,
      benefits,
      objections,
      trustMessages,
      faq,
      sectionCopy,
    },
  };
}

function renderTemplate(template, replacements, templatePath) {
  return template.replace(/{{([A-Z0-9_]+)}}/g, (_, key) => {
    if (!(key in replacements)) fail(`Template ${templatePath} requires placeholder {{${key}}}.`);
    return String(replacements[key]);
  });
}

function applyCopy(context) {
  const { args, sectionData } = context;
  const primaryColor = args['primary-color']?.trim() || sectionData.themeConfig.primaryColor;
  const secondaryColor = args['secondary-color']?.trim() || sectionData.themeConfig.secondaryColor;

  const replacements = {
    TITLE: args.title,
    DESCRIPTION: args.description,
    CATEGORY: args.category,
    CATEGORY_LABEL: sectionData.themeConfig.label,
    BUSINESS_NAME: sectionData.businessName,
    CTA_TEXT: sectionData.ctaPrimary,
    CTA_SECONDARY: sectionData.ctaSecondary,
    PRIMARY_COLOR: primaryColor,
    SECONDARY_COLOR: secondaryColor,
    HEADLINE: sectionData.proposal,
    HERO_IMAGE: sectionData.assets.heroImage,
    HERO_TAG: `${sectionData.themeConfig.label} demo`,
    WHATSAPP_TEXT: `Hola ${sectionData.businessName}, quiero informacion sobre ${args.title}.`,
    TRUST_1: sectionData.trustMessages[0],
    TRUST_2: sectionData.trustMessages[1],
    TRUST_3: sectionData.trustMessages[2],
    PROOF_VALUE_1: '120+',
    PROOF_LABEL_1: 'consultas mensuales',
    PROOF_VALUE_2: '24h',
    PROOF_LABEL_2: 'respuesta comercial',
    PROOF_VALUE_3: '4.9/5',
    PROOF_LABEL_3: 'satisfaccion cliente',
    BENEFIT_1_TITLE: 'Conversion',
    BENEFIT_1_DESC: sectionData.benefits[0],
    BENEFIT_2_TITLE: 'Claridad',
    BENEFIT_2_DESC: sectionData.benefits[1],
    BENEFIT_3_TITLE: 'Presencia',
    BENEFIT_3_DESC: sectionData.benefits[2],
    PROCESS_TITLE: sectionData.sectionCopy.processTitle,
    PROCESS_DESC: sectionData.sectionCopy.processDesc,
    STEP_1_TITLE: sectionData.sectionCopy.steps[0].title,
    STEP_1_DESC: sectionData.sectionCopy.steps[0].desc,
    STEP_2_TITLE: sectionData.sectionCopy.steps[1].title,
    STEP_2_DESC: sectionData.sectionCopy.steps[1].desc,
    STEP_3_TITLE: sectionData.sectionCopy.steps[2].title,
    STEP_3_DESC: sectionData.sectionCopy.steps[2].desc,
    SERVICE_TITLE: 'Servicios y propuesta',
    SERVICE_DESC: sectionData.objections.join('. ') + '.',
    SERVICE_1_TITLE: 'Oferta principal',
    SERVICE_1_DESC: sectionData.benefits[0],
    SERVICE_2_TITLE: 'Diferencial comercial',
    SERVICE_2_DESC: sectionData.benefits[1],
    SERVICE_3_TITLE: 'Canal de cierre',
    SERVICE_3_DESC: sectionData.benefits[2],
    SERVICE_IMAGE_1: sectionData.assets.serviceImages[0],
    SERVICE_IMAGE_2: sectionData.assets.serviceImages[1],
    SERVICE_IMAGE_3: sectionData.assets.serviceImages[2],
    PLANS_TITLE: sectionData.sectionCopy.plansTitle,
    PLANS_DESC: sectionData.sectionCopy.plansDesc,
    PLAN_1_NAME: sectionData.sectionCopy.plans[0].name,
    PLAN_1_PRICE: sectionData.sectionCopy.plans[0].price,
    PLAN_1_DESC: sectionData.sectionCopy.plans[0].desc,
    PLAN_2_NAME: sectionData.sectionCopy.plans[1].name,
    PLAN_2_PRICE: sectionData.sectionCopy.plans[1].price,
    PLAN_2_DESC: sectionData.sectionCopy.plans[1].desc,
    PLAN_3_NAME: sectionData.sectionCopy.plans[2].name,
    PLAN_3_PRICE: sectionData.sectionCopy.plans[2].price,
    PLAN_3_DESC: sectionData.sectionCopy.plans[2].desc,
    GALLERY_IMAGE_1: sectionData.assets.galleryImages[0],
    GALLERY_IMAGE_2: sectionData.assets.galleryImages[1],
    GALLERY_IMAGE_3: sectionData.assets.galleryImages[2],
    GALLERY_IMAGE_4: sectionData.assets.galleryImages[3],
    SOCIAL_TITLE: 'Prueba social orientada a conversion',
    SOCIAL_DESC: 'Carrusel infinito horizontal con testimonios para reforzar confianza.',
    TESTIMONIAL_1_TEXT: 'La landing mejoro la calidad de los contactos comerciales.',
    TESTIMONIAL_2_TEXT: 'Ahora la propuesta se entiende rapido y convierte mejor.',
    TESTIMONIAL_3_TEXT: 'Subieron consultas en menos de dos semanas con esta estructura.',
    TESTIMONIAL_NAME_1: 'Cliente Premium A',
    TESTIMONIAL_NAME_2: 'Cliente Premium B',
    TESTIMONIAL_NAME_3: 'Cliente Premium C',
    EXPERIENCE_TITLE: 'Sistema de conversion completo para demos enterprise',
    EXPERIENCE_DESC: 'Diseño, copy y flujo comercial alineados para captar oportunidades reales.',
    FAQ_Q1: sectionData.faq[0].question,
    FAQ_A1: sectionData.faq[0].answer,
    FAQ_Q2: sectionData.faq[1].question,
    FAQ_A2: sectionData.faq[1].answer,
    FAQ_Q3: sectionData.faq[2].question,
    FAQ_A3: sectionData.faq[2].answer,
    FAQ_Q4: sectionData.faq[3].question,
    FAQ_A4: sectionData.faq[3].answer,
    FAQ_Q5: sectionData.faq[4].question,
    FAQ_A5: sectionData.faq[4].answer,
    FAQ_Q6: sectionData.faq[5].question,
    FAQ_A6: sectionData.faq[5].answer,
    CTA_HEADLINE: 'Solicita una landing como esta para tu negocio',
    CTA_DESC: 'Recibe una propuesta clara, estructura de conversion y contacto directo.',
    CONTACT_TITLE: `Hablemos de tu negocio ${sectionData.themeConfig.label.toLowerCase()}`,
    CONTACT_DESC: 'Te ayudamos a activar una landing comercial lista para captar consultas.',
    CONTACT_EMAIL: `${args.name}@demo.captiva`,
    CONTACT_GOAL_1: 'Solicitar propuesta',
    CONTACT_GOAL_2: 'Ver opciones de plan',
    CONTACT_GOAL_3: 'Coordinar una llamada',
  };

  return { ...context, replacements };
}

function renderHtml(context) {
  const renderedBlocks = {};
  const blocksMap = {
    BLOCK_HERO: 'hero',
    BLOCK_FEATURES: 'features',
    BLOCK_METHODOLOGY: 'methodology',
    BLOCK_SERVICES: 'services',
    BLOCK_PLANS: 'plans',
    BLOCK_EXPERIENCE: 'experience',
    BLOCK_GALLERY: 'gallery',
    BLOCK_TESTIMONIALS: 'testimonials',
    BLOCK_TESTIMONIALS_CAROUSEL: 'testimonialsCarousel',
    BLOCK_FAQ: 'faq',
    BLOCK_CTA: 'cta',
    BLOCK_CONTACT_SPLIT: 'contactSplit',
    BLOCK_FOOTER: 'footer',
  };

  for (const [placeholder, blockKey] of Object.entries(blocksMap)) {
    const block = context.blockTemplates[blockKey];
    renderedBlocks[placeholder] = renderTemplate(block.template, context.replacements, block.path);
  }

  const html = renderTemplate(context.layoutTemplate, { ...context.replacements, ...renderedBlocks }, context.layoutPath);
  const meta = {
    title: context.args.title,
    description: context.args.description,
    category: context.args.category,
    industry: context.args.industry ?? context.args.name.split('-')[0],
    slug: context.args.name,
    preview: `/demos/${context.args.name}/preview.png`,
    template: 'builder',
    layout: context.layoutKey,
    variant: context.layoutKey,
  };

  return { ...context, html, meta };
}

function qualityGates(context) {
  const quality = evaluateDemoQuality({
    html: context.html,
    meta: context.meta,
    designContract: context.designContract,
    demoName: context.args.name,
  });

  if (quality.errors.length > 0) {
    quality.errors.forEach((message) => console.error(`x ${message}`));
    fail('Demo generation blocked by quality gates.');
  }
  quality.warnings.forEach((message) => console.warn(`! ${message}`));
  return { ...context, quality };
}

function ensureIndustryUniqueness(context) {
  const existingIndustries = collectExistingIndustries();
  const owner = existingIndustries.get(context.requestedIndustry);
  const sameDemo = owner === context.args.name;
  if (owner && !sameDemo) {
    fail(
      `Industry "${context.requestedIndustry}" already exists in demos/${owner}. Create a non-existing industry demo.`,
    );
  }
}

function persistDemo(context) {
  const demoExists = existsSync(context.demoDir);
  if (demoExists && !context.forceOverwrite) fail(`Demo folder already exists: demos/${context.args.name}`);
  if (demoExists && context.forceOverwrite) rmSync(context.demoDir, { recursive: true, force: true });
  mkdirSync(context.demoDir, { recursive: true });

  writeFileSync(join(context.demoDir, 'index.html'), context.html, 'utf8');
  writeFileSync(join(context.demoDir, 'meta.json'), `${JSON.stringify(context.meta, null, 2)}\n`, 'utf8');
  if (!existsSync(previewPlaceholderPath)) fail(`Preview placeholder not found: ${previewPlaceholderPath}`);
  copyFileSync(previewPlaceholderPath, join(context.demoDir, 'preview.png'));
}

function runPipeline(rawArgs) {
  validateInput(rawArgs);
  const config = resolveConfig(rawArgs);
  ensureIndustryUniqueness(config);
  const layout = composeLayout(config);
  const sections = composeSections(layout);
  const copied = applyCopy(sections);
  const rendered = renderHtml(copied);
  const gated = qualityGates(rendered);
  persistDemo(gated);
  return gated;
}

function main() {
  const rawArgs = parseArgs(process.argv.slice(2));
  const result = runPipeline(rawArgs);
  console.log(`ok Demo created at demos/${result.args.name}`);
  console.log(`  - layout: ${result.layoutKey}`);
  console.log(`  - category profile: ${result.templateCategory}`);
  console.log(`  - quality gates: passed (${result.quality.stats.wordCount} words)`);
}

main();
