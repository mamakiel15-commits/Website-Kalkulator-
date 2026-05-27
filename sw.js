const CACHE_NAME = 'pwa-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Tahap Install: Menyimpan file aset utama ke dalam cache browser
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Menyimpan aset ke cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Tahap Fetch: Mengambil data dari cache jika jaringan offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Kembalikan file dari cache jika ada, jika tidak lakukan request ke internet
        return response || fetch(event.request);
      })
  );
});
