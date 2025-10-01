import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WarningProps {
  title: string;
  description: string;
  className?: string;
}

export const Warning = ({ title, description, className }: WarningProps) => {
  return (
    <div
      className={cn(
        "border-warning/20 bg-warning/10 flex items-start gap-3 rounded-lg border p-4",
        className,
      )}
    >
      <AlertTriangle className="text-warning-foreground h-5 w-5 flex-shrink-0" />
      <div className="flex flex-col gap-1">
        <h3 className="text-warning-foreground font-semibold">{title}</h3>
        <p className="text-warning-foreground/90 text-sm">{description}</p>
      </div>
    </div>
  );
};
