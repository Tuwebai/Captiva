import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { evaluateDemoQuality, loadDesignContract } from './lib/demo-quality-gates.mjs';

const demosRoot = resolve(process.cwd(), 'demos');

function parseArgs(argv) {
  const demoArg = argv.find((arg) => arg.startsWith('--demo='))?.split('=')[1] ?? '';
  return demoArg
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function loadDemoTargets(filter) {
  if (!existsSync(demosRoot)) return [];
  const folders = readdirSync(demosRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  if (filter.length === 0) return folders;
  return folders.filter((name) => filter.includes(name));
}

function lintHeadingFlow(html, demoName, errors, warnings) {
  const headings = [...html.matchAll(/<(h[1-6])\b/gi)].map((match) => Number(match[1].slice(1)));
  if (headings.length === 0) {
    errors.push(`${demoName}: no heading flow detected.`);
    return;
  }

  for (let index = 1; index < headings.length; index += 1) {
    if (headings[index] - headings[index - 1] > 1) {
      warnings.push(`${demoName}: heading jump detected (h${headings[index - 1]} -> h${headings[index]}).`);
    }
  }
}

function lintCopyLengths(html, demoName, warnings) {
  const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  const overlyLong = paragraphs.filter((item) => item.split(' ').length > 42).length;
  if (overlyLong > 0) {
    warnings.push(`${demoName}: ${overlyLong} long paragraphs detected; verify scannability.`);
  }
}

function lintRepetition(html, demoName, warnings) {
  const normalized = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
  const sequences = ['solicitar informacion', 'landing', 'conversion', 'contacto'];
  for (const token of sequences) {
    const count = (normalized.match(new RegExp(token, 'g')) ?? []).length;
    if (count > 18) warnings.push(`${demoName}: repetition high for "${token}" (${count}).`);
  }
}

function lintCommercialStructure(html, demoName, errors) {
  const requiredSignals = [
    { key: 'problema', regex: /problema|friccion/i },
    { key: 'solucion', regex: /solucion|metodologia|proceso/i },
    { key: 'prueba social', regex: /testimonios|reseñas|resenas/i },
    { key: 'cta', regex: /cta final|solicitar|whatsapp/i },
  ];
  for (const signal of requiredSignals) {
    if (!signal.regex.test(html)) {
      errors.push(`${demoName}: missing commercial structure signal "${signal.key}".`);
    }
  }
}

function main() {
  const demoFilter = parseArgs(process.argv.slice(2));
  const designContract = loadDesignContract(process.cwd());
  const demos = loadDemoTargets(demoFilter);
  if (demos.length === 0) {
    console.log('No demos found to lint.');
    return;
  }

  const errors = [];
  const warnings = [];

  for (const demoName of demos) {
    const htmlPath = join(demosRoot, demoName, 'index.html');
    const metaPath = join(demosRoot, demoName, 'meta.json');
    if (!existsSync(htmlPath) || !existsSync(metaPath)) {
      errors.push(`${demoName}: missing index.html or meta.json.`);
      continue;
    }

    const html = readFileSync(htmlPath, 'utf8');
    const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
    const forcedLint = demoFilter.includes(demoName);
    const isBuilderDemo = meta?.template === 'builder';
    if (!forcedLint && !isBuilderDemo) {
      warnings.push(`${demoName}: skipped (legacy demo without builder contract).`);
      continue;
    }

    const baseQuality = evaluateDemoQuality({ html, meta, designContract, demoName });
    errors.push(...baseQuality.errors);
    warnings.push(...baseQuality.warnings);

    lintHeadingFlow(html, demoName, errors, warnings);
    lintCopyLengths(html, demoName, warnings);
    lintRepetition(html, demoName, warnings);
    lintCommercialStructure(html, demoName, errors);
  }

  warnings.forEach((message) => console.warn(`! warning: ${message}`));
  if (errors.length > 0) {
    errors.forEach((message) => console.error(`x error: ${message}`));
    process.exit(1);
  }

  console.log(`UX lint passed for ${demos.length} demo(s).`);
}

main();
