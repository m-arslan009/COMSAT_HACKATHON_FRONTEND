"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useWatch } from "react-hook-form";
import { CircleAlert } from "lucide-react";
import { PasswordField } from "@/components/forms/form-fields";
import { FormAlert, SubmitButton } from "@/components/forms/form-status";
import { PasswordRequirements } from "@/components/forms/password-requirements";
import { TextLink } from "@/components/text-link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useValidatedForm } from "@/hooks/use-validated-form";
import { resetPasswordSchema } from "@/lib/auth/schemas";

export function ResetPasswordForm() {
  const router = useRouter();
  const token = useSearchParams().get("token") ?? "";
  const { form, state, onSubmit, isPending } = useValidatedForm({
    schema: resetPasswordSchema,
    defaultValues: { token, password: "", confirmPassword: "" },
    onValid: () => {
      // TODO(backend): send the token and new password, and show
      // "This reset link is invalid or has expired." if it's rejected.
      router.push("/sign-in?status=password-reset");
    },
  });
  const password = useWatch({ control: form.control, name: "password" });

  if (!resetPasswordSchema.shape.token.safeParse(token).success) {
    return (
      <Alert variant="destructive" role="alert">
        <CircleAlert aria-hidden />
        <AlertDescription>
          This reset link is incomplete or invalid.{" "}
          <TextLink href="/forgot-password" className="text-destructive">
            Request a new link
          </TextLink>
          .
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <FormAlert state={state} />
      <PasswordField
        form={form}
        name="password"
        label="New password"
        autoComplete="new-password"
        autoFocus
        description={<PasswordRequirements value={password ?? ""} />}
      />
      <PasswordField
        form={form}
        name="confirmPassword"
        label="Confirm new password"
        autoComplete="new-password"
      />
      <SubmitButton pending={isPending} pendingLabel="Saving password…">
        Reset password
      </SubmitButton>
    </form>
  );
}
