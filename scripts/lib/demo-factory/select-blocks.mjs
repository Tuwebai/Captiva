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
  const approvedBlockMap = new Map(
    context.blockRegistry.blocks
      .filter((entry) => entry.status === 'approved')
      .map((entry) => [entry.id, entry]),
  );

  const blockTemplates = { ...placeholderMap };

  context.selectedTemplate.sections.forEach((blockId) => {
    const block = approvedBlockMap.get(blockId);
    if (!block) fail(`Approved block "${blockId}" not found in block-registry.json`);

    const compatible = !Array.isArray(block.compatibleTemplates) || block.compatibleTemplates.includes(context.selectedTemplate.id);
    if (!compatible) fail(`Block "${blockId}" is not compatible with template "${context.selectedTemplate.id}"`);

    const blockPath = resolve(blocksRoot, block.file);
    if (!existsSync(blockPath)) fail(`Block template not found: ${blockPath}`);

    blockTemplates[block.placeholder] = readFileSync(blockPath, 'utf8');
  });

  return { ...context, blockTemplates };
}
