import { composeSections } from './lib/demo-factory/compose-sections.mjs';
import { pathToFileURL } from 'node:url';
import { parseArgs, resolveInputContext, validateInput } from './lib/demo-factory/resolve-input.mjs';
import { persistDemo } from './lib/demo-factory/persist-demo.mjs';
import { renderDemo } from './lib/demo-factory/render-demo.mjs';
import { selectBlocks } from './lib/demo-factory/select-blocks.mjs';
import { selectTemplate } from './lib/demo-factory/select-template.mjs';
import { validateDemo } from './lib/demo-factory/validate-demo.mjs';

export function runPipeline(rawArgs) {
  validateInput(rawArgs);

  const input = resolveInputContext(rawArgs);
  const selectedTemplate = selectTemplate(input);
  const selectedBlocks = selectBlocks(selectedTemplate);
  const composed = composeSections(selectedBlocks);
  const rendered = renderDemo(composed);
  const validated = validateDemo(rendered);

  persistDemo(validated);
  return validated;
}

function main() {
  const rawArgs = parseArgs(process.argv.slice(2));
  const result = runPipeline(rawArgs);

  console.log(`ok Demo created at demos/${result.args.name}`);
  console.log(`  - layout: ${result.layoutKey}`);
  console.log(`  - category profile: ${result.templateCategory}`);
  console.log(`  - template: ${result.selectedTemplate.id}`);
  console.log(`  - goal: ${result.goal}`);
  console.log(`  - quality gates: passed (${result.quality.stats.wordCount} words)`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
