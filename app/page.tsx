import { Nav } from "@/components/Nav";
import { OroShopInspiredHome } from "@/components/OroShopInspiredHome";
import { siteUrl } from "@/lib/site";
import { brand } from "@/lib/brand";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OroActive",
    url: siteUrl,
    logo: `${siteUrl}${brand.logoSrc}`,
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
