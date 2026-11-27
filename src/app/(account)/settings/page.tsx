import type { Metadata } from "next";
import { placeholderUser } from "../_lib/placeholder-user";
import { PageHeader } from "../_components/page-header";
import { SectionCard } from "../_components/section-card";
import { ChangeEmailForm } from "./_components/change-email-form";
import { ChangePasswordForm } from "./_components/change-password-form";
import { DeleteAccountForm } from "./_components/delete-account-form";
import { SignOutOthersForm } from "./_components/sign-out-others-form";
import { ThemeSettings } from "./_components/theme-settings";

export const metadata: Metadata = { title: "Settings · COMSAT Hackathon" };

export default function SettingsPage() {
  return (
    <div className="grid gap-8">
      <PageHeader
        title="Settings"
        description="Manage how the site looks, how you sign in, and your account."
      />
      <div className="grid gap-6">
        <SectionCard
          id="appearance"
          title="Appearance"
          description="Choose a theme for this browser."
        >
          <ThemeSettings />
        </SectionCard>
        <AccountSettings />
      </div>
    </div>
  );
}

function AccountSettings() {
  const user = placeholderUser;

  return (
    <>
      <SectionCard
        id="email"
        title="Email address"
        description="You sign in and receive password reset links with this email."
      >
        <ChangeEmailForm currentEmail={user.email} />
      </SectionCard>
      <SectionCard
        id="password"
        title="Password"
        description="Use a strong password you don't use anywhere else."
      >
        <ChangePasswordForm />
      </SectionCard>
      <SectionCard
        id="sessions"
        title="Signed-in devices"
        description="Lost a device or signed in on a shared computer? End those sessions. You'll stay signed in here."
      >
        <SignOutOthersForm />
      </SectionCard>
      <SectionCard
        id="delete-account"
        title="Delete account"
        description="This permanently removes your account and profile. It can't be undone."
        className="ring-destructive/30"
      >
        <DeleteAccountForm />
      </SectionCard>
    </>
  );
}
