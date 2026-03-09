import {
  fail,
  loadStructuredPack,
  parsePackCommandArgs,
  runPremiumWorkflow,
} from './lib/demo-factory/premium-workflow.mjs';

function main() {
  const options = parsePackCommandArgs(process.argv.slice(2));
  const pack = loadStructuredPack('scripts/contracts/demo-pilot-pack.json', 'pilots');

  if (options.list || !options.key) {
    console.log('Available pilot demos:');
    pack.pilots.forEach((pilot) => {
      console.log(`- ${pilot.key} (${pilot.status}) -> demos/${pilot.name}`);
    });

    if (!options.key) {
      console.log('\nUsage: npm run generate-demo -- <pilot-key> [--force]');
    }
    return;
  }

  const pilot = pack.pilots.find((item) => item.key === options.key);
  if (!pilot) {
    fail(`Unknown pilot "${options.key}". Use --list to inspect available pilots.`);
  }

  runPremiumWorkflow(pilot, { force: options.force });
}

main();
