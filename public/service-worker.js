const mainCache = 'sw-cache-v1';
const mainCacheAssets = [
  '/',
  '/projects',
  '/styles/style.css',
  '/js/main.js',
  '/img/jeff.webp',
  '/img/Zaandam.webp',
  '/offline',
];

// This code opens the cache with the specified mainCache, 
// and then caches all the assets specified in the mainCacheAssets array.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(mainCache)
    .then((cache) =>{
      return cache.addAll(mainCacheAssets)
    })
  )
});

// This code checks if the requested asset is in the cache,
// and if it is,  it serves the cached response and updates the cache with a fresh copy from the network in the background.
// If it is not in the cache, it returns the asset from the network.
self.addEventListener('fetch' , (event) => {
  event.respondWith(
    caches.match(event.request)
    .then((cachedResponse) => {
      if(cachedResponse){
        event.waitUntil(
          fetch(event.request)
          .then((response) =>{
            caches.open(mainCache)
            .then((cache) =>{
              cache.put(event.request, response.clone())
            })
          })
          .catch((error) =>{
            console.log('kon de cache niet updaten' + error)
          })
        );
        // return the cached response
        return cachedResponse;
      }
      // return the response from the network
      return fetch(event.request)
      .then((response) =>{
        const clonedResponse = response.clone();
        caches.open(mainCache).then((cache) =>{
          cache.put(event.request, clonedResponse)
        });
        return response;
      }).catch(() =>{
        // if the request is for a navigation to a new page,
        // show the offline page
        if(event.request.mode === 'navigate'){
          return caches.match('/offline')
        }
      });
    }))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
    .then((cacheNames) =>{
      return Promise.all(
        cacheNames.map((cacheName) =>{
          if(cacheName !== mainCache){
            console.log('Service worker: clearing old cache: ' + cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    })
  )
});