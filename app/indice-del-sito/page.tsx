import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/Sections";
import { appUrl } from "@/lib/company";

export const metadata: Metadata = {
  title: "Indice del sito",
  description: "Tutte le pagine e le sezioni pubbliche del sito OroActive.",
  alternates: { canonical: "/indice-del-sito" }
};

const pages = [
  ["Homepage", "/", "Presentazione di OroActive e dei servizi di valutazione."],
  ["Quotazioni", "/#quotazioni", "Quotazioni di oro e argento con indicazione della fonte."],
  ["Perizie e valutazioni", "/#perizie", "Informazioni sulla valutazione dei preziosi."],
  ["Negozi", "/#negozi", "Aggiornamenti sui punti vendita OroActive."],
  ["Domande frequenti", "/#blog", "Risposte alle domande sui servizi."],
  ["Privacy Policy", "/privacy-policy", "Dati personali, contatti del titolare e strumenti tecnici."],
  ["Indice del sito", "/indice-del-sito", "L’elenco delle pagine che stai consultando."]
];

export default function SiteIndex() {
  return <>
    <Nav />
    <main className="mx-auto max-w-4xl px-5 py-12 sm:py-20">
      <p className="font-bold uppercase tracking-widest text-orange">OroActive</p>
      <h1 className="mt-3 font-display text-4xl font-black sm:text-5xl">Indice del sito</h1>
      <p className="mt-5 leading-8 text-warm/70">Trova le pagine e le sezioni del sito pubblico.</p>
      <ul className="mt-9 grid gap-4 sm:grid-cols-2">
        {pages.map(([label, href, description]) => <li key={href} className="glass rounded-2xl p-6">
          <Link href={href} className="font-display text-xl font-bold text-orange underline underline-offset-4">{label}</Link>
          <p className="mt-3 leading-7 text-warm/75">{description}</p>
        </li>)}
      </ul>
      <p className="mt-9 leading-8 text-warm/75">Per gli utenti autorizzati: <a href={appUrl} className="font-bold text-orange underline underline-offset-4">Area riservata del gestionale</a>.</p>
    </main>
    <SiteFooter />
  </>;
}
