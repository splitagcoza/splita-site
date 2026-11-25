"use client";

import { useEffect, useRef, useState } from "react";

export default function PwaUpdatePrompt() {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const reloaded = useRef(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let active = true;

    const observeWaitingWorker = (reg: ServiceWorkerRegistration) => {
      const worker = reg.installing;
      if (!worker) return;

      worker.addEventListener("statechange", () => {
        if (active && worker.state === "installed" && navigator.serviceWorker.controller) {
          setRegistration(reg);
          setUpdateAvailable(true);
        }
      });
    };

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((reg) => {
        if (!active) return;

        setRegistration(reg);
        if (reg.waiting) setUpdateAvailable(true);
        observeWaitingWorker(reg);
        reg.addEventListener("updatefound", () => observeWaitingWorker(reg));
        void reg.update();
      })
      .catch(() => {
        // The site remains usable if service worker registration is unavailable.
      });

    const refreshOnVisibility = () => {
      if (document.visibilityState === "visible") {
        navigator.serviceWorker.getRegistration("/").then((reg) => reg?.update());
      }
    };

    const handleControllerChange = () => {
      if (!reloaded.current) {
        reloaded.current = true;
        window.location.reload();
      }
    };

    document.addEventListener("visibilitychange", refreshOnVisibility);
    navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange);

    return () => {
      active = false;
      document.removeEventListener("visibilitychange", refreshOnVisibility);
      navigator.serviceWorker.removeEventListener("controllerchange", handleControllerChange);
    };
  }, []);

  const applyUpdate = () => {
    const waitingWorker = registration?.waiting;
    if (!waitingWorker) {
      window.location.reload();
      return;
    }
    waitingWorker.postMessage({ type: "SKIP_WAITING" });
  };

  if (!updateAvailable) return null;

  return (
    <div
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-[#1B4D3E] p-4 text-white shadow-2xl sm:inset-x-auto sm:right-5"
      role="status"
      aria-live="polite"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">A new SPLITA update is ready</p>
        <p className="mt-0.5 text-xs text-white/75">Refresh to get the latest improvements.</p>
      </div>
      <button
        type="button"
        onClick={applyUpdate}
        className="min-h-11 shrink-0 rounded-lg bg-[#C9920A] px-4 py-2 text-sm font-semibold text-[#2C1810] transition-colors hover:bg-[#C9920A]/90"
      >
        Update
      </button>
    </div>
  );
}
