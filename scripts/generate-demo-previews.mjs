import { createReadStream, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const projectRoot = process.cwd();
const demosRoot = resolve(projectRoot, 'demos');
const stateDir = resolve(projectRoot, '.cache');
const statePath = resolve(stateDir, 'demo-previews-state.json');
const host = '127.0.0.1';
const port = 4177;

const mimeByExtension = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

function parseArgs(argv) {
  const demoArg = argv.find((arg) => arg.startsWith('--demo='))?.split('=')[1] ?? '';
  const demoNames = demoArg
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    all: argv.includes('--all'),
    width: Number(argv.find((arg) => arg.startsWith('--width='))?.split('=')[1] ?? 1600),
    height: Number(argv.find((arg) => arg.startsWith('--height='))?.split('=')[1] ?? 1000),
    waitMs: Number(argv.find((arg) => arg.startsWith('--wait-ms='))?.split('=')[1] ?? 3500),
    demoNames,
  };
}

function loadState() {
  if (!existsSync(statePath)) return {};
  try {
    return JSON.parse(readFileSync(statePath, 'utf8'));
  } catch {
    return {};
  }
}

function saveState(state) {
  mkdirSync(stateDir, { recursive: true });
  writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
}

function demoSignature(folderPath) {
  const indexPath = join(folderPath, 'index.html');
  const metaPath = join(folderPath, 'meta.json');
  const indexStat = statSync(indexPath);
  const metaStat = statSync(metaPath);
  return `${indexStat.mtimeMs}:${indexStat.size}:${metaStat.mtimeMs}:${metaStat.size}`;
}

function getDemoFolders() {
  if (!existsSync(demosRoot)) return [];
  return readdirSync(demosRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      name: entry.name,
      path: join(demosRoot, entry.name),
    }))
    .filter((entry) => existsSync(join(entry.path, 'index.html')) && existsSync(join(entry.path, 'meta.json')));
}

function serveStaticFile(reqPath, response) {
  let rewrittenPath = reqPath;
  if (reqPath.startsWith('/preview/')) {
    rewrittenPath = reqPath.replace('/preview/', '/demos/');
  } else if (reqPath.startsWith('/demo/')) {
    rewrittenPath = reqPath.replace('/demo/', '/demos/');
  }
  const safePath = normalize(rewrittenPath).replace(/^(\.\.[/\\])+/, '');
  const hasRootPrefix = safePath.startsWith('/') || safePath.startsWith('\\');
  const absolutePath = resolve(projectRoot, hasRootPrefix ? `.${safePath}` : safePath);

  if (!absolutePath.toLowerCase().startsWith(projectRoot.toLowerCase())) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  let filePath = absolutePath;
  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, 'index.html');
  }

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }

  const mimeType = mimeByExtension[extname(filePath).toLowerCase()] ?? 'application/octet-stream';
  response.writeHead(200, { 'Content-Type': mimeType, 'Cache-Control': 'no-store' });
  createReadStream(filePath).pipe(response);
}

function startStaticServer() {
  const server = createServer((request, response) => {
    const reqUrl = new URL(request.url ?? '/', `http://${host}:${port}`);
    serveStaticFile(reqUrl.pathname, response);
  });

  return new Promise((resolveServer, rejectServer) => {
    server.on('error', rejectServer);
    server.listen(port, host, () => resolveServer(server));
  });
}

async function loadPlaywright() {
  try {
    return await import('playwright');
  } catch {
    console.error('x Missing dependency "playwright".');
    console.error('  Run: npm i -D playwright');
    console.error('  Then: npx playwright install chromium');
    process.exit(1);
  }
}

function folderToUrl(folderName) {
  const encoded = folderName
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/');
  return `http://${host}:${port}/demo/${encoded}/index.html?preview=1`;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const state = loadState();
  const demos = getDemoFolders();
  const filteredDemos =
    options.demoNames.length > 0
      ? demos.filter((demo) => options.demoNames.includes(demo.name))
      : demos;

  if (filteredDemos.length === 0) {
    console.log('No demos found.');
    return;
  }

  const queue = filteredDemos
    .map((demo) => {
      const signature = demoSignature(demo.path);
      const previous = state[demo.name]?.signature;
      const previewPath = join(demo.path, 'preview.png');
      const shouldGenerate = options.all || !existsSync(previewPath) || previous !== signature;
      return { ...demo, signature, shouldGenerate };
    })
    .filter((demo) => demo.shouldGenerate);

  if (queue.length === 0) {
    console.log('All demo previews are up to date.');
    return;
  }

  const playwright = await loadPlaywright();
  const server = await startStaticServer();
  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: options.width, height: options.height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  try {
    for (const demo of queue) {
      const url = folderToUrl(demo.name);
      const outputPath = join(demo.path, 'preview.png');
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(Math.max(0, options.waitMs));
      let ready = false;
      for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
          await page.waitForFunction(
            () => {
              const body = document.body;
              if (!body) return false;
              const text = (body.innerText || '').trim();
              const hasMain = Boolean(document.querySelector('main'));
              const hasHero = Boolean(document.querySelector('.hero, #hero, h1'));
              return hasMain && hasHero && text.length > 80;
            },
            { timeout: 10000 },
          );
          ready = true;
          break;
        } catch {
          await page.waitForTimeout(1500);
        }
      }
      if (!ready) {
        console.warn(`! preview warning: ${demo.name} did not report ready state, capturing fallback screenshot.`);
      }
      await page.screenshot({
        path: outputPath,
        fullPage: false,
        type: 'png',
      });
      state[demo.name] = {
        signature: demo.signature,
        generatedAt: new Date().toISOString(),
      };
      console.log(`ok ${demo.name} -> preview.png`);
    }
  } finally {
    await page.close();
    await context.close();
    await browser.close();
    await new Promise((resolveClose) => server.close(resolveClose));
  }

  saveState(state);
  console.log(`Generated ${queue.length} demo preview(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
