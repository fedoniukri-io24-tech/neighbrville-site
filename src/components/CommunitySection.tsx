"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const photos = [
  {
    src: "/images/community/library.png",
    alt: "Sunlit neighborhood bookshop",
    box: { left: "0%", top: "16%", width: "11.5%", height: "22%" },
  },
  {
    src: "/images/community/circle.png",
    alt: "Neighbors sitting together in a circle",
    box: { left: "18%", top: "5%", width: "16%", height: "16%" },
  },
  {
    src: "/images/community/watercolor.png",
    alt: "Hands painting with watercolors",
    box: { left: "48%", top: "3%", width: "17%", height: "15%" },
  },
  {
    src: "/images/community/workshop.png",
    alt: "People gathered around a workshop table",
    box: { left: "87%", top: "12%", width: "13%", height: "18%" },
  },
  {
    src: "/images/community/performance.png",
    alt: "A neighbor performing on a rug",
    box: { left: "2.5%", top: "50%", width: "10.5%", height: "20%" },
  },
  {
    src: "/images/community/books.png",
    alt: "Stacks of books on a wooden table",
    box: { left: "88.5%", top: "42%", width: "11.5%", height: "26%" },
  },
  {
    src: "/images/community/makers.png",
    alt: "A shared makers table under pendant lamps",
    box: { left: "20%", top: "64%", width: "17%", height: "15%" },
  },
  {
    src: "/images/community/pottery.png",
    alt: "Hands shaping a clay pot",
    box: { left: "46%", top: "60%", width: "11%", height: "17%" },
  },
  {
    src: "/images/community/repair.png",
    alt: "Neighbors repairing things together",
    box: { left: "68%", top: "66%", width: "16%", height: "14%" },
  },
];

function ScatterPhoto({
  src,
  alt,
  box,
}: {
  src: string;
  alt: string;
  box: { left: string; top: string; width: string; height: string };
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      className="absolute overflow-hidden bg-[#3a2416] shadow-[0_14px_30px_rgba(0,0,0,0.28)] transition-transform duration-300 ease-out"
      style={{
        ...box,
        zIndex: hovered ? 30 : 1,
        transform: hovered ? "scale(1.08)" : "scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={alt}
    >
      <Image src={src} alt="" fill sizes="280px" className="object-cover" />
    </button>
  );
}

export function CommunitySection() {
  return (
    <section id="village" className="overflow-x-clip bg-chocolate text-cream">
      <div className="page-shell page-x hidden lg:block">
        <div className="relative aspect-[1440/860] w-full">
          {photos.map((photo) => (
            <ScatterPhoto key={photo.src} {...photo} />
          ))}

          <div className="pointer-events-none absolute inset-x-[20%] top-[26%] z-10 text-center">
            <p className="font-inter text-[11px] font-medium uppercase tracking-[0.24em] xl:text-[12px]">
              Built by the neighborhood
            </p>

            <h2 className="mx-auto mt-4 max-w-[920px] font-playfair text-[clamp(2.1rem,4.5vw,64px)] font-normal uppercase leading-[0.9] tracking-[-0.045em]">
              <span className="block whitespace-nowrap">Everything your community</span>
              <span className="block whitespace-nowrap">
                has to offer in <span className="italic">one place</span>
              </span>
            </h2>

            <p className="mt-5 font-inter text-[12px] font-medium uppercase tracking-[0.06em] xl:text-[13px]">
              You offer events, spaces, programs, or something else entirely?
            </p>

            <p className="mx-auto mt-3 max-w-[440px] font-inter text-[13px] leading-[1.35] text-cream xl:text-[14px]">
              NeighbrVille helps more people discover it! Whether you host events
              or contribute to your local life in broader ways, you belong here
            </p>
          </div>

          <Link
            href="#partner"
            className="absolute bottom-[5%] left-1/2 z-10 -translate-x-1/2 font-playfair text-[clamp(1.35rem,1.7vw,1.85rem)] italic uppercase leading-none tracking-[-0.03em] underline decoration-[1px] underline-offset-[7px] transition-opacity hover:opacity-80"
          >
            Become a partner
          </Link>
        </div>
      </div>

      <div className="overflow-x-clip py-8 lg:hidden">
        <div className="relative mx-auto h-[360px] w-full max-w-[440px]">
          {[
            {
              src: "/images/community/circle.png",
              alt: "Neighbors sitting together in a circle",
              className: "left-[4%] top-0 w-[40%] aspect-[5/4]",
            },
            {
              src: "/images/community/workshop.png",
              alt: "People gathered around a workshop table",
              className: "right-[4%] top-[2%] w-[34%] aspect-[4/3]",
            },
            {
              src: "/images/community/library.png",
              alt: "Sunlit neighborhood bookshop",
              className: "left-[3%] top-[52%] w-[28%] aspect-[3/4]",
            },
            {
              src: "/images/community/watercolor.png",
              alt: "Hands painting with watercolors",
              className: "right-[8%] top-[50%] w-[34%] aspect-[5/4]",
            },
          ].map((photo) => (
            <div
              key={photo.src}
              className={`absolute overflow-hidden bg-[#3a2416] shadow-[0_12px_24px_rgba(0,0,0,0.28)] ${photo.className}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="page-x mx-auto max-w-[420px] py-10 text-center">
          <p className="font-inter text-[11px] font-medium uppercase tracking-[0.18em]">
            Built by the neighborhood
          </p>
          <h2 className="mt-4 font-playfair text-[clamp(1.7rem,7.6vw,2.35rem)] font-normal uppercase leading-[0.95] tracking-[-0.04em]">
            <span className="block">Everything your</span>
            <span className="block">
              community <span className="italic">has to</span>
            </span>
            <span className="block">
              offer in <span className="italic">one place</span>
            </span>
          </h2>
          <p className="mt-5 font-inter text-[12px] font-semibold uppercase tracking-[0.04em]">
            Have events, spaces, or programs to offer?
          </p>
          <p className="mx-auto mt-2 max-w-[34ch] font-inter text-[14px] leading-[1.35]">
            NeighbrVille helps more people discover it! Whether you host events
            or contribute to your local life in broader ways, you belong here
          </p>
        </div>

        <div className="relative mx-auto h-[520px] w-full max-w-[440px]">
          {[
            {
              src: "/images/community/performance.png",
              alt: "A neighbor performing on a rug",
              className: "left-[3%] top-0 w-[34%] aspect-[4/5]",
            },
            {
              src: "/images/community/pottery.png",
              alt: "Hands shaping a clay pot",
              className: "left-[39%] top-[30%] w-[24%] aspect-square",
            },
            {
              src: "/images/community/repair.png",
              alt: "Neighbors repairing things together",
              className: "right-[3%] top-[2%] w-[32%] aspect-[5/4]",
            },
            {
              src: "/images/community/makers.png",
              alt: "A shared makers table under pendant lamps",
              className: "left-[4%] top-[54%] w-[44%] aspect-[5/3]",
            },
            {
              src: "/images/community/books.png",
              alt: "Stacks of books on a wooden table",
              className: "right-[4%] top-[52%] w-[28%] aspect-[3/4]",
            },
          ].map((photo) => (
            <div
              key={photo.src}
              className={`absolute overflow-hidden bg-[#3a2416] shadow-[0_12px_24px_rgba(0,0,0,0.28)] ${photo.className}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="page-x mt-8 text-center">
          <Link
            href="#partner"
            className="font-playfair text-[clamp(1.7rem,7vw,2.1rem)] italic uppercase leading-none tracking-[-0.03em] underline decoration-[1px] underline-offset-[7px]"
          >
            Become a partner
          </Link>
        </div>
      </div>
    </section>
  );
}
