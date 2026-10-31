/* Daybook service worker: keeps the app on the device so it opens instantly and works with no internet.
   The page itself is fetched from the network first (so a new version is picked up on its own) and falls back to the saved copy
   when offline or slow. Nothing here needs to be edited when the app changes. */
const CACHE = 'daybook-app';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;     // sync calls to Google go straight to the network
  const isPage = req.mode === 'navigate' || /\/(index\.html)?$/.test(new URL(req.url).pathname);
  e.respondWith(isPage ? networkFirst(req) : cacheFirst(req));
});
async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await Promise.race([fetch(req), new Promise((_, no) => setTimeout(() => no(new Error('slow')), 3000))]);
    if (res.ok) cache.put('index.html', res.clone());
    return res;
  } catch {
    return (await cache.match('index.html')) || (await cache.match('./')) || Response.error();
  }
}
async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) cache.put(req, res.clone());
  return res;
}
