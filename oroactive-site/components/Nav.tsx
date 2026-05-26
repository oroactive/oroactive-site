import Link from "next/link";

const links = [
  ["Quotazioni", "#quotazioni"],
  ["Calcolatore", "#calcolatore"],
  ["Negozi", "#negozi"],
  ["Academy", "/academy"],
  ["Franchising", "#franchising"],
  ["Blog", "#blog"]
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-orange/70 bg-orange/10 text-lg font-black text-orange">OA</span>
          <span className="font-display text-xl font-bold tracking-tight">OroActive</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-warm/75 lg:flex">
          {links.map(([label, href]) => (
            <Link key={label} href={href} className="transition hover:text-orange">{label}</Link>
          ))}
        </div>
        <Link href="/login" className="rounded-full bg-orange px-5 py-2 text-sm font-bold text-night transition hover:bg-[#ff922e]">
          Area riservata
        </Link>
      </nav>
    </header>
  );
}
