"use client";

import { useState } from "react";
import { FormAlert } from "@/components/forms/form-status";
import { Button } from "@/components/ui/button";
import { idleFormState, type FormState } from "@/lib/forms";

export function SignOutOthersForm() {
  const [state, setState] = useState<FormState>(idleFormState);

  return (
    <div className="grid gap-5">
      <FormAlert state={state} />
      <div>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-11 px-5"
          onClick={() => {
            // TODO(backend): end every other session for this account.
            setState({
              status: "success",
              message: "You've been signed out of every other device.",
            });
          }}
        >
          Sign out of other devices
        </Button>
      </div>
    </div>
  );
}
