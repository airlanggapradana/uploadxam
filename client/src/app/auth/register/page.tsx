import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <main
      className={
        "relative z-10 flex min-h-screen flex-col items-center justify-center"
      }
    >
      <Card className="w-full max-w-xl border border-white/20 bg-white/15 shadow-lg backdrop-blur-lg">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-white">Register Akun Baru</CardTitle>
          <CardDescription className="text-white/70">
            Silakan daftar untuk mengakses semua soal ujian.
          </CardDescription>
        </CardHeader>
        <RegisterForm />
      </Card>
    </main>
  );
};

export default Register;
