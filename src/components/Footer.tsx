import Link from "next/link";

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

export function Footer() {
  return (
    <footer className="bg-cream text-chocolate">
      <div className="page-shell page-x flex flex-col gap-10 overflow-x-clip pb-6 pt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-12 lg:pb-6 lg:pt-16">
        <div className="order-2 grid grid-cols-1 gap-y-4 lg:order-1 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
          <div className="hidden lg:block">
            <p className="font-inter text-[11px] uppercase tracking-[0.14em]">Menu</p>
            <ul className="mt-5 space-y-3">
              {menu.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-inter text-[15px] leading-none transition-opacity hover:opacity-70"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="hidden font-inter text-[11px] uppercase tracking-[0.14em] lg:block">
              Socials
            </p>
            <ul className="space-y-3 lg:mt-5">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-inter text-[13px] uppercase leading-none tracking-[0.04em] transition-opacity hover:opacity-70 lg:text-[15px] lg:normal-case lg:tracking-normal"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="hidden font-inter text-[11px] uppercase tracking-[0.14em] lg:block">
              Contact
            </p>
            <ul className="mt-6 space-y-3 font-inter text-[13px] uppercase leading-none tracking-[0.04em] lg:mt-5 lg:text-[15px] lg:normal-case lg:tracking-normal">
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

        <div className="order-1 flex flex-col items-start lg:order-2 lg:items-end">
          <div className="w-full max-w-[460px] lg:text-right">
            <p className="font-playfair text-[clamp(2.35rem,9.5vw,3rem)] font-normal uppercase italic leading-[0.92] tracking-[-0.045em] lg:text-[clamp(2rem,3.4vw,52px)] lg:leading-[0.9]">
              Find your people
              <br />
              feel at home
            </p>
            <div className="mt-8 hidden items-center justify-between gap-6 font-inter text-[13px] lg:mt-10 lg:flex">
              <p>©2026 All rights reserved</p>
              <Link href="#privacy" className="transition-opacity hover:opacity-70">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="order-3 flex items-center justify-between gap-6 font-inter text-[12px] lg:hidden">
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
