"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_.92fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <Image
            src="/oroactive-logo.png"
            alt="OroActive"
            width={300}
            height={375}
            priority
            className="mb-7 h-auto w-48 sm:w-56 md:w-64"
          />
          <p className="mb-5 inline-flex rounded-full border border-orange/40 bg-orange/10 px-4 py-2 text-sm font-bold text-orange">
            Compro oro premium + tecnologia proprietaria
          </p>
          <h1 className="font-display text-5xl font-black leading-[.94] text-warm md:text-7xl">
            Il nuovo standard per vendere oro in modo chiaro, veloce e sicuro.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-warm/72">
            OroActive combina quotazioni live, consulenza professionale, gestione digitale degli atti e formazione interna per offrire un&apos;esperienza premium nei compro oro moderni.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#negozi" className="rounded-full bg-orange px-7 py-4 text-center font-bold text-night shadow-glow transition hover:scale-[1.02]">
              Richiedi una valutazione
            </Link>
            <Link href="#negozi" className="rounded-full border border-white/15 px-7 py-4 text-center font-bold text-warm transition hover:border-orange hover:text-orange">
              Trova negozio
            </Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .12 }} className="glass orange-glow rounded-[2rem] p-5">
          <div className="rounded-[1.5rem] border border-orange/20 bg-black/40 p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-[.25em] text-orange">Control Center</span>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">Live</span>
            </div>
            <div className="grid gap-4">
              {[
                ["Oro 18kt", "Valutazione rapida", "+ aggiornamento mercato"],
                ["Stima preziosi", "Oro, argento e platino", "tutte le carature"],
                ["Academy", "Operatori formati", "standard OroActive"]
              ].map(([title, value, note]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[.04] p-5">
                  <p className="text-sm text-warm/50">{title}</p>
                  <strong className="mt-1 block font-display text-2xl">{value}</strong>
                  <span className="text-sm text-satin">{note}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
