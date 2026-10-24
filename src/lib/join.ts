export type JoinRole = "neighbr" | "partner";
export type JoinStep = "waitlist" | "profile";

export const INTERESTS = [
  "Clay & Ceramics",
  "Culinary & Food Culture",
  "Movement & Dance",
  "Music & Performance",
  "Visual Arts & Illustration",
  "Outdoors & Nature",
  "Repair & Sustainability",
] as const;

export const LANGUAGES = [
  "English",
  "Spanish",
  "Portuguese",
  "French",
  "German",
] as const;

export const CATEGORIES = INTERESTS;

export function shareJoinInvite(role: JoinRole) {
  const url = window.location.href;
  const text =
    role === "neighbr"
      ? "Join me on NeighbrVille — find your people, feel at home."
      : "I’m joining NeighbrVille as a founding host/partner. Come build with us.";

  if (navigator.share) {
    void navigator.share({ title: "NeighbrVille", text, url }).catch(() => {});
    return;
  }
  if (navigator.clipboard) {
    void navigator.clipboard.writeText(url);
  }
}

/** Smooth-scroll a join target into view and optionally focus a field. */
export function scrollToJoinPanel(
  node: HTMLElement | null,
  options?: { focus?: boolean },
) {
  if (!node) return;

  // Wait a frame so layout after expand is settled, then scroll to the
  // panel's top edge (no extra lift — old --join-panel-lift offset drifted).
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const top = node.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });

      if (!options?.focus) return;

      const focusable = node.querySelector<HTMLElement>(
        'input:not([type="hidden"]), textarea, select, button[type="submit"]',
      );
      window.setTimeout(() => {
        focusable?.focus({ preventScroll: true });
      }, 450);
    });
  });
}
