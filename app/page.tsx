import { Nav } from "@/components/Nav";
import { OroShopInspiredHome } from "@/components/OroShopInspiredHome";
import { siteUrl } from "@/lib/site";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OroActive",
    url: siteUrl,
    logo: `${siteUrl}/oroactive-logo.png`,
    sameAs: []
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Nav />
      <OroShopInspiredHome />
    </>
  );
}
