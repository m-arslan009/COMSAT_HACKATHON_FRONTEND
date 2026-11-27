"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PasswordField, TextField } from "@/components/forms/form-fields";
import { FormAlert, SubmitButton } from "@/components/forms/form-status";
import { Button } from "@/components/ui/button";
import { useValidatedForm } from "@/hooks/use-validated-form";
import { deleteAccountSchema } from "@/lib/auth/schemas";

export function DeleteAccountForm() {
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();
  const { form, state, onSubmit, isPending } = useValidatedForm({
    schema: deleteAccountSchema,
    defaultValues: { currentPassword: "", confirmation: "" },
    onValid: () => {
      // TODO(backend): check the password, delete the account, end the session.
      router.push("/sign-in?status=account-deleted");
    },
  });

  if (!confirming) {
    return (
      <Button
        type="button"
        variant="destructive"
        className="h-11 px-5"
        onClick={() => setConfirming(true)}
      >
        Delete my account
      </Button>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <FormAlert state={state} />
      <div className="grid gap-5 sm:grid-cols-2">
        <PasswordField
          form={form}
          name="currentPassword"
          label="Current password"
          autoComplete="current-password"
          autoFocus
        />
        <TextField
          form={form}
          name="confirmation"
          label={
            <>
              Type <span className="font-mono">DELETE</span> to confirm
            </>
          }
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <SubmitButton
          variant="destructive"
          pending={isPending}
          pendingLabel="Deleting account…"
        >
          Permanently delete account
        </SubmitButton>
        <Button
          type="button"
          variant="ghost"
          className="h-11 px-5"
          onClick={() => {
            form.reset();
            setConfirming(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
