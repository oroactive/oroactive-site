import Image from "next/image";
import Link from "next/link";
import { QuoteTicker } from "@/components/QuoteTicker";
import { SiteFooter } from "@/components/Sections";
import { BrandLogo } from "@/components/BrandLogo";
import { faqs } from "@/lib/data";

const benefits = [
  ["Pagamento rapido", "Contanti o bonifico secondo normativa vigente."],
  ["Massima riservatezza", "Ambiente professionale, valutazione chiara e privata."],
  ["Valutazione gratuita", "Controllo del titolo e del peso senza impegno."]
];

const processSteps = [
  ["1", "Descrivi i preziosi", "Porta oro, argento, diamanti, monete o gioielli nel punto vendita piu comodo."],
  ["2", "Verifica professionale", "Verifica del peso, del titolo dei metalli e delle caratteristiche dei diamanti."],
  ["3", "Ricevi la proposta", "Se accetti, pagamento tracciabile e documentazione gestita in sede."]
];

const serviceCards = [
  ["Oro usato", "24kt, 22kt, 18kt, 14kt e tutte le principali carature."],
  ["Argento", "Lingotti, posate, gioielli e oggetti in argento 999, 925 e 800."],
  ["Diamanti", "Valutazione individuale in base a caratura, taglio, colore, purezza e documentazione disponibile. Il valore viene determinato dopo la verifica della pietra."],
  ["Gioielli e monete", "Stima immediata e controllo accurato dei tuoi preziosi."],
  ["Perizie certificate", "Perizia professionale con analisi tecnica, descrizione del bene e certificazione redatta da esperti del settore per gioielli, preziosi, monete e oggetti di valore."]
];

export function OroShopInspiredHome() {
  return (
    <>
      <main className="bg-[#f5f0e7] text-[#15120d]">
        <section className="relative isolate overflow-hidden bg-[#090807] text-warm">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 pt-10 lg:grid-cols-2 lg:gap-12 lg:py-10">
            <div className="relative z-10 max-w-2xl">
              <BrandLogo priority className="mb-5 w-28 sm:w-32" />
              <p className="inline-flex rounded-full bg-orange px-4 py-2 text-xs font-black uppercase tracking-wide text-night sm:text-sm">
                Compro oro premium
              </p>
              <h1 className="mt-4 font-display text-[2.75rem] font-black leading-[.94] sm:text-5xl md:text-6xl">
                Trasforma i tuoi preziosi in valore subito.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-warm/72 md:text-lg">
                Valutiamo oro, argento, diamanti, gioielli e monete con verifica professionale, massima riservatezza e pagamento chiaro in negozio.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link href="#negozi" className="rounded-full bg-orange px-7 py-4 text-center font-black text-night shadow-glow transition hover:ring-2 hover:ring-orange/50">
                  Richiedi una valutazione
                </Link>
                <Link href="#perizie" className="rounded-full border border-white/25 px-7 py-4 text-center font-black text-warm transition hover:border-orange hover:text-orange">
                  Perizie certificate
                </Link>
              </div>
              <div className="mt-5 grid max-w-xl gap-3 text-sm font-bold text-warm/70 sm:grid-cols-3">
                <span className="rounded-2xl border border-white/10 bg-white/[.06] px-4 py-3">Valutazione dedicata</span>
                <span className="rounded-2xl border border-white/10 bg-white/[.06] px-4 py-3">Verifica in sede</span>
                <span className="rounded-2xl border border-white/10 bg-white/[.06] px-4 py-3">Nessun impegno</span>
              </div>
            </div>

            <div data-hero-portrait className="relative z-10 mx-auto aspect-[2/3] w-full max-w-[480px] lg:max-w-[520px]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,rgba(239,80,11,.18),transparent_66%)]" />
              <Image
                src="/hero-ritratto-mezzobusto-20260923.png"
                alt="Donna con banconote in euro"
                fill
                priority
                sizes="(min-width: 1280px) 520px, (min-width: 1024px) 46vw, (min-width: 520px) 480px, calc(100vw - 40px)"
                className="object-contain object-bottom"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#090807] to-transparent" />
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

        <section id="perizie" className="bg-[#15120d] px-5 py-20 text-warm">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="font-bold uppercase tracking-[.22em] text-orange">Cosa valutiamo</p>
              <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">Preziosi, metalli e gioielli.</h2>
              <p className="mt-5 text-warm/65">Un unico percorso per stimare il valore online e completare la verifica in negozio con personale formato.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {serviceCards.map(([title, text], index) => (
                <article key={title} id={title === "Diamanti" ? "valutazione-diamanti" : undefined} className={`scroll-mt-28 rounded-2xl border border-white/10 bg-white/[.06] p-6 ${index === serviceCards.length - 1 ? "sm:col-span-2" : ""}`}>
                  <h3 className="font-display text-2xl font-black">{title}</h3>
                  <p className="mt-3 text-warm/64">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="negozi" className="px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="font-bold uppercase tracking-[.22em] text-orange">Punti vendita</p>
                <h2 className="mt-3 font-display text-4xl font-black text-orange md:text-5xl">Coming Soon</h2>
              </div>
              <Link href="#perizie" className="rounded-full bg-night px-6 py-3 text-center font-black text-orange transition hover:bg-black">
                Scopri le perizie
              </Link>
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
