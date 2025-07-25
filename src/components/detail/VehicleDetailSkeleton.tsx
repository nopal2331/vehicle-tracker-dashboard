import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const VehicleDetailSkeleton = () => (
  <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
    <Skeleton className="h-6 w-48 rounded-md" />
    <div className="lg:grid lg:grid-cols-5 lg:gap-8">
      <div className="lg:col-span-3 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-7 w-24 rounded-full" />
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2 mt-8 lg:mt-0">
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-36" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-80" />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);