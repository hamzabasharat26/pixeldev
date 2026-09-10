import Link from "next/link";
import { footerNav, site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="on-dark relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="glow-orb -left-24 bottom-[-30%] h-[26rem] w-[26rem] text-amber opacity-[0.13]"
      />
      <div
        aria-hidden="true"
        className="glow-orb right-[-10%] top-[-40%] h-[24rem] w-[24rem] text-navy-500 opacity-25"
      />

      <div className="container-page relative grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr_1.2fr] md:py-20">
        <div className="flex flex-col gap-4">
          <Logo variant="light" withSolutions />
          <p className="max-w-xs text-sm leading-relaxed text-d-muted">
            {site.positioning}
          </p>
          <p className="text-eyebrow mt-1 text-d-muted">{site.locationShort}</p>
        </div>

        {(["Services", "Company"] as const).map((col) => (
          <nav key={col} aria-label={col} className="flex flex-col gap-3">
            <p className="text-eyebrow text-d-muted">{col}</p>
            {footerNav[col].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-d-text/80 transition-colors hover:text-amber-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ))}

        <div className="flex flex-col gap-3">
          <p className="text-eyebrow text-d-muted">Get in touch</p>
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-d-text/80 transition-colors hover:text-amber-300"
          >
            {site.email}
          </a>
          <a
            href={site.phoneHref}
            className="text-sm text-d-text/80 transition-colors hover:text-amber-300"
          >
            {site.phoneDisplay}
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-d-text/80 transition-colors hover:text-amber-300"
          >
            WhatsApp
          </a>
          <p className="mt-1 text-sm leading-relaxed text-d-muted">
            {site.address.line1}, {site.address.line2}
            <br />
            {site.address.city}, {site.address.country}
          </p>
        </div>
      </div>

      <div className="relative border-t border-d-line">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-d-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex gap-5">
            {footerNav.Legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-amber-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
