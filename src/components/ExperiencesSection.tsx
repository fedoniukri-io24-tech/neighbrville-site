"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Pose = { left: number; top: number; rotate: number };

type ExperienceCard = {
  title: string;
  meta: string;
  tag: string;
  image: string;
  alt: string;
  line: ReactNode;
  mobileLine: ReactNode;
  desktop: Pose;
  mobile: Pose;
};

const headingBase = "text-cream/60";
const headingAccent = "text-cream/85";
const headingAccentEm = "not-italic text-cream/85";

const cards: ExperienceCard[] = [
  {
    title: "Pottery for Beginners",
    meta: "Clay & Ceramics · Berlin",
    tag: "Beginner-friendly",
    image: "/images/experiences/pottery.png",
    alt: "Hands shaping clay on a pottery wheel",
    line: (
      <>
        Try a new <em className={headingAccentEm}>experience</em>,
      </>
    ),
    mobileLine: (
      <>
        Try a new <em className={headingAccentEm}>experience</em>,
      </>
    ),
    desktop: { left: 11.53, top: 4.6, rotate: -3.5 },
    mobile: { left: 11, top: 4.5, rotate: -5 },
  },
  {
    title: "Sunday Repair Café",
    meta: "Repair & Sustainability · London",
    tag: "Free",
    image: "/images/experiences/repair-cafe.png",
    alt: "Neighbors repairing items together",
    line: (
      <>
        meet <em className={headingAccentEm}>your</em> people,
      </>
    ),
    mobileLine: (
      <>
        meet <em className={headingAccentEm}>your</em> neighbors,
      </>
    ),
    desktop: { left: 12.24, top: 23.02, rotate: 4.1 },
    mobile: { left: 17.9, top: 9.5, rotate: 2.5 },
  },
  {
    title: "Pasta Night with Neighbors",
    meta: "Food & Drink · London",
    tag: "Italian",
    image: "/images/experiences/pasta-night.png",
    alt: "Friends making fresh pasta together",
    line: <>see your neighborhood</>,
    mobileLine: (
      <>
        see your <em className={headingAccentEm}>community</em>
      </>
    ),
    desktop: { left: 4.27, top: 38.44, rotate: -6.4 },
    mobile: { left: 21.5, top: 17, rotate: -5.5 },
  },
  {
    title: "Neighborhood Photo Walk",
    meta: "Visual Arts · Berlin",
    tag: "Beginner-friendly",
    image: "/images/experiences/photo-walk.png",
    alt: "Friends walking through a park at sunset",
    line: <em className={headingAccentEm}>differently</em>,
    mobileLine: <em className={headingAccentEm}>differently</em>,
    desktop: { left: 12.14, top: 55.67, rotate: 4.75 },
    mobile: { left: 20.4, top: 22.5, rotate: 3 },
  },
];

const cardShadow = "shadow-[0_14px_34px_rgba(0,0,0,0.4)]";
const smoothRender =
  "[backface-visibility:hidden] [outline:1px_solid_transparent] will-change-transform";
const ctaClass =
  "text-left font-playfair italic uppercase leading-none tracking-[-0.075em] underline decoration-[1px] transition-opacity hover:opacity-80";

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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

type CardMotion = {
  opacity: number;
  zIndex: number;
  pointerEvents: "auto" | "none";
  left: string;
  top: string;
  transform: string;
};

function cardStackMotion(
  index: number,
  progress: number,
  target: Pose,
  lifted: boolean,
  stack: { left: number; top: number; rotateBoost: number },
): CardMotion {
  const cursor = progress * (cards.length - 1);
  const local = cursor - index;
  const enter = clamp((local + 0.45) / 0.45, 0, 1);
  const depth = clamp(local, 0, 2.5);
  const t = easeOut(enter);

  const stackTop = stack.top + index * 2.5 - depth * 0.8;
  const left = (1 - t) * stack.left + t * target.left;
  const top = (1 - t) * stackTop + t * target.top;
  const rotate =
    (1 - t) * (target.rotate + stack.rotateBoost) +
    t * (target.rotate - depth * 0.25);
  const scale =
    ((1 - t) * 0.93 + t * Math.max(0.92, 1 - depth * 0.02)) *
    (lifted ? 1.06 : 1);

  return {
    opacity: t,
    zIndex: lifted ? 40 : index + 2,
    pointerEvents: enter > 0.35 ? "auto" : "none",
    left: `${left}%`,
    top: `${top}%`,
    transform: `rotate(${rotate}deg) scale(${scale}) translateZ(0)`,
  };
}

/** 0 at the previous line, 1 on this line, fading into the next. No step jumps. */
function lineOpacity(index: number, progress: number) {
  const cursor = progress * (cards.length - 1);
  const dist = cursor - index;
  if (dist < -0.45) return 0.2;
  const focus = 1 - Math.min(Math.abs(dist) / 0.85, 1);
  return 0.22 + focus * 0.78;
}

function headlineLineClass(
  isActive: boolean,
  isRevealed: boolean,
  canSwitchCards: boolean,
) {
  return `block w-full text-left uppercase transition-[opacity,color] duration-300 ease-out disabled:cursor-default ${
    isActive
      ? headingAccent
      : isRevealed
        ? canSwitchCards
          ? "opacity-35 active:opacity-70"
          : "opacity-35"
        : "opacity-20"
  }`;
}

function ExperienceMarquee() {
  return (
    <div
      className="experience-marquee-band relative z-10 flex w-full shrink-0 items-center overflow-x-clip overflow-y-hidden bg-chocolate py-2 lg:py-2.5"
      aria-hidden
    >
      <div className="experience-marquee-track flex w-max animate-marquee items-center whitespace-nowrap will-change-transform">
        {[0, 1].map((copy) => (
          <p
            key={copy}
            className="experience-marquee-line m-0 flex items-center font-playfair text-[clamp(1.5rem,6.8vw,2.15rem)] not-italic uppercase leading-none tracking-[-0.04em] text-ivory lg:text-[clamp(1.6rem,3.4vw,3.15rem)]"
          >
            {marqueeItems.map((item, index) => (
              <span key={`${copy}-${item}`} className="inline-flex items-center">
                <span
                  className={`px-3 sm:px-4 lg:px-5 ${index % 2 === 0 ? "not-italic" : "italic"}`}
                >
                  {item}
                </span>
                <span aria-hidden>·</span>
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}

function DesktopStack({
  progress,
  activeIndex,
  canSwitchCards,
  onHover,
}: {
  progress: number;
  activeIndex: number;
  canSwitchCards: boolean;
  onHover: (index: number | null) => void;
}) {
  return (
    <div
      className="absolute left-[45cqw] top-[4.5cqw] aspect-[850/760] w-[54.6cqw]"
    >
      {cards.map((card, index) => {
        const isActive = activeIndex === index;
        const motion = cardStackMotion(
          index,
          progress,
          card.desktop,
          isActive,
          { left: 26, top: 14, rotateBoost: index % 2 === 0 ? 10 : -10 },
        );

        return (
          <article
            key={card.title}
            className={`absolute w-[83.6%] origin-top-left bg-cream text-chocolate [container-type:inline-size] ${cardShadow} ${smoothRender} ${
              canSwitchCards && motion.opacity > 0.35
                ? "cursor-pointer"
                : "pointer-events-none"
            }`}
            style={{
              left: motion.left,
              top: motion.top,
              height: "38.62%",
              zIndex: motion.zIndex,
              opacity: motion.opacity,
              pointerEvents: motion.pointerEvents,
              transform: motion.transform,
            }}
            onMouseEnter={() => {
              if (canSwitchCards) onHover(index);
            }}
            onMouseLeave={() => {
              if (canSwitchCards) onHover(null);
            }}
            onFocus={() => {
              if (canSwitchCards) onHover(index);
            }}
            onBlur={() => {
              if (canSwitchCards) onHover(null);
            }}
            tabIndex={canSwitchCards && motion.opacity > 0.4 ? 0 : -1}
          >
            <div className="absolute left-[3.6cqw] top-[2.2cqw] max-w-[42cqw]">
              <h3 className="font-inter text-[3.1cqw] font-semibold uppercase leading-[1.08] tracking-[-0.01em]">
                {card.title}
              </h3>
              <p className="mt-[1.8cqw] font-inter text-[1.87cqw] leading-[1.2]">
                {card.meta}
              </p>
            </div>

            <span className="absolute bottom-[2.1cqw] left-[3.6cqw] rounded-[0.45cqw] border border-chocolate px-[1cqw] py-[0.55cqw] font-inter text-[1.87cqw] leading-none">
              {card.tag}
            </span>

            <div className="absolute bottom-[2.15cqw] right-[3.38cqw] top-[2.39cqw] w-[47.7cqw] overflow-hidden">
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="30vw"
                className="object-cover"
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

function MobileStack({
  progress,
  activeIndex,
  onActivate,
}: {
  progress: number;
  activeIndex: number;
  onActivate: (index: number) => void;
}) {
  return (
    <div className="relative h-full min-h-0 w-full">
      {cards.map((card, index) => {
        const isActive = activeIndex === index;
        const motion = cardStackMotion(
          index,
          progress,
          card.mobile,
          isActive,
          { left: 18, top: 22, rotateBoost: index % 2 === 0 ? 11 : -11 },
        );

        return (
          <article
            key={card.title}
            role="button"
            tabIndex={motion.pointerEvents === "auto" ? 0 : -1}
            aria-pressed={isActive}
            aria-label={card.alt}
            className={`absolute w-[73.1%] origin-top-left touch-manipulation bg-cream text-chocolate [container-type:inline-size] ${cardShadow} ${smoothRender}`}
            style={{
              left: motion.left,
              top: motion.top,
              height: "66%",
              zIndex: motion.zIndex,
              opacity: motion.opacity,
              pointerEvents: motion.pointerEvents,
              transform: motion.transform,
            }}
            onClick={() => onActivate(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onActivate(index);
              }
            }}
          >
            <div className="flex h-full flex-col px-[6.8cqw] pb-[5.5cqw] pt-[5.5cqw]">
              <div className="relative h-[58cqw] w-full shrink-0 overflow-hidden">
                <Image
                  src={card.image}
                  alt={isActive ? card.alt : ""}
                  fill
                  sizes="70vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-[8.5cqw] font-inter text-[4.5cqw] font-semibold uppercase leading-[1.1] tracking-[-0.01em]">
                {card.title}
              </h3>
              <p className="mt-[1cqw] font-inter text-[4.2cqw] leading-[1.2]">
                {card.meta}
              </p>
              <span className="mt-auto self-start rounded-[1.3cqw] border border-chocolate px-[2.4cqw] py-[1.2cqw] font-inter text-[3.8cqw] leading-none">
                {card.tag}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function ExperiencesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeMobile, setActiveMobile] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const scrollIndex = reduceMotion
    ? cards.length - 1
    : Math.round(progress * (cards.length - 1));
  const canSwitchCards =
    reduceMotion || scrollIndex >= cards.length - 1;
  const activeIndex = canSwitchCards ? (hovered ?? scrollIndex) : scrollIndex;
  const mobileActive = canSwitchCards
    ? (activeMobile ?? scrollIndex)
    : scrollIndex;

  useEffect(() => {
    if (!canSwitchCards && hovered !== null) setHovered(null);
  }, [canSwitchCards, hovered]);

  useEffect(() => {
    if (!canSwitchCards && activeMobile !== null) setActiveMobile(null);
  }, [canSwitchCards, activeMobile]);

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
    // Freeze viewport height during a touch so the URL bar doesn't
    // resize the scroll range and shake the pinned block.
    let stableVh = window.innerHeight;
    let touching = false;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = touching ? stableVh : window.innerHeight;
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

    const onTouchStart = () => {
      touching = true;
      stableVh = window.innerHeight;
    };
    const onTouchEnd = () => {
      touching = false;
      stableVh = window.innerHeight;
      onScroll();
    };

    const start = () => {
      if (listening) return;
      listening = true;
      stableVh = window.innerHeight;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchend", onTouchEnd, { passive: true });
      window.addEventListener("touchcancel", onTouchEnd, { passive: true });
      update();
    };

    const stop = () => {
      if (!listening) return;
      listening = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
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

  const motionProgress = reduceMotion ? 1 : progress;

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className={`relative bg-chocolate text-cream max-lg:overflow-visible lg:overflow-x-clip ${
        reduceMotion ? "snap-block" : "h-[580vh] lg:h-[620vh]"
      }`}
    >
      {!reduceMotion ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {Array.from({ length: cards.length + 1 }, (_, index) => (
            <div
              key={index}
              className="snap-step"
              style={{ height: `${100 / (cards.length + 1)}%` }}
            />
          ))}
        </div>
      ) : null}

      <span className="sr-only">
        Try a new experience, meet your people, see your neighborhood
        differently
      </span>

      <div
        className={`flex flex-col overflow-hidden lg:hidden ${
          reduceMotion
            ? ""
            : "sticky top-[var(--header-space)] h-[calc(100svh-var(--header-space))]"
        }`}
      >
        <div className="page-shell page-x mx-auto flex h-full min-h-0 w-full max-w-[520px] flex-col [container-type:inline-size]">
          <div className="flex min-h-0 flex-1 flex-col items-stretch pt-[4svh] text-left">
            <p className="font-inter text-[2.56cqw] uppercase leading-none text-ivory">
              Find something that feels like you
            </p>

            <h2
              className={`relative z-20 mt-[2.2svh] w-full shrink-0 text-left font-playfair text-[8.6cqw] font-normal uppercase leading-[1.03] tracking-[-0.045em] text-cream`}
            >
              {cards.map((card, index) => {
                const isActive = mobileActive === index;

                return (
                  <button
                    key={`mobile-${card.title}`}
                    type="button"
                    disabled={!canSwitchCards}
                    className="block w-full text-left uppercase disabled:cursor-default"
                    style={{ opacity: lineOpacity(index, motionProgress) }}
                    onClick={() => {
                      if (!canSwitchCards) return;
                      setActiveMobile((current) =>
                        current === index ? null : index,
                      );
                    }}
                    aria-pressed={isActive}
                  >
                    {card.mobileLine}
                  </button>
                );
              })}
            </h2>

            <div className="mt-[1.5svh] min-h-0 w-full flex-1">
              <MobileStack
                progress={motionProgress}
                activeIndex={mobileActive}
                onActivate={(index) =>
                  setActiveMobile((current) =>
                    current === index ? null : index,
                  )
                }
              />
            </div>

            <div className="mt-[3.5cqw] flex flex-col items-center text-center">
              <p className="max-w-[88cqw] font-inter text-[3.1cqw] leading-[1.2] text-ivory">
                Your neighborhood is full of people doing interesting things,
                places waiting to be discovered and initiatives bringing others
                together
              </p>

              <Link
                href="/?as=neighbr#join"
                className={`mt-[4cqw] text-center text-[8.1cqw] underline-offset-[1.9cqw] ${ctaClass}`}
              >
                Join the waitlist
              </Link>
            </div>

            <div className="mt-[4cqw] -mx-[var(--page-gutter-x)] w-[calc(100%+2*var(--page-gutter-x))]">
              <ExperienceMarquee />
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          reduceMotion
            ? "hidden min-h-0 flex-col overflow-x-clip lg:flex"
            : "sticky top-0 hidden min-h-dvh flex-col overflow-x-clip overflow-visible lg:flex"
        }
      >
        <div className="page-shell flex min-h-0 w-full flex-1 flex-col overflow-visible [container-type:inline-size]">
          <div
            className="relative"
            style={{ height: "max(56.4cqw, 640px)" }}
          >
            <p className="absolute left-[2.67cqw] top-[5.48cqw] font-inter text-[max(9px,0.93cqw)] uppercase leading-none text-ivory">
              Find something that feels like you
            </p>

            <h2
              className={`absolute left-[2.67cqw] top-[8.6cqw] z-20 font-playfair text-[4.24cqw] font-normal uppercase leading-[0.886] tracking-[-0.074em] ${headingBase}`}
            >
              {cards.map((card, index) => {
                const isActive = activeIndex === index;
                const isRevealed = index <= scrollIndex;

                return (
                  <button
                    key={card.title}
                    type="button"
                    disabled={!canSwitchCards}
                    className={`whitespace-nowrap ${headlineLineClass(
                      isActive,
                      isRevealed,
                      canSwitchCards,
                    )}`}
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
                    {card.line}
                  </button>
                );
              })}
            </h2>

            <div className="absolute bottom-[4cqw] left-[2.67cqw]">
              <p className="font-inter text-[max(9px,0.935cqw)] leading-[1.17] text-ivory">
                Language is part of the experience
                <br />
                Practice while doing something you enjoy
              </p>
              <Link
                href="/?as=neighbr#join"
                className={`mt-[1cqw] inline-block text-[2.12cqw] underline-offset-[0.45cqw] ${ctaClass}`}
              >
                Join the waitlist
              </Link>
            </div>

            <DesktopStack
              progress={motionProgress}
              activeIndex={activeIndex}
              canSwitchCards={canSwitchCards}
              onHover={setHovered}
            />
          </div>
        </div>

        <ExperienceMarquee />
      </div>
    </section>
  );
}
