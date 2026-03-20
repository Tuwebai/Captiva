import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const demosManifestPath = resolve(rootDir, 'demos/manifest.json');
const publicDemosPath = resolve(rootDir, 'public/demos');

type DemoManifestItem = {
  slug: string;
  folderName?: string;
  publicSlug?: string;
};

type DemoManifestFile = {
  demos?: DemoManifestItem[];
};

function normalizeDemoKey(value: string) {
  try {
    return decodeURIComponent(value).trim().replace(/^\/+|\/+$/g, '').toLowerCase();
  } catch {
    return String(value).trim().replace(/^\/+|\/+$/g, '').toLowerCase();
  }
}

function buildAliasToCanonicalMap(demos: DemoManifestItem[]) {
  const aliasToCanonical = new Map<string, string>();

  demos.forEach((item) => {
    const canonical = normalizeDemoKey(item.slug);
    if (!canonical) return;

    [
      item.publicSlug,
      item.folderName,
      item.folderName?.replace(/\s+/g, '-'),
      item.folderName?.replace(/\s+/g, ''),
    ]
      .filter(Boolean)
      .forEach((alias) => {
        const normalizedAlias = normalizeDemoKey(String(alias));
        if (normalizedAlias && normalizedAlias !== canonical) {
          aliasToCanonical.set(normalizedAlias, canonical);
        }
      });
  });

  return aliasToCanonical;
}

function demoProxyDevPlugin(): Plugin {
  return {
    name: 'captiva-demo-proxy-dev',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || req.method !== 'GET') {
          next();
          return;
        }

        const parsedUrl = new URL(req.url, 'http://localhost');
        const pathname = parsedUrl.pathname.replace(/\/+$/, '');
        if (!pathname.startsWith('/demo/')) {
          next();
          return;
        }

        const slug = normalizeDemoKey(pathname.slice('/demo/'.length));
        if (!slug) {
          res.statusCode = 302;
          res.setHeader('Location', '/captiva/demos');
          res.end();
          return;
        }

        if (!existsSync(demosManifestPath)) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end('Missing manual demos manifest at demos/manifest.json.');
          return;
        }

        const manifest = JSON.parse(readFileSync(demosManifestPath, 'utf8')) as DemoManifestFile;
        const demos = manifest.demos ?? [];
        const aliasToCanonical = buildAliasToCanonicalMap(demos);
        const canonicalSlug = aliasToCanonical.get(slug) ?? slug;
        const demo = demos.find((item) => item.slug === canonicalSlug);

        if (!demo) {
          res.statusCode = 302;
          res.setHeader('Location', '/captiva/demos');
          res.end();
          return;
        }

        if (canonicalSlug !== slug) {
          res.statusCode = 301;
          res.setHeader('Location', `/demo/${canonicalSlug}`);
          res.end();
          return;
        }

        const publicSlug = demo.publicSlug;

        if (!publicSlug) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end('Demo public slug is missing in demos/manifest.json.');
          return;
        }

        const demoIndexPath = resolve(publicDemosPath, publicSlug, 'index.html');
        if (!existsSync(demoIndexPath)) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end('Demo not found in public assets under public/demos.');
          return;
        }

        const html = readFileSync(demoIndexPath, 'utf8');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), demoProxyDevPlugin()],
  server: {
    port: 5173,
  },
});
