import Link from "next/link";
import type { ReactNode } from "react";

import { FooterWordmark } from "./FooterWordmark";

const menu = [
  { href: "/#about", label: "About" },
  { href: "/#experiences", label: "Experiences" },
  { href: "/#village", label: "The Village" },
  { href: "/#faq", label: "FAQ" },
];

const socials = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://facebook.com", label: "Facebook" },
  { href: "https://tiktok.com", label: "TikTok" },
  { href: "https://linkedin.com", label: "LinkedIn" },
];

function DesktopLinkColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col font-inter text-[15px] leading-none">
      <p className="font-inter text-[11px] uppercase leading-none tracking-[0.14em]">
        {title}
      </p>
      <ul className="mt-5 flex flex-1 flex-col justify-between">{children}</ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="snap-block overflow-x-clip bg-cream text-chocolate">
      <div className="page-shell page-x relative z-10 max-lg:flex max-lg:flex-col max-lg:gap-10 py-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.88fr)] lg:items-stretch lg:gap-x-12 lg:py-16 lg:pb-0">
        <div className="order-1 flex w-full flex-col lg:order-2 lg:h-full lg:min-h-[11.5rem]">
          <div className="flex h-full w-full flex-col lg:justify-between">
            <p className="font-playfair text-[clamp(2.35rem,9.5vw,3rem)] font-normal uppercase italic leading-[0.92] tracking-[-0.045em] lg:text-[clamp(2rem,3.4vw,52px)] lg:leading-[0.9]">
              <span className="block lg:text-left">Find your people</span>
              <span className="block lg:text-right">feel at home</span>
            </p>
            <div className="mt-8 hidden w-full items-center justify-between gap-6 font-inter text-[13px] leading-none lg:mt-0 lg:flex">
              <p>©2026 All rights reserved</p>
              <Link href="#privacy" className="transition-opacity hover:opacity-70">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="order-2 hidden min-h-[11.5rem] lg:order-1 lg:grid lg:grid-cols-3 lg:items-stretch lg:gap-x-8">
          <DesktopLinkColumn title="Menu">
            {menu.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-opacity hover:opacity-70"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </DesktopLinkColumn>

          <DesktopLinkColumn title="Socials">
            {socials.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-opacity hover:opacity-70"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </DesktopLinkColumn>

          <DesktopLinkColumn title="Contact">
            <li>
              <a href="tel:+11234567890" className="transition-opacity hover:opacity-70">
                +1 123 456 78 90
              </a>
            </li>
            <li>
              <a href="tel:+23456789012" className="transition-opacity hover:opacity-70">
                +2 345 678 90 12
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@neighbrville.com"
                className="transition-opacity hover:opacity-70"
              >
                hello@neighbrville.com
              </a>
            </li>
          </DesktopLinkColumn>
        </div>

        <div className="order-2 flex flex-col gap-10 lg:hidden">
          <div>
            <p className="font-inter text-[11px] uppercase leading-none tracking-[0.14em]">
              Socials
            </p>
            <ul className="mt-5 space-y-3 font-inter text-[13px] uppercase leading-none tracking-[0.04em]">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-opacity hover:opacity-70"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-inter text-[11px] uppercase leading-none tracking-[0.14em]">
              Contact
            </p>
            <ul className="mt-5 space-y-3 font-inter text-[13px] uppercase leading-none tracking-[0.04em]">
              <li>
                <a href="tel:+11234567890" className="transition-opacity hover:opacity-70">
                  +1 123 456 78 90
                </a>
              </li>
              <li>
                <a href="tel:+23456789012" className="transition-opacity hover:opacity-70">
                  +2 345 678 90 12
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@neighbrville.com"
                  className="transition-opacity hover:opacity-70"
                >
                  hello@neighbrville.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="order-3 flex items-center justify-between gap-6 font-inter text-[12px] leading-none lg:hidden">
          <p>©2026 All rights reserved</p>
          <Link href="#privacy" className="transition-opacity hover:opacity-70">
            Privacy Policy
          </Link>
        </div>
      </div>

      <FooterWordmark />
    </footer>
  );
}
