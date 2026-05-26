"use client";

import { useMemo, useState } from "react";

const titles: Record<string, number> = {
  "24 kt": 1,
  "22 kt": .916,
  "18 kt": .75,
  "14 kt": .585,
  "Argento 925": .925,
  "Platino 950": .95
};

export function GoldCalculator() {
  const [grams, setGrams] = useState(25);
  const [title, setTitle] = useState("18 kt");
  const [priceKg, setPriceKg] = useState(98500);
  const value = useMemo(() => (grams / 1000) * priceKg * titles[title], [grams, priceKg, title]);

  return (
    <section id="calcolatore" className="section-pad px-5">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.92fr_1.08fr]">
        <div>
          <p className="font-bold uppercase tracking-[.22em] text-orange">Calcolatore valore</p>
          <h2 className="mt-2 font-display text-4xl font-black md:text-5xl">Stima immediata dei preziosi.</h2>
          <p className="mt-5 text-warm/65">Inserisci peso e titolo per ottenere una valutazione indicativa. La verifica finale avviene sempre in negozio con test professionale.</p>
        </div>
        <div className="glass rounded-[2rem] p-6">
          <div className="grid gap-5 md:grid-cols-3">
            <label className="grid gap-2 text-sm font-bold text-warm/70">
              Grammi
              <input className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-lg text-warm outline-none focus:border-orange" type="number" value={grams} onChange={(event) => setGrams(Number(event.target.value))} />
            </label>
            <label className="grid gap-2 text-sm font-bold text-warm/70">
              Titolo
              <select className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-lg text-warm outline-none focus:border-orange" value={title} onChange={(event) => setTitle(event.target.value)}>
                {Object.keys(titles).map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-warm/70">
              Prezzo EUR/kg
              <input className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-lg text-warm outline-none focus:border-orange" type="number" value={priceKg} onChange={(event) => setPriceKg(Number(event.target.value))} />
            </label>
          </div>
          <div className="mt-6 rounded-3xl bg-orange p-6 text-night">
            <p className="font-bold">Valore stimato</p>
            <strong className="mt-1 block font-display text-5xl">{new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(value)}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
