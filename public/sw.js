const APP_VERSION = "2026-11-25-pwa-updates-2";

self.addEventListener("install", () => {
  // Wait for the user to approve activation when an update is available.
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data?.type === "GET_VERSION") {
    event.source?.postMessage({ type: "APP_VERSION", version: APP_VERSION });
  }
});
