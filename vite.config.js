import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
var rootDir = fileURLToPath(new URL('.', import.meta.url));
var demosManifestPath = resolve(rootDir, 'demos/manifest.json');
var publicDemosPath = resolve(rootDir, 'public/demos');
function normalizeDemoKey(value) {
    try {
        return decodeURIComponent(value).trim().replace(/^\/+|\/+$/g, '').toLowerCase();
    }
    catch (_a) {
        return String(value).trim().replace(/^\/+|\/+$/g, '').toLowerCase();
    }
}
function buildAliasToCanonicalMap(demos) {
    var aliasToCanonical = new Map();
    demos.forEach(function (item) {
        var _a, _b;
        var canonical = normalizeDemoKey(item.slug);
        if (!canonical)
            return;
        [
            item.publicSlug,
            item.folderName,
            (_a = item.folderName) === null || _a === void 0 ? void 0 : _a.replace(/\s+/g, '-'),
            (_b = item.folderName) === null || _b === void 0 ? void 0 : _b.replace(/\s+/g, ''),
        ]
            .filter(Boolean)
            .forEach(function (alias) {
            var normalizedAlias = normalizeDemoKey(String(alias));
            if (normalizedAlias && normalizedAlias !== canonical) {
                aliasToCanonical.set(normalizedAlias, canonical);
            }
        });
    });
    return aliasToCanonical;
}
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
                var slug = normalizeDemoKey(pathname.slice('/demo/'.length));
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
                var manifest = JSON.parse(readFileSync(demosManifestPath, 'utf8'));
                var demos = (_a = manifest.demos) !== null && _a !== void 0 ? _a : [];
                var aliasToCanonical = buildAliasToCanonicalMap(demos);
                var canonicalSlug = (_b = aliasToCanonical.get(slug)) !== null && _b !== void 0 ? _b : slug;
                var demo = demos.find(function (item) { return item.slug === canonicalSlug; });
                if (!demo) {
                    res.statusCode = 302;
                    res.setHeader('Location', '/captiva/demos');
                    res.end();
                    return;
                }
                if (canonicalSlug !== slug) {
                    res.statusCode = 301;
                    res.setHeader('Location', "/demo/".concat(canonicalSlug));
                    res.end();
                    return;
                }
                var publicSlug = demo.publicSlug;
                if (!publicSlug) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    res.end('Demo public slug is missing in demos/manifest.json.');
                    return;
                }
                var demoIndexPath = resolve(publicDemosPath, publicSlug, 'index.html');
                if (!existsSync(demoIndexPath)) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    res.end('Demo not found in public assets under public/demos.');
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
export default defineConfig(function (_a) {
    var _b;
    var mode = _a.mode;
    var env = loadEnv(mode, rootDir, 'VITE_');
    return {
        plugins: [react(), demoProxyDevPlugin()],
        define: {
            __CAPTIVA_GA4_ID__: JSON.stringify((_b = env.VITE_GA4_ID) !== null && _b !== void 0 ? _b : ''),
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks: function (id) {
                        if (id.includes('node_modules/react/') || id.includes('\\node_modules\\react\\') || id.includes('node_modules/react-dom/') || id.includes('\\node_modules\\react-dom\\')) {
                            return 'react-vendor';
                        }
                        if (id.includes('node_modules/react-router/') ||
                            id.includes('\\node_modules\\react-router\\') ||
                            id.includes('node_modules/react-router-dom/') ||
                            id.includes('\\node_modules\\react-router-dom\\')) {
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
