"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type MouseEvent, useEffect, useState } from "react";

const links = [
  ["Quotazioni", "/#quotazioni"],
  ["Perizie", "/#perizie"],
  ["Negozi", "/#negozi"],
  ["Academy", "/academy"],
  ["Franchising", "/#franchising"],
  ["Blog", "/#blog"]
];

function scrollToSection(target: string, behavior: ScrollBehavior = "smooth") {
  const scroll = () => {
    document.getElementById(target)?.scrollIntoView({ behavior, block: "start" });
  };

  window.requestAnimationFrame(scroll);
  window.setTimeout(scroll, 120);
  window.setTimeout(scroll, 360);
}

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [accountName, setAccountName] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    const savedTarget = window.sessionStorage.getItem("oroactive-section-target");
    const hashTarget = window.location.hash.replace("#", "");
    const target = savedTarget || hashTarget;
    if (!target) return;

    window.sessionStorage.removeItem("oroactive-section-target");
    scrollToSection(target, "auto");
  }, [pathname]);

  useEffect(() => {
    const syncAccountName = () => {
      setAccountName(window.localStorage.getItem("oroactive-account-name"));
    };

    syncAccountName();
    window.addEventListener("storage", syncAccountName);
    return () => window.removeEventListener("storage", syncAccountName);
  }, [pathname]);

  function handleSectionClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("/#")) return;

    event.preventDefault();
    const target = href.slice(2);
    if (pathname === "/") {
      window.history.pushState(null, "", href);
      scrollToSection(target);
      return;
    }

    window.sessionStorage.setItem("oroactive-section-target", target);
    router.push(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label="OroActive home">
          <Image
            src="/oroactive-logo.png"
            alt="OroActive"
            width={108}
            height={135}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>
        <div className="hidden items-center gap-6 text-sm text-warm/75 lg:flex">
          {links.map(([label, href]) => (
            <Link key={label} href={href} onClick={(event) => handleSectionClick(event, href)} className="transition hover:text-orange">{label}</Link>
          ))}
        </div>
        <Link
          href={accountName ? "/dashboard" : "/login"}
          className="rounded-full bg-orange px-5 py-2 text-sm font-bold text-night transition hover:bg-[#ff922e]"
        >
          {accountName || "Area riservata"}
        </Link>
      </nav>
    </header>
  );
}
