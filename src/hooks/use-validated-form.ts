"use client";

import { useState } from "react";
import {
  useForm,
  useFormState,
  type DefaultValues,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { idleFormState, type FormState } from "@/lib/forms";

/**
 * Validate a form with its Zod schema, then pass the parsed values to
 * `onValid`. Return a FormState from `onValid` to show a message or
 * per-field errors, such as those a backend sends back.
 */
export function useValidatedForm<
  TSchema extends z.ZodType<FieldValues, FieldValues>,
>({
  schema,
  defaultValues,
  onValid,
  afterSuccess,
}: {
  schema: TSchema;
  defaultValues: DefaultValues<z.input<TSchema>>;
  onValid: (
    values: z.output<TSchema>,
  ) => FormState | void | Promise<FormState | void>;
  /**
   * After a successful submit, either clear the form back to its defaults or
   * keep what was entered as the new saved state.
   */
  afterSuccess?: "clear" | "keep";
}) {
  const [state, setState] = useState<FormState>(idleFormState);
  const form = useForm<z.input<TSchema>, unknown, z.output<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues,
    // Validate on the first submit, then live as fields change. Validating
    // on blur would shift the layout under the pointer mid-click.
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  // Subscribe explicitly; the React Compiler memoizes reads of `form`.
  const { isSubmitting } = useFormState({ control: form.control });

  const onSubmit = form.handleSubmit(async (values) => {
    const result = (await onValid(values)) ?? idleFormState;
    setState(result);

    if (result.status === "success") {
      if (afterSuccess === "clear") form.reset();
      if (afterSuccess === "keep") form.reset(form.getValues());
      return;
    }

    let focused = false;
    for (const [name, messages] of Object.entries(result.fieldErrors ?? {})) {
      if (!messages?.[0]) continue;
      form.setError(
        name as Path<z.input<TSchema>>,
        { type: "server", message: messages[0] },
        { shouldFocus: !focused },
      );
      focused = true;
    }
  });

  return { form, state, onSubmit, isPending: isSubmitting };
}
