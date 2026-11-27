"use client";

import { useFormState, useWatch } from "react-hook-form";
import { TextField, TextareaField } from "@/components/forms/form-fields";
import { FormAlert, SubmitButton } from "@/components/forms/form-status";
import { useValidatedForm } from "@/hooks/use-validated-form";
import { BIO_MAX_LENGTH, profileSchema } from "@/lib/auth/schemas";
import type { AccountUser } from "../../_lib/placeholder-user";

export function ProfileForm({ user }: { user: AccountUser }) {
  const { form, state, onSubmit, isPending } = useValidatedForm({
    schema: profileSchema,
    defaultValues: {
      name: user.name,
      phone: user.phone,
      location: user.location,
      bio: user.bio,
    },
    afterSuccess: "keep",
    onValid: () => {
      // TODO(backend): save the profile and refresh the summary.
      return { status: "success", message: "Your profile has been updated." };
    },
  });
  const bio = useWatch({ control: form.control, name: "bio" }) ?? "";
  const { isDirty } = useFormState({ control: form.control });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <FormAlert state={state} />
      <TextField
        form={form}
        name="name"
        label="Full name"
        autoComplete="name"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          form={form}
          name="phone"
          label="Phone (optional)"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+92 300 1234567"
        />
        <TextField
          form={form}
          name="location"
          label="Location (optional)"
          autoComplete="address-level2"
          placeholder="Islamabad, Pakistan"
        />
      </div>
      <TextareaField
        form={form}
        name="bio"
        label="Bio (optional)"
        rows={4}
        placeholder="A sentence or two about you and what you like to build."
        description={
          <>
            {bio.length} / {BIO_MAX_LENGTH} characters
          </>
        }
      />
      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton pending={isPending} pendingLabel="Saving…">
          Save changes
        </SubmitButton>
        <button
          type="button"
          onClick={() => form.reset()}
          disabled={!isDirty || isPending}
          className="min-h-11 rounded-lg px-3 text-sm font-medium text-muted-foreground underline-offset-4 outline-none hover:text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
        >
          Discard changes
        </button>
      </div>
    </form>
  );
}
