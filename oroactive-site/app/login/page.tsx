import { Nav } from "@/components/Nav";

export const metadata = {
  title: "Login OroActive",
  robots: { index: false, follow: false }
};

export default function LoginPage() {
  return (
    <>
      <Nav />
      <main className="grid min-h-[calc(100vh-80px)] place-items-center px-5 py-16">
        <form className="glass w-full max-w-md rounded-[2rem] p-8">
          <h1 className="font-display text-4xl font-black">Area riservata</h1>
          <p className="mt-2 text-warm/60">Accesso utenti, amministratori e Academy.</p>
          <label className="mt-6 grid gap-2 text-sm font-bold text-warm/70">
            Email
            <input className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 outline-none focus:border-orange" type="email" />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-bold text-warm/70">
            Password
            <input className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 outline-none focus:border-orange" type="password" />
          </label>
          <button className="mt-6 w-full rounded-full bg-orange px-6 py-4 font-bold text-night">Accedi</button>
        </form>
      </main>
    </>
  );
}
