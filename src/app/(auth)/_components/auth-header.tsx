import type { ReactNode } from "react";

export function AuthHeader({
  title,
  description,
}: {
  title: string;
  description: ReactNode;
}) {
  return (
    <header className="mb-8 space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h1>
      <p className="text-base text-muted-foreground">{description}</p>
    </header>
  );
}

export function AuthFooter({ children }: { children: ReactNode }) {
  return (
    <p className="mt-8 text-center text-sm text-muted-foreground">{children}</p>
  );
}
