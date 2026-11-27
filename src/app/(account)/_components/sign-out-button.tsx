"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="outline"
      className="size-10 sm:w-auto sm:px-3"
      onClick={() => {
        // TODO(backend): end the session before leaving.
        router.push("/sign-in?status=signed-out");
      }}
    >
      <LogOut aria-hidden />
      <span className="sr-only sm:not-sr-only">Sign out</span>
    </Button>
  );
}
