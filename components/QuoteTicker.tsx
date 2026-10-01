"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PUBLIC_METALS, selectPublicQuotes, type PublicQuote } from "@/lib/public-quotes";

export function QuoteTicker() {
  const [quotes, setQuotes] = useState<PublicQuote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    let active = true;
    fetch("/api/quotes", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (active) setQuotes(selectPublicQuotes(data));
      })
      .catch(() => { if (active) setQuotes([]); })
      .finally(() => {
        window.clearTimeout(timeout);
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return (
    <section id="quotazioni" className="section-pad px-5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-bold uppercase tracking-[.22em] text-orange">Quotazioni e valutazioni</p>
            <h2 className="mt-2 font-display text-4xl font-black md:text-5xl">Oro, argento e diamanti</h2>
          </div>
          <a href="https://www.bullionvault.com" target="_blank" rel="noreferrer" className="hidden rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-warm/80 hover:border-orange hover:text-orange md:inline-flex">
            Mercato dei metalli · BullionVault
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {PUBLIC_METALS.map((metal) => {
            const quote = quotes.find((item) => item.metal === metal);
            return (
              <article key={metal} className="glass min-w-0 rounded-3xl p-6">
                <h3 className="text-warm/75">{metal}</h3>
                <strong className="mt-3 block break-words font-display text-3xl lg:text-4xl">
                  {quote ? new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(quote.priceKg) : loading ? "Caricamento…" : "Da verificare"}
                </strong>
                <span className="mt-3 inline-block text-sm font-bold text-satin">
                  {quote ? "al kg · quotazione di riferimento" : loading ? "Recupero della quotazione" : "Quotazione non disponibile: verifica in negozio."}
                </span>
              </article>
            );
          })}
          <article className="glass min-w-0 rounded-3xl border-orange/30 p-6">
            <h3 className="text-warm/75">Diamanti</h3>
            <strong className="mt-3 block font-display text-3xl">Valutazione dedicata</strong>
            <p className="mt-3 text-sm leading-6 text-warm/75">Ogni pietra viene valutata singolarmente per caratura, taglio, colore e purezza.</p>
            <Link href="#valutazione-diamanti" className="mt-5 inline-flex min-h-11 items-center rounded-full bg-orange px-5 py-3 text-sm font-bold text-night transition hover:shadow-glow">
              Scopri la valutazione diamanti
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
