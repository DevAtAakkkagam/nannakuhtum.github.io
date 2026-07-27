/*
 * Offline layer for games.aakkagam.com.
 *
 * This one worker covers the whole domain. games.aakkagam.com is assembled from
 * four independent GitHub Pages sites — the landing page at /, align3 at
 * /align3/, ostomachion at /ostomachion/, senet at /senet/ — but they share a
 * single origin, and a worker served from the origin root gets a default scope
 * of /. So it controls the game pages too.
 *
 * Every page registers this same worker — the landing index.html here, and the
 * hand-authored index.html in each game repo. That is deliberately not one
 * worker per site: a worker's scope is limited by its own script path, not by
 * the page that registers it, so a page at /align3/ can register /sw.js and
 * claim scope /. One implementation, one set of caches shared across games, and a
 * visitor arriving on any page from a search result is covered on that first
 * visit rather than only if they happen to pass through the landing page.
 *
 * The game repos therefore reference a file this repo serves. That dependency
 * fails safe in both directions: if /sw.js is missing the registration just
 * rejects and the page is unaffected, and under a game's `npm run dev` there is
 * no /sw.js at all, so dev never runs a stale worker.
 *
 * Staying updatable is the job of the strategies, not of a version bump:
 *
 *   navigations    network-first    online always gets the newest HTML, which
 *                                   is what points at the newest build assets;
 *                                   offline falls back to the last good copy
 *   /assets/*      cache-first      Vite content-hashes these, so a changed
 *                                   file is a changed URL and a cache hit can
 *                                   never be stale
 *   everything     stale-while-     icons, og images, robots.txt — instant,
 *   else           revalidate       refreshed in the background
 *
 * Because of that split, shipping a new game build needs no change here. VERSION
 * only exists to discard everything when the cache layout itself changes; bump
 * it and the activate handler drops the old caches.
 *
 * GitHub Pages serves this file with Cache-Control: max-age=600, which is why
 * the page registers it with updateViaCache: 'none' — otherwise an updated
 * worker could sit behind a stale HTTP cache entry for ten minutes.
 */

const VERSION = 'v1';

const SHELL = `shell-${VERSION}`;
const BUILD = `build-${VERSION}`;
const MEDIA = `media-${VERSION}`;
const CURRENT = [SHELL, BUILD, MEDIA];

// Every game deploy emits new hashed filenames and orphans the previous set.
// Nothing else evicts them, so the build cache is trimmed oldest-first.
const BUILD_MAX = 240;

// The landing page carries its CSS inline and loads no webfonts, so / is the
// whole of the page itself; the games cache themselves on first visit. The
// rest is the install path — a manifest the browser can't read offline can't
// be installed offline, and it pulls in every icon it names.
//
// Each entry names the cache its strategy will later read from. Precaching
// into the wrong one is invisible while online and a 504 the moment you go
// offline, since the lookup never consults the cache the entry landed in.
const PRECACHE = [
  { url: '/', cache: SHELL },
  { url: '/manifest.webmanifest', cache: MEDIA },
  { url: '/icon.svg', cache: MEDIA },
  { url: '/icon-192.png', cache: MEDIA },
  { url: '/icon-512.png', cache: MEDIA },
  { url: '/icon-maskable-512.png', cache: MEDIA },
  { url: '/apple-touch-icon.png', cache: MEDIA },
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      // Deliberately not cache.addAll: that rejects as a unit, and one bad URL
      // would mean no offline support at all rather than slightly less of it.
      await Promise.all(
        PRECACHE.map(async (entry) => {
          try {
            const cache = await caches.open(entry.cache);
            await cache.add(new Request(entry.url, { cache: 'reload' }));
          } catch (err) {
            /* keep going; a missing extra is better than a failed install */
          }
        })
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.filter((name) => !CURRENT.includes(name)).map((name) => caches.delete(name))
      );
      await self.clients.claim();
    })()
  );
});

// A page that registers the worker has already fetched itself and its assets
// over the network, before there was any worker to intercept them — so nothing
// from that first visit is in the cache. Without this the page would have to be
// visited twice before it worked offline, which is exactly the case a search
// result lands in. The page sends the URLs it actually used, so only the font
// subsets it really needed get stored rather than every subset Vite emitted.
self.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || data.type !== 'WARM') return;
  event.waitUntil(warm(data.page, data.urls || []));
});

async function warm(page, urls) {
  const jobs = urls.map((url) => warmOne(url, null, undefined));
  // The page itself is a navigation, so it belongs with the other navigations,
  // and it is the one URL here worth revalidating rather than taking from the
  // HTTP cache — everything under /assets/ is content-hashed and immutable.
  if (page) jobs.push(warmOne(page, SHELL, 'no-cache'));
  await Promise.all(jobs);
  await trim(BUILD, BUILD_MAX);
}

async function warmOne(raw, forcedCache, cacheMode) {
  let url;
  try {
    url = new URL(raw, self.location.origin);
  } catch (err) {
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (url.pathname === '/sw.js') return;

  const name = forcedCache || (url.pathname.includes('/assets/') ? BUILD : MEDIA);
  const cache = await caches.open(name);
  if (await cache.match(url.href)) return;

  try {
    const response = await fetch(url.href, cacheMode ? { cache: cacheMode } : undefined);
    if (storable(response)) await cache.put(url.href, response);
  } catch (err) {
    /* nothing to warm if the network is already gone */
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(event, request));
    return;
  }

  // Both games build to dist/assets/, served at /<game>/assets/. Everything
  // Vite puts there carries a content hash in its filename.
  if (url.pathname.includes('/assets/')) {
    event.respondWith(cacheFirst(event, request));
    return;
  }

  event.respondWith(staleWhileRevalidate(event, request));
});

async function networkFirst(event, request) {
  const cache = await caches.open(SHELL);
  try {
    const fresh = await fetch(request);
    if (storable(fresh)) event.waitUntil(cache.put(request, fresh.clone()));
    return fresh;
  } catch (err) {
    const hit = await cache.match(request, { ignoreSearch: true });
    if (hit) return hit;
    // A game the visitor has never opened has no entry of its own. The landing
    // page is a better answer than a browser error — its links still work, and
    // any game already cached is reachable from it.
    const landing = await cache.match('/', { ignoreSearch: true });
    if (landing) return landing;
    return offlinePage();
  }
}

async function cacheFirst(event, request) {
  const cache = await caches.open(BUILD);
  const hit = await cache.match(request);
  if (hit) return hit;

  const fresh = await fetch(request);
  if (storable(fresh)) {
    event.waitUntil(
      cache.put(request, fresh.clone()).then(() => trim(BUILD, BUILD_MAX))
    );
  }
  return fresh;
}

async function staleWhileRevalidate(event, request) {
  const cache = await caches.open(MEDIA);
  const hit = await cache.match(request);

  const network = fetch(request)
    .then((fresh) => {
      if (storable(fresh)) return cache.put(request, fresh.clone()).then(() => fresh);
      return fresh;
    })
    .catch(() => undefined);

  if (hit) {
    event.waitUntil(network);
    return hit;
  }

  const fresh = await network;
  if (fresh) return fresh;

  // Safety net for anything precached into a different cache than the one this
  // strategy reads, so a routing mistake degrades to a hit instead of a 504.
  const anywhere = await caches.match(request, { ignoreSearch: true });
  return anywhere || new Response('', { status: 504, statusText: 'Offline' });
}

function storable(response) {
  // response.redirected is the important one: a redirected response replayed
  // from the cache for a navigation is rejected by the browser, which would
  // break the page it was meant to save. GitHub Pages redirects /align3 to
  // /align3/, so this is reachable, not theoretical.
  return Boolean(
    response && response.ok && response.type === 'basic' && !response.redirected
  );
}

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  const excess = keys.length - max;
  if (excess <= 0) return;
  // keys() resolves in insertion order, so the front of the list is oldest.
  await Promise.all(keys.slice(0, excess).map((key) => cache.delete(key)));
}

function offlinePage() {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Offline — Aakkagam Games</title>
<style>
  :root { color-scheme: light dark; --ink:#2b2320; --paper:#faf6f0; --muted:#6b5f58; }
  @media (prefers-color-scheme: dark) {
    :root { --ink:#ece5df; --paper:#1d1917; --muted:#a3968e; }
  }
  body {
    font-family: Georgia, 'Times New Roman', serif; background: var(--paper);
    color: var(--ink); line-height: 1.6; margin: 0;
    display: grid; place-items: center; min-height: 100vh; padding: 2rem;
  }
  main { max-width: 26rem; text-align: center; }
  p { color: var(--muted); }
</style>
</head>
<body>
  <main>
    <h1>No connection</h1>
    <p>This page hasn't been saved to your device yet. Open it once while online and it will work offline afterwards.</p>
  </main>
</body>
</html>`;
  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
