const CACHE_NAME = "yume-cache-v1";
const urlsToCache = [
  "/",
  "index.html",
  "manifest.json",
  "offline.html"
];

// インストール：キャッシュ登録
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
          .then(cache => cache.addAll(urlsToCache))
