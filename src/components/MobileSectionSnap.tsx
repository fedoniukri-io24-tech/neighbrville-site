"use client";

import { useEffect } from "react";

/**
 * Mobile only. After a flick settles, align the nearest screen-tall block
 * to the top. Tall sections (experiences, community, open join, FAQ) are
 * left alone so their own scroll isn't yanked.
 */
export function MobileSectionSnap() {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (desktop.matches || reduce.matches) return;

    let locking = false;
    let touching = false;
    let timer = 0;

    const settle = () => {
      if (locking) return;
      const root = document.documentElement;
      if (
        root.classList.contains("menu-open") ||
        root.classList.contains("join-open") ||
        root.classList.contains("join-focus")
      ) {
        return;
      }

      const blocks = [...document.querySelectorAll<HTMLElement>(".snap-block")];
      if (!blocks.length) return;

      const vh = window.innerHeight;
      const y = window.scrollY;
      const mid = y + vh * 0.45;

      let current: HTMLElement | null = null;
      for (const block of blocks) {
        const top = block.offsetTop;
        const bottom = top + block.offsetHeight;
        if (mid >= top && mid < bottom) {
          current = block;
          break;
        }
      }
      if (!current) return;

      const height = current.offsetHeight;
      // Only blocks that actually fit one screen. Taller ones scroll freely.
      if (height > vh * 1.08 || height < vh * 0.72) return;

      const isFirst = current === blocks[0];
      const target = isFirst ? 0 : current.offsetTop;
      if (Math.abs(y - target) < 8) return;

      locking = true;
      window.scrollTo({ top: target, behavior: "smooth" });
      window.setTimeout(() => {
        locking = false;
      }, 480);
    };

    const onTouchStart = () => {
      touching = true;
      window.clearTimeout(timer);
    };
    const onTouchEnd = () => {
      touching = false;
    };
    const onScroll = () => {
      if (touching || locking) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, 160);
    };

    window.addEventListener("scrollend", settle);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scrollend", settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return null;
}
