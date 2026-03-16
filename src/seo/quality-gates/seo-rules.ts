export const CITY_PAGE_SEO_RULES = {
  minimumUniqueWordCount: 45,
  minimumDescriptionLength: 120,
  requiredTitlePatterns: [/en\s+[A-Za-zÁÉÍÓÚáéíóúÑñ\s-]+$/, /para\s+/i],
  requiredSectionVariationFields: ['localHook', 'sectionVariant'] as const,
} as const;

export type CityPageSeoRules = typeof CITY_PAGE_SEO_RULES;
