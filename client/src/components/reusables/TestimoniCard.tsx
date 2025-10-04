import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  avatarUrl: string;
  avatarFallback: string;
}

export function TestimonialCard({
  quote,
  author,
  title,
  avatarUrl,
  avatarFallback,
}: TestimonialCardProps) {
  return (
    <Card className="mx-auto max-w-4xl border-0 bg-gradient-to-br from-pink-200 via-pink-100 to-pink-50 p-6 shadow-lg sm:p-8">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        {/* Avatar Section */}
        <div className="relative flex-shrink-0">
          <Avatar className="h-28 w-28 border-4 border-white shadow-md sm:h-48 sm:w-48">
            <AvatarImage
              src={avatarUrl}
              alt={author}
              className="object-cover"
            />
            <AvatarFallback className="bg-gray-200 text-base font-semibold sm:text-lg">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          {/* Quote Icon */}
          <div className="absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 shadow-md sm:h-10 sm:w-10">
            <Quote className="h-4 w-4 fill-white text-white sm:h-5 sm:w-5" />
          </div>
        </div>

        {/* Content Section */}
        <div className="text-center sm:flex-1 sm:pt-2 sm:text-left">
          <blockquote className="mb-4 text-base leading-relaxed font-medium text-gray-900 italic sm:text-xl">
            {quote}
          </blockquote>

          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-900 sm:text-xl">
              {author}
            </p>
            <p className="text-sm font-medium text-red-500 sm:text-base">
              {title}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
