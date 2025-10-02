"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardContent, CardFooter } from "@/components/ui/card";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type CreateUserInput, createUserSchema } from "@/zod/zod.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRegister } from "@/utils/query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<CreateUserInput>({
    defaultValues: {
      name: "",
      nim: "",
      prodi: "Informatika",
    },
    resolver: zodResolver(createUserSchema),
  });

  const { mutateAsync: handleRegister, isPending } = useRegister();

  const onSubmit: SubmitHandler<CreateUserInput> = async (d) => {
    try {
      const res = await handleRegister({
        name: d.name,
        nim: d.nim.toUpperCase(),
        prodi: d.prodi,
      });
      if (res === 201) {
        toast.success("Berhasil membuat akun, silakan login", {
          position: "top-center",
          richColors: true,
        });
        form.reset();
        router.push("/auth/login");
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
    <div>
      <CardContent>
        {form.formState.errors && form.formState.errors.root && (
          <div className="mb-4 rounded-md bg-red-500/10 p-4 text-sm text-red-300">
            {form.formState.errors.root?.message}
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Daniel Budianto"
                      className="border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/20"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nim"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">
                    Nomor Induk Mahasiswa
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. L02012345"
                      className="border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/20"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prodi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Program Studi</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full border-white/20 bg-white/10 text-white focus:border-white/40 focus:ring-white/20">
                        <SelectValue
                          placeholder="Pilih Program Studi"
                          className="text-white/70"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border border-white/20 bg-white/20 text-white backdrop-blur-lg">
                      <SelectItem
                        value="Sistem_Informasi"
                        className="focus:bg-white/20"
                      >
                        Sistem Informasi
                      </SelectItem>
                      <SelectItem
                        value="Informatika"
                        className="focus:bg-white/20"
                      >
                        Teknik Informatika
                      </SelectItem>
                      <SelectItem
                        value="Ilmu_Komunikasi"
                        className="focus:bg-white/20"
                      >
                        Ilmu Komunikasi
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2 border-t border-white/10 pt-4">
        <Button
          type="submit"
          disabled={isPending}
          onClick={form.handleSubmit(onSubmit)}
          className="w-full border border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
        >
          {isPending ? "Membuat Akun..." : "Buat Akun Baru"}
        </Button>
      </CardFooter>
    </div>
  );
};

export default RegisterForm;
