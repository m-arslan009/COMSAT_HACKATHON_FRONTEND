import type { Metadata } from "next";
import { Suspense } from "react";
import { TextLink } from "@/components/text-link";
import { AuthFooter, AuthHeader } from "../_components/auth-header";
import { FormSkeleton } from "../_components/form-skeleton";
import { SignInForm } from "./_components/sign-in-form";

export const metadata: Metadata = { title: "Sign in · COMSAT Hackathon" };

export default function SignInPage() {
  return (
    <>
      <AuthHeader
        title="Sign in"
        description="Welcome back. Sign in to continue to your account."
      />
      {/* The form reads `next` and `status` from the URL. */}
      <Suspense fallback={<FormSkeleton fields={2} />}>
        <SignInForm />
      </Suspense>
      <AuthFooter>
        New here? <TextLink href="/sign-up">Create an account</TextLink>
      </AuthFooter>
    </>
  );
}
