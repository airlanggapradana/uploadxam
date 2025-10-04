"use client";
import React from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type LoginInput, loginSchema } from "@/zod/zod.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/utils/query";
import { setCookie } from "@/utils/cookies";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<LoginInput>({
    defaultValues: {
      nim: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync: handleLogin, isPending } = useLogin();

  const onSubmit: SubmitHandler<LoginInput> = async (d) => {
    try {
      const res = await handleLogin({
        nim: d.nim.toUpperCase(),
      });
      if (res.data) {
        await setCookie("token", res.data);
        toast.success("Berhasil login", {
          position: "top-center",
          richColors: true,
        });
        form.reset();
        router.push("/dashboard");
      }
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Terjadi kesalahan tak terduga",
        { position: "top-center", richColors: true },
      );
      form.setError("root", {
        message:
          e instanceof Error ? e.message : "Terjadi kesalahan tak terduga",
      });
    }
  };
  return (
    <div className="w-full">
      <CardContent className="space-y-6 sm:space-y-8">
        {form.formState.errors.root && (
          <div className="mb-4 rounded-md bg-red-500/10 p-3 text-sm text-red-300 sm:p-4">
            {form.formState.errors.root?.message}
          </div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 sm:space-y-8"
          >
            <FormField
              control={form.control}
              name="nim"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-white/80 sm:text-base">
                    Nomor Induk Mahasiswa
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. L02012345"
                      className="h-10 border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/20 sm:h-11"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 sm:text-sm" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 border-t border-white/10 pt-4">
        <Button
          type="submit"
          disabled={isPending}
          onClick={form.handleSubmit(onSubmit)}
          className="w-full border border-white/30 bg-white/20 py-2 text-sm text-white backdrop-blur-sm hover:bg-white/30 sm:py-3 sm:text-base"
        >
          {isPending ? "Mengecek Akun..." : "Login"}
        </Button>
      </CardFooter>
    </div>
  );
};

export default LoginForm;
