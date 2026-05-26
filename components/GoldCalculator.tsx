"use client";

import { useEffect, useMemo, useState } from "react";

type MetalKey = "gold" | "silver" | "platinum";

type Metal = {
  key: MetalKey;
  label: string;
  defaultTitle: string;
  fallbackPriceKg: number;
  titles: { label: string; purity: number }[];
};

const metals: Metal[] = [
  {
    key: "gold",
    label: "Oro",
    defaultTitle: "18 kt",
    fallbackPriceKg: 98500,
    titles: [
      { label: "24 kt", purity: 1 },
      { label: "22 kt", purity: 22 / 24 },
      { label: "21 kt", purity: 21 / 24 },
      { label: "18 kt", purity: 18 / 24 },
      { label: "14 kt", purity: .585 },
      { label: "12 kt", purity: 12 / 24 },
      { label: "9 kt", purity: 9 / 24 },
      { label: "6 kt", purity: 6 / 24 }
    ]
  },
  {
    key: "silver",
    label: "Argento",
    defaultTitle: "925",
    fallbackPriceKg: 1120,
    titles: [
      { label: "999", purity: .999 },
      { label: "925", purity: .925 },
      { label: "800", purity: .8 }
    ]
  },
  {
    key: "platinum",
    label: "Platino",
    defaultTitle: "950",
    fallbackPriceKg: 31400,
    titles: [
      { label: "950", purity: .95 },
      { label: "900", purity: .9 },
      { label: "850", purity: .85 }
    ]
  }
];

const metalLabels: Record<string, MetalKey> = {
  oro: "gold",
  argento: "silver",
  platino: "platinum"
};

const initialPrices = metals.reduce<Record<MetalKey, number>>((prices, metal) => {
  prices[metal.key] = metal.fallbackPriceKg;
  return prices;
}, {} as Record<MetalKey, number>);

const currencyFormatter = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR"
});

function toNumber(value: string) {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function GoldCalculator() {
  const [grams, setGrams] = useState("25");
  const [metalKey, setMetalKey] = useState<MetalKey>("gold");
  const [title, setTitle] = useState("18 kt");
  const [pricesByMetal, setPricesByMetal] = useState(initialPrices);
  const [priceKg, setPriceKg] = useState(String(initialPrices.gold));
  const [priceTouched, setPriceTouched] = useState(false);

  const selectedMetal = metals.find((metal) => metal.key === metalKey) || metals[0];
  const selectedTitle = selectedMetal.titles.find((item) => item.label === title) || selectedMetal.titles[0];

  useEffect(() => {
    fetch("/api/quotes")
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!Array.isArray(data?.quotes)) return;

        const nextPrices = { ...initialPrices };
        for (const quote of data.quotes) {
          const quoteKey = metalLabels[String(quote.metal).toLowerCase()];
          const quotePrice = Number(quote.priceKg);
          if (quoteKey && Number.isFinite(quotePrice) && quotePrice > 0) {
            nextPrices[quoteKey] = quotePrice;
          }
        }

        setPricesByMetal(nextPrices);
        if (!priceTouched) {
          setPriceKg(String(nextPrices[metalKey]));
        }
      })
      .catch(() => undefined);
  }, [metalKey, priceTouched]);

  const value = useMemo(() => {
    const gramsValue = Math.max(0, toNumber(grams));
    const priceValue = Math.max(0, toNumber(priceKg));
    return (gramsValue / 1000) * priceValue * selectedTitle.purity;
  }, [grams, priceKg, selectedTitle.purity]);

  function handleMetalChange(nextMetalKey: MetalKey) {
    const nextMetal = metals.find((metal) => metal.key === nextMetalKey) || metals[0];
    setMetalKey(nextMetal.key);
    setTitle(nextMetal.defaultTitle);
    setPriceKg(String(pricesByMetal[nextMetal.key]));
    setPriceTouched(false);
  }

  return (
    <section id="calcolatore" className="section-pad px-5">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.92fr_1.08fr]">
        <div>
          <p className="font-bold uppercase tracking-[.22em] text-orange">Calcolatore valore</p>
          <h2 className="mt-2 font-display text-4xl font-black md:text-5xl">Stima immediata dei preziosi.</h2>
          <p className="mt-5 text-warm/65">Inserisci peso e titolo per ottenere una valutazione indicativa. La verifica finale avviene sempre in negozio con test professionale.</p>
        </div>
        <div className="glass rounded-[2rem] p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <label className="grid min-w-0 gap-2 text-sm font-bold text-warm/70">
              Grammi
              <input className="w-full min-w-0 rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-lg text-warm outline-none focus:border-orange" type="number" min="0" step="0.01" value={grams} onChange={(event) => setGrams(event.target.value)} />
            </label>
            <label className="grid min-w-0 gap-2 text-sm font-bold text-warm/70">
              Metallo
              <select className="w-full min-w-0 rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-lg text-warm outline-none focus:border-orange" value={metalKey} onChange={(event) => handleMetalChange(event.target.value as MetalKey)}>
                {metals.map((metal) => <option key={metal.key} value={metal.key}>{metal.label}</option>)}
              </select>
            </label>
            <label className="grid min-w-0 gap-2 text-sm font-bold text-warm/70">
              Titolo
              <select className="w-full min-w-0 rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-lg text-warm outline-none focus:border-orange" value={title} onChange={(event) => setTitle(event.target.value)}>
                {selectedMetal.titles.map((item) => <option key={item.label}>{item.label}</option>)}
              </select>
            </label>
            <label className="grid min-w-0 gap-2 text-sm font-bold text-warm/70">
              Prezzo EUR/kg
              <input className="w-full min-w-0 rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-lg text-warm outline-none focus:border-orange" type="number" min="0" step="0.01" value={priceKg} onChange={(event) => {
                setPriceKg(event.target.value);
                setPriceTouched(true);
              }} />
            </label>
          </div>
          <div className="mt-6 rounded-3xl bg-orange p-6 text-night">
            <p className="font-bold">Valore stimato</p>
            <strong className="mt-1 block break-words font-display text-4xl md:text-5xl">{currencyFormatter.format(value)}</strong>
            <p className="mt-2 text-sm font-bold text-night/65">
              {selectedMetal.label} {selectedTitle.label} · purezza {(selectedTitle.purity * 100).toLocaleString("it-IT", { maximumFractionDigits: 2 })}%
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
