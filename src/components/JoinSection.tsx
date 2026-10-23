import Image from "next/image";
import Link from "next/link";

const neighbrBenefits = [
  "Founding Member status",
  "Early access",
  "Lifetime Premium",
  "Exclusive perks & updates",
];

const partnerBenefits = [
  "Early Visibility",
  "Collaboration Opportunities",
  "Audience Insights",
  "Featured Launch Partner",
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

      <div className="page-shell page-x relative z-10 flex min-h-dvh flex-col py-10 lg:py-16">
        <div className="max-w-[920px]">
          <h2 className="max-w-[12ch] font-playfair text-[clamp(2.15rem,9vw,64px)] font-normal italic uppercase leading-[0.92] tracking-[-0.045em] lg:max-w-none lg:text-[clamp(2.1rem,4.5vw,64px)] lg:leading-[0.9]">
            <span className="lg:hidden">
              Be here from
              <br />
              the beginning
            </span>
            <span className="hidden lg:inline">Be here from the beginning</span>
          </h2>
          <p className="mt-4 max-w-[230px] font-inter text-[14px] leading-[1.3] text-cream sm:text-[15px] lg:mt-5">
            Join early to get first access and help us build the experiences
            your neighborhood needs
          </p>
        </div>

        <div className="mx-auto mt-8 grid w-full max-w-[860px] grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:gap-5">
          <article className="flex flex-col bg-chocolate px-6 py-7 text-cream sm:min-h-[340px] sm:px-8 sm:py-9">
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
              className="mt-auto inline-block pt-7 font-playfair text-[clamp(1.65rem,7vw,1.75rem)] italic uppercase leading-none tracking-[-0.03em] underline decoration-[1px] underline-offset-[7px] transition-opacity hover:opacity-80 lg:pt-8 lg:text-[clamp(1.35rem,2vw,1.75rem)]"
            >
              Become a Neighbr
            </Link>
          </article>

          <article className="flex flex-col bg-cream px-6 py-7 text-chocolate sm:min-h-[340px] sm:px-8 sm:py-9">
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
              className="mt-auto inline-block pt-7 font-playfair text-[clamp(1.65rem,7vw,1.75rem)] italic uppercase leading-none tracking-[-0.03em] underline decoration-[1px] underline-offset-[7px] transition-opacity hover:opacity-80 lg:pt-8 lg:text-[clamp(1.35rem,2vw,1.75rem)]"
            >
              Become a Partner
            </Link>
          </article>
        </div>

        <h2 className="ml-auto mt-12 hidden max-w-full text-right font-playfair text-[clamp(2.1rem,4.5vw,64px)] font-normal italic uppercase leading-[0.9] tracking-[-0.045em] sm:max-w-[640px] lg:mt-auto lg:block lg:pb-2">
          Help bring NeighbrVille
          <br />
          to your city
        </h2>
      </div>
    </section>
  );
}
