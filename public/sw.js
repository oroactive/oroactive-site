const CACHE_NAME = "oroactive-site-static-v4";
const STATIC_ASSETS = ["/icon.svg", "/oroactive-logo.png", "/manifest.webmanifest"];
const SENSITIVE_PREFIXES = ["/api/", "/dashboard", "/login"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;
  if (SENSITIVE_PREFIXES.some((prefix) => requestUrl.pathname.startsWith(prefix))) return;
  if (event.request.method !== "GET") return;

  if (event.request.destination === "document") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const clone = response.clone();
        if (response.ok && ["style", "script", "image", "font", "document"].includes(event.request.destination)) {
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
