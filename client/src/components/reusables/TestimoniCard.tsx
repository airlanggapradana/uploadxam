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
    <Card className="mx-auto max-w-4xl border-0 bg-gradient-to-br from-pink-200 via-pink-100 to-pink-50 p-8 shadow-lg">
      <div className="flex items-start gap-6">
        {/* Avatar Section */}
        <div className="relative flex-shrink-0">
          <Avatar className="h-[12rem] w-[12rem] border-4 border-white shadow-md">
            <AvatarImage
              src={avatarUrl}
              alt={author}
              className="object-cover"
            />
            <AvatarFallback className="bg-gray-200 text-lg font-semibold">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          {/* Quote Icon */}
          <div className="absolute -right-2 -bottom-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 shadow-md">
            <Quote className="h-5 w-5 fill-white text-white" />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 pt-2">
          <blockquote className="mb-4 text-xl leading-relaxed font-medium text-gray-900 italic">
            {quote}
          </blockquote>

          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-900">{author}</p>
            <p className="text-sm font-medium text-red-500">{title}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
