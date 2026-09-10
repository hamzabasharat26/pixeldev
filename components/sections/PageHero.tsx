import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  children?: ReactNode;
};

/** Compact page header used on every route except the homepage. */
export function PageHero({
  eyebrow,
  title,
  intro,
  tone = "light",
  children,
}: PageHeroProps) {
  const dark = tone === "dark";
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40",
        dark ? "on-dark bg-navy-ink" : "bg-paper",
      )}
    >
      {dark ? (
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 100% at 8% -20%, var(--color-navy-800) 0%, transparent 60%), radial-gradient(80% 80% at 106% 118%, var(--color-amber-glow) 0%, transparent 62%)",
            }}
          />
          <div className="glow-orb -right-20 -top-16 h-80 w-80 bg-amber-glow" />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="glow-orb -right-24 -top-24 -z-10 h-72 w-72 bg-amber-glow"
        />
      )}
      <div className="container-page">
        <Eyebrow tone={dark ? "light" : "dark"}>{eyebrow}</Eyebrow>
        <h1
          className={cn(
            "text-h1 mt-5 max-w-3xl",
            dark ? "text-d-text" : "text-ink",
          )}
        >
          {title}
        </h1>
        {intro && (
          <p
            className={cn(
              "text-body-lg mt-5 max-w-2xl",
              dark ? "text-d-muted" : "text-muted",
            )}
          >
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
