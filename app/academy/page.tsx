import { Nav } from "@/components/Nav";

const tabs = ["Catalogo corsi", "I miei corsi", "Certificazioni", "Badge", "Storico formazione", "Gestione Academy"];

export const metadata = {
  title: "OroActive Academy",
  description: "Piattaforma formativa interna OroActive con corsi, badge e certificazioni."
};

export default function AcademyPage() {
  return (
    <>
      <Nav />
      <main className="px-5 py-16">
        <section className="mx-auto max-w-7xl">
          <p className="font-bold uppercase tracking-[.22em] text-orange">Academy</p>
          <h1 className="mt-3 font-display text-5xl font-black">OroActive Academy</h1>
          <p className="mt-4 max-w-3xl text-warm/65">Facoltà, corsi, moduli, video lezioni, materiali, esami in presenza/live, certificati PDF e badge digitali.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {tabs.map((tab, index) => (
              <button key={tab} className={`rounded-full px-5 py-3 text-sm font-bold ${index === 0 ? "bg-orange text-night" : "border border-white/15 text-warm/75"}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {["Oro 18KT Base", "Antiriciclaggio Operativo", "Procedure Documentali"].map((course) => (
              <article key={course} className="glass rounded-3xl p-6">
                <span className="text-sm font-bold text-satin">Corso Base</span>
                <h2 className="mt-2 font-display text-2xl font-bold">{course}</h2>
                <p className="mt-3 text-warm/62">Video lezioni, PDF scaricabili, tracking avanzamento e certificazione finale.</p>
                <div className="mt-5 h-2 rounded-full bg-white/10"><span className="block h-2 w-1/3 rounded-full bg-orange" /></div>
                <button className="mt-5 rounded-full bg-orange px-5 py-3 font-bold text-night">Inizia corso</button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
