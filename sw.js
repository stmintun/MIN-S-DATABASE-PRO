// Change this to your actual repository name on GitHub
const GHPATH = '/van602-app'; 
const APP_PREFIX = 'van602_';
const VERSION = 'version_01';

const URLS = [    
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(APP_PREFIX + VERSION).then((cache) => {
      return cache.addAll(URLS);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== APP_PREFIX + VERSION) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});