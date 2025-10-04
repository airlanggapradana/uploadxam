import React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-sky-950 to-black px-4 py-10 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md rounded-xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-md sm:max-w-lg sm:p-6">
        <CardHeader className="border-b border-white/10 pb-4 sm:pb-6">
          <CardTitle className="text-xl font-bold text-white sm:text-left sm:text-2xl">
            Login Akun
          </CardTitle>
          <CardDescription className="text-sm text-white/70 sm:text-left sm:text-base">
            Silakan login untuk mengakses semua soal ujian.
          </CardDescription>
          <CardAction className="mt-3 flex justify-center sm:justify-end">
            <Link
              href={"/auth/register"}
              className="text-sm text-sky-400 transition-colors hover:text-sky-300"
            >
              Belum punya akun?
            </Link>
          </CardAction>
        </CardHeader>
        <div className="mt-2">
          <LoginForm />
        </div>
      </Card>
    </main>
  );
};

export default Login;
