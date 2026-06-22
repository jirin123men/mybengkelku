const CACHE_NAME = "mybengkel-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/dashboard.html",
  "/pelanggan.html",
  "/kendaraan.html",
  "/servis.html",
  "/sparepart.html",
  "/transaksi.html",
  "/laporan.html",
  "/firebase.js",
  "/offline-db.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
