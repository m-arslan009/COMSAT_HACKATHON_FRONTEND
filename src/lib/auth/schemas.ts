import { z } from "zod";

/**
 * Validation rules shared by the browser forms and the server actions.
 * The server always re-validates, so these rules are the single contract.
 */

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;
export const BIO_MAX_LENGTH = 160;

export const passwordRequirements = [
  {
    id: "length",
    label: `At least ${PASSWORD_MIN_LENGTH} characters`,
    test: (value: string) => value.length >= PASSWORD_MIN_LENGTH,
  },
  {
    id: "lowercase",
    label: "One lowercase letter",
    test: (value: string) => /[a-z]/.test(value),
  },
  {
    id: "uppercase",
    label: "One uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    id: "number",
    label: "One number",
    test: (value: string) => /\d/.test(value),
  },
  {
    id: "symbol",
    label: "One symbol, like ! or #",
    test: (value: string) => /[^A-Za-z0-9\s]/.test(value),
  },
] as const;

export const emailSchema = z
  .string({ error: "Enter your email address." })
  .trim()
  .min(1, "Enter your email address.")
  .max(254, "Email addresses can't be longer than 254 characters.")
  .pipe(
    z.email({ error: "Enter a valid email address, like name@example.com." }),
  )
  .transform((value) => value.toLowerCase());

export const nameSchema = z
  .string({ error: "Enter your full name." })
  .trim()
  .min(2, "Your name must be at least 2 characters.")
  .max(60, "Your name can't be longer than 60 characters.")
  .regex(
    /^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u,
    "Use letters, spaces, apostrophes, periods or hyphens only.",
  );

export const newPasswordSchema = z
  .string({ error: "Enter a password." })
  .min(1, "Enter a password.")
  .max(
    PASSWORD_MAX_LENGTH,
    `Passwords can't be longer than ${PASSWORD_MAX_LENGTH} characters.`,
  )
  .superRefine((value, ctx) => {
    const missing = passwordRequirements.filter((rule) => !rule.test(value));
    if (missing.length > 0) {
      ctx.addIssue({
        code: "custom",
        message: `Password needs: ${missing
          .map((rule) => rule.label.toLowerCase())
          .join(", ")}.`,
      });
    }
  });

/** Existing passwords are only checked for presence; old rules may differ. */
const currentPasswordSchema = z
  .string({ error: "Enter your password." })
  .min(1, "Enter your password.")
  .max(PASSWORD_MAX_LENGTH, "Incorrect password.");

const confirmPasswordSchema = z
  .string({ error: "Confirm your password." })
  .min(1, "Confirm your password.");

const passwordsDontMatch = {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
};

export const signUpSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: newPasswordSchema,
    confirmPassword: confirmPasswordSchema,
    acceptTerms: z.boolean().refine((value) => value, {
      message: "Accept the terms to create an account.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, passwordsDontMatch);

export const signInSchema = z.object({
  email: emailSchema,
  password: currentPasswordSchema,
  remember: z.boolean(),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    token: z
      .string({ error: "This reset link is invalid." })
      .regex(/^[A-Za-z0-9_-]{20,200}$/, "This reset link is invalid."),
    password: newPasswordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, passwordsDontMatch);

const optionalText = (max: number, label: string) =>
  z
    .string()
    .trim()
    .max(max, `${label} can't be longer than ${max} characters.`);

export const profileSchema = z.object({
  name: nameSchema,
  phone: z
    .string()
    .trim()
    .refine(
      (value) =>
        value === "" ||
        (/^\+?[0-9 ()-]{7,20}$/.test(value) &&
          value.replace(/\D/g, "").length >= 7),
      "Enter a valid phone number with at least 7 digits, like +92 300 1234567.",
    ),
  location: optionalText(80, "Location"),
  bio: optionalText(BIO_MAX_LENGTH, "Bio"),
});

export const changeEmailSchema = z.object({
  email: emailSchema,
  currentPassword: currentPasswordSchema,
});

export const changePasswordSchema = z
  .object({
    currentPassword: currentPasswordSchema,
    newPassword: newPasswordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine(
    (data) => data.newPassword === data.confirmPassword,
    passwordsDontMatch,
  )
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "Choose a password you aren't already using.",
    path: ["newPassword"],
  });

export const deleteAccountSchema = z.object({
  currentPassword: currentPasswordSchema,
  confirmation: z
    .string()
    .trim()
    .refine((value) => value === "DELETE", 'Type "DELETE" to confirm.'),
});

export type SignUpInput = z.input<typeof signUpSchema>;
export type SignInInput = z.input<typeof signInSchema>;
export type ForgotPasswordInput = z.input<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.input<typeof resetPasswordSchema>;
export type ProfileInput = z.input<typeof profileSchema>;
export type ChangeEmailInput = z.input<typeof changeEmailSchema>;
export type ChangePasswordInput = z.input<typeof changePasswordSchema>;
export type DeleteAccountInput = z.input<typeof deleteAccountSchema>;
