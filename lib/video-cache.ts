const CACHE_NAME = "portfolio-videos-v1";
const HIGH_PRIORITY_COUNT = 2;

const readyUrls = new Set<string>();
const listeners = new Set<(url: string) => void>();
let activePreloadKey: string | null = null;

export async function preloadVideo(url: string): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    if ("caches" in window) {
      const cache = await caches.open(CACHE_NAME);
      const existing = await cache.match(url);
      if (existing) return;

      const response = await fetch(url);
      if (response.ok) {
        await cache.put(url, response.clone());
      }
      return;
    }

    await fetch(url);
  } catch {
    // Video elements will retry on their own.
  }
}

export async function preloadVideosInOrder(
  urls: string[],
  onVideoReady?: (url: string, index: number) => void
): Promise<void> {
  for (let index = 0; index < urls.length; index++) {
    const url = urls[index];
    await preloadVideo(url);
    readyUrls.add(url);
    onVideoReady?.(url, index);
    listeners.forEach((listener) => listener(url));
  }
}

export function startVideoPreload(
  urls: string[],
  onVideoReady?: (url: string) => void
): void {
  const key = urls.join("|");
  if (activePreloadKey === key) {
    if (onVideoReady) {
      urls.filter((url) => readyUrls.has(url)).forEach(onVideoReady);
      listeners.add(onVideoReady);
    }
    return;
  }

  activePreloadKey = key;
  readyUrls.clear();

  if (onVideoReady) {
    listeners.add(onVideoReady);
  }

  preloadVideosInOrder(urls);
}

export function subscribeToVideoPreload(
  urls: string[],
  onVideoReady: (url: string) => void
): () => void {
  startVideoPreload(urls, onVideoReady);
  return () => listeners.delete(onVideoReady);
}

export function isVideoCached(url: string): boolean {
  return readyUrls.has(url);
}

export function injectVideoPreloadHints(
  urls: string[],
  count = HIGH_PRIORITY_COUNT
): void {
  if (typeof document === "undefined") return;

  urls.slice(0, count).forEach((url, index) => {
    const selector = `link[rel="preload"][href="${CSS.escape(url)}"]`;
    if (document.querySelector(selector)) return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = url;
    if (index === 0) {
      link.setAttribute("fetchpriority", "high");
    }
    document.head.appendChild(link);
  });
}

export function isHighPriorityVideo(index: number): boolean {
  return index < HIGH_PRIORITY_COUNT;
}
