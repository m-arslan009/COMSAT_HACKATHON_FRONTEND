import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AuthActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild size="lg" className="h-11 px-5">
        <Link href="/sign-up">Create an account</Link>
      </Button>
      <Button asChild size="lg" variant="outline" className="h-11 px-5">
        <Link href="/sign-in">Sign in</Link>
      </Button>
    </div>
  );
}
