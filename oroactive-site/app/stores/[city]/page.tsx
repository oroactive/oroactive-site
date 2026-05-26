import { Nav } from "@/components/Nav";
import { stores } from "@/lib/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return stores.map((store) => ({ city: store.slug }));
}

export function generateMetadata({ params }: { params: { city: string } }) {
  const store = stores.find((item) => item.slug === params.city);
  return {
    title: store ? `Compro oro ${store.city}` : "Negozi OroActive",
    description: store ? `OroActive ${store.city}: valutazione oro, argento e platino con esperienza premium.` : ""
  };
}

export default function StorePage({ params }: { params: { city: string } }) {
  const store = stores.find((item) => item.slug === params.city);
  if (!store) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: store.name,
    address: `${store.address}, ${store.city} (${store.province})`,
    telephone: store.phone
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />
      <main className="px-5 py-16">
        <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div>
            <p className="font-bold uppercase tracking-[.22em] text-orange">Pagina locale SEO</p>
            <h1 className="mt-3 font-display text-5xl font-black">Compro oro {store.city}</h1>
            <p className="mt-5 text-warm/65">Valutazione oro, argento e platino con standard OroActive, quotazioni live e processo digitale.</p>
          </div>
          <div className="glass rounded-[2rem] p-8">
            <h2 className="font-display text-3xl font-bold">{store.name}</h2>
            <p className="mt-4 text-warm/70">{store.address}</p>
            <p className="mt-2 text-satin">{store.city} ({store.province})</p>
            <p className="mt-2">{store.phone}</p>
          </div>
        </section>
      </main>
    </>
  );
}
