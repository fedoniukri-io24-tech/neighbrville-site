export const siteConfig = {
  name: "NeighbrVille",
  shortName: "NeighbrVille",
  description:
    "Become an active participant in your local community. Discover local experiences, meet your neighbors, and feel at home — launching Early 2027 in London & Berlin.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://neighbrville.com").replace(
    /\/$/,
    "",
  ),
  locale: "en_US",
  email: "hello@neighbrville.com",
  launch: "Early 2027",
  cities: ["London", "Berlin"] as const,
  ogImage: "/images/sections/be-here.png",
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
    linkedin: "https://linkedin.com",
  },
} as const;

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}
