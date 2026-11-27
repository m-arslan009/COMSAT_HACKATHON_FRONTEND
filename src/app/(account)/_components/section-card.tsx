import type { ReactNode } from "react";
import { cn } from "cn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/** A titled card for one group of account settings. */
export function SectionCard({
  title,
  description,
  children,
  className,
  id,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <Card
      size="default"
      className={cn(
        "[--card-spacing:--spacing(5)] sm:[--card-spacing:--spacing(6)]",
        className,
      )}
    >
      <section id={id} aria-labelledby={headingId} className="contents">
        <CardHeader>
          <CardTitle>
            <h2 id={headingId} className="text-lg font-semibold">
              {title}
            </h2>
          </CardTitle>
          {description ? (
            <CardDescription>{description}</CardDescription>
          ) : null}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </section>
    </Card>
  );
}
