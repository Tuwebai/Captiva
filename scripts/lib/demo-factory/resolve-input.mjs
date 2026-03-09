import { join, resolve } from 'node:path';
import { loadDesignContract } from '../demo-quality-gates.mjs';
import {
  blockRegistryPath,
  categoryAssets,
  categoryTheme,
  contractsRoot,
  demosRoot,
  fail,
  isKebabCase,
  loadJson,
  previewPlaceholderPath,
  resolveCategory,
  resolveContentContractWithIndustry,
  resolveProfileKey,
  templateRegistryPath,
} from './config.mjs';

export function parseArgs(argv) {
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

export function validateInput(input) {
  for (const required of ['category', 'name', 'title', 'description']) {
    if (typeof input[required] !== 'string' || input[required].trim().length === 0) {
      fail(`Argument --${required} is required.`);
    }
  }
  if (!isKebabCase(input.name)) fail('Argument --name must be kebab-case.');
  if (!isKebabCase(input.category)) fail('Argument --category must be kebab-case.');
  if (input.industry && !isKebabCase(input.industry)) fail('Argument --industry must be kebab-case.');
  if (input.template && !isKebabCase(input.template)) fail('Argument --template must be kebab-case.');
  if (input.goal && !isKebabCase(input.goal)) fail('Argument --goal must be kebab-case.');
  if (input.status && !isKebabCase(input.status)) fail('Argument --status must be kebab-case.');
  if (input.tier && !isKebabCase(input.tier)) fail('Argument --tier must be kebab-case.');
  if (input.title.length < 12 || input.title.length > 120) fail('Argument --title must contain 12-120 chars.');
  if (input.description.length < 30 || input.description.length > 320) {
    fail('Argument --description must contain 30-320 chars.');
  }
}

export function resolveInputContext(args) {
  const templateCategory = resolveCategory(args.category);
  const profileKey = resolveProfileKey(args.industry, args.category);
  const designContract = loadDesignContract(process.cwd());
  const contentContract = resolveContentContractWithIndustry(args.industry, templateCategory);
  const templateRegistry = loadJson(templateRegistryPath);
  const blockRegistry = loadJson(blockRegistryPath);
  const demoDir = join(demosRoot, args.name);
  const forceOverwrite = ['true', '1', 'yes'].includes(String(args.force ?? '').toLowerCase());
  const requestedIndustry = (args.industry ?? args.name.split('-')[0]).trim().toLowerCase();

  return {
    args,
    blockRegistry,
    contentContract,
    designContract,
    demoDir,
    forceOverwrite,
    previewPlaceholderPath,
    profileKey,
    requestedIndustry,
    templateCategory,
    templateRegistry,
    themeConfig: categoryTheme[profileKey] ?? categoryTheme.business,
    assets: categoryAssets[profileKey] ?? categoryAssets.business,
    contractsRoot,
  };
}
