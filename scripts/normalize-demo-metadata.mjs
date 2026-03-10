import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { DEFAULT_DEMO_PREVIEW, DEFAULT_DEMO_SECTIONS } from './lib/demos/constants.mjs';

const demosRoot = resolve(process.cwd(), 'demos');

const templateAliases = {
  abogado: 'legal',
  automotriz: 'automotriz',
  b2b: 'business',
  'clinica-dental': 'health',
  concesionaria: 'automotriz',
  dentista: 'health',
  detailing: 'business',
  estetica: 'beauty',
  fitness: 'fitness',
  gimnasio: 'fitness',
  health: 'health',
  inmobiliaria: 'business',
  legal: 'legal',
  odontologia: 'health',
  restaurant: 'restaurant',
  salud: 'health',
  veterinaria: 'health',
};

function resolveProfileKey(category, industry) {
  const industryKey = templateAliases[String(industry ?? '').toLowerCase()];
  if (industryKey) return industryKey;
  return templateAliases[String(category ?? '').toLowerCase()] ?? 'business';
}

function inferGoal(category) {
  const normalized = String(category ?? '').toLowerCase();
  if (normalized === 'fitness') return 'memberships';
  if (normalized === 'salud' || normalized === 'odontologia' || normalized === 'estetica') return 'appointments';
  if (normalized === 'legal') return 'consultations';
  if (normalized === 'automotriz') return 'test-drives';
  if (normalized === 'restaurant') return 'bookings';
  return 'leads';
}

function inferTemplate(category, industry, currentTemplate) {
  if (typeof currentTemplate === 'string' && currentTemplate.trim()) return currentTemplate.trim();
  const normalized = String(category ?? '').toLowerCase();
  const normalizedIndustry = String(industry ?? '').toLowerCase();
  if (normalized === 'automotriz') return 'catalog-premium';
  if (normalized === 'negocios-locales' && normalizedIndustry === 'inmobiliaria') return 'real-estate-split';
  return 'service-business';
}

function inferSections(template) {
  void template;
  return DEFAULT_DEMO_SECTIONS;
}

function inferTags(category, industry, template) {
  const profile = resolveProfileKey(category, industry);
  return [...new Set(['captiva', 'demo', category, industry, profile, template].filter(Boolean))];
}

function inferTier(meta) {
  if (typeof meta.tier === 'string' && meta.tier.trim()) return meta.tier.trim();
  if (Array.isArray(meta.tags) && meta.tags.includes('pilot')) return 'pilot';
  return 'legacy';
}

function inferVariant(meta) {
  if (typeof meta.variant === 'string' && meta.variant.trim()) return meta.variant.trim();
  if (typeof meta.layout === 'string' && meta.layout.trim()) return meta.layout.trim();
  return 'default';
}

function normalizeMeta(meta) {
  const template = inferTemplate(meta.category, meta.industry, meta.template);
  return {
    ...meta,
    preview:
      typeof meta.preview === 'string' && meta.preview.trim().length > 0
        ? meta.preview
        : DEFAULT_DEMO_PREVIEW,
    goal: meta.goal ?? inferGoal(meta.category ?? meta.industry),
    style: meta.style ?? 'premium',
    status: meta.status ?? 'active',
    tier: inferTier(meta),
    variant: inferVariant(meta),
    template,
    tags: Array.isArray(meta.tags) && meta.tags.length > 0 ? meta.tags : inferTags(meta.category, meta.industry, template),
    sections: Array.isArray(meta.sections) && meta.sections.length > 0 ? meta.sections : inferSections(template),
  };
}

const folders = readdirSync(demosRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory());
let updated = 0;

folders.forEach((entry) => {
  const metaPath = join(demosRoot, entry.name, 'meta.json');
  if (!existsSync(metaPath)) return;

  const current = JSON.parse(readFileSync(metaPath, 'utf8'));
  const normalized = normalizeMeta(current);

  if (JSON.stringify(current) !== JSON.stringify(normalized)) {
    writeFileSync(metaPath, `${JSON.stringify(normalized, null, 2)}\n`, 'utf8');
    updated += 1;
  }
});

console.log(`Normalized ${updated} demo metadata file(s).`);
