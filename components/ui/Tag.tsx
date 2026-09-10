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
        "text-data inline-flex items-center rounded-full border px-2.5 py-1 text-[0.7rem]",
        tone === "dark"
          ? "border-line bg-surface-2 text-faint"
          : "border-d-line bg-d-surface-2 text-d-muted",
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
