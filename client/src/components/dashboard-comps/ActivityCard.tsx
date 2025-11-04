import { FileText, Clock, User, BookOpen, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Activities } from "@/types/get-recent-activ.type";
import { Button } from "@/components/ui/button";

interface ActivityCardProps {
  activity: Activities;
}

const getTimeAgo = (date: Date) => {
  const now = new Date();
  const uploaded = new Date(date);
  const diffMs = now.getTime() - uploaded.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffHours < 1) {
    return `${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else {
    return uploaded.toLocaleDateString();
  }
};

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const timeAgo = getTimeAgo(activity.uploadedAt);
  const isRecent =
    new Date().getTime() - new Date(activity.uploadedAt).getTime() <
    12 * 60 * 60 * 1000;

  return (
    <Card className="group border-border relative overflow-hidden bg-[var(--gradient-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]">
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex w-full items-start gap-3 sm:items-center">
            <Button
              aria-label="Open file"
              className="flex h-8 w-8 items-center justify-center bg-indigo-100 p-2 hover:bg-indigo-200 md:h-10 md:w-10 md:p-3"
              onClick={() =>
                window.open(activity.fileUrl, "_blank", "noopener,noreferrer")
              }
            >
              <FileText className="h-4 w-4 text-indigo-500 md:h-5 md:w-5" />
            </Button>
            <div className="min-w-0 flex-1">
              <h3 className="text-foreground line-clamp-2 text-sm font-semibold transition-colors group-hover:text-sky-500 md:line-clamp-1 md:text-base">
                {activity.title}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Clock className="text-muted-foreground h-3 w-3 md:h-3.5 md:w-3.5" />
                <span className="text-muted-foreground text-xs md:text-sm">
                  {timeAgo}
                </span>
                {isRecent && (
                  <Badge
                    variant="secondary"
                    className="bg-indigo-500 px-2 py-0.5 text-[10px] text-gray-100 md:text-xs"
                  >
                    New
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Badge
            variant={
              activity.tipe_soal === "UAS" || activity.tipe_soal === "UTS"
                ? "default"
                : "outline"
            }
            className={`shrink-0 text-xs md:text-sm ${
              activity.tipe_soal === "UAS"
                ? "bg-teal-500 text-white"
                : activity.tipe_soal === "UTS"
                  ? "bg-sky-500 text-white"
                  : ""
            }`}
          >
            {activity.tipe_soal}
          </Badge>
        </div>

        {/* Course Info */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="text-muted-foreground h-4 w-4" />
            <span className="text-foreground truncate text-sm font-semibold md:text-base">
              {activity.mata_kuliah}
            </span>
          </div>
          <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs md:text-sm">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>Semester {activity.semester}</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <span>{activity.year}</span>
            <span className="hidden sm:inline">•</span>
            <span className="capitalize">{activity.kategori}</span>
          </div>
        </div>

        {/* User Info */}
        <div className="border-border border-t pt-4">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
            <div className="rounded-full bg-gray-200 p-1.5">
              <User className="h-3.5 w-3.5 text-gray-500" />
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-foreground text-sm font-medium">
                {activity.user.name}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground text-xs md:text-sm">
                {activity.user.prodi.replace(/_/g, " ")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient accent */}
      <div className="absolute top-0 left-0 h-0.5 w-full bg-[var(--gradient-primary)] opacity-0 transition-opacity group-hover:opacity-100" />
    </Card>
  );
};

export default ActivityCard;
