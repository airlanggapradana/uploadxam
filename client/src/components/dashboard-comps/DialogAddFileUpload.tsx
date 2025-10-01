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

const DialogAddFileUpload = () => {
  const session = useUserSession();
  const { edgestore } = useEdgeStore();
  const [fileUrl, setFileUrl] = React.useState<string | null>(null);
  const form = useForm<MakeUploadInput>({
    defaultValues: {
      title: "",
      fileUrl: "",
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
      const res = await edgestore.publicFiles.upload({
        file,
        signal,
        onProgressChange,
      });
      // you can run some server action or api here
      // to add the necessary data to your database
      setFileUrl(res.url);
      console.log(res);
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
      const { fileUrl, ...sisa } = d;
      const res = await handleUpload({
        ...sisa,
        fileUrl,
      });
      if (res === 201) {
        toast.success("File uploaded successfully", {
          position: "top-center",
          richColors: true,
        });
        form.reset();
      }
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "An unexpected error occurred",
      );
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <BiPlus />
          Add File Upload
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
                      <SelectTrigger>
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
                    <Input type="number" placeholder="Enter year" {...field} />
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
                }}
              />
            </UploaderProvider>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddFileUpload;
