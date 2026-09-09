"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    __lenis?: any;
  }
}

/** Height of the fixed navbar — anchors stop just below it. */
const NAV_OFFSET = -80;

/** Ease-out-quart: fast departure, long gentle settle. Reads as "premium". */
const anchorEase = (t: number) => 1 - Math.pow(1 - t, 4);

export function scrollToHash(hash: string, duration = 1.6) {
  if (!hash || hash === "#") return false;
  const targetId = hash.startsWith("#") ? hash : `#${hash}`;
  let el: Element | null = null;
  try {
    el = document.querySelector(targetId);
  } catch {
    return false;
  }
  if (!el) return false;

  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: NAV_OFFSET, duration, easing: anchorEase });
  } else {
    // Fallback for native smooth scroll
    const y = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
  return true;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const retryTimeoutRef = useRef<number | null>(null);

  // ---- Boot Lenis + global anchor interception ----
  useEffect(() => {
    let lenis: any = null;
    let raf = 0;
    let alive = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduced) {
      import("lenis").then(({ default: Lenis }) => {
        if (!alive) return;
        lenis = new (Lenis as any)({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.7,
        });
        window.__lenis = lenis;

        const animate = (time: number) => {
          lenis?.raf(time);
          raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);
      });
    }

    // Delegated click handler — catches every anchor on every page.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      if (a.target && a.target !== "_self") return;

      const href = a.getAttribute("href");
      if (!href) return;

      // Same-page anchor: "#contact"
      if (href.startsWith("#") && href.length > 1) {
        if (scrollToHash(href)) {
          e.preventDefault();
          window.history.replaceState(null, "", href);
        }
        return;
      }

      // Home-page anchor from the home page: "/#contact"
      if (href.startsWith("/#") && (window.location.pathname === "/" || pathname === "/")) {
        const hash = href.slice(1);
        if (scrollToHash(hash)) {
          e.preventDefault();
          window.history.replaceState(null, "", hash);
        }
      }
    };

    const onHashChange = () => {
      if (window.location.hash) {
        scrollToHash(window.location.hash);
      }
    };

    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      alive = false;
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
      cancelAnimationFrame(raf);
      lenis?.destroy();
      window.__lenis = undefined;
    };
  }, [pathname]);

  // ---- On route change: honour the hash, else reset to top ----
  useEffect(() => {
    const handleNavigationScroll = () => {
      const hash = window.location.hash;

      if (!hash || hash.length < 2) {
        // No hash: scroll directly to top
        window.__lenis?.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
        return;
      }

      // Target section might need multiple frame checks if lazy/animating
      let tries = 0;
      let frame = 0;
      const attempt = () => {
        if (scrollToHash(hash, 1.8)) return;
        if (tries++ < 70) {
          frame = requestAnimationFrame(attempt);
        }
      };

      // Slight timeout to let page transition and DOM hydration finish
      if (retryTimeoutRef.current) window.clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = window.setTimeout(attempt, 200);
    };

    handleNavigationScroll();

    return () => {
      if (retryTimeoutRef.current) window.clearTimeout(retryTimeoutRef.current);
    };
  }, [pathname]);

  return <>{children}</>;
}
