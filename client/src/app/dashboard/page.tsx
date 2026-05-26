"use client";

import React, { useState } from "react";
import { useUserSession } from "@/hooks/context";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useUpdateProfile } from "@/utils/query";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type CreateUserInput, createUserSchema } from "@/zod/zod.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import UserUploads from "@/components/account-comps/UserUploads";
import DialogAddFileUpload from "@/components/dashboard-comps/DialogAddFileUpload";
import { FileText, User as UserIcon, Plus } from "lucide-react";

const Dashboard = () => {
  const router = useRouter();
  const session = useUserSession();
  const [activeTab, setActiveTab] = useState<"uploads" | "profile">("uploads");
  
  // Edit profile states
  const [isEdit, setIsEdit] = useState(false);
  const [dialogConfirm, setDialogConfirm] = useState(false);
  const [formData, setFormData] = useState<Partial<CreateUserInput>>({});
  const { mutateAsync: handleUpdate, isPending } = useUpdateProfile();

  const form = useForm<Partial<CreateUserInput>>({
    defaultValues: {
      nim: session.nim,
      name: session.name,
      prodi: session.prodi,
    },
    resolver: zodResolver(createUserSchema.partial()),
  });

  const onSubmit: SubmitHandler<Partial<CreateUserInput>> = (data) => {
    setFormData(data);
    setDialogConfirm(true);
  };

  const handleConfirm = async () => {
    try {
      const res = await handleUpdate({
        data: formData,
        userId: session.id,
      });
      if (res === 200) {
        toast.success("User updated successfully.");
        setDialogConfirm(false);
        setIsEdit(false);
        await deleteCookie("token");
        toast.message(
          "Harap login kembali untuk melihat perubahan pada sesi Anda.",
          { position: "top-center", richColors: true },
        );
        router.push("/auth/login");
      }
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "An unknown error occurred.",
      );
    }
  };

  return (
    <main className="w-full p-4 pb-24 sm:p-6 lg:pb-6 dark:bg-gray-950">
      {/* Welcome Banner */}
      <div className="mb-6 rounded-2xl bg-gradient-to-br from-red-700 to-sky-900 p-6 text-white shadow-lg dark:from-red-950 dark:to-gray-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-white/20 bg-white/10">
              <AvatarFallback className="bg-transparent text-xl font-bold text-white">
                {session.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold sm:text-2xl">
                Selamat datang kembali, {session.name}! 👋
              </h1>
              <p className="text-xs text-slate-200 sm:text-sm">
                NIM: {session.nim} | Program Studi: {session.prodi?.replace(/_/g, " ")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-white/20 text-white hover:bg-white/30 border-0">
              FKI UMS
            </Badge>
          </div>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="mb-8 flex border-b border-slate-200 dark:border-gray-800">
        <button
          onClick={() => setActiveTab("uploads")}
          className={cn(
            "flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all duration-200 outline-none",
            activeTab === "uploads"
              ? "border-red-600 text-red-600 dark:border-red-500 dark:text-red-500"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-gray-200"
          )}
        >
          <FileText className="h-4 w-4" />
          Daftar Soal Saya
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={cn(
            "flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all duration-200 outline-none",
            activeTab === "profile"
              ? "border-red-600 text-red-600 dark:border-red-500 dark:text-red-500"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-gray-200"
          )}
        >
          <UserIcon className="h-4 w-4" />
          Ubah Profil Akun
        </button>
      </div>

      {/* Tab 1: Soal Saya */}
      {activeTab === "uploads" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Koleksi Unggahan Soal
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                Tempat Anda mengelola dan melihat semua soal ujian yang telah Anda bagikan.
              </p>
            </div>
            {/* Direct Upload Button */}
            <div>
              <DialogAddFileUpload />
            </div>
          </div>

          <Separator />

          {/* UserUploads Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <UserUploads />
          </div>
        </div>
      )}

      {/* Tab 2: Ubah Profil Akun */}
      {activeTab === "profile" && (
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Informasi Profil
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                Ubah nama lengkap, NIM, atau program studi akun Anda.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold">
                {isEdit ? "Mode Edit" : "Mode Lihat"}
              </span>
              <Switch checked={isEdit} onCheckedChange={setIsEdit} />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-5">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan nama lengkap"
                            {...field}
                            disabled={isPending || !isEdit}
                            className="bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-800"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nim"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NIM (Nomor Induk Mahasiswa)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan NIM Anda"
                            {...field}
                            disabled={isPending || !isEdit}
                            className="bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-800"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="prodi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program Studi</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isPending || !isEdit}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-800">
                              <SelectValue placeholder="Pilih Program Studi" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Informatika">Informatika</SelectItem>
                            <SelectItem value="Sistem_Informasi">Sistem Informasi</SelectItem>
                            <SelectItem value="Ilmu_Komunikasi">Ilmu Komunikasi</SelectItem>
                            <SelectItem value="Kecerdasan_Buatan">Kecerdasan Buatan</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isPending || !isEdit}
                    className="mt-2 bg-red-600 text-white hover:bg-red-700 font-semibold"
                  >
                    {isPending ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Sidebar metadata */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900/50 space-y-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                Status Akun
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Program Studi</span>
                  <span className="font-semibold">{session.prodi?.replace(/_/g, " ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Fakultas</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">FKI UMS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Role</span>
                  <Badge variant="outline" className="border-red-500 text-red-500 font-semibold">
                    MAHASISWA
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile confirm Dialog */}
      <AlertDialog open={dialogConfirm} onOpenChange={setDialogConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Perubahan Profil</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin memperbarui data profil Anda? Anda akan diminta untuk masuk log (login) kembali untuk memperbarui sesi Anda.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDialogConfirm(false)}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={isPending} className="bg-red-600 text-white hover:bg-red-700">
              {isPending ? "Memproses..." : "Perbarui & Relogin"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default Dashboard;
