import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FaClockRotateLeft } from "react-icons/fa6";
import { useGetRecentActivities } from "@/utils/query";
import ActivityCard from "@/components/dashboard-comps/ActivityCard";
import emptyStateImg from "../../../public/empty-state.png";
import Image from "next/image";

const RecentActivities = () => {
  const { data, isLoading, error } = useGetRecentActivities();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recent activities.</div>;
  if (!data) return <div>No data available.</div>;

  const activities = data.data;
  return (
    <div>
      <Card className="mb-6 sm:mb-8">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-[var(--gradient-primary)] p-2 sm:p-2.5">
                <FaClockRotateLeft
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  opacity={0.75}
                />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <CardTitle className="text-base sm:text-lg">
                  Aktivitas Terakhir
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Pantau aktivitas terbaru di platform dalam 12 jam terakhir.
                </CardDescription>
              </div>
            </div>
            <Badge
              variant="outline"
              className="w-fit px-2.5 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm"
            >
              <Filter className="mr-1 h-3 w-3 sm:mr-1.5 sm:h-3.5 sm:w-3.5" />
              Last 12 hours
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {activities.length > 0 ? (
            <>
              <div className="mb-4 flex items-center justify-between sm:mb-6">
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Showing{" "}
                  <span className="text-foreground font-semibold">
                    {activities.length}
                  </span>{" "}
                  recent {activities.length === 1 ? "activity" : "activities"}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
                {activities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-12 sm:py-16">
              <div className="mb-4 overflow-hidden rounded-2xl shadow-lg sm:mb-6">
                <Image
                  src={emptyStateImg}
                  alt="No activities yet"
                  className="h-auto w-full max-w-[250px] sm:max-w-md"
                />
              </div>
              <h2 className="text-foreground mb-2 text-lg font-semibold sm:text-2xl">
                Tidak Ada Aktivitas Terbaru.
              </h2>
              <p className="text-muted-foreground max-w-md text-center text-sm sm:text-base">
                Oops! kayaknya belum ada aktivitas terbaru dalam 12 jam terakhir
                deh...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentActivities;
