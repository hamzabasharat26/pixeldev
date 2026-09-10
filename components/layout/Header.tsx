"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav } from "@/content/site";
import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MobileNav } from "./MobileNav";

/** Routes whose first section opens on a dark surface. */
const DARK_HERO_ROUTES = ["/", "/work"];

/**
 * Floating pill header. Translucent + blurred, sits over the hero it opens on,
 * gains weight once the page scrolls past the fold.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const overDarkHero = DARK_HERO_ROUTES.includes(pathname) && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3">
      <div
        className={cn(
          "flex h-14 w-full max-w-[1180px] items-center justify-between gap-4 rounded-full border px-4 pl-5 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 sm:px-5 sm:pl-6",
          overDarkHero
            ? "border-white/12 bg-navy-900/55 text-d-text"
            : "border-line/80 bg-paper/82 text-ink shadow-e1",
          scrolled && !overDarkHero && "bg-paper/92 shadow-e2",
        )}
      >
        <Link href="/" className="shrink-0">
          <Logo variant={overDarkHero ? "light" : "dark"} />
          <span className="sr-only">— home</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 lg:flex"
        >
          {primaryNav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-1 text-[0.9rem] font-medium transition-colors",
                  overDarkHero
                    ? "text-d-muted hover:text-d-text"
                    : "text-muted hover:text-ink",
                  active && "text-amber-600",
                  active && overDarkHero && "text-amber",
                )}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-0.5 left-0 h-[2px] w-full rounded bg-amber"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
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
