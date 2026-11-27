import type { Metadata } from "next";
import { Suspense } from "react";
import { TextLink } from "@/components/text-link";
import { AuthFooter, AuthHeader } from "../_components/auth-header";
import { FormSkeleton } from "../_components/form-skeleton";
import { ResetPasswordForm } from "./_components/reset-password-form";

export const metadata: Metadata = {
  title: "Choose a new password · COMSAT Hackathon",
};

export default function ResetPasswordPage() {
  return (
    <>
      <AuthHeader
        title="Choose a new password"
        description="Pick a strong password you don't use anywhere else."
      />
      {/* The token comes from the URL, which is only known at request time. */}
      <Suspense fallback={<FormSkeleton fields={2} />}>
        <ResetPasswordForm />
      </Suspense>
      <AuthFooter>
        <TextLink href="/sign-in">Back to sign in</TextLink>
      </AuthFooter>
    </>
  );
}
