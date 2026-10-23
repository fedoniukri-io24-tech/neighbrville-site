"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Suspense,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import { scrollToJoinPanel, type JoinRole, type JoinStep } from "@/lib/join";

import { JoinProfileStep } from "./JoinProfileStep";

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

const formCopy: Record<
  JoinRole,
  { title: ReactNode; footer: [string, string]; note: string }
> = {
  neighbr: {
    title: (
      <>
        Become a <span className="italic">Founding</span>
        <br />
        Neighbr
      </>
    ),
    footer: ["Come as you are", "Beginners welcome"],
    note: "Free to join. No big commitment required",
  },
  partner: {
    title: (
      <>
        Become a <span className="italic">Launch</span>
        <br />
        Partner
      </>
    ),
    footer: ["Host or contribute", "Cities need you"],
    note: "Free to join. No big commitment required",
  },
};

function JoinSectionInner() {
  const searchParams = useSearchParams();
  const [role, setRole] = useState<JoinRole | null>(null);
  const [step, setStep] = useState<JoinStep>("waitlist");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const nameId = useId();
  const emailId = useId();
  const expanded = role !== null;
  const copy = role ? formCopy[role] : null;

  // Deep-link: /?as=neighbr#join or /?as=partner#join
  useEffect(() => {
    const as = searchParams.get("as");
    if (as !== "neighbr" && as !== "partner") return;
    setRole(as);
    setStep("waitlist");
  }, [searchParams]);

  // Pause desktop scroll-snap while the join panel is open (avoids fight with smooth scroll)
  useEffect(() => {
    document.documentElement.classList.toggle("join-open", expanded);
    return () => document.documentElement.classList.remove("join-open");
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;
    const timer = window.setTimeout(() => {
      // Always land on the active form — never the "Thank you" left column
      const target =
        step === "profile"
          ? document.getElementById("join-profile-form")
          : document.getElementById("join-waitlist-form") ?? panelRef.current;
      scrollToJoinPanel(target, { focus: true });
    }, 300);
    return () => window.clearTimeout(timer);
  }, [expanded, role, step]);

  function openForm(next: JoinRole) {
    setRole((current) => {
      if (current === next) {
        setStep("waitlist");
        return null;
      }
      setStep("waitlist");
      return next;
    });
  }

  function onWaitlistSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStep("profile");
  }

  return (
    <section
      id="join"
      className={`snap-block join-section relative text-cream ${
        expanded ? "join-section--open" : "overflow-hidden"
      }`}
    >
      {/* Fixed tall photo: same crop when closed/open — no JS resize loops */}
      <div className="join-section__photo pointer-events-none absolute inset-x-0 top-0 z-0 w-full" aria-hidden>
        <Image
          src="/images/sections/be-here.png"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>
      <span className="sr-only">Neighbors gathered around outdoor tables</span>

      <div className="page-shell page-x relative z-10 flex min-h-[var(--join-first-height)] flex-col py-10 lg:py-16">
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
            <button
              type="button"
              onClick={() => openForm("neighbr")}
              aria-expanded={role === "neighbr"}
              className="mt-auto inline-block pt-7 text-left font-playfair text-[clamp(1.65rem,7vw,1.75rem)] italic uppercase leading-none tracking-[-0.03em] underline decoration-[1px] underline-offset-[7px] transition-opacity hover:opacity-80 lg:pt-8 lg:text-[clamp(1.35rem,2vw,1.75rem)]"
            >
              Become a Neighbr
            </button>
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
            <button
              type="button"
              onClick={() => openForm("partner")}
              aria-expanded={role === "partner"}
              className="mt-auto inline-block pt-7 text-left font-playfair text-[clamp(1.65rem,7vw,1.75rem)] italic uppercase leading-none tracking-[-0.03em] underline decoration-[1px] underline-offset-[7px] transition-opacity hover:opacity-80 lg:pt-8 lg:text-[clamp(1.35rem,2vw,1.75rem)]"
            >
              Become a Partner
            </button>
          </article>
        </div>

        <h2 className="relative z-20 ml-auto mt-12 hidden max-w-full text-right font-playfair text-[clamp(2.1rem,4.5vw,64px)] font-normal italic uppercase leading-[0.9] tracking-[-0.045em] sm:max-w-[640px] lg:mt-auto lg:block lg:pb-2">
          Help bring NeighbrVille
          <br />
          to your city
        </h2>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${
          expanded
            ? "grid-rows-[1fr] max-lg:-mt-[var(--join-panel-lift)] lg:-mt-[var(--join-panel-lift)]"
            : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden max-lg:overflow-visible">
          <div
            ref={panelRef}
            id="waitlist"
            className={`join-expanded-panel relative z-10 w-full bg-transparent ${
              step === "profile" ? "join-panel-fluid" : ""
            }`}
          >
            {copy && role && step === "profile" ? (
              <JoinProfileStep
                key={role}
                role={role}
                onBack={() => setStep("waitlist")}
              />
            ) : null}

            {copy && step === "waitlist" ? (
              <div className="relative box-border flex h-full min-h-0 w-full flex-col gap-4 max-lg:pt-[var(--join-mobile-panel-top)] lg:grid lg:grid-cols-2 lg:gap-0 lg:pt-0">
                <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col justify-between overflow-hidden bg-cream px-6 pb-7 pt-8 text-chocolate sm:px-8 sm:pb-8 sm:pt-9 lg:h-full lg:px-12 lg:py-10 xl:px-14 xl:py-12">
                  <h3 className="max-w-[12ch] font-playfair text-[clamp(2.05rem,9.2vw,2.65rem)] font-normal uppercase leading-[0.9] tracking-[-0.05em] lg:max-w-[11ch] lg:text-[clamp(2rem,4vw,3.5rem)]">
                    {copy.title}
                  </h3>
                  <p className="absolute inset-x-6 top-1/2 flex -translate-y-1/2 items-center justify-center gap-3 font-inter text-[10px] uppercase tracking-[0.1em] text-chocolate sm:inset-x-8 sm:text-[11px] lg:inset-x-12 lg:justify-between lg:text-[14px] xl:inset-x-14">
                    <span className="shrink-0">{copy.footer[0]}</span>
                    <span aria-hidden className="shrink-0">
                      ×
                    </span>
                    <span className="shrink-0 lg:text-right">
                      {copy.footer[1]}
                    </span>
                  </p>
                  <p className="max-w-[15ch] font-inter text-[11px] leading-[1.35] text-chocolate lg:hidden">
                    {copy.note}
                  </p>
                </div>

                <div className="relative flex min-h-0 flex-1 w-full items-start justify-center px-[var(--page-gutter-x)] pb-2 lg:h-full lg:items-center lg:px-10 lg:pb-0 xl:px-14">
                  <form
                    id="join-waitlist-form"
                    onSubmit={onWaitlistSubmit}
                    className="relative z-10 flex w-full max-w-[520px] flex-col bg-cream px-6 py-8 text-chocolate sm:px-8 sm:py-9 lg:px-8 lg:py-9 xl:px-10 xl:py-11"
                  >
                    <div className="space-y-8 sm:space-y-9">
                      <div>
                        <label
                          htmlFor={nameId}
                          className="block font-inter text-[13px] text-chocolate/70"
                        >
                          Your name*
                        </label>
                        <input
                          id={nameId}
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          className="mt-2 w-full border-0 border-b border-chocolate/40 bg-transparent pb-2 font-inter text-[16px] text-chocolate outline-none transition-colors focus:border-chocolate"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={emailId}
                          className="block font-inter text-[13px] text-chocolate/70"
                        >
                          Email*
                        </label>
                        <input
                          id={emailId}
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          className="mt-2 w-full border-0 border-b border-chocolate/40 bg-transparent pb-2 font-inter text-[16px] text-chocolate outline-none transition-colors focus:border-chocolate"
                        />
                      </div>
                    </div>

                    <div className="mt-10 sm:mt-12 lg:flex lg:flex-row lg:items-end lg:justify-between lg:gap-6">
                      <button
                        type="submit"
                        className="text-left font-playfair text-[clamp(1.55rem,7vw,1.85rem)] italic uppercase leading-none tracking-[-0.03em] underline decoration-[1px] underline-offset-[8px] transition-opacity hover:opacity-80 lg:text-[clamp(1.6rem,2.4vw,2.4rem)]"
                      >
                        Join the waitlist
                      </button>
                      <p className="mt-3 hidden max-w-[16ch] font-inter text-[12px] leading-[1.3] text-chocolate/70 lg:mt-0 lg:block lg:text-right">
                        {copy.note}
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function JoinSection() {
  return (
    <Suspense
      fallback={
        <section
          id="join"
          className="join-section snap-block relative min-h-[var(--join-first-height)] bg-chocolate"
          aria-hidden
        />
      }
    >
      <JoinSectionInner />
    </Suspense>
  );
}
