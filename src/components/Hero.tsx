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

export function Hero() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
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
        <div className="flex origin-bottom scale-[0.9] items-end justify-center pt-2 sm:scale-100">
          {polaroids.map((photo, index) => {
            const isHovered = hovered === index;

            return (
              <div
                key={photo.src}
                className="relative w-[72px] shrink-0 cursor-pointer transition-[transform,filter] duration-300 ease-out sm:w-[150px] md:w-[184px] lg:w-[220px] [&:not(:first-child)]:-ml-3 sm:[&:not(:first-child)]:-ml-7 lg:[&:not(:first-child)]:-ml-10"
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
                  className={`bg-white p-1.5 pb-6 transition-shadow duration-300 sm:p-2 sm:pb-8 lg:p-[10px] lg:pb-11 ${
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
                      sizes="(max-width: 640px) 72px, (max-width: 1024px) 184px, 220px"
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

      <div className="page-x relative z-20 shrink-0 pb-8 pt-10 text-center sm:pt-12 lg:pb-10 lg:pt-14">
        <p className="font-inter text-[12px] leading-[1.1] text-cream lg:text-[13px]">
          Launching Early 2027 - London &amp; Berlin
        </p>
        <p className="mt-3 font-inter text-[10px] font-medium uppercase leading-[1.1] tracking-[0.16em] text-cream sm:text-[11px] lg:text-[12px] lg:tracking-[0.18em]">
          Free to join. No commitment required
        </p>
      </div>
    </div>
  );
}
