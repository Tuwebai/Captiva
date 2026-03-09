import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fail, hashString, layoutKeys, layoutsRoot, variantToLayout } from './config.mjs';

function resolveLayout(requestedVariant, fallbackLayout, demoSlug) {
  if (requestedVariant) {
    const normalized = requestedVariant.toLowerCase();
    if (variantToLayout[normalized]) return variantToLayout[normalized];
    if (layoutKeys.includes(normalized)) return normalized;
    fail('Argument --variant must be v1|v2|v3 or landing-a|landing-b|landing-c');
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

  return {
    ...context,
    layoutKey,
    layoutPath,
    layoutTemplate: readFileSync(layoutPath, 'utf8'),
    selectedTemplate,
  };
}
