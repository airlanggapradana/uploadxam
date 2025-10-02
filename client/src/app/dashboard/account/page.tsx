"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUserSession } from "@/hooks/context";
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

const AccountPage = () => {
  const router = useRouter();
  const session = useUserSession();
  const [isEdit, setIsEdit] = React.useState(false);
  const [dialogConfirm, setDialogConfirm] = React.useState(false);
  const [formData, setFormData] = React.useState<Partial<CreateUserInput>>({});
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
    <div className="w-full p-4">
      <div className="mb-8 space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
          Account
        </h1>
        <p className="text-[15px] text-gray-600 dark:text-gray-400">
          Manage your account information
        </p>
      </div>

      <Separator className="mb-8" />

      <div className="mb-8 grid grid-cols-4 gap-8">
        <div className={"col-span-3"}>
          <div className={"flex items-center justify-between"}>
            <h2 className="mb-5 text-base font-semibold text-black dark:text-white">
              Profile
            </h2>
            <Switch onClick={() => setIsEdit(!isEdit)} />
          </div>
          <div className="flex w-full items-start gap-4">
            <Avatar className="h-[72px] w-[72px]">
              <AvatarFallback>
                {session.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className={"w-full"}>
                        <FormLabel>Name</FormLabel>
                        <FormControl className={"w-full"}>
                          <Input
                            placeholder="Enter your name"
                            {...field}
                            disabled={isPending || !isEdit}
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
                        <FormLabel>NIM</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your NIM"
                            {...field}
                            disabled={isPending || !isEdit}
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
                        >
                          <FormControl>
                            <SelectTrigger
                              className={"w-full"}
                              disabled={isPending || !isEdit}
                            >
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem
                              value="Informatika"
                              disabled={isPending || !isEdit}
                            >
                              Informatika
                            </SelectItem>
                            <SelectItem
                              value="Sistem_Informasi"
                              disabled={isPending || !isEdit}
                            >
                              Sistem Informasi
                            </SelectItem>
                            <SelectItem
                              value="Ilmu_Komunikasi"
                              disabled={isPending || !isEdit}
                            >
                              Ilmu Komunikasi
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isPending || !isEdit}
                    className="mt-2 w-fit"
                  >
                    {isPending ? "Saving..." : "Save"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-5 text-base font-semibold text-black dark:text-white">
            Program Studi
          </h2>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[15px] text-black dark:text-white">
                {session.prodi}
              </span>
              <Badge
                variant="secondary"
                className={cn(
                  session.prodi === "Informatika" && "bg-sky-500 text-gray-50",
                  session.prodi === "Sistem_Informasi" &&
                    "bg-amber-500 text-gray-50",
                  session.prodi !== "Informatika" &&
                    session.prodi !== "Sistem_Informasi" &&
                    "bg-indigo-500 text-gray-50",
                )}
              >
                {session.prodi === "Informatika"
                  ? "IF"
                  : session.prodi === "Ilmu_Komunikasi"
                    ? "ILKM"
                    : session.prodi === "Sistem_Informasi"
                      ? "SI"
                      : "Unknown"}
              </Badge>
              <Badge
                variant="secondary"
                className="border-0 bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-700 hover:bg-gray-200"
              >
                FKI
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <Separator />

      <div className={"mt-8"}>
        <h2 className="mb-5 text-base font-semibold text-black dark:text-white">
          Danger Zone
        </h2>
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <p className="mb-1 text-[15px] font-semibold text-black dark:text-white">
              Hapus Akun
            </p>
            <p className="max-w-2xl text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">
              Setelah menghapus akun, semua data Anda akan dihapus secara
              permanen. Pastikan untuk mencadangkan informasi penting sebelum
              melanjutkan. Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>
          <Button
            variant="outline"
            className="shrink-0 border border-red-300 px-5 text-sm font-medium text-red-600 hover:border-red-400 hover:bg-red-50 hover:text-red-700"
          >
            Delete Account
          </Button>
        </div>
      </div>

      <AlertDialog open={dialogConfirm} onOpenChange={setDialogConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Profile Update</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to update your profile information? This
              will modify your account details.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDialogConfirm(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={isPending}>
              {isPending ? "Updating..." : "Update"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AccountPage;
