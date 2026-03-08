import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const demosManifestPath = resolve(rootDir, 'src/config/demos.generated.json');
const publicDemosPath = resolve(rootDir, 'public/demos');

type DemoManifestItem = {
  slug: string;
  publicSlug: string;
};

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

        const slug = pathname.slice('/demo/'.length).trim().toLowerCase();
        if (!slug) {
          res.statusCode = 302;
          res.setHeader('Location', '/captiva/demos');
          res.end();
          return;
        }

        if (!existsSync(demosManifestPath)) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end('Missing demos manifest. Run npm run generate:demos');
          return;
        }

        const manifest = JSON.parse(readFileSync(demosManifestPath, 'utf8')) as DemoManifestItem[];
        const demo = manifest.find((item) => item.slug === slug);

        if (!demo) {
          res.statusCode = 302;
          res.setHeader('Location', '/captiva/demos');
          res.end();
          return;
        }

        const demoIndexPath = resolve(publicDemosPath, demo.publicSlug, 'index.html');
        if (!existsSync(demoIndexPath)) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end('Demo not found in public assets. Run npm run generate:demos');
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
