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

/** Smooth-scroll the join panel into view without fighting layout thrash. */
export function scrollToJoinPanel(node: HTMLElement | null) {
  if (!node) return;

  requestAnimationFrame(() => {
    const liftVar = getComputedStyle(document.documentElement)
      .getPropertyValue("--join-panel-lift")
      .trim();
    const probe = document.createElement("div");
    probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;height:${liftVar || "0px"}`;
    document.body.appendChild(probe);
    const lift = probe.offsetHeight;
    probe.remove();

    const top = node.getBoundingClientRect().top + window.scrollY - lift * 0.35;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  });
}
