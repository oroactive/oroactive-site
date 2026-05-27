import Image from "next/image";
import Link from "next/link";
import { GoldCalculator } from "@/components/GoldCalculator";
import { QuoteTicker } from "@/components/QuoteTicker";
import { SiteFooter } from "@/components/Sections";
import { faqs, stores } from "@/lib/data";

const benefits = [
  ["Pagamento rapido", "Contanti o bonifico secondo normativa vigente."],
  ["Massima riservatezza", "Ambiente professionale, valutazione chiara e privata."],
  ["Valutazione gratuita", "Controllo del titolo e del peso senza impegno."]
];

const processSteps = [
  ["1", "Descrivi i preziosi", "Porta oro, argento, platino, monete o gioielli nel punto vendita piu comodo."],
  ["2", "Verifica professionale", "Pesatura, controllo titolo e quotazione aggiornata in modo trasparente."],
  ["3", "Ricevi la proposta", "Se accetti, pagamento tracciabile e documentazione gestita in sede."]
];

const serviceCards = [
  ["Oro usato", "24kt, 22kt, 18kt, 14kt e tutte le principali carature."],
  ["Argento", "Lingotti, posate, gioielli e oggetti in argento 999, 925 e 800."],
  ["Platino", "Valutazione professionale di platino 950, 900 e 850."],
  ["Gioielli e monete", "Stima immediata e controllo accurato dei tuoi preziosi."]
];

const growthCards = [
  ["Academy OroActive", "Formazione interna, procedure operative e percorsi per operatori qualificati.", "/academy", "Apri Academy"],
  ["Franchising", "Standard di brand, gestionale proprietario e metodo operativo per punti vendita premium.", "#negozi", "Parla con un punto vendita"]
];

export function OroShopInspiredHome() {
  return (
    <>
      <main className="bg-[#f5f0e7] text-[#15120d]">
        <section className="relative overflow-hidden bg-[#090807] text-warm">
          <div className="mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl items-center gap-8 px-5 py-7 lg:grid-cols-[.98fr_1.02fr] lg:py-8">
            <div className="relative z-10 max-w-2xl">
              <Image src="/oroactive-logo.png" alt="OroActive" width={180} height={225} priority className="mb-4 h-auto w-24 sm:w-28" />
              <p className="inline-flex rounded-full bg-orange px-4 py-2 text-xs font-black uppercase tracking-wide text-night sm:text-sm">
                Compro oro premium
              </p>
              <h1 className="mt-4 font-display text-[2.75rem] font-black leading-[.94] sm:text-5xl md:text-6xl">
                Trasforma i tuoi preziosi in valore subito.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-warm/72 md:text-lg">
                Valutiamo oro, argento, platino, gioielli e monete con quotazioni aggiornate, massima riservatezza e pagamento chiaro in negozio.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link href="#calcolatore" className="rounded-full bg-orange px-7 py-4 text-center font-black text-night shadow-glow transition hover:bg-[#ff922e]">
                  Richiedi una valutazione
                </Link>
                <Link href="#negozi" className="rounded-full border border-white/25 px-7 py-4 text-center font-black text-warm transition hover:border-orange hover:text-orange">
                  Trova il negozio
                </Link>
              </div>
              <div className="mt-5 grid max-w-xl gap-3 text-sm font-bold text-warm/70 sm:grid-cols-3">
                <span className="rounded-2xl border border-white/10 bg-white/[.06] px-4 py-3">Quotazioni live</span>
                <span className="rounded-2xl border border-white/10 bg-white/[.06] px-4 py-3">Verifica in sede</span>
                <span className="rounded-2xl border border-white/10 bg-white/[.06] px-4 py-3">Nessun impegno</span>
              </div>
            </div>

            <div className="relative min-h-[440px] lg:min-h-[590px]">
              <div className="absolute inset-x-10 bottom-0 top-10 rounded-[2rem] bg-orange/20 blur-3xl" />
              <Image
                src="/hero-woman-cash.png"
                alt="Consulente OroActive con denaro contante"
                width={1024}
                height={1536}
                priority
                className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain"
              />
              <div className="absolute bottom-8 left-0 right-0 mx-auto w-[min(92%,28rem)] rounded-2xl border border-white/15 bg-black/70 p-5 shadow-card backdrop-blur-xl">
                <p className="text-sm font-bold uppercase tracking-wide text-orange">Valutazione immediata</p>
                <strong className="mt-1 block font-display text-3xl">Oro, argento e platino</strong>
                <p className="mt-2 text-sm text-warm/65">Stima online e verifica professionale in negozio.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#e2d6c2] bg-orange px-5 py-8 text-night">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            {benefits.map(([title, text]) => (
              <article key={title} className="rounded-2xl bg-white/72 p-6 shadow-[0_18px_50px_rgba(42,31,15,.16)]">
                <h2 className="font-display text-2xl font-black">{title}</h2>
                <p className="mt-2 text-sm font-semibold text-night/70">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="bg-[#090807] text-warm">
          <QuoteTicker />
        </div>

        <section className="px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="font-bold uppercase tracking-[.22em] text-orange">Come funziona</p>
              <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">Tre passaggi semplici per una valutazione chiara.</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {processSteps.map(([number, title, text]) => (
                <article key={title} className="rounded-[1.5rem] border border-[#e2d6c2] bg-white p-7 shadow-[0_20px_60px_rgba(42,31,15,.12)]">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-night font-black text-orange">{number}</span>
                  <h3 className="mt-6 font-display text-2xl font-black">{title}</h3>
                  <p className="mt-3 leading-7 text-[#5c5145]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#15120d] px-5 py-20 text-warm">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="font-bold uppercase tracking-[.22em] text-orange">Cosa valutiamo</p>
              <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">Preziosi, metalli e gioielli.</h2>
              <p className="mt-5 text-warm/65">Un unico percorso per stimare il valore online e completare la verifica in negozio con personale formato.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {serviceCards.map(([title, text]) => (
                <article key={title} className="rounded-2xl border border-white/10 bg-white/[.06] p-6">
                  <h3 className="font-display text-2xl font-black">{title}</h3>
                  <p className="mt-3 text-warm/64">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="franchising" className="px-5 py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.78fr_1.22fr]">
            <div>
              <p className="font-bold uppercase tracking-[.22em] text-orange">Academy e franchising</p>
              <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">Metodo, formazione e standard OroActive.</h2>
              <p className="mt-5 text-[#5c5145]">
                La nuova impostazione mantiene visibili le aree strategiche del progetto: formazione, processi di negozio e sviluppo della rete.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {growthCards.map(([title, text, href, cta]) => (
                <article key={title} className="rounded-[1.5rem] border border-[#e2d6c2] bg-white p-7 shadow-[0_20px_60px_rgba(42,31,15,.12)]">
                  <h3 className="font-display text-3xl font-black">{title}</h3>
                  <p className="mt-4 leading-7 text-[#5c5145]">{text}</p>
                  <Link href={href} className="mt-7 inline-flex rounded-full bg-night px-6 py-3 text-sm font-black text-orange transition hover:bg-black">
                    {cta}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-[#090807] text-warm">
          <GoldCalculator />
        </div>

        <section id="negozi" className="px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="font-bold uppercase tracking-[.22em] text-orange">Punti vendita</p>
                <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">Scegli il negozio OroActive piu comodo.</h2>
              </div>
              <Link href="#calcolatore" className="rounded-full bg-night px-6 py-3 text-center font-black text-orange transition hover:bg-black">
                Calcola prima il valore
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {stores.map((store) => (
                <Link key={store.slug} href={`/stores/${store.slug}`} className="rounded-[1.5rem] border border-[#e2d6c2] bg-white p-7 shadow-[0_20px_60px_rgba(42,31,15,.12)] transition hover:-translate-y-1">
                  <h3 className="font-display text-3xl font-black">{store.city}</h3>
                  <p className="mt-3 text-[#5c5145]">{store.address}</p>
                  <p className="mt-5 font-black text-orange">{store.phone}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="blog" className="bg-white px-5 py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="font-bold uppercase tracking-[.22em] text-orange">Domande frequenti</p>
              <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">Risposte rapide prima della valutazione.</h2>
            </div>
            <div className="grid gap-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="rounded-2xl border border-[#e2d6c2] bg-[#f8f3eb] p-6">
                  <summary className="cursor-pointer font-display text-xl font-black">{faq.question}</summary>
                  <p className="mt-3 leading-7 text-[#5c5145]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
