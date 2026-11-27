"use client";

import { TextField } from "@/components/forms/form-fields";
import { FormAlert, SubmitButton } from "@/components/forms/form-status";
import { useValidatedForm } from "@/hooks/use-validated-form";
import { forgotPasswordSchema } from "@/lib/auth/schemas";

export function ForgotPasswordForm() {
  const { form, state, onSubmit, isPending } = useValidatedForm({
    schema: forgotPasswordSchema,
    defaultValues: { email: "" },
    onValid: ({ email }) => {
      // TODO(backend): request a reset email. Keep this reply the same for
      // unknown addresses so the form can't reveal who has an account.
      return {
        status: "success",
        message: `If an account exists for ${email}, we've sent it a link to reset the password.`,
      };
    },
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <FormAlert state={state} />
      <TextField
        form={form}
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        inputMode="email"
        placeholder="name@example.com"
        autoFocus
      />
      <SubmitButton pending={isPending} pendingLabel="Sending link…">
        {state.status === "success" ? "Send another link" : "Send reset link"}
      </SubmitButton>
    </form>
  );
}
