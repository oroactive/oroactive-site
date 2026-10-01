"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PUBLIC_METALS, isQuoteLive, selectPublicQuotes, type PublicQuote } from "@/lib/public-quotes";

export function QuoteTicker() {
  const [quotes, setQuotes] = useState<PublicQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkedAt, setCheckedAt] = useState(0);

  useEffect(() => {
    let active = true;
    let controller: AbortController | undefined;
    let timeout: number | undefined;
    let inFlight = false;
    const refresh = async () => {
      if (document.hidden || inFlight) return;
      inFlight = true;
      setCheckedAt(Date.now());
      controller = new AbortController();
      timeout = window.setTimeout(() => controller?.abort(), 9000);
      try {
        const response = await fetch("/api/quotes", { signal: controller.signal, cache: "no-store" });
        const data = response.ok ? await response.json() : null;
        if (active) setQuotes(selectPublicQuotes(data));
      } catch {
        if (active) setQuotes([]);
      } finally {
        window.clearTimeout(timeout);
        inFlight = false;
        if (active) {
          setCheckedAt(Date.now());
          setLoading(false);
        }
      }
    };
    void refresh();
    const interval = window.setInterval(() => { void refresh(); }, 15000);
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("online", refresh);
    return () => {
      active = false;
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("online", refresh);
      controller?.abort();
    };
  }, []);

  return (
    <section id="quotazioni" className="section-pad scroll-mt-28 px-5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-bold uppercase tracking-[.22em] text-orange">Quotazioni e valutazioni</p>
            <h2 className="mt-2 font-display text-4xl font-black md:text-5xl">Oro, argento e diamanti</h2>
          </div>
          <a href="https://www.bullionvault.com/gold-price-chart.do" target="_blank" rel="noreferrer" className="hidden rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-warm/80 hover:border-orange hover:text-orange md:inline-flex">
            Fonte · BullionVault
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {PUBLIC_METALS.map((metal) => {
            const quote = quotes.find((item) => item.metal === metal);
            const live = quote && isQuoteLive(quote, checkedAt);
            return (
              <article key={metal} className="glass min-w-0 rounded-3xl p-6">
                <h3 className="text-warm/75">{metal}</h3>
                <strong className="mt-3 block break-words font-display text-3xl lg:text-4xl">
                  {quote ? new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(quote.priceKg) : loading ? "Caricamento…" : "Da verificare"}
                </strong>
                <span className="mt-3 inline-block text-sm font-bold text-satin">
                  {quote ? "al kg · prezzo spot del metallo puro" : loading ? "Recupero da BullionVault" : "Fonte temporaneamente non disponibile."}
                </span>
                {quote && (
                  <>
                    <p className="mt-2 text-sm text-warm/80">{new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(quote.priceKg / 1000)} al grammo</p>
                    <p className={`mt-4 text-sm font-bold ${live ? "text-green-300" : "text-satin"}`}>{live ? "Live · BullionVault" : "Ultimo dato disponibile · non live"}</p>
                    <time dateTime={quote.updatedAt} className="mt-1 block text-xs leading-5 text-warm/70">{new Intl.DateTimeFormat("it-IT", { dateStyle: "short", timeStyle: "medium", timeZone: "Europe/Rome" }).format(new Date(quote.updatedAt))} · ora italiana</time>
                  </>
                )}
                <a href={metal === "Oro" ? "https://www.bullionvault.com/gold-price-chart.do" : "https://www.bullionvault.com/silver-price-chart.do"} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-orange underline underline-offset-4">Vedi {metal.toLowerCase()} su BullionVault</a>
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
        <p className="mt-5 text-sm leading-6 text-warm/70">Oro e argento: aggiornamento automatico ogni 15 secondi mentre la pagina è visibile. Prezzi spot indicativi da BullionVault, non prezzi di acquisto OroActive: la proposta in negozio dipende da titolo, peso e verifica del bene. A mercati chiusi o in caso di ritardi della fonte, l’ultimo dato non è indicato come live.</p>
      </div>
    </section>
  );
}
