import { Brand } from "@/components/brand";
import { AccountNav } from "./_components/account-nav";
import { HeaderUser } from "./_components/header-user";
import { SignOutButton } from "./_components/sign-out-button";
import { placeholderUser } from "./_lib/placeholder-user";

export default function AccountLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <header className="border-b bg-background">
        <div className="mx-auto flex w-full max-w-5xl flex-col px-6 sm:px-10">
          <div className="flex items-center justify-between gap-4 py-3">
            <Brand />
            <div className="flex min-w-0 items-center gap-3">
              <HeaderUser user={placeholderUser} />
              <SignOutButton />
            </div>
          </div>
          <AccountNav />
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8 sm:px-10 sm:py-12">
        {children}
      </main>
    </>
  );
}
