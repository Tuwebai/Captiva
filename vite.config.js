import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
var rootDir = fileURLToPath(new URL('.', import.meta.url));
var demosManifestPath = resolve(rootDir, 'src/config/demos.generated.json');
var demoSlugMapPath = resolve(rootDir, 'public/demo-slugs.json');
var publicDemosPath = resolve(rootDir, 'public/demos');
function demoProxyDevPlugin() {
    return {
        name: 'captiva-demo-proxy-dev',
        configureServer: function (server) {
            server.middlewares.use(function (req, res, next) {
                var _a, _b;
                if (!req.url || req.method !== 'GET') {
                    next();
                    return;
                }
                var parsedUrl = new URL(req.url, 'http://localhost');
                var pathname = parsedUrl.pathname.replace(/\/+$/, '');
                if (!pathname.startsWith('/demo/')) {
                    next();
                    return;
                }
                var slug = pathname.slice('/demo/'.length).trim().toLowerCase();
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
                var manifest = JSON.parse(readFileSync(demosManifestPath, 'utf8'));
                var slugMap = existsSync(demoSlugMapPath)
                    ? JSON.parse(readFileSync(demoSlugMapPath, 'utf8'))
                    : {};
                var demo = manifest.find(function (item) { return item.slug === slug; });
                if (!demo) {
                    res.statusCode = 302;
                    res.setHeader('Location', '/captiva/demos');
                    res.end();
                    return;
                }
                var publicSlug = (_a = demo.publicSlug) !== null && _a !== void 0 ? _a : (_b = slugMap.canonicalToPublic) === null || _b === void 0 ? void 0 : _b[slug];
                if (!publicSlug) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    res.end('Demo public slug could not be resolved. Run npm run generate:demos');
                    return;
                }
                var demoIndexPath = resolve(publicDemosPath, publicSlug, 'index.html');
                if (!existsSync(demoIndexPath)) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    res.end('Demo not found in public assets. Run npm run generate:demos');
                    return;
                }
                var html = readFileSync(demoIndexPath, 'utf8');
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
