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
      <div className="p-6">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Button
              className="bg-indigo-100 hover:bg-indigo-200"
              onClick={() =>
                window.open(activity.fileUrl, "_blank", "noopener,noreferrer")
              }
            >
              <FileText className="h-5 w-5 text-indigo-500" />
            </Button>
            <div>
              <h3 className="text-foreground line-clamp-1 font-semibold transition-colors group-hover:text-sky-500">
                {activity.title}
              </h3>
              <div className="mt-1 flex items-center gap-2">
                <Clock className="text-muted-foreground h-3.5 w-3.5" />
                <span className="text-muted-foreground text-sm">{timeAgo}</span>
                {isRecent && (
                  <Badge
                    variant="secondary"
                    className="bg-indigo-500 px-2 py-0.5 text-xs text-gray-100"
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
            className={`shrink-0 ${
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
            <span className="text-foreground font-semibold">
              {activity.mata_kuliah}
            </span>
          </div>
          <div className="text-muted-foreground flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>Semester {activity.semester}</span>
            </div>
            <span>•</span>
            <span>{activity.year}</span>
            <span>•</span>
            <span className="capitalize">{activity.kategori}</span>
          </div>
        </div>

        {/* User Info */}
        <div className="border-border border-t pt-4">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-gray-200 p-1.5">
              <User className="h-3.5 w-3.5 text-gray-500" />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-foreground font-medium">
                {activity.user.name}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{activity.user.nim}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">
                {activity.user.prodi.replace(/_/g, " ")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient accent */}
      <div className="absolute top-0 left-0 h-1 w-full bg-[var(--gradient-primary)] opacity-0 transition-opacity group-hover:opacity-100" />
    </Card>
  );
};

export default ActivityCard;
