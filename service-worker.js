const CACHE_NAME = "yume-cache-v1";
const urlsToCache = [
  "index.html",
  "manifest.json",
  "offline.html"
];

// インストール：必要ファイルをキャッシュ
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// アクティベート：古いキャッシュ削除
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// フェッチ：キャッシュ優先、失敗時は offline.html
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        return caches.match("offline.html");
      });
    })
  );
});
