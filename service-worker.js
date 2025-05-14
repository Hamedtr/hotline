self.addEventListener("install", (event) => {
  console.log("✅ Service Worker installed");
  self.skipWaiting(); // فوراً فعال شود
});

self.addEventListener("activate", (event) => {
  console.log("🚀 Service Worker activated");
});

self.addEventListener("fetch", (event) => {
  // این فقط ثبت می‌کند که چه چیزی درخواست شده
  console.log("📡 Fetching:", event.request.url);
});
