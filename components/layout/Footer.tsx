import Link from "next/link";
import { footerNav, site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="on-dark">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <Logo variant="light" withSolutions />
          <p className="max-w-xs text-sm text-grey-400">{site.tagline}</p>
        </div>

        {(["Services", "Company"] as const).map((col) => (
          <nav key={col} aria-label={col} className="flex flex-col gap-3">
            <p className="text-eyebrow text-grey-500">{col}</p>
            {footerNav[col].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-grey-300 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ))}

        <div className="flex flex-col gap-3">
          <p className="text-eyebrow text-grey-500">Get in touch</p>
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-grey-300 hover:text-white"
          >
            {site.email}
          </a>
          <a
            href={site.phoneHref}
            className="text-sm text-grey-300 hover:text-white"
          >
            {site.phoneDisplay}
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-grey-300 hover:text-white"
          >
            WhatsApp
          </a>
          <p className="text-sm text-grey-400">
            {site.address.line1}, {site.address.line2}
            <br />
            {site.address.city}, {site.address.country}
          </p>
        </div>
      </div>

      <div className="border-t border-surface-border">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-grey-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <nav aria-label="Legal" className="flex gap-5">
            {footerNav.Legal.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-grey-300">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
