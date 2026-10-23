"use client";

import {
  useEffect,
  useId,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import {
  CATEGORIES,
  INTERESTS,
  LANGUAGES,
  shareJoinInvite,
  scrollToJoinPanel,
  type JoinRole,
} from "@/lib/join";

export type { JoinRole };

type ProfileCopy = {
  leftTitle: ReactNode;
  rightTitle: ReactNode;
  banner: ReactNode;
  bannerAlign: "right" | "center";
  updateNote: string;
  invitePrompt: string;
  inviteCta: string;
  completeNote: string;
  fields: "neighbr" | "partner";
};

const profileCopy: Record<JoinRole, ProfileCopy> = {
  neighbr: {
    leftTitle: (
      <>
        Thank <span className="italic">you</span>
        <br />
        for <span className="italic">joining!</span>
      </>
    ),
    rightTitle: (
      <>
        Make NeighbrVille
        <br />
        more <span className="italic">personal</span>
      </>
    ),
    banner: (
      <>
        You’re joining{" "}
        <span className="underline underline-offset-[3px]">1170 people</span>{" "}
        helping build NeighbrVille
      </>
    ),
    bannerAlign: "right",
    updateNote: "We’ll keep you updated as NeighbrVille grows in your city",
    invitePrompt: "Know someone who would love this too?",
    inviteCta: "Invite a Neighbr",
    completeNote:
      "Your interests and location help us match you with the right people and experiences nearby.",
    fields: "neighbr",
  },
  partner: {
    leftTitle: (
      <>
        Thank <span className="italic">you</span>
        <br />
        for <span className="italic">joining!</span>
      </>
    ),
    rightTitle: (
      <>
        Tell us what <span className="italic">you can</span>
        <br />
        bring to <span className="italic">the village</span>
      </>
    ),
    banner:
      "You’re joining 1170 future Neighbrs, Hosts, and Partners helping build a more connected local life",
    bannerAlign: "center",
    updateNote:
      "We’ll keep you updated as NeighbrVille grows in your city and share next steps for Founding Hosts",
    invitePrompt: "Share that you’re joined on your socials!",
    inviteCta: "Share NeighbrVille",
    completeNote:
      "Thanks for telling us what you can bring — we’ll reach out as we open Founding Host opportunities.",
    fields: "partner",
  },
};

type DropdownFieldProps = {
  label: string;
  options: readonly string[];
  selected: string[];
  onChange: (next: string[]) => void;
  open: boolean;
  onToggle: () => void;
  boxed?: boolean;
};

function DropdownField({
  label,
  options,
  selected,
  onChange,
  open,
  onToggle,
  boxed = false,
}: DropdownFieldProps) {
  const listId = useId();
  const hasSelection = selected.length > 0;

  function toggleOption(option: string) {
    onChange(
      selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option],
    );
  }

  return (
    <div
      className={
        open && boxed
          ? "border border-chocolate/45 px-4 py-3 sm:px-5"
          : undefined
      }
    >
      <div
        className={`flex items-start justify-between gap-3 ${
          open ? "pb-3" : "border-b border-chocolate/45 pb-2.5"
        }`}
      >
        <button
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          onClick={onToggle}
          className="min-w-0 flex-1 text-left font-inter text-[15px] text-chocolate"
        >
          <span className="block text-chocolate/80">{label}</span>
          {!open && hasSelection ? (
            <span className="mt-1 block text-[13px] leading-[1.35] text-chocolate">
              {selected.join(", ")}
            </span>
          ) : null}
        </button>

        {open ? (
          <span
            aria-hidden
            className="inline-block shrink-0 rotate-180 pt-0.5 text-[12px] leading-none text-chocolate"
          >
            ▾
          </span>
        ) : hasSelection ? (
          <button
            type="button"
            onClick={onToggle}
            className="shrink-0 pt-0.5 font-inter text-[13px] uppercase tracking-[0.08em] text-chocolate underline decoration-[1px] underline-offset-[4px] transition-opacity hover:opacity-70"
          >
            Edit
          </button>
        ) : (
          <button
            type="button"
            aria-label={`Open ${label}`}
            onClick={onToggle}
            className="shrink-0 pt-0.5 text-[12px] leading-none text-chocolate transition-opacity hover:opacity-70"
          >
            ▾
          </button>
        )}
      </div>

      {open ? (
        <>
          <ul
            id={listId}
            role="listbox"
            aria-multiselectable
            className={boxed ? undefined : "border-t border-chocolate/45"}
          >
            {options.map((option) => {
              const checked = selected.includes(option);
              return (
                <li
                  key={option}
                  className="border-b border-chocolate/45 last:border-b-0"
                >
                  <button
                    type="button"
                    role="option"
                    aria-selected={checked}
                    onClick={() => toggleOption(option)}
                    className="flex w-full items-center justify-between gap-4 py-3.5 text-left font-inter text-[15px] leading-[1.25] text-chocolate transition-opacity hover:opacity-70"
                  >
                    <span>{option}</span>
                    {checked ? (
                      <span
                        aria-hidden
                        className="shrink-0 text-[15px] leading-none"
                      >
                        ✓
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex items-center justify-between gap-4 border-t border-chocolate/45 pt-4">
            <p className="font-inter text-[12px] leading-[1.3] text-chocolate/65">
              {selected.length === 0
                ? "Select one or more"
                : `${selected.length} selected`}
            </p>
            <button
              type="button"
              onClick={onToggle}
              className="font-playfair text-[clamp(1.25rem,3.5vw,1.55rem)] uppercase italic leading-none tracking-[-0.03em] underline decoration-[1px] underline-offset-[6px] transition-opacity hover:opacity-80"
            >
              Done
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

function ProfileShell({
  children,
  onBack,
  title,
  eyebrow,
  banner,
  bannerAlign,
  updateNote,
  invitePrompt,
  inviteCta,
  onInvite,
}: {
  children: ReactNode;
  onBack: () => void;
  title: ReactNode;
  eyebrow: string;
  banner: ReactNode;
  bannerAlign: "right" | "center";
  updateNote: string;
  invitePrompt: string;
  inviteCta: string;
  onInvite: () => void;
}) {
  return (
    <div className="join-profile-shell relative box-border flex w-full flex-col gap-5 max-lg:pt-[var(--join-mobile-panel-top)] lg:grid lg:min-h-[var(--join-panel-height)] lg:grid-cols-2 lg:gap-0 lg:pt-0">
      <div className="relative z-10 flex w-full flex-col bg-cream px-6 pb-8 pt-7 text-chocolate sm:px-8 sm:pb-9 sm:pt-8 lg:px-12 lg:py-10 xl:px-14 xl:py-12">
        <button
          type="button"
          onClick={onBack}
          className="self-start font-inter text-[13px] text-chocolate transition-opacity hover:opacity-70"
        >
          ← Go back
        </button>

        <h3 className="mt-10 max-w-[12ch] font-playfair text-[clamp(2.2rem,9.5vw,3.75rem)] font-normal uppercase leading-[0.88] tracking-[-0.05em] lg:mt-12 lg:text-[clamp(2.4rem,3.8vw,3.75rem)]">
          {title}
        </h3>

        <p className="mt-5 max-w-[36ch] font-inter text-[11px] font-medium uppercase leading-[1.4] tracking-[0.08em] text-chocolate sm:text-[12px]">
          {eyebrow}
        </p>

        <p
          className={`mt-8 bg-chocolate px-5 py-4 font-inter text-[13px] leading-[1.35] text-cream sm:px-6 sm:py-[1.15rem] sm:text-[14px] ${
            bannerAlign === "center" ? "text-center" : "text-right"
          }`}
        >
          {banner}
        </p>

        <div className="mt-10 flex flex-col gap-6 lg:mt-auto lg:pt-12">
          <p className="max-w-[30ch] font-inter text-[14px] leading-[1.35] text-chocolate">
            {updateNote}
          </p>
          <div>
            <p className="font-inter text-[14px] leading-[1.35] text-chocolate">
              {invitePrompt}
            </p>
            <button
              type="button"
              onClick={onInvite}
              className="mt-4 text-left font-playfair text-[clamp(1.55rem,5.5vw,2rem)] uppercase italic leading-none tracking-[-0.03em] underline decoration-[1px] underline-offset-[8px] transition-opacity hover:opacity-80 lg:text-[clamp(1.65rem,2.1vw,2.15rem)]"
            >
              {inviteCta}
            </button>
          </div>
        </div>
      </div>

      <div className="relative flex w-full flex-col justify-start px-[var(--page-gutter-x)] pb-8 pt-2 lg:justify-center lg:px-10 lg:pb-0 lg:pt-0 xl:px-14">
        {children}
      </div>
    </div>
  );
}

type JoinProfileStepProps = {
  role: JoinRole;
  onBack: () => void;
};

export function JoinProfileStep({ role, onBack }: JoinProfileStepProps) {
  const copy = profileCopy[role];
  const locationId = useId();
  const socialId = useId();
  const aboutId = useId();

  const [completed, setCompleted] = useState(false);
  const [openMenu, setOpenMenu] = useState<
    "interests" | "languages" | "categories" | null
  >(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [socials, setSocials] = useState("");
  const [about, setAbout] = useState("");

  const interestsOpen = openMenu === "interests";
  const languagesOpen = openMenu === "languages";
  const categoriesOpen = openMenu === "categories";
  const menuOpen = openMenu !== null;

  useEffect(() => {
    if (!completed) return;
    scrollToJoinPanel(document.getElementById("waitlist"));
  }, [completed]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOpenMenu(null);
    setCompleted(true);
  }

  function toggleMenu(menu: typeof openMenu) {
    setOpenMenu((current) => (current === menu ? null : menu));
  }

  if (completed) {
    return (
      <ProfileShell
        onBack={onBack}
        title={
          <>
            You’re <span className="italic">all set</span>
          </>
        }
        eyebrow="Thanks for completing your profile — we’ll be in touch soon"
        banner={copy.banner}
        bannerAlign={copy.bannerAlign}
        updateNote={copy.updateNote}
        invitePrompt={copy.invitePrompt}
        inviteCta={copy.inviteCta}
        onInvite={() => shareJoinInvite(role)}
      >
        <div className="relative z-10 w-full max-w-[560px] bg-cream px-6 py-9 text-chocolate sm:px-8 sm:py-10 xl:px-10 xl:py-12">
          <h3 className="max-w-[14ch] font-playfair text-[clamp(1.85rem,6.5vw,2.4rem)] font-normal uppercase leading-[0.92] tracking-[-0.045em]">
            Profile <span className="italic">complete</span>
          </h3>
          <p className="mt-5 max-w-[32ch] font-inter text-[14px] leading-[1.4] text-chocolate">
            {copy.completeNote}
          </p>
          <button
            type="button"
            onClick={() => setCompleted(false)}
            className="mt-10 text-left font-playfair text-[clamp(1.45rem,5.5vw,1.85rem)] uppercase italic leading-none tracking-[-0.03em] underline decoration-[1px] underline-offset-[8px] transition-opacity hover:opacity-80"
          >
            Edit my profile
          </button>
          <p className="mt-4 max-w-[20ch] font-inter text-[12px] leading-[1.3] text-chocolate/70">
            You can update your details anytime by email
          </p>
        </div>
      </ProfileShell>
    );
  }

  return (
    <ProfileShell
      onBack={onBack}
      title={copy.leftTitle}
      eyebrow="Confirm your email within 24h by clicking the button in your inbox"
      banner={copy.banner}
      bannerAlign={copy.bannerAlign}
      updateNote={copy.updateNote}
      invitePrompt={copy.invitePrompt}
      inviteCta={copy.inviteCta}
      onInvite={() => shareJoinInvite(role)}
    >
      <h3 className="mb-6 max-w-[16ch] font-playfair text-[clamp(1.9rem,7.5vw,2.85rem)] font-normal uppercase leading-[0.9] tracking-[-0.045em] text-cream lg:mb-7 lg:max-w-[15ch] lg:text-[clamp(2rem,2.7vw,2.85rem)]">
        {copy.rightTitle}
      </h3>

      <form
        onSubmit={onSubmit}
        className="relative z-10 flex w-full max-w-[560px] flex-col bg-cream px-6 py-8 text-chocolate sm:px-8 sm:py-9 xl:px-10 xl:py-11"
      >
        {copy.fields === "neighbr" ? (
          <div className="space-y-8 sm:space-y-9">
            <DropdownField
              label="Interests"
              options={INTERESTS}
              selected={interests}
              onChange={setInterests}
              open={interestsOpen}
              onToggle={() => toggleMenu("interests")}
            />
            {!interestsOpen ? (
              <>
                <div>
                  <label
                    htmlFor={locationId}
                    className="block font-inter text-[15px] text-chocolate/80"
                  >
                    Location (city and neighborhoods)
                  </label>
                  <input
                    id={locationId}
                    name="location"
                    type="text"
                    autoComplete="address-level2"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    className="mt-2 w-full border-0 border-b border-chocolate/45 bg-transparent pb-2.5 font-inter text-[16px] text-chocolate outline-none transition-colors focus:border-chocolate"
                  />
                </div>
                <DropdownField
                  label="Languages to practice"
                  options={LANGUAGES}
                  selected={languages}
                  onChange={setLanguages}
                  open={languagesOpen}
                  onToggle={() => toggleMenu("languages")}
                />
              </>
            ) : null}
          </div>
        ) : (
          <div className="space-y-7 sm:space-y-8">
            <div>
              <label
                htmlFor={locationId}
                className="block font-inter text-[15px] text-chocolate/80"
              >
                Address or neighbourhood
              </label>
              <input
                id={locationId}
                name="address"
                type="text"
                autoComplete="street-address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className="mt-2 w-full border-0 border-b border-chocolate/45 bg-transparent pb-2.5 font-inter text-[16px] text-chocolate outline-none transition-colors focus:border-chocolate"
              />
            </div>
            <DropdownField
              label="Choose your categories / tags"
              options={CATEGORIES}
              selected={categories}
              onChange={setCategories}
              open={categoriesOpen}
              boxed={categoriesOpen}
              onToggle={() => toggleMenu("categories")}
            />
            {!categoriesOpen ? (
              <>
                <div>
                  <label
                    htmlFor={socialId}
                    className="block font-inter text-[15px] text-chocolate/80"
                  >
                    Social media links
                  </label>
                  <input
                    id={socialId}
                    name="socials"
                    type="text"
                    autoComplete="url"
                    value={socials}
                    onChange={(event) => setSocials(event.target.value)}
                    className="mt-2 w-full border-0 border-b border-chocolate/45 bg-transparent pb-2.5 font-inter text-[16px] text-chocolate outline-none transition-colors focus:border-chocolate"
                  />
                </div>
                <div>
                  <label
                    htmlFor={aboutId}
                    className="block font-inter text-[15px] text-chocolate/80"
                  >
                    Tell us about what you do
                  </label>
                  <textarea
                    id={aboutId}
                    name="about"
                    rows={2}
                    value={about}
                    onChange={(event) => setAbout(event.target.value)}
                    className="mt-2 w-full resize-none border-0 border-b border-chocolate/45 bg-transparent pb-2.5 font-inter text-[16px] text-chocolate outline-none transition-colors focus:border-chocolate"
                  />
                </div>
              </>
            ) : null}
          </div>
        )}

        {!menuOpen ? (
          <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <button
              type="submit"
              className="text-left font-playfair text-[clamp(1.5rem,6vw,1.95rem)] uppercase italic leading-none tracking-[-0.03em] underline decoration-[1px] underline-offset-[8px] transition-opacity hover:opacity-80 lg:text-[clamp(1.55rem,2.2vw,2.15rem)]"
            >
              Complete my profile
            </button>
            <p className="max-w-[18ch] font-inter text-[12px] leading-[1.3] text-chocolate/70 sm:text-right">
              You can update your details anytime by email
            </p>
          </div>
        ) : null}
      </form>
    </ProfileShell>
  );
}
