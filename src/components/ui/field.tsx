import * as React from "react";
import { cn } from "cn";
import { CircleAlert } from "lucide-react";
import { Label } from "@/components/ui/label";

function Field({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="field" className={cn("grid gap-2", className)} {...props} />
  );
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return <Label className={cn("leading-snug", className)} {...props} />;
}

function FieldDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-description"
      className={cn("text-sm leading-normal text-muted-foreground", className)}
      {...props}
    />
  );
}

/** Renders nothing without a message, so its id can always be referenced. */
function FieldError({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  if (!children) return null;
  return (
    <p
      data-slot="field-error"
      className={cn(
        "flex items-start gap-1.5 text-sm leading-normal text-destructive",
        className,
      )}
      {...props}
    >
      <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
      <span>
        <span className="sr-only">Error: </span>
        {children}
      </span>
    </p>
  );
}

/** Accessibility props that link an input to its description and error. */
function fieldA11y(
  id: string,
  { error, description }: { error?: string; description?: boolean },
) {
  const describedBy = [
    description ? `${id}-description` : null,
    error ? `${id}-error` : null,
  ].filter(Boolean);

  return {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy.length ? describedBy.join(" ") : undefined,
  } as const;
}

export { Field, FieldLabel, FieldDescription, FieldError, fieldA11y };
