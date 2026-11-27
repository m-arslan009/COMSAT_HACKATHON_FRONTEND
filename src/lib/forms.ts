/** The result of a form submission, shown above the form. */
export type FormState = {
  status: "idle" | "error" | "success";
  message?: string;
  /** Per-field messages, for example from a backend response. */
  fieldErrors?: Partial<Record<string, string[]>>;
};

export const idleFormState: FormState = { status: "idle" };

/**
 * Only follow same-site relative paths after sign-in, so a crafted link
 * can't send the user to another website.
 */
export function safeRedirectPath(value: unknown, fallback = "/profile") {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /[\u0000-\u001f]/.test(value)
  ) {
    return fallback;
  }
  return value;
}
