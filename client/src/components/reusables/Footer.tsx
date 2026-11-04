import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex min-h-24 w-full flex-col justify-end rounded-lg px-7 py-14 pb-24 sm:min-h-28 md:min-h-32 lg:pb-14 dark:bg-gray-900">
      <div className="mx-auto w-full">
        <div className="flex flex-col items-center justify-center gap-3 border-t border-gray-200 py-4 sm:flex-row sm:justify-between sm:py-6 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo-icon.webp"
              alt="UploadXam"
              width={22}
              height={22}
              className="h-5 w-5 object-contain"
            />
            <p className="text-center text-xs font-medium text-gray-500 sm:text-left sm:text-sm dark:text-gray-400">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                UploadXam.
              </span>{" "}
              All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400 sm:gap-4 sm:text-sm">
            <a
              href="#"
              className="transition-colors hover:text-gray-600 dark:hover:text-gray-300"
            >
              Privacy
            </a>
            <span>•</span>
            <a
              href="#"
              className="transition-colors hover:text-gray-600 dark:hover:text-gray-300"
            >
              Terms
            </a>
            <span>•</span>
            <a
              href="#"
              className="transition-colors hover:text-gray-600 dark:hover:text-gray-300"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
