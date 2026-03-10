import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fail, hashString, layoutKeys, layoutsRoot, normalizeVariantKey, variantToLayout } from './config.mjs';

function resolveLayout(requestedVariant, fallbackLayout, demoSlug) {
  if (requestedVariant) {
    const normalized = normalizeVariantKey(requestedVariant);
    if (variantToLayout[normalized]) return variantToLayout[normalized];
    const raw = String(requestedVariant).trim().toLowerCase();
    if (layoutKeys.includes(raw)) return raw;
    fail('Argument --variant must be v1|v2|v3|v4|v5 or landing-a|landing-b|landing-c|landing-v1|landing-v2|landing-v3|landing-v4|landing-v5');
  }
  if (fallbackLayout) return fallbackLayout;
  return layoutKeys[hashString(demoSlug) % layoutKeys.length];
}

function pickTemplate(registry, { requestedTemplate, requestedIndustry, category }) {
  if (requestedTemplate) {
    const exact = registry.templates.find((entry) => entry.id === requestedTemplate && entry.status === 'approved');
    if (exact) return exact;
    fail(`Template "${requestedTemplate}" is not approved or does not exist.`);
  }

  const byIndustry = registry.templates.find(
    (entry) =>
      entry.status === 'approved' &&
      Array.isArray(entry.recommendedFor) &&
      entry.recommendedFor.includes(requestedIndustry),
  );
  if (byIndustry) return byIndustry;

  const byCategory = registry.templates.find(
    (entry) =>
      entry.status === 'approved' &&
      Array.isArray(entry.recommendedFor) &&
      entry.recommendedFor.includes(category),
  );
  if (byCategory) return byCategory;

  return registry.templates.find((entry) => entry.status === 'approved') ?? null;
}

export function selectTemplate(context) {
  const selectedTemplate = pickTemplate(context.templateRegistry, {
    requestedTemplate: context.args.template,
    requestedIndustry: context.requestedIndustry,
    category: context.templateCategory,
  });

  if (!selectedTemplate) {
    fail('No approved template available in template-registry.json');
  }

  const layoutKey = resolveLayout(context.args.variant, selectedTemplate.defaultLayout, context.args.name);
  const layoutPath = resolve(layoutsRoot, `${layoutKey}.html`);
  if (!existsSync(layoutPath)) fail(`Layout not found: ${layoutPath}`);
  const variantKey = normalizeVariantKey(context.args.variant ?? selectedTemplate.defaultLayout);

  return {
    ...context,
    layoutKey,
    layoutPath,
    layoutTemplate: readFileSync(layoutPath, 'utf8'),
    selectedTemplate,
    variantKey,
  };
}
