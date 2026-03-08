import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function toHexColor(value) {
  const hex = String(value || '').trim().replace(';', '');
  if (!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex)) return null;
  if (hex.length === 4) {
    const [, r, g, b] = hex;
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return hex.toLowerCase();
}

function hexToRgb(hex) {
  const normalized = toHexColor(hex);
  if (!normalized) return null;
  return {
    r: Number.parseInt(normalized.slice(1, 3), 16),
    g: Number.parseInt(normalized.slice(3, 5), 16),
    b: Number.parseInt(normalized.slice(5, 7), 16),
  };
}

function relativeLuminance({ r, g, b }) {
  const normalize = (channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  const red = normalize(r);
  const green = normalize(g);
  const blue = normalize(b);
  return red * 0.2126 + green * 0.7152 + blue * 0.0722;
}

function contrastRatio(foreground, background) {
  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);
  if (!fg || !bg) return null;
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function extractRootCssVars(html) {
  const styleMatch = html.match(/:root\s*\{([\s\S]*?)\}/i);
  if (!styleMatch) return {};

  const vars = {};
  const declarationRegex = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match = declarationRegex.exec(styleMatch[1]);
  while (match) {
    vars[`--${match[1]}`] = match[2].trim();
    match = declarationRegex.exec(styleMatch[1]);
  }
  return vars;
}

function extractWordsCount(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return text.length > 0 ? text.split(' ').length : 0;
}

function collectLinks(html) {
  const result = [];
  const regex = /(?:href|src)\s*=\s*"([^"]+)"/gi;
  let match = regex.exec(html);
  while (match) {
    result.push(match[1].trim());
    match = regex.exec(html);
  }
  return result;
}

function isValidResourceReference(value) {
  if (!value) return false;
  if (value.startsWith('#')) return true;
  if (value.startsWith('/')) return true;
  if (value.startsWith('./')) return true;
  if (value.startsWith('../')) return true;
  if (/^https?:\/\//i.test(value)) return true;
  if (/^mailto:/i.test(value)) return true;
  if (/^tel:/i.test(value)) return true;
  return false;
}

export function loadDesignContract(projectRoot = process.cwd()) {
  const contractPath = resolve(projectRoot, 'scripts/contracts/design-contract.json');
  return JSON.parse(readFileSync(contractPath, 'utf8'));
}

export function evaluateDemoQuality({ html, meta, designContract, demoName = 'unknown' }) {
  const errors = [];
  const warnings = [];
  const gates = designContract.qualityGates ?? {};

  const sectionMatches = html.match(/<section\b/gi) ?? [];
  if (sectionMatches.length < (gates.minSections ?? 0)) {
    errors.push(
      `${demoName}: expected at least ${gates.minSections} sections, found ${sectionMatches.length}.`,
    );
  }

  for (const sectionId of designContract.requiredSections ?? []) {
    const sectionRegex = new RegExp(`id="${sectionId}"`, 'i');
    if (!sectionRegex.test(html)) {
      errors.push(`${demoName}: missing required section id="${sectionId}".`);
    }
  }

  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  if (gates.requiresSingleH1 && h1Count !== 1) {
    errors.push(`${demoName}: expected exactly one <h1>, found ${h1Count}.`);
  }

  if (gates.requiresCtaAboveFold) {
    const heroBlockMatch = html.match(/<section[^>]*class="[^"]*hero[^"]*"[\s\S]*?<\/section>/i);
    const hasHeroCta = heroBlockMatch ? /href="#contacto"|id="contacto"/i.test(heroBlockMatch[0]) : false;
    if (!hasHeroCta) {
      errors.push(`${demoName}: primary CTA is not visible in hero (above the fold).`);
    }
  }

  const wordCount = extractWordsCount(html);
  if (wordCount < (gates.minWordCount ?? 0)) {
    errors.push(`${demoName}: content density too low (${wordCount} words).`);
  }
  if (wordCount > (gates.maxWordCount ?? Number.MAX_SAFE_INTEGER)) {
    warnings.push(`${demoName}: high word count (${wordCount} words), verify scannability.`);
  }

  const faqItems = (html.match(/class="faq-item"/gi) ?? []).length;
  if (faqItems < (gates.faqMinItems ?? 0)) {
    errors.push(`${demoName}: FAQ requires at least ${gates.faqMinItems} items, found ${faqItems}.`);
  }

  const socialSignals = ['id="testimonios-carrusel"', 'id="marcas"', 'id="testimonios"'].filter((token) =>
    html.includes(token),
  );
  if (socialSignals.length < (gates.socialProofMinBlocks ?? 0)) {
    errors.push(`${demoName}: requires at least ${gates.socialProofMinBlocks} social proof blocks.`);
  }

  if (gates.requiresTestimonialsInfiniteCarousel) {
    const hasTrack = /class="marquee-track"/i.test(html);
    const hasAnimation = /@keyframes\s+marqueeScroll/i.test(html) && /marqueeScroll/i.test(html);
    const hasClonedSlides = (html.match(/aria-hidden="true"/gi) ?? []).length >= 3;
    if (!hasTrack || !hasAnimation || !hasClonedSlides) {
      errors.push(`${demoName}: testimonials infinite horizontal carousel is missing or incomplete.`);
    }
  }

  if (gates.requiresValidLinksAndImages) {
    const invalidReferences = collectLinks(html).filter((value) => !isValidResourceReference(value));
    if (invalidReferences.length > 0) {
      errors.push(`${demoName}: found invalid links/assets (${invalidReferences.slice(0, 3).join(', ')}).`);
    }
  }

  if (gates.requiresCompleteMetadata) {
    for (const field of designContract.metadataRequiredFields ?? []) {
      const value = meta?.[field];
      if (typeof value !== 'string' || value.trim().length === 0) {
        errors.push(`${demoName}: metadata missing required field "${field}".`);
      }
    }
  }

  const cssVars = extractRootCssVars(html);
  const ratio = contrastRatio(cssVars['--text'], cssVars['--bg']);
  const minRatio = designContract.designTokens?.minContrastRatioTextOnBackground ?? 4.5;
  if (ratio !== null && ratio < minRatio) {
    errors.push(`${demoName}: contrast ratio too low (${ratio.toFixed(2)} < ${minRatio}).`);
  }
  if (ratio === null) {
    warnings.push(`${demoName}: could not compute contrast ratio from --text/--bg.`);
  }

  return { errors, warnings, stats: { wordCount, faqItems, contrastRatio: ratio } };
}
