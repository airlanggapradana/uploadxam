import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="fixed z-20 w-full bg-transparent shadow-md backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-2 py-3 sm:px-4 sm:py-5">
        <Image
          src="https://res.cloudinary.com/airlanggapradana/image/upload/v1755442684/LOGO_FOSTI_PUTIH_imvkxw.png"
          width={75}
          height={75}
          alt="logo"
        />
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="https://res.cloudinary.com/airlanggapradana/image/upload/v1755442684/LOGO_FOSTI_PUTIH_imvkxw.png"
            className="rounded-md p-2 text-gray-100 transition-all duration-300 hover:bg-gray-800 hover:text-sky-300"
          >
            <FaInstagram className="h-5 w-5 sm:h-6 sm:w-6" />
          </Link>
          <Link
            href="#"
            className="rounded-md p-2 text-gray-100 transition-all duration-300 hover:bg-gray-800 hover:text-sky-300"
          >
            <FaWhatsapp className="h-5 w-5 sm:h-6 sm:w-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
