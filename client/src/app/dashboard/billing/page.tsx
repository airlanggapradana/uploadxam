import React from "react";
import { Heart, MessageSquare } from "lucide-react";
import Link from "next/link";

const BillingPage = () => {
  return (
    <div className="flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl sm:max-w-2xl md:max-w-4xl">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700">
          {/* Header Section */}
          <div className="relative border-b border-blue-600 bg-gradient-to-r from-blue-500 to-cyan-600 p-6 sm:p-8 md:p-12">
            {/* Animated background effect (hidden on very small devices) */}
            <div className="absolute inset-0 hidden animate-pulse bg-gradient-to-r from-white/10 to-white/5 sm:block"></div>

            <div className="relative z-10">
              {/* Icon */}
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 hidden animate-pulse rounded-2xl bg-white opacity-30 blur-xl sm:block"></div>
                  <div className="relative rounded-2xl border border-white/30 bg-white/20 p-3 shadow-xl backdrop-blur-sm sm:p-5">
                    <Heart
                      className="h-10 w-10 text-white sm:h-12 sm:w-12"
                      strokeWidth={2}
                    />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="mb-3 text-center text-2xl font-bold text-white sm:text-3xl md:text-5xl">
                Donasi Buat Developer yuk!
              </h1>

              {/* Subtitle */}
              <p className="mx-auto max-w-xl text-center text-base leading-relaxed text-blue-50 sm:text-lg">
                support developer untuk terus mengembangkan fitur-fitur
                menariknya.
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-8 md:p-12">
            {/* Status Banner */}
            <Link
              href={"https://saweria.co/devuploadxam"}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-3 sm:p-4"
            >
              <MessageSquare className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600 sm:h-5 sm:w-5" />
              <div>
                <h3 className="mb-1 text-sm font-semibold text-amber-900 sm:text-base">
                  UploadXam selamanya gratis!!!, tapi donasi itu sangat
                  membantu!
                </h3>
                <p className="text-xs text-slate-700 sm:text-sm">
                  Jika kamu merasa terbantu dengan platform ini, pertimbangkan
                  untuk berdonasi. Setiap kontribusi, besar atau kecil, sangat
                  berarti bagi kami.
                </p>
              </div>
            </Link>

            {/* Footer Message */}
            <div className="mt-6 border-t border-slate-200 pt-4 text-center">
              <p className="text-xs text-slate-600 sm:text-sm">
                Terima kasih atas kesabaran Anda. Keputusan akan diambil dengan
                pertimbangan yang matang.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
