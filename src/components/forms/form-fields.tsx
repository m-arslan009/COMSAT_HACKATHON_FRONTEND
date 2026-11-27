"use client";

import { useId, type ComponentProps, type ReactNode } from "react";
import {
  useFormState,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";
import { cn } from "cn";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  fieldA11y,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Textarea } from "@/components/ui/textarea";

type BaseFieldProps<T extends FieldValues> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- the transformed output type is irrelevant here
  form: UseFormReturn<T, any, any>;
  name: Path<T>;
  label: ReactNode;
  description?: ReactNode;
  /** Shown beside the label, such as a "Forgot password?" link. */
  labelAction?: ReactNode;
  children?: ReactNode;
};

function useField<T extends FieldValues>(
  form: BaseFieldProps<T>["form"],
  name: Path<T>,
  hasDescription: boolean,
) {
  const id = `${useId()}-${name}`;
  // Subscribe explicitly: `form` is stable, so memoized fields would not
  // otherwise re-render when this field's error changes.
  const formState = useFormState({ control: form.control, name });
  const error = form.getFieldState(name, formState).error?.message;
  return {
    id,
    error,
    a11y: fieldA11y(id, { error, description: hasDescription }),
  };
}

function FieldFrame({
  id,
  label,
  labelAction,
  description,
  error,
  children,
}: {
  id: string;
  label: ReactNode;
  labelAction?: ReactNode;
  description?: ReactNode;
  error?: string;
  children: ReactNode;
}) {
  return (
    <Field>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {labelAction}
      </div>
      {children}
      {description ? (
        <FieldDescription id={`${id}-description`}>
          {description}
        </FieldDescription>
      ) : null}
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </Field>
  );
}

export function TextField<T extends FieldValues>({
  form,
  name,
  label,
  description,
  labelAction,
  children,
  className,
  ...inputProps
}: BaseFieldProps<T> & Omit<ComponentProps<"input">, "name" | "form" | "id">) {
  const { id, error, a11y } = useField(form, name, Boolean(description));
  return (
    <FieldFrame {...{ id, label, labelAction, description, error }}>
      <Input
        className={cn("h-11", className)}
        {...inputProps}
        {...a11y}
        {...form.register(name)}
      />
      {children}
    </FieldFrame>
  );
}

export function PasswordField<T extends FieldValues>({
  form,
  name,
  label,
  description,
  labelAction,
  children,
  className,
  ...inputProps
}: BaseFieldProps<T> &
  Omit<ComponentProps<"input">, "name" | "form" | "id" | "type">) {
  const { id, error, a11y } = useField(form, name, Boolean(description));
  return (
    <FieldFrame {...{ id, label, labelAction, description, error }}>
      <PasswordInput
        className={cn("h-11", className)}
        {...inputProps}
        {...a11y}
        {...form.register(name)}
      />
      {children}
    </FieldFrame>
  );
}

export function TextareaField<T extends FieldValues>({
  form,
  name,
  label,
  description,
  labelAction,
  children,
  ...textareaProps
}: BaseFieldProps<T> &
  Omit<ComponentProps<"textarea">, "name" | "form" | "id">) {
  const { id, error, a11y } = useField(form, name, Boolean(description));
  return (
    <FieldFrame {...{ id, label, labelAction, description, error }}>
      <Textarea {...textareaProps} {...a11y} {...form.register(name)} />
      {children}
    </FieldFrame>
  );
}
