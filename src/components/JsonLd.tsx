import { absoluteUrl, siteConfig } from "@/lib/site";

type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function siteJsonLd() {
  const organization = {
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    logo: absoluteUrl("/brand/logo.svg"),
    description: siteConfig.description,
    sameAs: Object.values(siteConfig.socials),
    areaServed: siteConfig.cities.map((city) => ({
      "@type": "City",
      name: city,
    })),
  };

  const website = {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": absoluteUrl("/#organization") },
  };

  const webpage = {
    "@type": "WebPage",
    "@id": absoluteUrl("/#webpage"),
    url: siteConfig.url,
    name: `${siteConfig.name} — Local community experiences`,
    description: siteConfig.description,
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: { "@id": absoluteUrl("/#organization") },
    primaryImageOfPage: absoluteUrl(siteConfig.ogImage),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, webpage],
  };
}

export function faqJsonLd(
  items: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
