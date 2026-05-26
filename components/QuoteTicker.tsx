"use client";

import { useEffect, useState } from "react";

type Quote = { metal: string; priceKg: number; change?: string };

const fallback: Quote[] = [
  { metal: "Oro", priceKg: 98500, change: "+0,42%" },
  { metal: "Argento", priceKg: 1120, change: "+0,18%" },
  { metal: "Platino", priceKg: 31400, change: "-0,06%" }
];

export function QuoteTicker() {
  const [quotes, setQuotes] = useState<Quote[]>(fallback);

  useEffect(() => {
    fetch("/api/quotes")
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (Array.isArray(data?.quotes) && data.quotes.length) setQuotes(data.quotes);
      })
      .catch(() => setQuotes(fallback));
  }, []);

  return (
    <section id="quotazioni" className="section-pad px-5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-bold uppercase tracking-[.22em] text-orange">Quotazioni live</p>
            <h2 className="mt-2 font-display text-4xl font-black md:text-5xl">Oro, argento e platino</h2>
          </div>
          <a href="https://www.bullionvault.com" target="_blank" rel="noreferrer" className="hidden rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-warm/80 hover:border-orange hover:text-orange md:inline-flex">
            Fonte BullionVault
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {quotes.map((quote) => (
            <article key={quote.metal} className="glass rounded-3xl p-6">
              <p className="text-warm/55">{quote.metal}</p>
              <strong className="mt-3 block font-display text-4xl">
                {new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(quote.priceKg)}
              </strong>
              <span className="mt-3 inline-block text-sm font-bold text-satin">al kg · {quote.change || "mercato live"}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
