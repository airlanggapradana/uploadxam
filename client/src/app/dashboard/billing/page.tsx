import React from "react";
import { Brain, Heart, MessageSquare } from "lucide-react";
import Link from "next/link";

const BillingPage = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700">
          {/* Header Section */}
          <div className="relative border-b border-blue-600 bg-gradient-to-r from-blue-500 to-cyan-600 p-8 md:p-12">
            {/* Animated background effect */}
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-white/10 to-white/5"></div>

            <div className="relative z-10">
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-2xl bg-white opacity-30 blur-xl"></div>
                  <div className="relative rounded-2xl border border-white/30 bg-white/20 p-5 shadow-xl backdrop-blur-sm">
                    <Heart className="h-12 w-12 text-white" strokeWidth={2} />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="mb-4 text-center text-4xl font-bold text-white md:text-5xl">
                Donasi Buat Developer yuk!
              </h1>

              {/* Subtitle */}
              <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-blue-50">
                support developer untuk terus mengembangkan fitur-fitur
                menariknya.
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            {/* Status Banner */}
            <Link
              href={"https://saweria.co/devuploadxam"}
              className="mb-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4"
            >
              <MessageSquare className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
              <div>
                <h3 className="mb-1 font-semibold text-amber-900">
                  UploadXam selamanya gratis!!!, tapi donasi itu sangat
                  membantu!
                </h3>
                <p className="text-sm text-slate-700">
                  Jika kamu merasa terbantu dengan platform ini, pertimbangkan
                  untuk berdonasi. Setiap kontribusi, besar atau kecil, sangat
                  berarti bagi kami.
                </p>
              </div>
            </Link>

            {/* Footer Message */}
            <div className="mt-8 border-t border-slate-200 pt-6 text-center">
              <p className="text-sm text-slate-600">
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
