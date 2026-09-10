"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav } from "@/content/site";
import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MobileNav } from "./MobileNav";

/** The only routes whose hero opens on the light paper ground. */
const LIGHT_HERO_ROUTES = ["/contact", "/privacy", "/terms"];

function isActive(pathname: string, href: string, exact?: boolean) {
  return exact ? pathname === href : pathname.startsWith(href);
}

/**
 * Floating glass bar. Sits over the hero it opens on, gains weight and a
 * paper ground once the page scrolls past the fold.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const overDarkHero = !LIGHT_HERO_ROUTES.includes(pathname) && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-4">
      <div
        className={cn(
          "flex h-[3.75rem] w-full max-w-[1220px] items-center justify-between gap-4 rounded-2xl px-3 pl-4 transition-[background-color,border-color,box-shadow] duration-300 sm:px-4 sm:pl-5",
          overDarkHero
            ? "glass text-d-text"
            : "glass-paper text-ink shadow-e1",
          scrolled && !overDarkHero && "shadow-e2",
        )}
      >
        <Link href="/" className="relative z-10 shrink-0">
          <Logo variant={overDarkHero ? "light" : "dark"} withSolutions />
          <span className="sr-only">— home</span>
        </Link>

        <nav
          aria-label="Primary"
          className="relative z-10 hidden items-center gap-1 lg:flex"
        >
          {primaryNav.map((item) => {
            const active = isActive(pathname, item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-[0.9rem] font-medium transition-colors",
                  overDarkHero
                    ? active
                      ? "bg-white/10 text-d-text"
                      : "text-d-muted hover:bg-white/6 hover:text-d-text"
                    : active
                      ? "bg-ink/6 text-ink"
                      : "text-muted hover:bg-ink/4 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-10 flex items-center gap-1">
          <div className="hidden lg:block">
            <LinkButton href="/contact" size="sm">
              Start a project
            </LinkButton>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
