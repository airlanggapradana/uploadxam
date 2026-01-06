"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import bg from "../../../public/dashboard.webp";

const Preview = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-gray-950">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Rasakan Pengalaman Menyenangkan Menggunakan <br />
              <span className="mt-1 bg-gradient-to-br from-red-100 to-red-700 bg-clip-text text-4xl leading-none font-bold text-transparent md:text-[5rem]">
                Dashboard Interaktif Kami
              </span>
            </h1>
          </>
        }
      >
        <img
          src={bg.src}
          alt="hero"
          height={1500}
          width={1500}
          className="mx-auto h-full rounded-2xl object-fill object-center"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
};

export default Preview;
