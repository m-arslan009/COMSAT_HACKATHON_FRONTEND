"use client";

import { useWatch } from "react-hook-form";
import { PasswordField } from "@/components/forms/form-fields";
import { FormAlert, SubmitButton } from "@/components/forms/form-status";
import { PasswordRequirements } from "@/components/forms/password-requirements";
import { useValidatedForm } from "@/hooks/use-validated-form";
import { changePasswordSchema } from "@/lib/auth/schemas";

export function ChangePasswordForm() {
  const { form, state, onSubmit, isPending } = useValidatedForm({
    schema: changePasswordSchema,
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    afterSuccess: "clear",
    onValid: () => {
      // TODO(backend): check the current password and save the new one.
      return { status: "success", message: "Your password has been changed." };
    },
  });
  const newPassword = useWatch({ control: form.control, name: "newPassword" });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <FormAlert state={state} />
      <div className="sm:max-w-sm">
        <PasswordField
          form={form}
          name="currentPassword"
          label="Current password"
          autoComplete="current-password"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <PasswordField
          form={form}
          name="newPassword"
          label="New password"
          autoComplete="new-password"
        />
        <PasswordField
          form={form}
          name="confirmPassword"
          label="Confirm new password"
          autoComplete="new-password"
        />
      </div>
      <PasswordRequirements value={newPassword ?? ""} />
      <div>
        <SubmitButton pending={isPending} pendingLabel="Changing password…">
          Change password
        </SubmitButton>
      </div>
    </form>
  );
}
