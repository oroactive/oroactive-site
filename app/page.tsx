import { GoldCalculator } from "@/components/GoldCalculator";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { AcademyPreview, BlogFaq, Franchising, SiteFooter, StoresMap, ValueFlow } from "@/components/Sections";
import { QuoteTicker } from "@/components/QuoteTicker";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OroActive",
    url: "https://oroactive.it",
    logo: "https://oroactive.it/oroactive-logo.svg",
    sameAs: []
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Nav />
      <main>
        <Hero />
        <ValueFlow />
        <QuoteTicker />
        <GoldCalculator />
        <StoresMap />
        <AcademyPreview />
        <Franchising />
        <BlogFaq />
      </main>
      <SiteFooter />
    </>
  );
}
