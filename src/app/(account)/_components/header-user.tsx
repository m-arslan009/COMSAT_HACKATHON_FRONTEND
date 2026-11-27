import type { AccountUser } from "../_lib/placeholder-user";
import { UserAvatar } from "./user-avatar";

export function HeaderUser({ user }: { user: AccountUser }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <UserAvatar name={user.name} className="size-8 text-xs" />
      <div className="hidden min-w-0 leading-tight sm:block">
        <p className="truncate text-sm font-medium">{user.name}</p>
        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
      </div>
    </div>
  );
}
