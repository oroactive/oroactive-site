import Image from "next/image";
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
        <Link href="/" className="flex shrink-0 items-center" aria-label="OroActive home">
          <Image
            src="/oroactive-logo.svg"
            alt="OroActive"
            width={186}
            height={48}
            priority
            className="h-10 w-auto sm:h-12"
          />
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
