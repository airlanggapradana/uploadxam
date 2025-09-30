import React from "react";
import { Sparkles } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-6">
          <Sparkles className="mx-auto h-12 w-12 text-gray-300" />
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-900">
          Tidak ada file yang diunggah.
        </h3>
        <p className="text-sm text-gray-500">
          Jadilah yang pertama mengunggah file!
        </p>
      </div>
    </div>
  );
};

export default NotFound;
