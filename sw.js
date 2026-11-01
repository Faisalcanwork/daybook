/* Daybook service worker: keeps the app on the device so it opens instantly and works with no internet.
   The page itself is fetched from the network first (so a new version is picked up on its own) and falls back to the saved copy
   when offline or slow. Nothing here needs to be edited when the app changes. */
const CACHE = 'daybook-app-3';   // a new name makes phones drop the old saved copies, including old icons
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg', 'icon-v2-192.png', 'icon-v2-512.png', 'icon-v2-maskable-512.png', 'apple-touch-icon-v2.png'];

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
/* Icons and other files: show the saved copy at once, but always fetch a fresh one in the background, so a changed icon appears on the next visit. */
async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  const fresh = fetch(req).then((res) => { if (res.ok) cache.put(req, res.clone()); return res; }).catch(() => null);
  return hit || (await fresh) || Response.error();
}
