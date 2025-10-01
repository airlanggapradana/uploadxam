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
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <BiPlus />
          Upload File
        </Button>
      </DialogTrigger>
      <DialogContent className={"sm:max-w-4xl"}>
        <DialogHeader>
          <DialogTitle>Upload File Baru</DialogTitle>
          <DialogDescription>
            Isi form di bawah untuk mengunggah file baru.
          </DialogDescription>
        </DialogHeader>

        {/* Form Component Here */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tipe_soal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipe Soal</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className={"w-full"}>
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
              name="semester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semester</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter semester"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
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
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter year"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mata_kuliah"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mata Kuliah</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter mata kuliah"
                      {...field}
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
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className={"w-full"}>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <UploaderProvider uploadFn={uploadFn} autoUpload>
              <SingleImageDropzone
                height={250}
                width={850}
                dropzoneOptions={{
                  maxSize: 1024 * 1024 * 5, // 5 MB
                  accept: { "application/pdf": [".pdf"] },
                }}
              />
            </UploaderProvider>
          </form>
        </Form>
        <div className={"flex items-center gap-3"}>
          <Button
            type="submit"
            disabled={isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            {isPending ? "Uploading..." : "Submit"}
          </Button>
          <Button
            variant={"secondary"}
            onClick={async () => {
              if (fileUrl) {
                await edgestore.publicFiles.delete({
                  url: fileUrl,
                });
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddFileUpload;
