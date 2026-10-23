"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Marquee } from "./Marquee";

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

const mobilePoses = [
  { x: -18, y: 22, rotate: -10 },
  { x: 18, y: 58, rotate: 9 },
  { x: -12, y: 94, rotate: -5 },
  { x: 12, y: 130, rotate: 4 },
];

const desktopPoses = [
  { x: 64, y: 8, rotate: -6 },
  { x: 8, y: 56, rotate: 5 },
  { x: 78, y: 104, rotate: -3 },
  { x: 22, y: 152, rotate: 3.5 },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

function stackMotion(
  index: number,
  progress: number,
  pose: { x: number; y: number; rotate: number },
  lifted: boolean,
  centered: boolean,
) {
  const cursor = progress * (experiences.length - 1);
  const local = cursor - index;
  const enter = clamp((local + 0.45) / 0.45, 0, 1);
  const depth = clamp(local, 0, 2.5);
  const t = easeOut(enter);
  const x = pose.x;
  const y = (1 - t) * 72 + t * (pose.y - depth * 4) - (lifted ? 12 : 0);
  const rotate = (1 - t) * (pose.rotate + 8) + t * (pose.rotate - depth * 0.35);
  const scale =
    ((1 - t) * 0.94 + t * Math.max(0.92, 1 - depth * 0.028)) *
    (lifted ? 1.12 : 1);
  const shift = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;

  return {
    opacity: t,
    zIndex: lifted ? 40 : index + 2,
    pointerEvents: enter > 0.35 ? "auto" : "none",
    transform: centered ? `translateX(-50%) ${shift}` : shift,
  } as const;
}

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
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const scrollIndex = reduceMotion
    ? experiences.length - 1
    : Math.round(progress * (experiences.length - 1));
  const canSwitchCards =
    reduceMotion || scrollIndex >= experiences.length - 1;
  const activeIndex = canSwitchCards ? (hovered ?? scrollIndex) : scrollIndex;

  useEffect(() => {
    if (!canSwitchCards && hovered !== null) setHovered(null);
  }, [canSwitchCards, hovered]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setProgress(1);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    let listening = false;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = Math.max(section.offsetHeight - vh, 1);

      const next =
        rect.top > 0
          ? 0
          : rect.bottom <= vh * 0.12
            ? 1
            : clamp(-rect.top, 0, total) / total;

      setProgress((current) =>
        Math.abs(current - next) < 0.002 ? current : next,
      );
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    const start = () => {
      if (listening) return;
      listening = true;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      update();
    };

    const stop = () => {
      if (!listening) return;
      listening = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { rootMargin: "40% 0px" },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [reduceMotion]);

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className={`relative bg-chocolate text-cream max-lg:overflow-visible lg:overflow-x-clip ${
        reduceMotion ? "snap-block" : "h-[520vh] lg:h-[560vh]"
      }`}
    >
      {/* Desktop snap steps: one scroll settles each card stage */}
      {!reduceMotion ? (
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          aria-hidden
        >
          {Array.from({ length: experiences.length + 1 }, (_, index) => (
            <div
              key={index}
              className="snap-step"
              style={{ height: `${100 / (experiences.length + 1)}%` }}
            />
          ))}
        </div>
      ) : null}
      <div
        className={`flex flex-col overflow-visible pt-8 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden ${
          reduceMotion ? "min-h-dvh" : "sticky top-0 min-h-dvh"
        }`}
      >
        <div className="page-shell page-x relative z-20">
          <p className="text-left font-inter text-[11px] uppercase tracking-[0.16em] text-cream">
            Find something that feels like you
          </p>
          <h2 className="mt-3 max-w-[18ch] text-left font-playfair text-[clamp(1.7rem,7.6vw,2.45rem)] font-normal uppercase leading-[0.92] tracking-[-0.045em] text-cream">
            <span className="block">
              Try a new <span className="italic">experience</span>,
            </span>
            <span className="block">
              meet <span className="italic">your</span> neighbors,
            </span>
            <span className="block">
              see your <span className="italic">community</span>
            </span>
            <span className="block italic">differently</span>
          </h2>
        </div>

        <div className="relative z-0 mx-auto mt-10 h-[min(62vh,640px)] w-full max-w-[400px] shrink-0 overflow-visible">
          {experiences.map((item, index) => {
            const motion = stackMotion(
              index,
              reduceMotion ? 1 : progress,
              mobilePoses[index],
              activeIndex === index,
              true,
            );

            return (
              <article
                key={item.title}
                role="button"
                tabIndex={0}
                aria-pressed={hovered === index}
                className="absolute left-1/2 top-[4%] w-[82%] origin-center cursor-pointer touch-manipulation bg-cream p-3.5 pb-4 text-chocolate shadow-[0_16px_30px_rgba(0,0,0,0.28)]"
                style={motion}
                onClick={() =>
                  setHovered((current) => (current === index ? null : index))
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setHovered((current) =>
                      current === index ? null : index,
                    );
                  }
                }}
              >
                <div className="relative aspect-square w-full overflow-hidden bg-[#ebe4d8]">
                  <Image
                    src={item.image}
                    alt={activeIndex === index ? item.alt : ""}
                    fill
                    sizes="340px"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-3.5 font-inter text-[16px] font-semibold uppercase leading-[1.15] tracking-[0.02em]">
                  {item.title}
                </h3>
                <p className="mt-1.5 font-inter text-[13px] leading-none text-chocolate/70">
                  {item.meta}
                </p>
                {item.tag ? (
                  <span className="mt-3.5 inline-flex border border-chocolate/40 px-2.5 py-1.5 font-inter text-[12px] leading-none">
                    {item.tag}
                  </span>
                ) : (
                  <span className="mt-3.5 block h-[26px]" aria-hidden />
                )}
              </article>
            );
          })}
        </div>

        <div className="page-shell page-x relative z-20 mt-36 shrink-0 bg-chocolate pt-6 pb-2 text-center">
          <p className="mx-auto max-w-[32ch] font-inter text-[13px] leading-[1.3] text-cream">
            Your neighborhood is full of people doing interesting things, places
            waiting to be discovered and initiatives bringing others together
          </p>
          <Link
            href="/?as=neighbr#join"
            className="mt-4 inline-block font-playfair text-[clamp(1.55rem,6.5vw,2rem)] italic uppercase leading-none tracking-[-0.03em] text-cream underline decoration-[1px] underline-offset-[7px]"
          >
            Join the waitlist
          </Link>
        </div>

        <div className="relative z-20 mt-auto shrink-0 overflow-x-clip pt-8 pb-5" aria-hidden>
          <Marquee>
            {[0, 1].map((copy) => (
              <p
                key={copy}
                className="flex items-center py-1 font-playfair text-[clamp(1.55rem,7.2vw,2.2rem)] italic uppercase leading-[1.15] tracking-[-0.04em] text-[#ffffff]"
              >
                {marqueeItems.map((item) => (
                  <span key={`${copy}-${item}`} className="inline-flex items-center">
                    <span className="px-3">{item}</span>
                    <span>·</span>
                  </span>
                ))}
              </p>
            ))}
          </Marquee>
        </div>
      </div>

      <div
        className={
          reduceMotion
            ? "hidden flex-col overflow-x-clip lg:flex"
            : "sticky top-0 hidden h-dvh flex-col overflow-x-clip overflow-y-hidden lg:flex"
        }
      >
        <div className="page-shell page-x grid w-full flex-1 grid-cols-1 items-center gap-10 pb-4 pt-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-8 lg:pb-6 lg:pt-28">
          <div className="relative z-10 flex h-full max-w-[640px] flex-col justify-between py-2 lg:min-h-[560px] lg:py-2">
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
                      disabled={!canSwitchCards}
                      className={`block w-full text-left uppercase transition-[opacity,color] duration-300 ease-out sm:whitespace-nowrap disabled:cursor-default ${
                        isActive
                          ? "opacity-100"
                          : isRevealed
                            ? canSwitchCards
                              ? "opacity-35 hover:opacity-70"
                              : "opacity-35"
                            : "opacity-20"
                      }`}
                      onMouseEnter={() => {
                        if (canSwitchCards) setHovered(index);
                      }}
                      onMouseLeave={() => {
                        if (canSwitchCards) setHovered(null);
                      }}
                      onFocus={() => {
                        if (canSwitchCards) setHovered(index);
                      }}
                      onBlur={() => {
                        if (canSwitchCards) setHovered(null);
                      }}
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
                href="/?as=neighbr#join"
                className="mt-5 inline-block font-playfair text-[clamp(1.35rem,2vw,1.85rem)] italic uppercase leading-none tracking-[-0.03em] text-cream underline decoration-[1px] underline-offset-[8px] transition-opacity hover:opacity-80"
              >
                Join the waitlist
              </Link>
            </div>
          </div>

          <div className="relative mx-auto h-[360px] w-full max-w-[720px] overflow-x-clip sm:h-[500px] sm:overflow-visible lg:mx-0 lg:mt-2 lg:h-[610px] lg:max-w-none">
            <div className="absolute left-1/2 top-0 w-[700px] max-w-[min(100vw-2rem,700px)] origin-top -translate-x-1/2 scale-[0.55] sm:scale-[0.85] lg:left-0 lg:max-w-none lg:origin-top-left lg:translate-x-0 lg:scale-[1.12]">
              <div className="relative h-[560px] w-full">
                {experiences.map((item, index) => {
                  const isActive = activeIndex === index;
                  const motion = stackMotion(
                    index,
                    reduceMotion ? 1 : progress,
                    desktopPoses[index],
                    isActive,
                    false,
                  );

                  return (
                    <article
                      key={item.title}
                      className={`absolute top-6 left-2 w-[620px] max-w-none origin-center bg-cream p-4 text-chocolate sm:p-5 ${
                        isActive
                          ? "shadow-[0_28px_54px_rgba(0,0,0,0.42)]"
                          : "shadow-[0_16px_34px_rgba(0,0,0,0.26)]"
                      }`}
                      style={motion}
                      onMouseEnter={() => {
                        if (canSwitchCards) setHovered(index);
                      }}
                      onMouseLeave={() => {
                        if (canSwitchCards) setHovered(null);
                      }}
                      onFocus={() => {
                        if (canSwitchCards) setHovered(index);
                      }}
                      onBlur={() => {
                        if (canSwitchCards) setHovered(null);
                      }}
                      tabIndex={
                        canSwitchCards && motion.opacity > 0.4 ? 0 : -1
                      }
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
          <Marquee>
            {[0, 1].map((copy) => (
              <p
                key={copy}
                className="flex items-center font-playfair text-[clamp(1.6rem,3.4vw,3.15rem)] italic uppercase leading-none tracking-[-0.04em] text-[#ffffff]"
              >
                {marqueeItems.map((item) => (
                  <span key={`${copy}-${item}`} className="inline-flex items-center">
                    <span className="px-4 sm:px-5">{item}</span>
                    <span>·</span>
                  </span>
                ))}
              </p>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
