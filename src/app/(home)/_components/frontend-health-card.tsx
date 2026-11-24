import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function FrontendHealthCard() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Frontend health</CardTitle>
        <CardDescription>
          Check that the Next.js server responds.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild>
          <a href="/api/health">Open health endpoint</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
