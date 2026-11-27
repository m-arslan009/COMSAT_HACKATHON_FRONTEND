import type { ReactNode } from "react";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { AccountUser } from "../../_lib/placeholder-user";
import { UserAvatar } from "../../_components/user-avatar";

const joinedFormat = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function ProfileSummary({ user }: { user: AccountUser }) {
  return (
    <Card className="[--card-spacing:--spacing(6)]">
      <CardContent className="grid grid-cols-1 gap-6">
        <div className="flex items-center gap-4">
          <UserAvatar name={user.name} className="size-16 text-xl" />
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold">{user.name}</p>
            <p className="truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed whitespace-pre-line wrap-anywhere">
          {user.bio || (
            <span className="text-muted-foreground">No bio yet.</span>
          )}
        </p>

        <dl className="grid gap-3 border-t pt-5 text-sm">
          <Detail icon={<Mail aria-hidden />} label="Email">
            {user.email}
          </Detail>
          <Detail icon={<Phone aria-hidden />} label="Phone">
            {user.phone || "Not added"}
          </Detail>
          <Detail icon={<MapPin aria-hidden />} label="Location">
            {user.location || "Not added"}
          </Detail>
          <Detail icon={<CalendarDays aria-hidden />} label="Member since">
            {joinedFormat.format(new Date(user.createdAt))}
          </Detail>
        </dl>
      </CardContent>
    </Card>
  );
}

function Detail({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 [&_svg]:mt-0.5 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground">
      {icon}
      <div className="min-w-0">
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className="wrap-anywhere">{children}</dd>
      </div>
    </div>
  );
}
