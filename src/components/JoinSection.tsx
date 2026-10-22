import Image from "next/image";
import Link from "next/link";

const neighbrBenefits = [
  "Founding member status",
  "Early access",
  "Lifetime premium",
  "Exclusive perks & updates",
];

const partnerBenefits = [
  "Early visibility",
  "Collaboration opportunities",
  "Audience insights",
  "Featured launch partner",
];

export function JoinSection() {
  return (
    <section id="join" className="relative min-h-dvh overflow-hidden text-cream">
      <Image
        src="/images/sections/be-here.png"
        alt="Neighbors gathered around outdoor tables"
        fill
        priority={false}
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="page-shell page-x relative z-10 flex min-h-dvh flex-col py-14 lg:py-16">
        <div className="max-w-[920px]">
          <h2 className="font-playfair text-[clamp(2.1rem,4.5vw,64px)] font-normal italic uppercase leading-[0.9] tracking-[-0.045em]">
            Be here from the beginning
          </h2>
          <p className="mt-5 max-w-[230px] font-inter text-[14px] leading-[1.25] text-cream sm:text-[15px]">
            Join early to get first access and help us build the experiences
            your neighborhood needs
          </p>
        </div>

        <div className="mx-auto mt-10 grid w-full max-w-[860px] grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:gap-5">
          <article className="flex min-h-[340px] flex-col bg-chocolate px-7 py-8 text-cream sm:px-8 sm:py-9">
            <h3 className="font-inter text-[15px] font-semibold uppercase tracking-[0.04em] sm:text-[16px]">
              Benefits for Neighbrs
            </h3>
            <ul className="mt-6 list-disc space-y-1.5 pl-5 font-inter text-[14px] leading-[1.35] sm:text-[15px]">
              {neighbrBenefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-8 max-w-[280px] font-inter text-[14px] leading-[1.3] sm:text-[15px]">
              I want to discover new experiences, my people, my neighborhood
            </p>
            <Link
              href="#waitlist"
              className="mt-auto inline-block pt-8 font-playfair text-[clamp(1.35rem,2vw,1.75rem)] italic uppercase leading-none tracking-[-0.03em] underline decoration-[1px] underline-offset-[8px] transition-opacity hover:opacity-80"
            >
              Become a Neighbr
            </Link>
          </article>

          <article className="flex min-h-[340px] flex-col bg-cream px-7 py-8 text-chocolate sm:px-8 sm:py-9">
            <h3 className="font-inter text-[15px] font-semibold uppercase tracking-[0.04em] sm:text-[16px]">
              Benefits for Hosts and Partners
            </h3>
            <ul className="mt-6 list-disc space-y-1.5 pl-5 font-inter text-[14px] leading-[1.35] sm:text-[15px]">
              {partnerBenefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-8 max-w-[300px] font-inter text-[14px] leading-[1.3] sm:text-[15px]">
              I want to contribute events, spaces, programs, resources, or ideas
            </p>
            <Link
              href="#partner"
              className="mt-auto inline-block pt-8 font-playfair text-[clamp(1.35rem,2vw,1.75rem)] italic uppercase leading-none tracking-[-0.03em] underline decoration-[1px] underline-offset-[8px] transition-opacity hover:opacity-80"
            >
              Become a Partner
            </Link>
          </article>
        </div>

        <h2 className="ml-auto mt-12 max-w-full text-right font-playfair text-[clamp(2.1rem,4.5vw,64px)] font-normal italic uppercase leading-[0.9] tracking-[-0.045em] sm:max-w-[640px] lg:mt-auto lg:pb-2">
          Help bring NeighbrVille
          <br />
          to your city
        </h2>
      </div>
    </section>
  );
}
