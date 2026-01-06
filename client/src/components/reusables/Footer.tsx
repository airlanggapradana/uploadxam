import React from "react";

const Footer = () => {
  return (
    <footer className="flex min-h-24 w-full flex-col justify-end rounded-lg px-7 py-14 pb-24 sm:min-h-28 md:min-h-32 lg:pb-14 dark:bg-gray-900">
      <div className="mx-auto w-full">
        <div className="flex flex-col items-center justify-center gap-2 border-t border-gray-200 py-4 sm:flex-row sm:justify-between sm:py-6 dark:border-gray-800">
          <p className="text-center text-xs font-medium text-gray-400 sm:text-left sm:text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold">uploadxam.</span> All rights
            reserved.
          </p>
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
