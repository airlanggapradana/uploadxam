"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BiPlus } from "react-icons/bi";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type MakeUploadInput, makeUploadSchema } from "@/zod/zod.validation";
import { useUserSession } from "@/hooks/context";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useEdgeStore } from "@/lib/edgestore";
import {
  UploaderProvider,
  type UploadFn,
} from "@/components/upload/uploader-provider";
import { useMakeUpload } from "@/utils/query";
import { SingleImageDropzone } from "@/components/upload/single-image";
import { toast } from "sonner";
import { EdgeStoreApiClientError } from "@edgestore/shared";
import { formatFileSize } from "@edgestore/react/utils";

const DialogAddFileUpload = () => {
  const session = useUserSession();
  const { edgestore } = useEdgeStore();

  const [fileUrl, setFileUrl] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);

  const form = useForm<MakeUploadInput>({
    defaultValues: {
      title: "",
      tipe_soal: "UTS",
      kategori: "REGULER",
      semester: 1,
      year: new Date().getFullYear(),
      prodi: session.prodi,
      mata_kuliah: "",
      userId: session.id,
    },
    resolver: zodResolver(makeUploadSchema),
  });

  const uploadFn: UploadFn = React.useCallback(
    async ({ file, onProgressChange, signal }) => {
      if (file.type !== "application/pdf") {
        toast.error("Only PDF files are allowed", {
          position: "top-center",
          richColors: true,
        });
      }
      if (file.size >= 1024 * 1024 * 5) {
        toast.error("File size exceeds 5MB", {
          position: "top-center",
          richColors: true,
        });
      }
      const res = await edgestore.publicFiles.upload({
        file,
        signal,
        onProgressChange,
        options: {
          temporary: true,
        },
      });
      setFileUrl(res.url);
      return res;
    },
    [edgestore],
  );

  const { mutateAsync: handleUpload, isPending } = useMakeUpload();

  const onSubmit: SubmitHandler<MakeUploadInput> = async (d) => {
    if (!fileUrl)
      return toast.error("Please upload a file first", {
        position: "top-center",
        richColors: true,
      });
    try {
      await edgestore.publicFiles.confirmUpload({
        url: fileUrl,
      });
      const res = await handleUpload({
        data: d,
        fileUrl,
      });
      if (res === 201) {
        toast.success("File uploaded successfully", {
          position: "top-center",
          richColors: true,
        });
        form.reset();
        setFileUrl(null);
        setOpen(false);
      }
    } catch (e) {
      // All errors are typed and you will get intellisense for them
      if (e instanceof EdgeStoreApiClientError) {
        // if it fails due to the `maxSize` set in the router config
        if (e.data.code === "FILE_TOO_LARGE") {
          toast.error("File too large. Max size is 5MB", {
            position: "top-center",
            richColors: true,
          });
        }
        // if it fails due to the `accept` set in the router config
        if (e.data.code === "MIME_TYPE_NOT_ALLOWED") {
          toast.error(`File type not allowed. Only PDF files are allowed`, {
            position: "top-center",
            richColors: true,
          });
        }
      } else if (e instanceof Error) {
        toast.error(e.message, { position: "top-center", richColors: true });
      } else {
        toast.error("An unknown error occurred", {
          position: "top-center",
          richColors: true,
        });
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className={"hidden sm:flex"}>
        <Button>
          <BiPlus />
          Upload File
        </Button>
      </DialogTrigger>
      <DialogTrigger asChild className={"flex sm:hidden"}>
        <Button size="icon">
          <BiPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] max-w-[95vw] overflow-y-auto p-4 sm:max-h-[90vh] sm:max-w-4xl sm:p-6">
        <DialogHeader className="mb-3 sm:mb-4">
          <DialogTitle className="text-base font-semibold sm:text-xl">
            Upload File Baru
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Isi form di bawah untuk mengunggah file baru.
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
                  <FormLabel className="text-xs font-medium sm:text-sm">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter title"
                      {...field}
                      className="h-9 text-sm focus-visible:ring-1 sm:h-10"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="tipe_soal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium sm:text-sm">
                      Tipe Soal
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="h-9 w-full text-sm focus:ring-1 sm:h-10">
                          <SelectValue placeholder="Select tipe soal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTS">UTS</SelectItem>
                          <SelectItem value="UAS">UAS</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="kategori"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium sm:text-sm">
                      Kategori
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="h-9 w-full text-sm focus:ring-1 sm:h-10">
                          <SelectValue placeholder="Select kategori soal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INTER">International</SelectItem>
                          <SelectItem value="REGULER">Reguler</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium sm:text-sm">
                      Semester
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Semester"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="h-9 text-sm focus-visible:ring-1 sm:h-10"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium sm:text-sm">
                      Year
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Year"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="h-9 text-sm focus-visible:ring-1 sm:h-10"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="mata_kuliah"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium sm:text-sm">
                    Mata Kuliah
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter mata kuliah"
                      {...field}
                      className="h-9 text-sm focus-visible:ring-1 sm:h-10"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prodi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium sm:text-sm">
                    Program Studi
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="h-9 w-full text-sm focus:ring-1 sm:h-10">
                        <SelectValue placeholder="Select program studi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Informatika">Informatika</SelectItem>
                        <SelectItem value="Sistem_Informasi">
                          Sistem Informasi
                        </SelectItem>
                        <SelectItem value="Ilmu_Komunikasi">
                          Ilmu Komunikasi
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="pt-1 sm:pt-2">
              <label className="mb-2 block text-xs font-medium sm:text-sm">
                Upload File
              </label>
              <UploaderProvider uploadFn={uploadFn} autoUpload>
                <div className="w-full">
                  <SingleImageDropzone
                    height={120}
                    width={
                      typeof window !== "undefined" && window.innerWidth < 640
                        ? Math.min(window.innerWidth - 64, 400)
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

        <div className="mt-3 flex flex-col-reverse gap-2 sm:mt-4 sm:flex-row sm:gap-3">
          <Button
            variant="outline"
            className="h-9 w-full text-xs sm:h-10 sm:w-auto sm:text-sm"
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
              setOpen(!open);
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="h-9 w-full text-xs sm:h-10 sm:w-auto sm:text-sm"
            onClick={form.handleSubmit(onSubmit)}
          >
            {isPending ? "Uploading..." : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddFileUpload;
