"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Runs the CSS marquee only while visible — cuts idle GPU/main-thread work. */
export function Marquee({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "25% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex w-max whitespace-nowrap ${className} ${
        active ? "animate-marquee will-change-transform" : ""
      }`}
    >
      {children}
    </div>
  );
}
