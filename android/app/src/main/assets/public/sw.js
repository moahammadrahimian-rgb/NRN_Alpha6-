const CACHE="alpha6-v100";

self.addEventListener("install",event=>{
  event.waitUntil(
    caches.open(CACHE).then(cache=>
      cache.addAll(["/","/css/mobile.css","/js/app.js"])
    )
  );
});

self.addEventListener("fetch",event=>{
  event.respondWith(
    caches.match(event.request).then(cached=>
      cached || fetch(event.request)
    )
  );
});
