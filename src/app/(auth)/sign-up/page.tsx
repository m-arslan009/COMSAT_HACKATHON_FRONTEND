import type { Metadata } from "next";
import { TextLink } from "@/components/text-link";
import { AuthFooter, AuthHeader } from "../_components/auth-header";
import { SignUpForm } from "./_components/sign-up-form";

export const metadata: Metadata = {
  title: "Create an account · COMSAT Hackathon",
};

export default function SignUpPage() {
  return (
    <>
      <AuthHeader
        title="Create an account"
        description="It takes less than a minute. All fields are required."
      />
      <SignUpForm />
      <AuthFooter>
        Already have an account? <TextLink href="/sign-in">Sign in</TextLink>
      </AuthFooter>
    </>
  );
}
