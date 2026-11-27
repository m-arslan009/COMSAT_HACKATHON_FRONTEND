"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CircleCheck, Info } from "lucide-react";
import { PasswordField, TextField } from "@/components/forms/form-fields";
import { FormAlert, SubmitButton } from "@/components/forms/form-status";
import { TextLink } from "@/components/text-link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useValidatedForm } from "@/hooks/use-validated-form";
import { signInSchema } from "@/lib/auth/schemas";
import { safeRedirectPath } from "@/lib/forms";

const statusMessages: Record<string, { text: string; success: boolean }> = {
  "password-reset": {
    text: "Your password has been reset. Sign in with your new password.",
    success: true,
  },
  "signed-out": { text: "You've been signed out.", success: true },
  "account-deleted": { text: "Your account has been deleted.", success: true },
};

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = statusMessages[searchParams.get("status") ?? ""];

  const { form, state, onSubmit, isPending } = useValidatedForm({
    schema: signInSchema,
    defaultValues: { email: "", password: "", remember: true },
    onValid: () => {
      // TODO(backend): sign in, and show "Incorrect email or password." on failure.
      router.push(safeRedirectPath(searchParams.get("next")));
    },
  });

  return (
    <>
      {status ? (
        <Alert role="status" className="mb-6">
          {status.success ? <CircleCheck aria-hidden /> : <Info aria-hidden />}
          <AlertDescription>{status.text}</AlertDescription>
        </Alert>
      ) : null}
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
        <PasswordField
          form={form}
          name="password"
          label="Password"
          autoComplete="current-password"
          labelAction={
            <TextLink href="/forgot-password" className="text-sm">
              Forgot password?
            </TextLink>
          }
        />
        <div className="flex min-h-11 items-center gap-3">
          <Checkbox id="remember" {...form.register("remember")} />
          <Label htmlFor="remember" className="font-normal">
            Keep me signed in
          </Label>
        </div>
        <SubmitButton pending={isPending} pendingLabel="Signing in…">
          Sign in
        </SubmitButton>
      </form>
    </>
  );
}
