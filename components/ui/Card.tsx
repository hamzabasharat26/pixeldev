import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Surface container. On light sections: hairline border + soft shadow on hover.
 * On dark sections: 1px surface-border outline, no shadow (brief §4.3).
 */
export function Card({
  children,
  tone = "dark",
  interactive = false,
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  interactive?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[16px] p-6 md:p-8",
        tone === "dark"
          ? "border border-grey-200 bg-white"
          : "border border-surface-border bg-surface-raised",
        interactive &&
          (tone === "dark"
            ? "transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-amber/60 hover:shadow-[0_12px_32px_rgb(16_24_40/0.10)]"
            : "transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-amber/50"),
        className,
      )}
    >
      {children}
    </div>
  );
}
