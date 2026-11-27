"use client";

import { useId } from "react";
import { useRouter } from "next/navigation";
import { useFormState, useWatch } from "react-hook-form";
import { PasswordField, TextField } from "@/components/forms/form-fields";
import { FormAlert, SubmitButton } from "@/components/forms/form-status";
import { PasswordRequirements } from "@/components/forms/password-requirements";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldError, fieldA11y } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { useValidatedForm } from "@/hooks/use-validated-form";
import { signUpSchema } from "@/lib/auth/schemas";

export function SignUpForm() {
  const termsId = useId();
  const router = useRouter();
  const { form, state, onSubmit, isPending } = useValidatedForm({
    schema: signUpSchema,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    onValid: () => {
      // TODO(backend): create the account, and show an error on the email
      // field if it is already registered.
      router.push("/profile");
    },
  });
  const password = useWatch({ control: form.control, name: "password" });
  const { errors } = useFormState({
    control: form.control,
    name: "acceptTerms",
  });
  const termsError = errors.acceptTerms?.message;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <FormAlert state={state} />
      <TextField
        form={form}
        name="name"
        label="Full name"
        autoComplete="name"
        placeholder="Ayesha Khan"
        autoFocus
      />
      <TextField
        form={form}
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        inputMode="email"
        placeholder="name@example.com"
      />
      <PasswordField
        form={form}
        name="password"
        label="Password"
        autoComplete="new-password"
        description={<PasswordRequirements value={password ?? ""} />}
      />
      <PasswordField
        form={form}
        name="confirmPassword"
        label="Confirm password"
        autoComplete="new-password"
      />
      <div className="grid gap-2">
        <div className="flex min-h-11 items-start gap-3 pt-3">
          <Checkbox
            {...fieldA11y(termsId, { error: termsError })}
            className="mt-0.5"
            {...form.register("acceptTerms")}
          />
          <Label htmlFor={termsId} className="leading-normal font-normal">
            I agree to the hackathon terms and code of conduct.
          </Label>
        </div>
        <FieldError id={`${termsId}-error`}>{termsError}</FieldError>
      </div>
      <SubmitButton pending={isPending} pendingLabel="Creating account…">
        Create account
      </SubmitButton>
    </form>
  );
}
