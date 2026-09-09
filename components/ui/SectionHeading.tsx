import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: { label: string; href: string };
  tone?: "dark" | "light";
  className?: string;
  /** Render the title as h1 (page hero) instead of the default h2. */
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  tone = "dark",
  className,
  as = "h2",
}: SectionHeadingProps) {
  const Title = as;
  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <Title
          className={cn(
            as === "h1" ? "text-h1" : "text-h2",
            "mt-4",
            tone === "light" ? "text-grey-50" : "text-navy",
          )}
        >
          {title}
        </Title>
        {intro && (
          <p
            className={cn(
              "text-body-lg mt-4",
              tone === "light" ? "text-grey-300" : "text-grey-700",
            )}
          >
            {intro}
          </p>
        )}
      </div>

      {action && (
        <Link
          href={action.href}
          className={cn(
            "text-eyebrow group inline-flex shrink-0 items-center gap-1.5 pb-1",
            tone === "light" ? "text-grey-100" : "text-navy",
          )}
        >
          {action.label}
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </Link>
      )}
    </div>
  );
}
