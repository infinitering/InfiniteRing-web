'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "52f1b200ea9af2dc672a13d9908de459",
"index.html": "b8c82ca56d7faea41e42ce54105a4d35",
"/": "b8c82ca56d7faea41e42ce54105a4d35",
"web-canvas_220501.zip": "1534ce57284c4bc0cd09d4dd5c6912ae",
"main.dart.js": "b3b6032d95033e4c30c191fdf7de4767",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"web_220501.zip": "adcfc74456fe3eaaf4b0ed41fc81e6d5",
"manifest.json": "28339fa111bea56066e9af0ee70829d4",
"assets/video/cut480p.mp4": "19cfcfa3c17849b820d3c418191100bc",
"assets/video/login720p.mp4": "dc79c9c3333aa605be49365b84df8403",
"assets/apk/ir.apk": "2c443e4dad6380c05efa10dbd0a1dc6a",
"assets/images/ir_ios.png": "25a5ee9d7a711945ab3949f18c157722",
"assets/images/ir_apk_download.png": "ae5e12294c24d5f6c794dcf73f016e5f",
"assets/images/qrdemo.png": "5169064016405b13c13d0c1ad2630d35",
"assets/images/iphone_edge3.png": "81dfe38cf4eb74c0f735b2dcb9dea8b1",
"assets/images/logo_grey_s.png": "d064f86946ae130d391c4c8f0e590f01",
"assets/images/demophone.png": "1111a4f27f91038742fd4549972390e3",
"assets/images/bg4_g.png": "d81291450f577adaa7a7fe765ac1442e",
"assets/images/bg4_g%25E7%259A%2584%25E5%2589%25AF%25E6%259C%25AC.png": "e61d2b6bce4dffc4cbb729386cb8a340",
"assets/AssetManifest.json": "ad066fc89e056cb385188211c0aa0502",
"assets/loading.gif": "a6cd4c512234b8b546bf806d19cbba5c",
"assets/NOTICES": "ef61da382f4fe2ab51c865553e1d73d1",
"assets/download/InfiniteRing_1.0.0.apk": "85538580f0e2b3345682227bb03a14dd",
"assets/FontManifest.json": "263024f8fcb4a087e19fcb77cb42ff54",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/yahei.ttf": "abf3951c5337e3b0b431005b2f8a9fac",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/assets/video/cut480p.mp4": "19cfcfa3c17849b820d3c418191100bc",
"assets/assets/video/login720p.mp4": "dc79c9c3333aa605be49365b84df8403",
"assets/assets/apk/ir.apk": "2c443e4dad6380c05efa10dbd0a1dc6a",
"assets/assets/images/ir_ios.png": "25a5ee9d7a711945ab3949f18c157722",
"assets/assets/images/ir_apk_download.png": "ae5e12294c24d5f6c794dcf73f016e5f",
"assets/assets/images/qrdemo.png": "5169064016405b13c13d0c1ad2630d35",
"assets/assets/images/iphone_edge3.png": "81dfe38cf4eb74c0f735b2dcb9dea8b1",
"assets/assets/images/logo_grey_s.png": "d064f86946ae130d391c4c8f0e590f01",
"assets/assets/images/demophone.png": "1111a4f27f91038742fd4549972390e3",
"assets/assets/images/bg4_g.png": "d81291450f577adaa7a7fe765ac1442e",
"assets/assets/images/bg4_g%25E7%259A%2584%25E5%2589%25AF%25E6%259C%25AC.png": "e61d2b6bce4dffc4cbb729386cb8a340",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
