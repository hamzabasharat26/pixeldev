import { cn } from "@/lib/utils";

/** Monospace capability / tech tag. */
export function Tag({
  children,
  tone = "dark",
  className,
}: {
  children: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-data inline-flex items-center rounded-full border px-2.5 py-1 text-xs",
        tone === "dark"
          ? "border-grey-200 bg-white text-grey-700"
          : "border-surface-border bg-surface-elevated text-grey-300",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TagRow({
  items,
  tone = "dark",
  className,
}: {
  items: readonly string[];
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li key={item}>
          <Tag tone={tone}>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
