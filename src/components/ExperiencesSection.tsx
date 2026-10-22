"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    title: "Pottery for Beginners",
    meta: "Clay & Ceramics · Berlin",
    tag: null,
    detail:
      "Shape clay with neighbors in a shared studio. Materials included — no experience needed.",
    image: "/images/experiences/pottery.png",
    alt: "Hands shaping clay on a pottery wheel",
    rotate: 6,
    left: 108,
    top: 0,
    zIndex: 2,
    line: (
      <>
        Try a new <span className="italic">experience</span>,
      </>
    ),
  },
  {
    title: "Sunday Repair Café",
    meta: "Repair & Sustainability · London",
    tag: null,
    detail:
      "Bring something broken and fix it together — tools, mentors, and good company.",
    image: "/images/experiences/repair-cafe.png",
    alt: "Neighbors repairing items together",
    rotate: -5,
    left: 16,
    top: 104,
    zIndex: 3,
    line: (
      <>
        meet <span className="italic">your</span> people,
      </>
    ),
  },
  {
    title: "Pasta Night with Neighbors",
    meta: "Food & Drink · London",
    tag: "Italian",
    detail:
      "Make fresh pasta from scratch, share a long table, and leave with new recipes and friends.",
    image: "/images/experiences/pasta-night.png",
    alt: "Friends making fresh pasta together",
    rotate: 4,
    left: 0,
    top: 208,
    zIndex: 4,
    line: <>see your neighborhood</>,
  },
  {
    title: "Neighborhood Photo Walk",
    meta: "Visual Arts · Berlin",
    tag: "Beginner-friendly",
    detail:
      "Wander familiar streets with a fresh eye — shoot, share, and see your area differently.",
    image: "/images/experiences/photo-walk.png",
    alt: "Friends walking through a park at sunset",
    rotate: -3,
    left: 72,
    top: 312,
    zIndex: 5,
    line: <span className="italic">differently</span>,
  },
] as const;

const marqueeItems = [
  "Libraries",
  "Studios",
  "Community Centers",
  "Makerspaces",
  "Cafés",
  "Parks",
  "Galleries",
  "Kitchens",
  "Workshops",
  "Neighborhoods",
];

export function ExperiencesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const activeIndex = hovered ?? scrollIndex;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setScrollIndex(experiences.length - 1);
      return;
    }

    let frame = 0;

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;

      if (rect.top > window.innerHeight * 0.55) {
        setScrollIndex(0);
        return;
      }

      if (rect.bottom <= window.innerHeight * 0.2) {
        setScrollIndex(experiences.length - 1);
        return;
      }

      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const progress = total > 0 ? scrolled / total : 1;
      const index = Math.min(
        experiences.length - 1,
        Math.floor(progress * experiences.length),
      );
      setScrollIndex(index);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduceMotion]);

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className={`relative overflow-x-clip bg-chocolate text-cream ${reduceMotion ? "" : "h-[400vh]"}`}
    >
      <div
        className={
          reduceMotion
            ? "flex flex-col overflow-x-clip"
            : "sticky top-0 flex h-dvh flex-col overflow-x-clip overflow-y-hidden"
        }
      >
        <div className="page-shell page-x grid w-full flex-1 grid-cols-1 items-center gap-10 pb-4 pt-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8 lg:pb-2 lg:pt-10">
          <div className="relative z-10 flex h-full max-w-[640px] flex-col justify-between py-2 lg:py-6">
            <div>
              <p className="font-inter text-[11px] uppercase tracking-[0.16em] text-cream sm:text-[12px]">
                Find something that feels like you
              </p>

              <h2 className="mt-6 max-w-full font-playfair text-[clamp(2.1rem,4.5vw,64px)] font-normal uppercase leading-[0.9] tracking-[-0.045em] text-cream">
                {experiences.map((item, index) => {
                  const isActive = activeIndex === index;
                  const isRevealed = index <= scrollIndex;

                  return (
                    <button
                      key={item.title}
                      type="button"
                      className={`block w-full text-left uppercase transition-[opacity,color] duration-300 ease-out sm:whitespace-nowrap ${
                        isActive
                          ? "opacity-100"
                          : isRevealed
                            ? "opacity-35 hover:opacity-70"
                            : "opacity-20"
                      }`}
                      onMouseEnter={() => setHovered(index)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(index)}
                      onBlur={() => setHovered(null)}
                      aria-pressed={isActive}
                    >
                      {item.line}
                    </button>
                  );
                })}
              </h2>
            </div>

            <div className="pt-10 lg:pt-0">
              <p className="max-w-[280px] font-inter text-[13px] leading-[1.25] text-cream/90 sm:text-[14px]">
                Language is part of the experience
                <br />
                Practice while doing something you enjoy
              </p>

              <Link
                href="#waitlist"
                className="mt-5 inline-block font-playfair text-[clamp(1.35rem,2vw,1.85rem)] italic uppercase leading-none tracking-[-0.03em] text-cream underline decoration-[1px] underline-offset-[8px] transition-opacity hover:opacity-80"
              >
                Join the waitlist
              </Link>
            </div>
          </div>

          <div className="relative mx-auto h-[360px] w-full max-w-[720px] overflow-x-clip sm:h-[500px] sm:overflow-visible lg:mx-0 lg:h-[610px] lg:max-w-none">
            <div className="absolute left-1/2 top-0 w-[700px] max-w-[min(100vw-2rem,700px)] origin-top -translate-x-1/2 scale-[0.55] sm:scale-[0.85] lg:left-0 lg:max-w-none lg:origin-top-left lg:translate-x-0 lg:scale-[1.12]">
              <div className="relative h-[560px] w-full">
                {experiences.map((item, index) => {
                  const isRevealed = index <= scrollIndex || hovered === index;
                  const isActive = activeIndex === index && isRevealed;

                  return (
                    <article
                      key={item.title}
                      className={`absolute w-[620px] max-w-none origin-center bg-cream p-4 text-chocolate shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition-[opacity,transform,box-shadow] duration-500 ease-out sm:p-5 ${
                        isRevealed ? "opacity-100" : "pointer-events-none opacity-0"
                      } ${
                        isActive ? "shadow-[0_28px_54px_rgba(0,0,0,0.45)]" : ""
                      }`}
                      style={{
                        left: item.left,
                        top: item.top,
                        zIndex: isActive ? 30 : item.zIndex,
                        transform: isRevealed
                          ? `translateY(0) rotate(${item.rotate}deg) scale(${isActive ? 1.035 : 1})`
                          : `translateY(36px) rotate(${item.rotate}deg) scale(0.98)`,
                      }}
                      onMouseEnter={() => setHovered(index)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(index)}
                      onBlur={() => setHovered(null)}
                      tabIndex={isRevealed ? 0 : -1}
                    >
                      <div className="grid grid-cols-[1.2fr_0.9fr] items-stretch gap-4">
                        <div className="flex min-h-[196px] flex-col py-1">
                          <h3 className="font-inter text-[17px] font-semibold uppercase leading-[1.15] tracking-[0.01em] sm:text-[18px]">
                            {item.title}
                          </h3>
                          <p className="mt-2 font-inter text-[15px] leading-[1.25] text-chocolate/65 sm:text-[16px]">
                            {item.meta}
                          </p>

                          <p
                            className={`overflow-hidden font-inter text-[15px] leading-[1.35] text-chocolate/80 sm:text-[16px] transition-all duration-300 ease-out ${
                              isActive
                                ? "mt-3 max-h-24 opacity-100"
                                : "mt-0 max-h-0 opacity-0"
                            }`}
                          >
                            {item.detail}
                          </p>

                          {item.tag ? (
                            <span className="mt-auto inline-flex w-fit rounded-sm border border-chocolate/50 px-2.5 py-1 font-inter text-[13px] uppercase tracking-[0.04em]">
                              {item.tag}
                            </span>
                          ) : (
                            <span className="mt-auto block h-5" aria-hidden />
                          )}
                        </div>

                        <div className="relative h-full min-h-[196px] overflow-hidden bg-[#ebe4d8]">
                          <Image
                            src={item.image}
                            alt={item.alt}
                            fill
                            sizes="(max-width: 1024px) 320px, 700px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto overflow-hidden pb-5 pt-8 lg:pb-6 lg:pt-12" aria-hidden>
          <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
            {[0, 1].map((copy) => (
              <p
                key={copy}
                className="flex items-center font-playfair text-[clamp(1.6rem,3.4vw,3.15rem)] italic uppercase leading-none tracking-[-0.04em] text-cream"
              >
                {marqueeItems.map((item) => (
                  <span key={`${copy}-${item}`} className="inline-flex items-center">
                    <span className="px-4 sm:px-5">{item}</span>
                    <span>·</span>
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
