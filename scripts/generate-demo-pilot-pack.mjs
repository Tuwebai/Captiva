import { loadStructuredPack, fail, runNodeScript } from './lib/demo-factory/premium-workflow.mjs';

function parseArgs(argv) {
  return {
    includeOptional: argv.includes('--include-optional'),
    force: argv.includes('--force'),
  };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const pack = loadStructuredPack('scripts/contracts/demo-pilot-pack.json', 'pilots');
  const pilots = pack.pilots.filter((pilot) => options.includeOptional || pilot.status === 'required');

  if (pilots.length === 0) {
    fail('No pilot demos selected.');
  }

  pilots.forEach((pilot) => {
    const args = [pilot.key];
    if (options.force) args.push('--force');
    runNodeScript('scripts/generate-demo-premium.mjs', args);
  });

  console.log(`ok Generated ${pilots.length} pilot demo(s).`);
}

main();
