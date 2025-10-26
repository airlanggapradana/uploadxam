import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type {
  CreateUserInput,
  LoginInput,
  MakeUploadInput,
  UpdateUploadInput,
} from "@/zod/zod.validation";
import { env } from "@/env";
import type { GetExamsResponse } from "@/types/get-exams.type";
import type { GetUserUploadsResponse } from "@/types/get-user-uploads.type";
import type { GetRecentActivType } from "@/types/get-recent-activ.type";
import type { GetUsersStatsResponse } from "@/types/get-users-stats.type";

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateUserInput) => {
      try {
        return await axios
          .post(`${env.NEXT_PUBLIC_API_URL}/auth/register`, data, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          })
          .then((res) => res.status);
      } catch (e) {
        if (e instanceof AxiosError) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
          throw new Error(e.response?.data.message);
        }
        throw new Error("An unknown error occurred");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user-stats"] });
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginInput) => {
      try {
        return await axios
          .post(`${env.NEXT_PUBLIC_API_URL}/auth/login`, data, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          })
          .then((res) => res.data as { message: string; data: string });
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            e.response?.data.message ?? "Terjadi kesalahan tak terduga",
          );
        }
        throw new Error("An unknown error occurred");
      }
    },
  });
};

export const useGetExams = ({
  prodi,
  subject,
}: {
  prodi?: "Informatika" | "Sistem_Informasi" | "Ilmu_Komunikasi" | "All";
  subject?: string;
}) => {
  return useQuery<GetExamsResponse>({
    queryKey: ["exams", { prodi, subject }],
    queryFn: async () => {
      try {
        return await axios
          .get(
            `${env.NEXT_PUBLIC_API_URL}/users/uploads${prodi && prodi !== "All" ? `?prodi=${prodi}` : ""}${subject ? `${prodi && prodi !== "All" ? "&" : "?"}subject=${subject}` : ""}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "GET",
            },
          )
          .then((res) => res.data as GetExamsResponse);
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            e.response?.data.message ?? "Terjadi kesalahan tak terduga",
          );
        }
        throw new Error("An unknown error occurred");
      }
    },
  });
};

export const useMakeUpload = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      fileUrl,
    }: {
      data: MakeUploadInput;
      fileUrl: string;
    }) => {
      try {
        return await axios
          .post(
            `${env.NEXT_PUBLIC_API_URL}/users/upload`,
            {
              ...data,
              fileUrl,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
            },
          )
          .then((res) => res.status);
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            e.response?.data.message ?? "Terjadi kesalahan tak terduga",
          );
        }
        throw new Error("An unknown error occurred");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      userId,
    }: {
      data: Partial<CreateUserInput>;
      userId: string;
    }) => {
      try {
        return await axios
          .put(`${env.NEXT_PUBLIC_API_URL}/users/${userId}`, data, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "PUT",
          })
          .then((res) => res.status);
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            e.response?.data.message ?? "Terjadi kesalahan tak terduga",
          );
        }
        throw new Error("An unknown error occurred");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
};

export const useGetUserUploads = (userId: string) => {
  return useQuery<GetUserUploadsResponse>({
    queryKey: ["user-uploads", { userId }],
    queryFn: async () => {
      try {
        return await axios
          .get(`${env.NEXT_PUBLIC_API_URL}/users/${userId}/uploads`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          })
          .then((res) => res.data as GetUserUploadsResponse);
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            e.response?.data.message ?? "Terjadi kesalahan tak terduga",
          );
        }
        throw new Error("An unknown error occurred");
      }
    },
  });
};

export const useUpdateUpload = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      uploadId,
      fileUrl,
    }: {
      data: UpdateUploadInput;
      uploadId: string;
      fileUrl?: string;
    }) => {
      try {
        return await axios
          .put(
            `${env.NEXT_PUBLIC_API_URL}/users/uploads/${uploadId}`,
            {
              ...data,
              fileUrl,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "PUT",
            },
          )
          .then((res) => res.status);
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            e.response?.data.message ?? "Terjadi kesalahan tak terduga",
          );
        }
        throw new Error("An unknown error occurred");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["exams"] });
      await queryClient.invalidateQueries({ queryKey: ["user-uploads"] });
    },
  });
};

export const useDeleteUpload = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (uploadId: string) => {
      try {
        return await axios
          .delete(`${env.NEXT_PUBLIC_API_URL}/users/uploads/${uploadId}`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "DELETE",
          })
          .then(
            (res) => res.data as { message: string; deletedUpload: string },
          );
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            e.response?.data.message ?? "Terjadi kesalahan tak terduga",
          );
        }
        throw new Error("An unknown error occurred");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["exams"] });
      await queryClient.invalidateQueries({ queryKey: ["user-uploads"] });
    },
  });
};

export const useGetRecentActivities = () => {
  return useQuery<GetRecentActivType>({
    queryKey: ["activities"],
    queryFn: async () => {
      try {
        return await axios
          .get(`${env.NEXT_PUBLIC_API_URL}/users/uploads/recent`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          })
          .then((res) => res.data as GetRecentActivType);
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            e.response?.data.message ?? "Terjadi kesalahan tak terduga",
          );
        }
        throw new Error("An unknown error occurred");
      }
    },
  });
};

export const useGetUserStats = () => {
  return useQuery<GetUsersStatsResponse>({
    queryKey: ["user-stats"],
    queryFn: async () => {
      try {
        return await axios
          .get(`${env.NEXT_PUBLIC_API_URL}/users/stats`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          })
          .then((res) => res.data as GetUsersStatsResponse);
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            e.response?.data.message ?? "Terjadi kesalahan tak terduga",
          );
        }
        throw new Error("An unknown error occurred");
      }
    },
  });
};
