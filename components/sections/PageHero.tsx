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
        dark ? "on-dark" : "bg-grey-50",
      )}
    >
      {dark && (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(120% 100% at 10% -20%, #16335f 0%, rgba(18,41,75,0) 60%), radial-gradient(70% 70% at 105% 115%, rgba(233,161,60,0.16) 0%, rgba(233,161,60,0) 60%)",
          }}
        />
      )}
      <div className="container-page">
        <Eyebrow tone={dark ? "light" : "dark"}>{eyebrow}</Eyebrow>
        <h1
          className={cn(
            "text-h1 mt-5 max-w-3xl",
            dark ? "text-grey-50" : "text-navy",
          )}
        >
          {title}
        </h1>
        {intro && (
          <p
            className={cn(
              "text-body-lg mt-5 max-w-2xl",
              dark ? "text-grey-300" : "text-grey-700",
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
