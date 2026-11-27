"use client";

import { PasswordField, TextField } from "@/components/forms/form-fields";
import { FormAlert, SubmitButton } from "@/components/forms/form-status";
import { useValidatedForm } from "@/hooks/use-validated-form";
import { changeEmailSchema } from "@/lib/auth/schemas";

export function ChangeEmailForm({ currentEmail }: { currentEmail: string }) {
  const { form, state, onSubmit, isPending } = useValidatedForm({
    schema: changeEmailSchema,
    defaultValues: { email: "", currentPassword: "" },
    afterSuccess: "clear",
    onValid: ({ email }) => {
      if (email === currentEmail.toLowerCase()) {
        return {
          status: "error",
          message: "Nothing to change.",
          fieldErrors: { email: ["This is already your email address."] },
        };
      }
      // TODO(backend): check the current password and update the email.
      return {
        status: "success",
        message: `Your email has been changed to ${email}.`,
      };
    },
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <p className="text-sm">
        Current email:{" "}
        <span className="font-medium break-all">{currentEmail}</span>
      </p>
      <FormAlert state={state} />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          form={form}
          name="email"
          label="New email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="name@example.com"
        />
        <PasswordField
          form={form}
          name="currentPassword"
          label="Current password"
          autoComplete="current-password"
        />
      </div>
      <div>
        <SubmitButton pending={isPending} pendingLabel="Updating email…">
          Update email
        </SubmitButton>
      </div>
    </form>
  );
}
