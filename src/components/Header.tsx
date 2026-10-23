"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#experiences", label: "Experiences" },
  { href: "/#village", label: "The Village" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="page-x relative z-40 shrink-0 py-4 sm:py-6 lg:py-8">
      <div className="page-shell relative flex items-center justify-between gap-2 sm:gap-4">
        <Link href="/" className="relative z-10 shrink-0">
          <Image
            src="/brand/logo.svg"
            alt="NeighbrVille"
            width={153}
            height={38}
            priority
            className="h-[26px] w-auto sm:h-[30px] lg:h-[38px]"
          />
        </Link>

        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex xl:gap-10"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-inter text-[13px] font-normal leading-[1.1] text-cream transition-opacity hover:opacity-75"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-10 hidden min-w-0 shrink items-center gap-3 md:flex">
          <button
            type="button"
            className="bg-cream px-5 py-2.5 font-inter text-[11px] font-medium leading-none whitespace-nowrap text-chocolate transition-opacity hover:opacity-90"
          >
            Join as a Neighbr
          </button>
          <button
            type="button"
            className="border border-cream px-5 py-2.5 font-inter text-[11px] font-normal leading-none whitespace-nowrap text-cream transition-colors hover:bg-cream/10"
          >
            Become a Partner
          </button>
        </div>

        <button
          type="button"
          className="relative z-10 flex h-12 w-12 items-center justify-center md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="flex w-[30px] flex-col items-end gap-[6px]">
            <span
              className={`block h-[2px] w-[30px] bg-cream transition-transform duration-200 ${
                menuOpen ? "translate-y-[8px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] bg-cream transition-all duration-200 ${
                menuOpen ? "w-[30px] opacity-0" : "w-[19px]"
              }`}
            />
            <span
              className={`block h-[2px] w-[30px] bg-cream transition-transform duration-200 ${
                menuOpen ? "-translate-y-[8px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen ? (
        <div className="page-shell absolute inset-x-0 top-full z-40 border-t border-cream/15 bg-chocolate px-[var(--page-gutter-x)] pb-8 pt-6 md:hidden">
          <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-inter text-[18px] text-cream"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              className="bg-cream px-3 py-3.5 font-inter text-[11px] font-medium leading-none text-chocolate"
            >
              Join as a Neighbr
            </button>
            <button
              type="button"
              className="border border-cream px-3 py-3.5 font-inter text-[11px] font-normal leading-none text-cream"
            >
              Become a Partner
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
