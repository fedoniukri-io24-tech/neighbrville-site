import { CommunitySection } from "@/components/CommunitySection";
import { ExperiencesSection } from "@/components/ExperiencesSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { JoinSection } from "@/components/JoinSection";
import { JsonLd, faqJsonLd } from "@/components/JsonLd";
import { ValueSection } from "@/components/ValueSection";
import { faqs } from "@/lib/faq";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <JsonLd data={faqJsonLd([...faqs])} />
      <section className="flex min-h-dvh flex-col overflow-x-clip bg-chocolate">
        <Header />
        <Hero />
      </section>
      <ValueSection />
      <ExperiencesSection />
      <CommunitySection />
      <JoinSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
