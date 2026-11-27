import Link from "next/link";
import { cn } from "cn";

/** The COMSAT Hackathon wordmark, linking home. */
export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex min-h-11 items-center gap-2.5 rounded-md font-semibold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      <span
        aria-hidden
        className="grid size-8 place-items-center rounded-md bg-foreground text-sm font-bold text-background"
      >
        C
      </span>
      <span className="whitespace-nowrap">COMSAT Hackathon</span>
    </Link>
  );
}
