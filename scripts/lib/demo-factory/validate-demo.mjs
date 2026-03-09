import { evaluateDemoQuality } from '../demo-quality-gates.mjs';
import { fail } from './config.mjs';

export function validateDemo(context) {
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
