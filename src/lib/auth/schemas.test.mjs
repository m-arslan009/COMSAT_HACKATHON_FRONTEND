import assert from "node:assert/strict";
import { test } from "node:test";
import {
  changePasswordSchema,
  deleteAccountSchema,
  profileSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "./schemas.ts";

const validSignUp = {
  name: "  Ayesha Khan ",
  email: " Ayesha@Example.COM ",
  password: "Strong#Pass1",
  confirmPassword: "Strong#Pass1",
  acceptTerms: true,
};

const errorsOf = (result) =>
  Object.fromEntries(
    result.error.issues.map((issue) => [issue.path.join("."), issue.message]),
  );

test("accepts a valid sign-up and normalizes the name and email", () => {
  const result = signUpSchema.safeParse(validSignUp);
  assert.equal(result.success, true);
  assert.equal(result.data.name, "Ayesha Khan");
  assert.equal(result.data.email, "ayesha@example.com");
});

test("reports each invalid sign-up field with a helpful message", () => {
  const result = signUpSchema.safeParse({
    name: "A",
    email: "not-an-email",
    password: "weakpass",
    confirmPassword: "different",
    acceptTerms: false,
  });
  assert.equal(result.success, false);

  const errors = errorsOf(result);
  assert.match(errors.name, /at least 2/);
  assert.match(errors.email, /valid email/);
  assert.match(errors.password, /uppercase.*number.*symbol/);
  assert.match(errors.confirmPassword, /don't match/);
  assert.match(errors.acceptTerms, /Accept the terms/);
});

test("rejects names with markup and over-long passwords", () => {
  const result = signUpSchema.safeParse({
    ...validSignUp,
    name: "<script>alert(1)</script>",
    password: `Aa1!${"x".repeat(200)}`,
  });
  const errors = errorsOf(result);
  assert.match(errors.name, /letters/);
  assert.match(errors.password, /can't be longer/);
});

test("requires both sign-in fields", () => {
  const errors = errorsOf(
    signInSchema.safeParse({ email: "", password: "", remember: false }),
  );
  assert.match(errors.email, /Enter your email/);
  assert.match(errors.password, /Enter your password/);
});

test("rejects malformed reset tokens", () => {
  const result = resetPasswordSchema.safeParse({
    token: "../../etc/passwd",
    password: "Strong#Pass1",
    confirmPassword: "Strong#Pass1",
  });
  assert.match(errorsOf(result).token, /invalid/);
});

test("needs a new password that differs from the current one", () => {
  const result = changePasswordSchema.safeParse({
    currentPassword: "Strong#Pass1",
    newPassword: "Strong#Pass1",
    confirmPassword: "Strong#Pass1",
  });
  assert.match(errorsOf(result).newPassword, /aren't already using/);
});

test("validates optional profile fields only when filled in", () => {
  assert.equal(
    profileSchema.safeParse({ name: "Ali", phone: "", location: "", bio: "" })
      .success,
    true,
  );

  const errors = errorsOf(
    profileSchema.safeParse({
      name: "Ali",
      phone: "call me",
      location: "x".repeat(81),
      bio: "x".repeat(161),
    }),
  );
  assert.match(errors.phone, /valid phone/);
  assert.match(errors.location, /80 characters/);
  assert.match(errors.bio, /160 characters/);
});

test("requires typing DELETE to delete an account", () => {
  const result = deleteAccountSchema.safeParse({
    currentPassword: "x",
    confirmation: "delete",
  });
  assert.match(errorsOf(result).confirmation, /DELETE/);
});
