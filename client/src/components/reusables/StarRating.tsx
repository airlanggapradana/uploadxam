"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { JWTPayload } from "@/utils/helper";
import { useGetUserRating, useUpsertRating } from "@/utils/query";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  uploadId: string;
  session: JWTPayload | null;
  avgRating?: number;
  totalRatings?: number;
}

export function StarRating({
  uploadId,
  session,
  avgRating = 0,
  totalRatings = 0,
}: StarRatingProps) {
  const router = useRouter();
  const [hovered, setHovered] = useState<number | null>(null);

  const { data: userRatingData, isLoading: isLoadingUserRating } =
    useGetUserRating(uploadId, session?.id);

  const { mutate: upsertRating, isPending } = useUpsertRating();

  const userCurrentRating = userRatingData?.data?.value ?? 0;
  const displayValue = hovered ?? userCurrentRating;

  const handleStarClick = (value: number) => {
    // Jika belum login, arahkan ke halaman login
    if (!session) {
      toast.error("Login Diperlukan", {
        description: "Kamu harus login dengan NIM terlebih dahulu untuk memberikan rating.",
        position: "top-center",
        richColors: true,
        action: {
          label: "Login Sekarang",
          onClick: () => router.push("/auth/login"),
        },
      });
      router.push("/auth/login");
      return;
    }

    upsertRating(
      { userId: session.id, uploadId, value },
      {
        onSuccess: () => {
          toast.success(
            userCurrentRating > 0 ? "Rating diperbarui!" : "Rating diberikan!",
            {
              description: `Kamu memberi ${value} bintang untuk soal ini.`,
              position: "top-center",
            },
          );
        },
        onError: (err) => {
          toast.error("Gagal menyimpan rating", {
            description: err.message,
            position: "top-center",
            richColors: true,
          });
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-1">
      {/* Bintang Interaktif */}
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={isPending || isLoadingUserRating}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              "rounded transition-transform duration-100 hover:scale-110 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60",
              !session && "cursor-pointer",
            )}
            title={
              !session
                ? "Login untuk memberi rating"
                : userCurrentRating === star
                  ? `Rating kamu: ${star} bintang (klik untuk ubah)`
                  : `Beri ${star} bintang`
            }
          >
            <Star
              className={cn(
                "h-4 w-4 transition-colors duration-100",
                star <= displayValue
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-transparent text-slate-300 dark:text-slate-600",
              )}
            />
          </button>
        ))}

        {/* Info rata-rata */}
        <span className="ml-1.5 text-xs text-slate-500 dark:text-slate-400">
          {totalRatings > 0 ? (
            <>
              <span className="font-semibold text-yellow-500">
                {avgRating.toFixed(1)}
              </span>{" "}
              ({totalRatings} rating)
            </>
          ) : (
            <span className="italic">Belum ada rating</span>
          )}
        </span>
      </div>

      {/* Label status user */}
      {session && userCurrentRating > 0 && (
        <span className="text-[10px] text-slate-400 dark:text-slate-500">
          Rating kamu:{" "}
          <span className="font-semibold text-yellow-500">
            {userCurrentRating} ⭐
          </span>{" "}
          — klik bintang untuk mengubah
        </span>
      )}
      {!session && (
        <span className="text-[10px] italic text-slate-400 dark:text-slate-500">
          Login untuk memberi rating
        </span>
      )}
    </div>
  );
}
