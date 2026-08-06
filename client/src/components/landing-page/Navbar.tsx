"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaWhatsapp,
  FaBars,
  FaXmark,
  FaGithub,
} from "react-icons/fa6";
import { Compass, Book, LayoutDashboard, LogIn, Sparkles } from "lucide-react";
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
    <header className="fixed top-0 right-0 left-0 z-50 w-full px-4 pt-4 backdrop-blur-sm sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Left Brand Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
                  Upload<span className="text-red-500">Xam</span>
                </span>
              </div>
              <span className="text-[10px] font-medium tracking-widest text-red-300/80 uppercase">
                Bank Soal FKI UMS
              </span>
            </div>
          </Link>
        </div>

        {/* Center Floating Navigation Pill Bar */}
        <nav
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 shadow-2xl shadow-black/80 backdrop-blur-xl md:flex"
          aria-label="Navigasi Utama"
        >
          <Link
            href="/"
            className="rounded-full bg-gradient-to-r from-red-700 to-red-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm shadow-red-900/50 transition-all hover:brightness-110"
          >
            Home
          </Link>
          <Link
            href="/explore"
            className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-300 transition-all hover:bg-white/10 hover:text-white"
          >
            <Compass className="h-3.5 w-3.5 text-red-500" />
            Explore Soal
          </Link>
          <Link
            href="#prodi-section"
            className="rounded-full px-4 py-1.5 text-xs font-semibold text-gray-300 transition-all hover:bg-white/10 hover:text-white"
          >
            Prodi & Stat
          </Link>
          <Link
            href="#services"
            className="rounded-full px-4 py-1.5 text-xs font-semibold text-gray-300 transition-all hover:bg-white/10 hover:text-white"
          >
            Fitur
          </Link>
          <Link
            href="/docs"
            className="flex items-center gap-1 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-300 transition-all hover:bg-white/10 hover:text-white"
          >
            <Book className="h-3.5 w-3.5 text-red-400" />
            Docs
          </Link>
        </nav>

        {/* Right Actions & Category Tags */}
        <div className="flex items-center gap-3">
          {/* Social Icons */}
          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="https://github.com/airlanggapradana/uploadxam"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:border-red-500/50 hover:bg-red-950/40 hover:text-white"
              title="GitHub Repository"
            >
              <FaGithub className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="https://www.instagram.com/fosti_ums/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:border-red-500/50 hover:bg-red-950/40 hover:text-white"
              title="Instagram FOSTI UMS"
            >
              <FaInstagram className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* CTA Action Button */}
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-red-900/40 transition-all hover:scale-105 hover:shadow-red-600/50"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              Dashboard
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-1.5 rounded-full border border-red-500/40 bg-gradient-to-r from-red-900/40 to-red-950/80 px-4 py-2 text-xs font-bold text-white shadow-md shadow-red-950/50 backdrop-blur-md transition-all hover:scale-105 hover:border-red-500"
            >
              <LogIn className="h-3.5 w-3.5 text-red-400" />
              Login NIM
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md md:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {open ? (
              <FaXmark className="h-5 w-5" />
            ) : (
              <FaBars className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <div className="mt-3 rounded-2xl border border-white/10 bg-black/95 p-5 shadow-2xl backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl border border-red-800/40 bg-red-950/40 px-4 py-2.5 text-sm font-bold text-white"
            >
              <span>Home</span>
              <span className="h-2 w-2 rounded-full bg-red-500" />
            </Link>
            <Link
              href="/explore"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-200 hover:bg-white/5"
            >
              <Compass className="h-4 w-4 text-red-400" /> Explore Soal
            </Link>
            <Link
              href="#prodi-section"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-200 hover:bg-white/5"
            >
              Prodi & Stat
            </Link>
            <Link
              href="#services"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-200 hover:bg-white/5"
            >
              Fitur Utama
            </Link>
            <Link
              href="/docs"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-200 hover:bg-white/5"
            >
              <Book className="h-4 w-4 text-red-400" /> Dokumentasi
            </Link>

            <div className="my-1 h-px w-full bg-white/10" />

            <div className="flex items-center justify-around py-2">
              <Link
                href="https://github.com/airlanggapradana/uploadxam"
                target="_blank"
                className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white"
              >
                <FaGithub className="h-4 w-4" /> GitHub
              </Link>
              <Link
                href="https://www.instagram.com/fosti_ums/"
                target="_blank"
                className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white"
              >
                <FaInstagram className="h-4 w-4" /> Instagram
              </Link>
              <Link
                href="https://wa.me/6281227151326"
                target="_blank"
                className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white"
              >
                <FaWhatsapp className="h-4 w-4" /> Support
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
