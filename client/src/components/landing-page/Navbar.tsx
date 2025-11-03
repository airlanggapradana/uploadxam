"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaWhatsapp,
  FaBars,
  FaXmark,
  FaQuestion,
} from "react-icons/fa6";
import { Book } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed z-20 w-full bg-black/30 shadow-md backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:py-5">
        {/* Logos */}
        <div className="flex items-center gap-6">
          <Image
            src="https://res.cloudinary.com/airlanggapradana/image/upload/v1755442684/LOGO_FOSTI_PUTIH_imvkxw.png"
            width={100}
            height={100}
            alt="logo"
            className="h-9 w-auto md:h-10"
          />
          <div className="h-6 w-px bg-white/30" aria-hidden="true" />
          <Image
            src="https://res.cloudinary.com/airlanggapradana/image/upload/v1762154491/upscalemedia-transformed_1_zuugzn.webp"
            width={100}
            height={100}
            alt="secondary-logo"
            className="h-9 w-auto md:h-10"
          />
        </div>

        {/* Desktop Icons */}
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="https://www.instagram.com/fosti_ums/"
            className="rounded-md p-2 text-gray-100 transition hover:bg-gray-800 hover:text-sky-300"
          >
            <FaInstagram className="h-6 w-6" />
          </Link>
          <Link
            href="https://wa.me/6281227151326"
            className="rounded-md p-2 text-gray-100 transition hover:bg-gray-800 hover:text-sky-300"
          >
            <FaWhatsapp className="h-6 w-6" />
          </Link>
          <Link
            href="/panduan"
            className="rounded-md p-2 text-gray-100 transition hover:bg-gray-800 hover:text-sky-300"
          >
            <FaQuestion className="h-6 w-6" />
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-100 focus:outline-none sm:hidden"
        >
          {open ? (
            <FaXmark className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu */}
        {open && (
          <div className="absolute top-full left-0 flex w-full flex-col items-center gap-4 bg-black/90 py-4 sm:hidden">
            <Link
              href="https://instagram.com/"
              className="flex items-center gap-2 text-gray-100 hover:text-sky-300"
            >
              <FaInstagram /> Instagram
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-gray-100 hover:text-sky-300"
            >
              <FaWhatsapp /> WhatsApp
            </Link>
            <Link
              href="/panduan"
              className="flex items-center gap-2 text-gray-100 hover:text-sky-300"
            >
              <Book className={"w-4"} /> Panduan
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
