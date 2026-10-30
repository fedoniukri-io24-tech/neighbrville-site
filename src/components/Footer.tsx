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

const contacts = [
  { href: "tel:+11234567890", label: "+1 123 456 78 90" },
  { href: "tel:+23456789012", label: "+2 345 678 90 12" },
  { href: "mailto:hello@neighbrville.com", label: "hello@neighbrville.com" },
];

const columnLabel =
  "font-inter text-[11px] font-normal uppercase leading-none tracking-[0.16em]";
const columnLink =
  "font-inter text-[15px] font-normal leading-none transition-opacity hover:opacity-70";

function DesktopColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="hidden h-full min-h-0 flex-col justify-between lg:flex">
      <p className={columnLabel}>{title}</p>
      {children}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative z-30 snap-block isolate overflow-x-clip bg-cream pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] text-chocolate">
      <div className="page-shell page-x relative z-10 flex flex-col gap-10 py-14 lg:grid lg:min-h-[17.5rem] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,0.9fr)_minmax(0,1.25fr)_minmax(0,1.7fr)] lg:items-stretch lg:gap-x-10 lg:py-16 lg:pb-6 xl:gap-x-14">
        <DesktopColumn title="Menu">
          <ul className="contents">
            {menu.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={columnLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </DesktopColumn>

        <DesktopColumn title="Socials">
          <ul className="contents">
            {socials.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={columnLink}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </DesktopColumn>

        <DesktopColumn title="Contact">
          <ul className="contents">
            <li>
              <a href={contacts[0].href} className={`${columnLink} whitespace-nowrap`}>
                {contacts[0].label}
              </a>
            </li>
            <li>
              <a href={contacts[1].href} className={`${columnLink} whitespace-nowrap`}>
                {contacts[1].label}
              </a>
            </li>
            <li>
              <a href={contacts[2].href} className={`${columnLink} whitespace-nowrap`}>
                {contacts[2].label}
              </a>
            </li>
            <li aria-hidden className={`invisible ${columnLink}`}>
              &nbsp;
            </li>
          </ul>
        </DesktopColumn>

        <div className="hidden h-full min-h-0 flex-col justify-between lg:flex">
          <p className="font-playfair text-[clamp(2.4rem,3.35vw,3.85rem)] font-normal not-italic uppercase leading-[0.84] tracking-[-0.045em]">
            <span className="block whitespace-nowrap">
              Find <span className="italic">your</span> people
            </span>
            <span className="block whitespace-nowrap text-right">
              feel <span className="italic">at home</span>
            </span>
          </p>
          <div className="flex items-end justify-between gap-6 font-inter text-[13px] leading-none">
            <p>©2026 All rights reserved</p>
            <Link href="#privacy" className="transition-opacity hover:opacity-70">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:hidden">
          <p className="font-playfair text-[clamp(2.5rem,10vw,3.35rem)] font-normal not-italic uppercase leading-[0.92] tracking-[-0.045em]">
            <span className="block">
              Find <span className="italic">your</span> people
            </span>
            <span className="block text-right">
              feel <span className="italic">at home</span>
            </span>
          </p>
          <div>
            <p className={columnLabel}>Socials</p>
            <ul className="mt-5 space-y-3">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-inter text-[13px] uppercase leading-none tracking-[0.04em] transition-opacity hover:opacity-70"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={columnLabel}>Contact</p>
            <ul className="mt-5 space-y-3">
              {contacts.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-inter text-[13px] uppercase leading-none tracking-[0.04em] transition-opacity hover:opacity-70"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between gap-6 font-inter text-[12px] leading-none">
            <p>©2026 All rights reserved</p>
            <Link href="#privacy" className="transition-opacity hover:opacity-70">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      <FooterWordmark />
    </footer>
  );
}
