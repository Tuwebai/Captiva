import { loadStructuredPack, fail, runNodeScript } from './lib/demo-factory/premium-workflow.mjs';

function parseArgs(argv) {
  return {
    includeOptional: argv.includes('--include-optional'),
    force: argv.includes('--force'),
  };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const pack = loadStructuredPack('scripts/contracts/demo-tier1-pack.json', 'tier1');
  const demos = pack.tier1.filter((entry) => options.includeOptional || entry.status === 'required');

  if (demos.length === 0) {
    fail('No tier-1 demos selected.');
  }

  demos.forEach((entry) => {
    const args = [entry.key];
    if (options.force) args.push('--force');
    runNodeScript('scripts/generate-demo-tier1.mjs', args);
  });

  console.log(`ok Generated ${demos.length} tier-1 demo(s).`);
}

main();
