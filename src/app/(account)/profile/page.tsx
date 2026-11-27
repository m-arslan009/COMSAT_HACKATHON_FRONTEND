import type { Metadata } from "next";
import { placeholderUser } from "../_lib/placeholder-user";
import { PageHeader } from "../_components/page-header";
import { SectionCard } from "../_components/section-card";
import { ProfileForm } from "./_components/profile-form";
import { ProfileSummary } from "./_components/profile-summary";

export const metadata: Metadata = { title: "Profile · COMSAT Hackathon" };

export default function ProfilePage() {
  const user = placeholderUser;

  return (
    <div className="grid gap-8">
      <PageHeader
        title="Profile"
        description="Your personal details and how others see you."
      />
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <ProfileSummary user={user} />
        <SectionCard
          title="Edit profile"
          description="Update your name and contact details. Change your email in Settings."
        >
          <ProfileForm user={user} />
        </SectionCard>
      </div>
    </div>
  );
}
