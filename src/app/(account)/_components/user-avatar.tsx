import { cn } from "cn";

export function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters =
    parts.length > 1 ? [parts[0], parts[parts.length - 1]] : parts.slice(0, 1);
  return letters.map((part) => part[0]?.toUpperCase() ?? "").join("");
}

/** A monochrome circle with the user's initials. */
export function UserAvatar({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-full bg-foreground text-sm font-semibold text-background select-none",
        className,
      )}
    >
      {initialsOf(name)}
    </span>
  );
}
