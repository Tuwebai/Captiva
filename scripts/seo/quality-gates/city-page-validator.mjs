import { buildUniquenessFingerprint, estimateUniqueWordCount } from './content-uniqueness.mjs';
import { CITY_PAGE_SEO_RULES } from './seo-rules.mjs';

export function validateCityPage(entry) {
  const issues = [];

  const uniqueWordCount = estimateUniqueWordCount(
    entry.title,
    entry.description,
    entry.metaDescription,
    entry.localHook,
    entry.intro,
  );

  if (uniqueWordCount < CITY_PAGE_SEO_RULES.minimumUniqueWordCount) {
    issues.push(`unique-word-count:${uniqueWordCount}`);
  }

  if (!entry.description || entry.description.length < CITY_PAGE_SEO_RULES.minimumDescriptionLength) {
    issues.push('description-too-short');
  }

  const hasValidTitlePattern = CITY_PAGE_SEO_RULES.requiredTitlePatterns.every((pattern) => pattern.test(entry.title));
  if (!hasValidTitlePattern) {
    issues.push('title-not-localized');
  }

  if (!entry.metaDescription || entry.metaDescription.trim() === entry.description.trim()) {
    issues.push('meta-description-not-varied');
  }

  const hasSectionVariation = CITY_PAGE_SEO_RULES.requiredSectionVariationFields.some((field) => {
    const value = entry[field];
    return typeof value === 'string' && value.trim().length > 0;
  });
  if (!hasSectionVariation) {
    issues.push('missing-section-variation');
  }

  const fingerprint = buildUniquenessFingerprint({
    niche: entry.niche.slug,
    city: entry.city.slug,
    title: entry.title,
    description: entry.description,
    metaDescription: entry.metaDescription,
    sectionVariant: entry.sectionVariant,
  });

  if (!fingerprint.includes(entry.city.slug)) {
    issues.push('fingerprint-missing-city');
  }

  return {
    valid: issues.length === 0,
    issues,
    fingerprint,
    uniqueWordCount,
  };
}
