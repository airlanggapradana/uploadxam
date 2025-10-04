"use client";
import React, { useEffect } from "react";
import {
  useDeleteUpload,
  useGetUserUploads,
  useUpdateUpload,
} from "@/utils/query";
import { useUserSession } from "@/hooks/context";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Edit, Trash } from "lucide-react";
import { BiUser } from "react-icons/bi";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Upload } from "@/types/get-user-uploads.type";
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
import {
  UploaderProvider,
  type UploadFn,
} from "@/components/upload/uploader-provider";
import { SingleImageDropzone } from "@/components/upload/single-image";
import { toast } from "sonner";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  type UpdateUploadInput,
  updateUploadSchema,
} from "@/zod/zod.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEdgeStore } from "@/lib/edgestore";
import { EdgeStoreApiClientError } from "@edgestore/shared";
import { formatFileSize } from "@edgestore/react/utils";

const UserUploads = () => {
  const session = useUserSession();
  const { data: uploads, isLoading, error } = useGetUserUploads(session.id);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [selectedUpload, setSelectedUpload] = React.useState<Upload | null>(
    null,
  );
  const [fileUrl, setFileUrl] = React.useState<string | null>(null);

  const form = useForm<UpdateUploadInput>({
    defaultValues: {
      title: selectedUpload?.title ?? "",
      tipe_soal: ((selectedUpload?.tipe_soal as "UTS") || "UAS") ?? "UTS",
      semester: selectedUpload?.semester ?? 1,
      year: selectedUpload?.year ?? new Date().getFullYear(),
      kategori:
        ((selectedUpload?.kategori as "REGULER") || "INTER") ?? "REGULER",
      prodi:
        ((selectedUpload?.prodi as "Informatika") ||
          "Sistem_Informasi" ||
          "Ilmu_Komunikasi") ??
        "Informatika",
      mata_kuliah: selectedUpload?.mata_kuliah ?? "",
      userId: session.id,
    },
    resolver: zodResolver(updateUploadSchema),
  });

  useEffect(() => {
    if (selectedUpload) {
      form.reset({
        title: selectedUpload?.title ?? "",
        tipe_soal: ((selectedUpload?.tipe_soal as "UTS") || "UAS") ?? "UTS",
        semester: selectedUpload?.semester ?? 1,
        year: selectedUpload?.year ?? new Date().getFullYear(),
        kategori:
          ((selectedUpload?.kategori as "REGULER") || "INTER") ?? "REGULER",
        prodi:
          ((selectedUpload?.prodi as "Informatika") ||
            "Sistem_Informasi" ||
            "Ilmu_Komunikasi") ??
          "Informatika",
        mata_kuliah: selectedUpload?.mata_kuliah ?? "",
        userId: session.id,
      });
    }
  }, [form, selectedUpload, session.id]);

  const { edgestore } = useEdgeStore();
  const uploadFn: UploadFn = React.useCallback(
    async ({ file, onProgressChange, signal }) => {
      const res = await edgestore.publicFiles.upload({
        file,
        signal,
        onProgressChange,
        options: {
          temporary: true,
          replaceTargetUrl: selectedUpload ? selectedUpload.fileUrl : undefined,
        },
      });
      // you can run some server action or api here
      // to add the necessary data to your database
      console.log(res);
      setFileUrl(res.url);
      return res;
    },
    [edgestore.publicFiles, selectedUpload],
  );

  const { mutateAsync: handleUpdate, isPending } = useUpdateUpload();
  const { mutateAsync: handleDelete, isPending: isPendingDelete } =
    useDeleteUpload();

  const onSubmit: SubmitHandler<UpdateUploadInput> = async (d) => {
    if (!selectedUpload) return toast.error("No upload selected");
    try {
      if (fileUrl) {
        await edgestore.publicFiles.confirmUpload({
          url: fileUrl,
        });
      }
      const res = await handleUpdate({
        uploadId: selectedUpload.id,
        data: d,
        fileUrl: fileUrl ?? selectedUpload.fileUrl,
      });
      if (res === 200) {
        toast.success("Upload updated successfully", {
          position: "top-center",
          richColors: true,
        });
        setIsEditOpen(false);
        setSelectedUpload(null);
        form.reset();
        setFileUrl(null);
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message, {
          position: "top-center",
          richColors: true,
        });
      }
      // All errors are typed and you will get intellisense for them
      if (error instanceof EdgeStoreApiClientError) {
        // if it fails due to the `maxSize` set in the router config
        if (error.data.code === "FILE_TOO_LARGE") {
          alert(
            `File too large. Max size is ${formatFileSize(
              error.data.details.maxFileSize,
            )}`,
          );
        }
        // if it fails due to the `accept` set in the router config
        if (error.data.code === "MIME_TYPE_NOT_ALLOWED") {
          alert(
            `File type not allowed. Allowed types are ${error.data.details.allowedMimeTypes.join(
              ", ",
            )}`,
          );
        }
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!uploads) return <div>No uploads found.</div>;
  return (
    <>
      {uploads.uploads.length > 0 ? (
        uploads.uploads.map((upload) => (
          <div
            key={upload.id}
            className="rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-teal-400"
          >
            <div className="mb-2 flex items-start justify-between">
              <h4 className="line-clamp-1 font-medium text-slate-800 dark:text-slate-100">
                {upload.title}
              </h4>
              <div className={"flex items-center gap-3"}>
                <Badge
                  className={`${
                    upload.tipe_soal === "UAS"
                      ? "bg-blue-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {upload.tipe_soal}
                </Badge>
                <Badge
                  className={`${
                    upload.kategori === "REGULER"
                      ? "bg-gray-500 text-white"
                      : "bg-sky-500 text-white"
                  }`}
                >
                  {upload.kategori}
                </Badge>
              </div>
            </div>
            <div className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 dark:text-slate-300" />
                <span>{upload.mata_kuliah}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 dark:text-slate-300" />
                <span>Tahun {upload.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <BiUser className="h-4 w-4 dark:text-slate-300" />
                <span className="text-xs">
                  {upload.user.name} - {upload.user.nim}
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {new Date(upload.uploadedAt).toLocaleTimeString("id-ID", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </span>
              <div className={"flex items-center gap-3"}>
                <Button
                  variant={"destructive"}
                  onClick={async () => {
                    const res = await handleDelete(upload.id);
                    if (res) {
                      await edgestore.publicFiles.delete({
                        url: res.deletedUpload,
                      });
                    }
                    toast.success("Deleted successfully", {
                      position: "top-center",
                      richColors: true,
                    });
                  }}
                >
                  <Trash />
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    setIsEditOpen(true);
                    setSelectedUpload(upload);
                  }}
                >
                  <Edit />
                </Button>
                <Link
                  href={upload.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Lihat File →
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 italic dark:text-gray-400">
          No uploads found.
        </div>
      )}

      {selectedUpload && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-h-[90vh] w-full overflow-y-auto px-2 py-4 sm:max-w-4xl sm:px-8 sm:py-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-lg sm:text-xl">
                Update File
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                Update your existing upload details and file.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3 sm:space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter title"
                          {...field}
                          defaultValue={field.value}
                          className="h-9 text-sm sm:h-10 sm:text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <FormField
                    control={form.control}
                    name="tipe_soal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">
                          Tipe Soal
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="h-9 w-full text-sm sm:h-10 sm:text-base">
                              <SelectValue placeholder="Select tipe soal" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="UTS">UTS</SelectItem>
                              <SelectItem value="UAS">UAS</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="kategori"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">
                          Kategori
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="h-9 w-full text-sm sm:h-10 sm:text-base">
                              <SelectValue placeholder="Select kategori soal" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="INTER">
                                International
                              </SelectItem>
                              <SelectItem value="REGULER">Reguler</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <FormField
                    control={form.control}
                    name="semester"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">
                          Semester
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter semester"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            className="h-9 text-sm sm:h-10 sm:text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">
                          Year
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter year"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            className="h-9 text-sm sm:h-10 sm:text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="mata_kuliah"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">
                        Mata Kuliah
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter mata kuliah"
                          {...field}
                          className="h-9 text-sm sm:h-10 sm:text-base"
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
                      <FormLabel className="text-sm sm:text-base">
                        Program Studi
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="h-9 w-full text-sm sm:h-10 sm:text-base">
                            <SelectValue placeholder="Select program studi" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Informatika">
                              Informatika
                            </SelectItem>
                            <SelectItem value="Sistem_Informasi">
                              Sistem Informasi
                            </SelectItem>
                            <SelectItem value="Ilmu_Komunikasi">
                              Ilmu Komunikasi
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <label className="mb-2 block text-sm font-medium sm:text-base">
                    Upload File
                  </label>
                  <UploaderProvider uploadFn={uploadFn} autoUpload>
                    <div className="w-full">
                      <SingleImageDropzone
                        height={140}
                        width={
                          typeof window !== "undefined" &&
                          window.innerWidth < 640
                            ? window.innerWidth - 48
                            : 850
                        }
                        dropzoneOptions={{
                          maxSize: 1024 * 1024 * 5,
                          accept: { "application/pdf": [".pdf"] },
                        }}
                      />
                    </div>
                  </UploaderProvider>
                </div>
              </form>
            </Form>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <Button
                type="submit"
                disabled={isPending}
                className="h-9 w-full text-sm sm:h-10 sm:w-auto sm:text-base"
                onClick={form.handleSubmit(onSubmit)}
              >
                {isPending ? "Uploading..." : "Submit"}
              </Button>
              <Button
                variant="secondary"
                className="h-9 w-full text-sm sm:h-10 sm:w-auto sm:text-base"
                onClick={async () => {
                  if (fileUrl) {
                    await edgestore.publicFiles.delete({ url: fileUrl });
                    setFileUrl(null);
                    toast.success("Upload cancelled and file deleted", {
                      position: "top-center",
                      richColors: true,
                    });
                  }
                  form.reset();
                  setFileUrl(null);
                  setIsEditOpen(!open);
                }}
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default UserUploads;
