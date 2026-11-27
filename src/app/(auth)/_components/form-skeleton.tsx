import { Skeleton } from "@/components/ui/skeleton";

export function FormSkeleton({ fields }: { fields: number }) {
  return (
    <div className="grid gap-5" aria-hidden>
      {Array.from({ length: fields + 1 }, (_, index) => (
        <Skeleton key={index} className="h-11" />
      ))}
    </div>
  );
}
