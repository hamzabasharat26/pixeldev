import { useLenis } from "lenis/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { primaryNav, site } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";

// No "use client" directive: this component is only ever rendered by the
// client-side Header, so it is already in the client graph. Adding the
// directive would make it a client entry and forbid the onClose callback prop.

/** Full-screen navigation drawer for < lg. Traps focus, closes on Esc. */
export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    lenis?.stop();

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusables?.[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      lenis?.start();
      previouslyFocused?.focus?.();
    };
  }, [open, onClose, lenis]);

  return (
    <div
      id="mobile-nav"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      hidden={!open}
      className="fixed inset-0 top-0 z-40 flex flex-col bg-surface-base px-6 pb-10 pt-24 lg:hidden"
    >
      <nav aria-label="Mobile" className="flex flex-col">
        {primaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="text-h3 border-b border-surface-border py-5 text-grey-50"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-4 pt-10">
        <LinkButton href="/contact" size="lg" className="w-full">
          Start a Project
        </LinkButton>
        <div className="text-data flex flex-col gap-1 text-sm text-grey-400">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.phoneHref}>{site.phoneDisplay}</a>
          <span>{site.locationShort}</span>
        </div>
      </div>
    </div>
  );
}
