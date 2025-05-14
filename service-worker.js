const CACHE_NAME = 'hotline-cache-v1';
const urlsToCache = [
  '/hotline/',
  '/hotline/index.html',
  '/hotline/manifest.json',
  '/hotline/icon-192.png',
  '/hotline/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
