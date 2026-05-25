"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaWhatsapp,
  FaBars,
  FaXmark,
  FaQuestion,
} from "react-icons/fa6";
import { Book, Compass, LogIn, LayoutDashboard } from "lucide-react";
import { getCookieClient } from "@/utils/cookie-client";
import { decodeJwtPayload } from "@/utils/helper";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getCookieClient("token");
    if (token) {
      const decoded = decodeJwtPayload(token);
      if (decoded) {
        setIsLoggedIn(true);
      }
    }
  }, []);

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

        {/* Desktop Navigation & Icons */}
        <div className="hidden items-center gap-4 sm:flex">
          <Link
            href="/explore"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-gray-100 transition hover:bg-white/10"
          >
            <Compass className="h-4 w-4 text-red-500" />
            Explore Soal
          </Link>
          <Link
            href="/panduan"
            className="rounded-md p-2 text-gray-100 transition hover:bg-white/10"
            title="Panduan"
          >
            <FaQuestion className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.instagram.com/fosti_ums/"
            className="rounded-md p-2 text-gray-100 transition hover:bg-red-800 hover:text-red-100"
            title="Instagram"
          >
            <FaInstagram className="h-5 w-5" />
          </Link>
          <Link
            href="https://wa.me/6281227151326"
            className="rounded-md p-2 text-gray-100 transition hover:bg-red-800 hover:text-red-100"
            title="WhatsApp"
          >
            <FaWhatsapp className="h-5 w-5" />
          </Link>

          <div className="ml-2">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-red-700 to-red-500 px-4 py-2 text-sm font-bold text-white shadow-md hover:from-red-800 hover:to-red-600"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center gap-1.5 rounded-lg border border-red-500 bg-transparent px-4 py-2 text-sm font-bold text-white hover:bg-red-950"
              >
                <LogIn className="h-4 w-4 text-red-400" />
                Login NIM
              </Link>
            )}
          </div>
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
          <div className="absolute top-full left-0 flex w-full flex-col items-center gap-4 bg-black/95 py-6 shadow-xl sm:hidden">
            <Link
              href="/explore"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-sm font-bold text-gray-100 hover:text-red-400"
            >
              <Compass className="h-4 w-4 text-red-500" /> Explore Soal
            </Link>
            <Link
              href="/panduan"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-sm font-bold text-gray-100 hover:text-red-400"
            >
              <Book className="h-4 w-4" /> Panduan
            </Link>

            <div className="h-px w-2/3 bg-white/10 my-1" />

            {isLoggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2 text-sm font-bold text-white hover:bg-red-700"
              >
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Link>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg border border-red-500 px-6 py-2 text-sm font-bold text-white hover:bg-red-950"
              >
                <LogIn className="h-4 w-4 text-red-400" /> Login NIM
              </Link>
            )}

            <div className="h-px w-2/3 bg-white/10 my-1" />

            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/fosti_ums/"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://wa.me/6281227151326"
                className="text-gray-400 hover:text-white"
              >
                <FaWhatsapp className="h-5 w-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
