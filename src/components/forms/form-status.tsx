"use client";

import type { ComponentProps } from "react";
import { cn } from "cn";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { FormState } from "@/lib/forms";

/** The form-level result of the last submission, announced to screen readers. */
export function FormAlert({ state }: { state: FormState }) {
  if (!state.message || state.status === "idle") return null;

  const isError = state.status === "error";
  return (
    <Alert
      role={isError ? "alert" : "status"}
      variant={isError ? "destructive" : "inverted"}
    >
      {isError ? <CircleAlert aria-hidden /> : <CircleCheck aria-hidden />}
      <AlertDescription>{state.message}</AlertDescription>
    </Alert>
  );
}

export function SubmitButton({
  pending,
  pendingLabel,
  children,
  className,
  ...props
}: ComponentProps<typeof Button> & {
  pending: boolean;
  pendingLabel: string;
}) {
  return (
    <Button
      type="submit"
      size="lg"
      aria-disabled={pending}
      className={cn("h-11 px-5", className)}
      {...props}
      onClick={(event) => {
        // Ignore repeat clicks instead of disabling, so focus isn't lost.
        if (pending) event.preventDefault();
        props.onClick?.(event);
      }}
    >
      {pending ? (
        <>
          <LoaderCircle
            aria-hidden
            className="animate-spin motion-reduce:animate-none"
          />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
