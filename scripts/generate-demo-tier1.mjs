import {
  fail,
  loadStructuredPack,
  parsePackCommandArgs,
  runPremiumWorkflow,
} from './lib/demo-factory/premium-workflow.mjs';

function main() {
  const options = parsePackCommandArgs(process.argv.slice(2));
  const pack = loadStructuredPack('scripts/contracts/demo-tier1-pack.json', 'tier1');

  if (options.list || !options.key) {
    console.log('Available tier-1 demos:');
    pack.tier1.forEach((entry) => {
      console.log(`- ${entry.key} (${entry.status}) -> demos/${entry.name}`);
    });

    if (!options.key) {
      console.log('\nUsage: npm run generate:demo:tier1:item -- <tier1-key> [--force]');
    }
    return;
  }

  const entry = pack.tier1.find((item) => item.key === options.key);
  if (!entry) {
    fail(`Unknown tier-1 demo "${options.key}". Use --list to inspect available entries.`);
  }

  runPremiumWorkflow(entry, { force: options.force });
}

main();
