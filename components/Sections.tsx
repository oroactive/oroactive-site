import Image from "next/image";
import Link from "next/link";
import { academyFaculties, blogPosts, faqs, stores } from "@/lib/data";

export function ValueFlow() {
  const steps = [
    ["Valuta", "Richiedi una valutazione professionale."],
    ["Prenota", "Scegli il negozio piu comodo."],
    ["Verifica", "Test professionale in sede."],
    ["Ricevi", "Pagamento chiaro e tracciabile."]
  ];
  return (
    <section className="px-5 py-14">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
        {steps.map(([title, text], index) => (
          <article key={title} className="glass rounded-3xl p-6">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-orange font-black text-night">{index + 1}</span>
            <h3 className="mt-5 font-display text-2xl font-bold">{title}</h3>
            <p className="mt-2 text-warm/62">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function StoresMap() {
  return (
    <section id="negozi" className="section-pad px-5">
      <div className="mx-auto max-w-7xl">
        <p className="font-bold uppercase tracking-[.22em] text-orange">Mappa negozi</p>
        <h2 className="mt-2 font-display text-4xl font-black md:text-5xl">Sedi OroActive e pagine locali SEO.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {stores.map((store) => (
            <Link key={store.slug} href={`/stores/${store.slug}`} className="glass rounded-3xl p-6 transition hover:-translate-y-1 hover:border-orange">
              <h3 className="font-display text-2xl font-bold">{store.city}</h3>
              <p className="mt-2 text-warm/62">{store.address}</p>
              <p className="mt-4 text-sm font-bold text-satin">{store.province} · {store.phone}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AcademyPreview() {
  return (
    <section className="section-pad px-5">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-orange/20 bg-gradient-to-br from-orange/15 to-white/[.03] p-8 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="font-bold uppercase tracking-[.22em] text-orange">OroActive Academy</p>
            <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">Formazione interna stile università aziendale.</h2>
            <p className="mt-5 text-warm/70">Catalogo corsi, video lezioni, PDF, badge, certificazioni e dashboard avanzamento per operatori e responsabili.</p>
            <Link href="/academy" className="mt-7 inline-flex rounded-full bg-orange px-7 py-4 font-bold text-night">Apri Academy</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {academyFaculties.map((faculty) => (
              <article key={faculty} className="rounded-3xl border border-white/10 bg-black/25 p-5">
                <span className="text-sm font-bold text-satin">Facoltà</span>
                <h3 className="mt-2 font-display text-2xl font-bold">{faculty}</h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Franchising() {
  return (
    <section id="franchising" className="section-pad px-5">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        <div>
          <p className="font-bold uppercase tracking-[.22em] text-orange">Franchising</p>
          <h2 className="mt-2 font-display text-4xl font-black md:text-5xl">Un modello scalabile per punti vendita premium.</h2>
        </div>
        <div className="grid gap-4">
          {["Gestionale proprietario", "Academy e procedure", "Dashboard performance", "Standard brand e qualità"].map((item) => (
            <div key={item} className="glass rounded-2xl p-5 font-bold">{item}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BlogFaq() {
  return (
    <section id="blog" className="section-pad px-5">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        <div>
          <p className="font-bold uppercase tracking-[.22em] text-orange">Blog SEO</p>
          <h2 className="mt-2 font-display text-4xl font-black">Guide e contenuti local.</h2>
          <div className="mt-6 grid gap-4">
            {blogPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="glass rounded-2xl p-5 transition hover:border-orange">
                <span className="text-sm font-bold text-satin">{post.category}</span>
                <h3 className="mt-2 font-display text-2xl font-bold">{post.title}</h3>
                <p className="mt-2 text-warm/62">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold uppercase tracking-[.22em] text-orange">FAQ dinamiche</p>
          <h2 className="mt-2 font-display text-4xl font-black">Domande frequenti.</h2>
          <div className="mt-6 grid gap-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="glass rounded-2xl p-5">
                <summary className="cursor-pointer font-display text-xl font-bold">{faq.question}</summary>
                <p className="mt-3 text-warm/65">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const footerLinks = [
  ["Quotazioni", "/#quotazioni"],
  ["Perizie", "/#perizie"],
  ["Negozi", "/#negozi"],
  ["Academy", "/academy"],
  ["Franchising", "/#franchising"],
  ["Blog", "/#blog"]
];

const serviceLinks = [
  "Compro oro",
  "Valutazione argento",
  "Valutazione platino",
  "Stima gioielli",
  "Compro monete",
  "Perizie certificate",
  "Servizi per punti vendita"
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#11131a] text-warm">
      <div className="bg-orange px-5 py-12 text-center text-night">
        <p className="mx-auto max-w-4xl font-display text-2xl font-black leading-tight md:text-3xl">
          OroActive valuta oro, argento e platino con metodo chiaro, tecnologia proprietaria e verifica professionale in negozio.
        </p>
      </div>

      <div className="px-5 py-14">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 xl:grid-cols-[1.1fr_.9fr_1.1fr_1.25fr]">
          <div>
            <Image src="/oroactive-logo.png" alt="OroActive" width={180} height={225} className="h-auto w-36 sm:w-44" />
            <p className="mt-5 max-w-sm text-warm/70">
              Compro oro premium per valutare preziosi, gioielli, argento e platino con quotazioni aggiornate e processi digitali.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-black uppercase tracking-wide">Navigazione</h2>
            <div className="mt-5 grid gap-3 text-warm/76">
              {footerLinks.map(([label, href]) => (
                <Link key={label} href={href} className="transition hover:text-orange">{label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-black uppercase tracking-wide">Compro e vendo oro</h2>
            <div className="mt-5 grid gap-3 text-warm/76">
              {serviceLinks.map((service) => (
                <span key={service}>{service}</span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-black uppercase tracking-wide">I nostri negozi</h2>
            <div className="mt-5 grid gap-3 text-warm/76">
              {stores.map((store) => (
                <Link key={store.slug} href={`/stores/${store.slug}`} className="transition hover:text-orange">
                  {store.city} - {store.address}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-6 text-center text-sm text-warm/55">
        © 2026 OroActive Tech - Software gestionale proprietario - Privacy Policy - Cookie Policy
      </div>
    </footer>
  );
}
