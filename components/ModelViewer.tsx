"use client";

import { useEffect, useRef, useState } from "react";
import type { Hotspot } from "@/lib/hotspots";

/** Minimal typed surface of the <model-viewer> web component we use. */
interface ModelViewerElement extends HTMLElement {
  cameraOrbit: string;
  cameraTarget: string;
  autoRotate: boolean;
  src: string;
}

type ModelViewerAttributes = React.DetailedHTMLProps<
  React.HTMLAttributes<ModelViewerElement>,
  ModelViewerElement
> & {
  src?: string;
  alt?: string;
  poster?: string;
  "camera-controls"?: boolean;
  "auto-rotate"?: boolean;
  "camera-orbit"?: string;
  "camera-target"?: string;
  "min-camera-orbit"?: string;
  "max-camera-orbit"?: string;
  "field-of-view"?: string;
  "environment-image"?: string;
  "tone-mapping"?: string;
  "shadow-intensity"?: string;
  "shadow-softness"?: string;
  exposure?: string;
  loading?: "auto" | "lazy" | "eager";
  reveal?: "auto" | "interaction" | "manual";
  "touch-action"?: string;
};

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerAttributes;
    }
  }
}

const DEFAULT_CAMERA_ORBIT = "35deg 62deg 0.85m";
const DEFAULT_CAMERA_TARGET = "0m 0.03m 0m";

export interface ModelViewerProps {
  src: string;
  alt: string;
  poster?: string;
  /** Start with auto-rotate enabled (honors prefers-reduced-motion). */
  autoRotate?: boolean;
  /** Only mount the viewer once it is near the viewport. */
  lazy?: boolean;
  /** Show the Reset view / auto-rotate controls. */
  showControls?: boolean;
  /** Numbered annotation pins rendered inside the 3D scene. */
  hotspots?: Hotspot[];
  /** Show the "Drag to rotate / Pinch to zoom" hints. */
  showHints?: boolean;
  className?: string;
}

type Status = "idle" | "loading" | "ready" | "error";

export default function ModelViewer({
  src,
  alt,
  poster,
  autoRotate = true,
  lazy = true,
  showControls = true,
  hotspots,
  showHints = true,
  className = "",
}: ModelViewerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<ModelViewerElement | null>(null);
  const [inView, setInView] = useState(() => {
    if (!lazy) return true;
    if (typeof window === "undefined") return false;
    // No IntersectionObserver (very old browser): load immediately.
    return typeof IntersectionObserver === "undefined";
  });
  const [libLoaded, setLibLoaded] = useState(false);
  const [libFailed, setLibFailed] = useState(false);
  const [viewerReady, setViewerReady] = useState(false);
  const [viewerFailed, setViewerFailed] = useState(false);
  const [rotating, setRotating] = useState<boolean>(() => {
    if (typeof window !== "undefined" && autoRotate) {
      return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });
  const [retryKey, setRetryKey] = useState(0);
  const [labelsOn, setLabelsOn] = useState(true);
  const showLabels = labelsOn && hotspots && hotspots.length > 0;

  const status: Status = viewerFailed || libFailed
    ? "error"
    : viewerReady
      ? "ready"
      : inView
        ? "loading"
        : "idle";

  // 1. Lazy-mount when near the viewport.
  useEffect(() => {
    if (!lazy || inView) return;
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lazy, inView]);

  // 2. Load the web-component library client-side, once visible.
  useEffect(() => {
    if (!inView || libLoaded || libFailed) return;
    let cancelled = false;
    import("@google/model-viewer")
      .then(() => {
        if (!cancelled) setLibLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setLibFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [inView, libLoaded, libFailed]);

  // 3. Wire load / error events on the element.
  useEffect(() => {
    const el = viewerRef.current;
    if (!el || !libLoaded) return;
    const onLoad = () => setViewerReady(true);
    const onError = () => setViewerFailed(true);
    el.addEventListener("load", onLoad);
    el.addEventListener("error", onError);
    return () => {
      el.removeEventListener("load", onLoad);
      el.removeEventListener("error", onError);
    };
  }, [libLoaded, retryKey]);

  const resetView = () => {
    const el = viewerRef.current;
    if (el) {
      el.cameraOrbit = DEFAULT_CAMERA_ORBIT;
      el.cameraTarget = DEFAULT_CAMERA_TARGET;
    }
  };
  const retry = () => {
    setLibFailed(false);
    setViewerFailed(false);
    setViewerReady(false);
    setRetryKey((k) => k + 1);
  };

  const busy = status === "idle" || status === "loading";

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden rounded-[24px] bg-[#f1ebe0] ${className}`}
    >
      {inView && libLoaded && status !== "error" && (
        <model-viewer
          key={retryKey}
          ref={viewerRef as React.Ref<ModelViewerElement>}
          src={src}
          alt={alt}
          poster={poster}
          camera-controls
          auto-rotate={rotating}
          camera-orbit={DEFAULT_CAMERA_ORBIT}
          camera-target={DEFAULT_CAMERA_TARGET}
          min-camera-orbit="auto auto 0.3m"
          max-camera-orbit="auto auto 2m"
          field-of-view="30deg"
          environment-image="neutral"
          tone-mapping="neutral"
          shadow-intensity="1"
          shadow-softness="0.5"
          exposure="1.1"
          touch-action="pan-y"
          loading="eager"
          reveal="auto"
          className="h-full w-full"
          style={{ minHeight: "100%" }}
          aria-label={alt}
        >
          {showLabels &&
            hotspots!.map((h) => (
              <button
                key={h.id}
                type="button"
                slot={`hotspot-${h.id}`}
                data-position={h.position.join(" ")}
                data-normal={h.normal.join(" ")}
                data-visibility-attribute="visible"
                className="mv-hotspot"
                aria-label={`${h.n}. ${h.title}: ${h.body}`}
              >
                <span aria-hidden="true" className="mv-hotspot-dot">
                  {h.n}
                </span>
                <span aria-hidden="true" className="mv-hotspot-line" />
                <span aria-hidden="true" className="mv-hotspot-tag">
                  {h.title}
                </span>
              </button>
            ))}
        </model-viewer>
      )}

      {/* Loading state */}
      {busy && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#f1ebe0]"
          role="status"
          aria-live="polite"
        >
          <span
            className="h-8 w-8 animate-spin rounded-full border-2 border-stone-900/10 border-t-stone-800"
            aria-hidden="true"
          />
          <p className="text-sm text-stone-500">Preparing the studio…</p>
        </div>
      )}

      {/* Error state */}
      {status === "error" && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#f1ebe0] p-6 text-center"
          role="alert"
        >
          <p className="text-sm font-medium text-stone-700">
            Model could not be loaded.
          </p>
          <p className="text-sm text-stone-500">
            Check your connection and try again.
          </p>
          <button
            type="button"
            onClick={retry}
            className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Controls */}
      {showControls && status === "ready" && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2">
          <button
            type="button"
            onClick={resetView}
            className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm ring-1 ring-stone-900/10 backdrop-blur transition-colors hover:bg-white"
          >
            Reset view
          </button>
          {hotspots && hotspots.length > 0 && (
            <button
              type="button"
              onClick={() => setLabelsOn((v) => !v)}
              aria-pressed={labelsOn}
              className={`rounded-full px-4 py-2 text-sm font-medium shadow-sm ring-1 backdrop-blur transition-colors ${
                labelsOn
                  ? "bg-stone-900 text-white ring-stone-900 hover:bg-stone-700"
                  : "bg-white/90 text-stone-700 ring-stone-900/10 hover:bg-white"
              }`}
            >
              Labels
            </button>
          )}
          <button
            type="button"
            onClick={() => setRotating((r) => !r)}
            aria-pressed={rotating}
            className={`rounded-full px-4 py-2 text-sm font-medium shadow-sm ring-1 backdrop-blur transition-colors ${
              rotating
                ? "bg-stone-900 text-white ring-stone-900 hover:bg-stone-700"
                : "bg-white/90 text-stone-700 ring-stone-900/10 hover:bg-white"
            }`}
          >
            {rotating ? "Pause rotation" : "Auto-rotate"}
          </button>
        </div>
      )}

      {/* Interaction hints */}
      {showHints && status === "ready" && (
        <p className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/80 px-3 py-1 text-xs text-stone-500 backdrop-blur">
          Drag to rotate&nbsp;&middot;&nbsp;Pinch to zoom
        </p>
      )}
    </div>
  );
}
