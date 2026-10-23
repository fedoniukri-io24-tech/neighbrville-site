"use client";

import Image from "next/image";
import { useState } from "react";

const polaroids = [
  {
    src: "/images/hero/polaroid-03.png",
    alt: "Neighbors grilling together outdoors",
    rotate: -14,
    lift: 18,
    zIndex: 1,
  },
  {
    src: "/images/hero/polaroid-05.png",
    alt: "Friends gathered in a living room",
    rotate: -6,
    lift: 4,
    zIndex: 2,
  },
  {
    src: "/images/hero/polaroid-02.png",
    alt: "Neighbors embracing at a gathering",
    rotate: 3,
    lift: 28,
    zIndex: 4,
  },
  {
    src: "/images/hero/polaroid-01.png",
    alt: "Friends talking around a picnic table",
    rotate: 8,
    lift: 8,
    zIndex: 5,
  },
  {
    src: "/images/hero/polaroid-04.png",
    alt: "Hands shaping clay on a pottery wheel",
    rotate: 13,
    lift: -8,
    zIndex: 3,
  },
];

const mobilePolaroids = [
  {
    src: "/images/hero/polaroid-03.png",
    alt: "Neighbors grilling together outdoors",
    className: "left-[1%] top-[0%] z-[1] w-[34%] -rotate-[11deg]",
  },
  {
    src: "/images/hero/polaroid-05.png",
    alt: "Friends gathered in a living room",
    className: "left-[32%] top-[2%] z-[3] w-[36%] rotate-[4deg]",
  },
  {
    src: "/images/hero/polaroid-01.png",
    alt: "Friends talking around a picnic table",
    className: "right-[1%] top-[4%] z-[2] w-[34%] rotate-[10deg]",
  },
  {
    src: "/images/hero/polaroid-02.png",
    alt: "Neighbors embracing at a gathering",
    className: "left-[10%] top-[36%] z-[5] w-[38%] -rotate-[8deg]",
  },
  {
    src: "/images/hero/polaroid-04.png",
    alt: "Hands shaping clay on a pottery wheel",
    className: "right-[4%] top-[40%] z-[4] w-[37%] rotate-[12deg]",
  },
];

function PolaroidFrame({
  src,
  alt,
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <div className="bg-white p-[4px] pb-[18px] shadow-[0_12px_24px_rgba(0,0,0,0.38)]">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ece7df]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
      </div>
    </div>
  );
}

export function Hero() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Mobile layout — matches hero mockup 1:1 */}
      <div className="page-x flex flex-1 flex-col overflow-x-clip pb-5 pt-0 lg:hidden">
        <div className="page-shell flex flex-1 flex-col">
          <h1 className="relative text-center font-playfair text-[clamp(2.2rem,10.2vw,3.1rem)] font-normal uppercase leading-[0.88] tracking-[-0.05em] text-cream">
            <span className="block">Become</span>
            <span className="block italic">an active</span>
            <span className="flex items-end justify-center gap-1.5">
              <span>participant</span>
              <span className="mb-[0.38em] shrink-0 font-inter text-[10px] font-normal normal-case leading-none tracking-[0.01em]">
                Launching Early 2027
              </span>
            </span>
          </h1>

          <div
            className="relative mx-auto mt-2 aspect-[1/0.78] w-[calc(100%+0.5rem)] max-w-[420px]"
            aria-hidden="true"
          >
            {mobilePolaroids.map((photo, index) => (
              <div
                key={photo.src}
                className={`absolute ${photo.className}`}
              >
                <PolaroidFrame
                  src={photo.src}
                  alt=""
                  priority={index < 3}
                  sizes="38vw"
                />
              </div>
            ))}
          </div>

          <p className="relative mt-1 text-center font-playfair text-[clamp(2.2rem,10.2vw,3.1rem)] font-normal uppercase leading-[0.88] tracking-[-0.05em] text-cream">
            <span className="block">
              <span className="italic">In</span> your local
            </span>
            <span className="mt-0.5 flex items-baseline justify-center gap-x-2.5">
              <span className="mb-[0.16em] shrink-0 font-inter text-[10px] font-normal normal-case leading-none tracking-[0.01em]">
                London &amp; Berlin
              </span>
              <span className="italic">community</span>
            </span>
          </p>

          <div className="mt-auto flex flex-col items-center pt-5">
            <p className="max-w-[26ch] text-center font-inter text-[13px] leading-[1.3] text-cream sm:text-[14px]">
              Your neighborhood is full of places, people, and initiatives to
              discover
            </p>
            <p className="mt-2 text-center font-inter text-[10px] font-medium uppercase tracking-[0.07em] text-cream sm:text-[11px]">
              NeighbrVille helps you find them
            </p>

            <div className="mt-5 grid w-full grid-cols-2 gap-3">
              <button
                type="button"
                className="bg-cream px-3 py-4 font-inter text-[13px] font-medium leading-none text-chocolate transition-opacity hover:opacity-90"
              >
                Join as a Neighbr
              </button>
              <button
                type="button"
                className="border border-cream px-3 py-4 font-inter text-[13px] font-normal leading-none text-cream transition-colors hover:bg-cream/10"
              >
                Become a Partner
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop / tablet layout */}
      <div className="hidden min-h-0 flex-1 flex-col lg:flex">
        <div className="page-x flex flex-1 items-center justify-center pb-6 pt-2 lg:pb-8">
          <div className="page-shell grid w-full grid-cols-1 items-center gap-6 lg:grid-cols-[190px_minmax(0,1fr)_190px] lg:gap-8 xl:gap-10">
            <p className="mx-auto max-w-[280px] text-center font-inter text-[15px] leading-[1.1] text-cream sm:text-[16px] lg:mx-0 lg:max-w-none lg:text-left lg:text-[18px]">
              Your neighborhood is full of places, people, and initiatives to
              discover.
            </p>

            <h1 className="text-center font-playfair text-[clamp(2rem,4.55vw,78px)] font-normal uppercase leading-[0.9] tracking-[-0.07em] text-cream">
              <span className="block">
                Become an <span className="italic">active</span>
              </span>
              <span className="block">
                participant <span className="italic">in your local</span>
              </span>
              <span className="block">community</span>
            </h1>

            <p className="mx-auto max-w-[280px] text-center font-inter text-[15px] leading-[1.1] text-cream sm:text-[16px] lg:mx-0 lg:max-w-none lg:text-right lg:text-[18px]">
              NeighbrVille helps you find them, connect, and build community.
            </p>
          </div>
        </div>

        <div className="page-shell page-x relative z-10 w-full shrink-0 overflow-x-clip sm:overflow-visible">
          <div className="flex origin-bottom scale-100 items-end justify-center pt-2">
            {polaroids.map((photo, index) => {
              const isHovered = hovered === index;

              return (
                <div
                  key={photo.src}
                  className="relative w-[150px] shrink-0 cursor-pointer transition-[transform,filter] duration-300 ease-out md:w-[184px] lg:w-[220px] [&:not(:first-child)]:-ml-7 lg:[&:not(:first-child)]:-ml-10"
                  style={{
                    zIndex: isHovered ? 50 : photo.zIndex,
                    transform: `translateY(${photo.lift + (isHovered ? -10 : 0)}px) rotate(${photo.rotate}deg) scale(${isHovered ? 1.1 : 1})`,
                  }}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered(null)}
                  tabIndex={0}
                >
                  <div
                    className={`bg-white p-2 pb-8 transition-shadow duration-300 lg:p-[10px] lg:pb-11 ${
                      isHovered
                        ? "shadow-[0_24px_48px_rgba(0,0,0,0.45)]"
                        : "shadow-[0_16px_34px_rgba(0,0,0,0.32)]"
                    }`}
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ece7df]">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 1024px) 184px, 220px"
                        className={`object-cover transition-transform duration-300 ease-out ${
                          isHovered ? "scale-105" : "scale-100"
                        }`}
                        priority={index < 3}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="page-x relative z-20 shrink-0 pb-8 pt-10 text-center lg:pb-10 lg:pt-14">
          <p className="font-inter text-[12px] leading-[1.1] text-cream lg:text-[13px]">
            Launching Early 2027 - London &amp; Berlin
          </p>
          <p className="mt-3 font-inter text-[11px] font-medium uppercase leading-[1.1] tracking-[0.16em] text-cream lg:text-[12px] lg:tracking-[0.18em]">
            Free to join. No commitment required
          </p>
        </div>
      </div>
    </div>
  );
}
