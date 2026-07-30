import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autentikasi",
  description: "Login atau daftar ke UploadXam menggunakan NIM mahasiswa FKI UMS.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full bg-black">
      {/* Azure Depths */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #350136 100%)",
        }}
      />
      {/* Your Content/Components */}
      {children}
    </div>
  );
};

export default AuthLayout;
