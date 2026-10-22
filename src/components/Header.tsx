import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experiences", label: "Experiences" },
  { href: "#village", label: "The Village" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="page-x relative z-30 shrink-0 py-5 sm:py-6 lg:py-8">
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

        <div className="relative z-10 flex min-w-0 shrink items-center gap-1.5 sm:gap-3">
          <button
            type="button"
            className="bg-cream px-2.5 py-2 font-inter text-[9px] font-medium leading-none whitespace-nowrap text-chocolate transition-opacity hover:opacity-90 sm:px-5 sm:py-2.5 sm:text-[11px]"
          >
            Join as a Neighbr
          </button>
          <button
            type="button"
            className="border border-cream px-2.5 py-2 font-inter text-[9px] font-normal leading-none whitespace-nowrap text-cream transition-colors hover:bg-cream/10 sm:px-5 sm:py-2.5 sm:text-[11px]"
          >
            Become a Partner
          </button>
        </div>
      </div>
    </header>
  );
}
