const CACHE_NAME = "hotline-cache-v1";
const urlsToCache = [
  "/hotline/",
  "/hotline/index.html",
  "/hotline/manifest.json",
  "/hotline/icon-192.png",
  "/hotline/icon-512.png"
];

// نصب: فایل‌ها را در کش ذخیره کن
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("📦 Caching app shell...");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// فعال‌سازی: کش‌های قدیمی را پاک کن
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("🧹 Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// واکشی: اول از کش، اگر نبود از شبکه
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // اگر در کش بود، بده
      if (response) {
        return response;
      }
      // اگر نبود از شبکه بگیر
      return fetch(event.request);
    })
  );
});
