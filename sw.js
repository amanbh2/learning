/**
 * AMAN.LEARN - Service Worker for Offline PWA Support
 * Pre-caches shell assets and caches markdown notes on access.
 */

const CACHE_NAME = 'aman-learn-v1';
const SHELL_ASSETS = [
    './',
    'index.html',
    'res/favicon.png',
    'res/icon-192.png',
    'res/icon-512.png',
    'manifest.webmanifest',
    'css/style.css',
    'css/vendor/hljs-github-dark.min.css',
    'css/vendor/hljs-github.min.css',
    'fonts/inter-var-latin.woff2',
    'fonts/jetbrains-mono-var-latin.woff2',
    'js/config.js',
    'js/app.js',
    'js/vendor/marked.min.js',
    'js/vendor/highlight.min.js',
    'js/vendor/minisearch.min.js'
];

// Install: cache application shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(SHELL_ASSETS).catch((err) => {
                console.warn('Some shell assets failed to cache:', err);
            });
        }).then(() => self.skipWaiting())
    );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch: Stale-while-revalidate or Network-first with cache fallback
self.addEventListener('fetch', (event) => {
    const request = event.request;

    // Only handle GET requests from same origin or relative
    if (request.method !== 'GET') return;

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                // Fetch fresh in background
                fetch(request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, networkResponse);
                        });
                    }
                }).catch(() => {});
                return cachedResponse;
            }

            return fetch(request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200) {
                    return networkResponse;
                }
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(request, responseToCache);
                });
                return networkResponse;
            }).catch(() => {
                // Offline fallback if note or page not in cache
                if (request.headers.get('accept') && request.headers.get('accept').includes('text/html')) {
                    return caches.match('index.html');
                }
            });
        })
    );
});
