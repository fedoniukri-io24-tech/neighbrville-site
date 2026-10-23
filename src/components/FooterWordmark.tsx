"use client";

import { useLayoutEffect, useRef, useState } from "react";

export function FooterWordmark() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [box, setBox] = useState({ scale: 1, height: 0 });

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return;

    let frame = 0;

    const fit = () => {
      const parentWidth = wrap.clientWidth;
      if (!parentWidth) return;

      const prevTransform = text.style.transform;
      text.style.transform = "scale(1)";
      const naturalWidth = text.scrollWidth;
      const naturalHeight = text.offsetHeight;
      text.style.transform = prevTransform;

      if (!naturalWidth) return;

      const scale = parentWidth / naturalWidth;
      const height = Math.ceil(naturalHeight * scale);

      setBox((current) =>
        Math.abs(current.scale - scale) < 0.001 && current.height === height
          ? current
          : { scale, height },
      );
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };

    fit();
    if (document.fonts?.ready) {
      void document.fonts.ready.then(schedule);
    }

    const observer = new ResizeObserver(schedule);
    observer.observe(wrap);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative mt-4 w-full overflow-hidden leading-none"
      style={{ height: box.height || undefined }}
    >
      <p
        ref={textRef}
        aria-label="Neighbrville"
        className="absolute left-0 top-0 whitespace-nowrap font-playfair text-[min(299.28px,48vw)] font-normal uppercase italic leading-[0.72] tracking-[-0.07em] text-chocolate"
        style={{
          transform: `scale(${box.scale})`,
          transformOrigin: "left top",
          paddingInline: "0.08em",
        }}
      >
        NEIGHBRVILLE
      </p>
    </div>
  );
}
