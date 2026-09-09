"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { primaryNav, site } from "@/content/site";
import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MobileNav } from "./MobileNav";

/** Routes whose hero opens on a dark surface — header starts light-on-dark there. */
const DARK_HERO_ROUTES = ["/", "/work"];

/**
 * Sticky header. Sits transparent over the section it opens on, then settles
 * onto a blurred light bar once the page scrolls past the fold.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const heroIsDark = DARK_HERO_ROUTES.includes(pathname);

  // Menu is "open at" a path; a route change makes menuOpen fall to false with
  // no effect / no setState-in-effect.
  const [menuOpenAt, setMenuOpenAt] = useState<string | null>(null);
  const menuOpen = menuOpenAt === pathname;
  const closeMenu = useCallback(() => setMenuOpenAt(null), []);
  const toggleMenu = () =>
    setMenuOpenAt((cur) => (cur === pathname ? null : pathname));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solidBar = scrolled && !menuOpen;
  // Light content over: the open (dark) drawer, or an unscrolled dark hero.
  const lightContent = menuOpen || (!solidBar && heroIsDark);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          solidBar
            ? "border-b border-grey-200 bg-grey-50/85 backdrop-blur-md"
            : "border-b border-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="shrink-0"
            onClick={closeMenu}
          >
            <Logo variant={lightContent ? "light" : "dark"} />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {primaryNav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-[0.95rem] font-medium transition-colors",
                    lightContent
                      ? "text-grey-100 hover:text-white"
                      : "text-navy hover:text-navy-600",
                    active &&
                      "underline decoration-amber decoration-2 underline-offset-8",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <LinkButton href="/contact" size="md">
              Start a Project
            </LinkButton>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={toggleMenu}
            className={cn(
              "relative z-50 -mr-2 flex h-11 w-11 items-center justify-center lg:hidden",
              lightContent ? "text-white" : "text-navy",
            )}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-6 flex-col gap-[5px]">
              <span
                className={cn(
                  "h-0.5 w-full rounded bg-current transition-transform duration-200",
                  menuOpen && "translate-y-[7px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-full rounded bg-current transition-opacity duration-200",
                  menuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-full rounded bg-current transition-transform duration-200",
                  menuOpen && "-translate-y-[7px] -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={closeMenu} />
    </>
  );
}
