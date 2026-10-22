import Link from "next/link";

import { FooterWordmark } from "./FooterWordmark";

const menu = [
  { href: "#about", label: "About" },
  { href: "#experiences", label: "Experiences" },
  { href: "#village", label: "The Village" },
  { href: "#faq", label: "FAQ" },
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
      <div className="page-shell page-x grid grid-cols-1 gap-12 overflow-x-clip pb-8 pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:pb-6 lg:pt-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
          <div>
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
            <p className="font-inter text-[11px] uppercase tracking-[0.14em]">Socials</p>
            <ul className="mt-5 space-y-3">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-inter text-[15px] leading-none transition-opacity hover:opacity-70"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-inter text-[11px] uppercase tracking-[0.14em]">Contact</p>
            <ul className="mt-5 space-y-3 font-inter text-[15px] leading-none">
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

        <div className="flex flex-col items-start lg:items-end">
          <div className="w-full max-w-[460px] lg:text-right">
            <p className="font-playfair text-[clamp(2rem,3.4vw,52px)] font-normal uppercase italic leading-[0.9] tracking-[-0.045em]">
              Find your people
              <br />
              feel at home
            </p>
            <div className="mt-8 flex items-center justify-between gap-6 font-inter text-[13px] lg:mt-10">
              <p>©2026 All rights reserved</p>
              <Link href="#privacy" className="transition-opacity hover:opacity-70">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      <FooterWordmark />
    </footer>
  );
}
