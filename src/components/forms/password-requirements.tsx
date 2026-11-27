"use client";

import { Check, Circle } from "lucide-react";
import { cn } from "cn";
import { passwordRequirements } from "@/lib/auth/schemas";

/** A live checklist of the password rules the server enforces. */
export function PasswordRequirements({
  id,
  value,
}: {
  id?: string;
  value: string;
}) {
  const met = passwordRequirements.filter((rule) => rule.test(value)).length;

  return (
    <div id={id} className="grid gap-2">
      <div
        className="grid grid-cols-5 gap-1"
        aria-hidden
        title={`${met} of ${passwordRequirements.length} requirements met`}
      >
        {passwordRequirements.map((rule, index) => (
          <span
            key={rule.id}
            className={cn(
              "h-1 rounded-full bg-border transition-colors motion-reduce:transition-none",
              index < met && "bg-foreground",
            )}
          />
        ))}
      </div>
      <ul
        className="grid gap-1 text-sm sm:grid-cols-2"
        aria-label="Password requirements"
      >
        {passwordRequirements.map((rule) => {
          const passed = rule.test(value);
          return (
            <li
              key={rule.id}
              className={cn(
                "flex items-center gap-2",
                passed ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {passed ? (
                <Check aria-hidden className="size-3.5 shrink-0" />
              ) : (
                <Circle aria-hidden className="size-3.5 shrink-0" />
              )}
              <span>
                {rule.label}
                <span className="sr-only">
                  {passed ? " (met)" : " (not met)"}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
