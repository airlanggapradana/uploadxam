import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const DashboardLoadingSkeleton = () => {
  return (
    <div className="bg-background min-h-screen p-6">
      {/* Alert Banner Skeleton */}
      <Card className="mb-6 border-amber-200 bg-amber-50 p-4">
        <div className="flex gap-3">
          <Skeleton className="h-5 w-5 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-full max-w-3xl" />
          </div>
        </div>
      </Card>

      {/* Header Controls Skeleton */}
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-12 w-12 rounded-lg" />
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Cards Skeleton */}
      <div className="grid gap-6 lg:grid-cols-3">
        {[1, 2, 3].map((cardIndex) => (
          <Card key={cardIndex} className="overflow-hidden">
            {/* Card Header */}
            <div className="bg-primary flex items-center justify-between p-4">
              <Skeleton className="bg-primary-foreground/20 h-6 w-32" />
              <Skeleton className="bg-primary-foreground/20 h-6 w-16 rounded-full" />
            </div>

            {/* Card Content */}
            <div className="space-y-3 p-4">
              {[1, 2, 3, 4].map((itemIndex) => (
                <div key={itemIndex} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                    <Skeleton className="h-4 w-4 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const StatCardSkeleton = () => {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-12 w-12 rounded-lg" />
      </div>
    </Card>
  );
};

export const CategoryCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <div className="bg-primary flex items-center justify-between p-4">
        <Skeleton className="bg-primary-foreground/20 h-6 w-32" />
        <Skeleton className="bg-primary-foreground/20 h-6 w-16 rounded-full" />
      </div>
      <div className="space-y-3 p-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-4 w-4 rounded" />
          </div>
        ))}
      </div>
    </Card>
  );
};
