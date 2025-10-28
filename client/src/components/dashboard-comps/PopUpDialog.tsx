"use client";

import { useDonationDialog } from "@/hooks/useDonationDialog";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function DonationDialog() {
  const { shouldShow, closePopup } = useDonationDialog();
  const [visible, setVisible] = useState(shouldShow);

  useEffect(() => {
    if (shouldShow) {
      const timer = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [shouldShow]);

  const handleClose = () => {
    setVisible(false);
    closePopup();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="animate-fade-in w-[90%] max-w-2xl rounded-2xl bg-white p-6 text-center shadow-xl">
        <div className="mb-3 flex justify-center">
          <Heart className="h-10 w-10 animate-pulse text-red-500" />
        </div>

        <h2 className="mb-2 text-xl font-semibold text-gray-800">
          Dukung Kami Tetap Berkarya ❤️
        </h2>

        <p className="mb-4 leading-relaxed font-medium text-gray-600">
          Kami membangun platform ini dengan sepenuh hati agar tetap gratis dan
          bermanfaat bagi seluruh mahasiswa FKI. Tetapi untuk menjaga server,
          kebutuhan storage, dan pengembangan fitur baru, kami butuh sedikit
          bantuanmu.
        </p>

        <p className="mb-6 font-medium text-gray-700">
          Yuk, sisihkan sedikit untuk membantu kami menjaga sistem ini tetap
          berjalan. Dukunganmu hari ini membuat platform ini hidup esok hari 💫
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={handleClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 transition hover:bg-gray-100"
          >
            Mungkin nanti
          </button>
          <a
            href="https://saweria.co/devuploadxam"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="rounded-lg bg-yellow-500 px-5 py-2 font-semibold text-white transition hover:bg-yellow-600"
          >
            Donasi Sekarang
          </a>
        </div>

        <p className="mt-4 text-xs text-gray-400">
          Terima kasih sudah peduli dan mendukung kami 🙏
        </p>
      </div>
    </div>
  );
}
