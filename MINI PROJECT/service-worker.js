
const CACHE_NAME = 'shiru-cache-v1';
const urlsToCache = [
    '/index.html',
    '/styles.css',
    '/scripts.js',
    '/images/background.jpj',
    '/images/maths.svg',
    '/images/mic.svg',
    '/images/review.svg',
    '/images/SHIRU LOGO.png',
    '/images/shiru.webp',
    '/images/Slogo.png',


];


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching files...');
                return cache.addAll(urlsToCache);
            })
    );
});


self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            }).catch(() => caches.match('/offline.html'))
    );
});


self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cache => cache !== CACHE_NAME)
                    .map(cache => caches.delete(cache))
            );
        })
    );
});