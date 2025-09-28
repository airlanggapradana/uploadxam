import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="fixed z-10 w-full bg-transparent shadow-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5">
        <Image
          src={
            "https://res.cloudinary.com/airlanggapradana/image/upload/v1755442684/LOGO_FOSTI_PUTIH_imvkxw.png"
          }
          width={75}
          height={75}
          alt={"logo"}
        />
        <div className={"flex items-center gap-5"}>
          <Link href="#" className="text-gray-100 hover:text-gray-800">
            <FaInstagram className={"h-6 w-6"} />
          </Link>
          <Link href="#" className="text-gray-100 hover:text-gray-800">
            <FaWhatsapp className={"h-6 w-6"} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
