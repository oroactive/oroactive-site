import { Nav } from "@/components/Nav";

const kpis = ["Lead oggi", "Quotazioni bloccate", "Corsi attivi", "Badge rilasciati", "Negozi attivi", "Alert CMS"];

export const metadata = {
  title: "Dashboard amministrativa",
  robots: { index: false, follow: false }
};

export default function DashboardPage() {
  return (
    <>
      <Nav />
      <main className="px-5 py-16">
        <section className="mx-auto max-w-7xl">
          <h1 className="font-display text-5xl font-black">Dashboard amministrativa OroActive</h1>
          <p className="mt-4 text-warm/65">Gestione contenuti, Academy, negozi, quotazioni, blog, FAQ e lead.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {kpis.map((kpi, index) => (
              <article key={kpi} className="glass rounded-3xl p-6">
                <p className="text-warm/55">{kpi}</p>
                <strong className="mt-2 block font-display text-4xl">{index === 0 ? "24" : "—"}</strong>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
