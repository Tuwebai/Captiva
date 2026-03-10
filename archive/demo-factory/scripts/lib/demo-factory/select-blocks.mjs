import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { blocksRoot, fail } from './config.mjs';

const placeholderMap = {
  BLOCK_HERO: '',
  BLOCK_FEATURES: '',
  BLOCK_METHODOLOGY: '',
  BLOCK_SERVICES: '',
  BLOCK_PLANS: '',
  BLOCK_EXPERIENCE: '',
  BLOCK_GALLERY: '',
  BLOCK_TESTIMONIALS: '',
  BLOCK_TESTIMONIALS_CAROUSEL: '',
  BLOCK_FAQ: '',
  BLOCK_CTA: '',
  BLOCK_CONTACT_SPLIT: '',
  BLOCK_FOOTER: '',
};

export function selectBlocks(context) {
  const allBlocks = context.blockRegistry.blocks;
  const approvedEnterpriseBlocks = allBlocks.filter(
    (entry) => entry.status === 'approved' && (entry.tier ?? 'enterprise') === 'enterprise',
  );
  const approvedBaseBlockMap = new Map(
    approvedEnterpriseBlocks
      .filter((entry) => !entry.baseId)
      .map((entry) => [entry.id, entry]),
  );
  const allBlockMap = new Map(allBlocks.map((entry) => [entry.id, entry]));
  const variantBlockMap = new Map(
    approvedEnterpriseBlocks
      .filter((entry) => entry.baseId && entry.variantKey)
      .map((entry) => [`${entry.baseId}:${entry.variantKey}`, entry]),
  );

  const blockTemplates = { ...placeholderMap };

  context.selectedTemplate.sections.forEach((blockId) => {
    const baseVariant = variantBlockMap.get(`${blockId}:${context.variantKey}`);
    const approvedBaseBlock = approvedBaseBlockMap.get(blockId);
    const anyRegisteredBase = allBlockMap.get(blockId);
    const block = baseVariant ?? approvedBaseBlock;

    if (!block) {
      if (anyRegisteredBase?.status === 'deprecated') {
        fail(`Block "${blockId}" is deprecated and requires an approved enterprise variant for "${context.variantKey}".`);
      }
      fail(`Approved block "${blockId}" not found in block-registry.json`);
    }

    const compatible = !Array.isArray(block.compatibleTemplates) || block.compatibleTemplates.includes(context.selectedTemplate.id);
    if (!compatible) fail(`Block "${blockId}" is not compatible with template "${context.selectedTemplate.id}"`);

    const blockPath = resolve(blocksRoot, block.file);
    if (!existsSync(blockPath)) fail(`Block template not found: ${blockPath}`);

    blockTemplates[block.placeholder] = readFileSync(blockPath, 'utf8');
  });

  return { ...context, blockTemplates };
}
