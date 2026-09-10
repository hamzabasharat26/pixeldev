"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer } from "vaul";
import { primaryNav, site } from "@/content/site";
import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/Button";

/**
 * Mobile navigation — a vaul drawer sliding in from the right. vaul handles
 * the focus trap, scroll lock, Esc, drag-to-dismiss and aria-modal. Each nav
 * link is wrapped in Drawer.Close so it dismisses as it navigates.
 */
export function MobileNav() {
  const pathname = usePathname();

  return (
    <Drawer.Root direction="right">
      <Drawer.Trigger
        aria-label="Open menu"
        className="relative -mr-1 flex h-10 w-10 items-center justify-center text-current lg:hidden"
      >
        <span className="sr-only">Menu</span>
        <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
          <span className="h-[2px] w-full rounded bg-current" />
          <span className="h-[2px] w-full rounded bg-current" />
          <span className="h-[2px] w-3.5 rounded bg-current" />
        </span>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-navy-ink/60 backdrop-blur-[2px]" />
        <Drawer.Content
          aria-label="Site menu"
          className="fixed inset-y-0 right-0 z-40 flex w-[86%] max-w-sm flex-col bg-navy-900 px-6 pb-10 pt-8 text-d-text outline-none"
        >
          <Drawer.Title className="sr-only">Site menu</Drawer.Title>
          <div className="flex items-center justify-between">
            <span className="text-eyebrow text-d-muted">Menu</span>
            <Drawer.Close
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-d-muted"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                &times;
              </span>
            </Drawer.Close>
          </div>

          <nav aria-label="Mobile" className="mt-8 flex flex-col">
            {primaryNav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Drawer.Close asChild key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "border-b border-white/10 py-4 text-h4 transition-colors",
                      active
                        ? "text-amber-300"
                        : "text-d-text hover:text-amber-300",
                    )}
                  >
                    {item.label}
                  </Link>
                </Drawer.Close>
              );
            })}
          </nav>

          <div className="mt-auto flex flex-col gap-5 pt-10">
            <Drawer.Close asChild>
              <LinkButton href="/contact" size="lg" className="w-full">
                Start a project
              </LinkButton>
            </Drawer.Close>
            <div className="text-data flex flex-col gap-1.5 text-sm text-d-muted">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={site.phoneHref}>{site.phoneDisplay}</a>
              <span>{site.locationShort}</span>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
