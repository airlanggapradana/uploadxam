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
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[var(--gradient-primary)] p-2.5">
                <FaClockRotateLeft className={"h-6 w-6"} opacity={0.75} />
              </div>
              <div className={"space-y-2"}>
                <CardTitle>Aktivitas Terakhir</CardTitle>
                <CardDescription>
                  Pantau aktivitas terbaru di platform dalam 12 jam terakhir.
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="px-3 py-1.5">
              <Filter className="mr-1.5 h-3.5 w-3.5" />
              Last 12 hours
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {activities.length > 0 ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted-foreground text-sm">
                  Showing{" "}
                  <span className="text-foreground font-semibold">
                    {activities.length}
                  </span>{" "}
                  recent {activities.length === 1 ? "activity" : "activities"}
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {activities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-16">
              <div className="mb-6 overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={emptyStateImg}
                  alt="No activities yet"
                  className="h-auto w-full max-w-md"
                />
              </div>
              <h2 className="text-foreground mb-2 text-2xl font-semibold">
                Tidak Ada Aktivitas Terbaru.
              </h2>
              <p className="text-muted-foreground max-w-md text-center">
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
