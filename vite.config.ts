import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';
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

type PublicEnv = {
  VITE_GA4_ID?: string;
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, 'VITE_') as PublicEnv;

  return {
    plugins: [react(), tailwindcss(), demoProxyDevPlugin()],
    define: {
      __CAPTIVA_GA4_ID__: JSON.stringify(env.VITE_GA4_ID ?? ''),
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react/') || id.includes('\\node_modules\\react\\') || id.includes('node_modules/react-dom/') || id.includes('\\node_modules\\react-dom\\')) {
              return 'react-vendor';
            }

            if (
              id.includes('node_modules/react-router/') ||
              id.includes('\\node_modules\\react-router\\') ||
              id.includes('node_modules/react-router-dom/') ||
              id.includes('\\node_modules\\react-router-dom\\')
            ) {
              return 'router-vendor';
            }

            return undefined;
          },
        },
      },
    },
    server: {
      port: 5173,
    },
  };
});
