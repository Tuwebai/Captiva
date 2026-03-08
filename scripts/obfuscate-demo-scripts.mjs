import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const publicDemosRoot = resolve(process.cwd(), 'public/demos');

const WATERMARK_STYLE =
  'position:fixed;left:50%;top:50%;transform:translate(-50%,-50%) rotate(-18deg);z-index:2147483647;color:rgba(230,238,255,0.05);font:700 clamp(22px,3vw,44px)/1.15 Inter,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;pointer-events:none;user-select:none;white-space:nowrap;';

function obfuscateProtectionScript(source) {
  return source
    .replace(/Demo generada por Captiva/gi, 'Captiva Demo')
    .replace(/document\.createElement\((['"])a\1\)/g, 'document.createElement("div")')
    .replace(/,\s*e\.href="[^"]*"/g, '')
    .replace(/,\s*e\.target="[^"]*"/g, '')
    .replace(/,\s*e\.rel="[^"]*"/g, '')
    .replace(/badge\.href\s*=\s*['"][^'"]*['"];\s*/g, '')
    .replace(/badge\.target\s*=\s*['"][^'"]*['"];\s*/g, '')
    .replace(/badge\.rel\s*=\s*['"][^'"]*['"];\s*/g, '')
    .replace(/style\.cssText\s*=\s*(['"])[\s\S]*?\1(?=,|;)/g, `style.cssText="${WATERMARK_STYLE}"`)
    .replace(
      /\}\)\(\)\s*$/,
      ';document.querySelectorAll("img").forEach((image)=>image.setAttribute("draggable","false"));})()',
    )
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function processDemoHtml(html) {
  return html.replace(
    /<script data-captiva-protection="true">([\s\S]*?)<\/script>/gi,
    (_full, scriptContent) =>
      `<script data-captiva-protection="true">${obfuscateProtectionScript(scriptContent)}</script>`,
  );
}

function main() {
  if (!existsSync(publicDemosRoot)) {
    console.log('No public/demos directory found. Skipping obfuscation.');
    return;
  }

  const folders = readdirSync(publicDemosRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory());
  let processed = 0;

  folders.forEach((entry) => {
    const indexPath = resolve(publicDemosRoot, entry.name, 'index.html');
    if (!existsSync(indexPath)) return;

    const current = readFileSync(indexPath, 'utf8');
    const next = processDemoHtml(current);
    if (next !== current) {
      writeFileSync(indexPath, next, 'utf8');
      processed += 1;
    }
  });

  console.log(`Obfuscated demo protection scripts in ${processed} demo file(s).`);
}

main();
