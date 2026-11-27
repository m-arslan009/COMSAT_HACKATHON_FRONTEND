import type { Metadata } from "next";
import { TextLink } from "@/components/text-link";
import { AuthFooter, AuthHeader } from "../_components/auth-header";
import { ForgotPasswordForm } from "./_components/forgot-password-form";

export const metadata: Metadata = {
  title: "Reset your password · COMSAT Hackathon",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <AuthHeader
        title="Forgot your password?"
        description="Enter the email you signed up with and we'll send you a link to choose a new password."
      />
      <ForgotPasswordForm />
      <AuthFooter>
        Remembered it? <TextLink href="/sign-in">Back to sign in</TextLink>
      </AuthFooter>
    </>
  );
}
