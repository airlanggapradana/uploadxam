import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type {
  CreateUserInput,
  LoginInput,
  MakeUploadInput,
  UpdateUploadInput,
  ReportInput,
} from "@/zod/zod.validation";
import { env } from "@/env";
import type { GetExamsResponse } from "@/types/get-exams.type";
import type { GetUserUploadsResponse } from "@/types/get-user-uploads.type";
import type { GetRecentActivType } from "@/types/get-recent-activ.type";
import type { GetUsersStatsResponse } from "@/types/get-users-stats.type";
import type { GetRepoStatsType } from "@/types/get-repo-stats.type";
import type {
  GetAdminReportsResponse,
  GetAdminReportByIdResponse,
  Report,
} from "@/types/report.type";


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
  tipe_soal,
  kategori,
}: {
  prodi?:
    | "Informatika"
    | "Sistem_Informasi"
    | "Ilmu_Komunikasi"
    | "Kecerdasan_Buatan"
    | "All";
  subject?: string;
  tipe_soal?: "UTS" | "UAS";
  kategori?: "REGULER" | "INTER";
}) => {
  return useQuery<GetExamsResponse>({
    queryKey: ["exams", { prodi, subject, tipe_soal, kategori }],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();

        if (prodi && prodi !== "All") params.append("prodi", prodi);
        if (subject) params.append("subject", subject);
        if (tipe_soal) params.append("tipe_soal", tipe_soal);
        if (kategori) params.append("kategori", kategori);

        const queryString = params.toString();
        const url = `${env.NEXT_PUBLIC_API_URL}/users/uploads${queryString ? `?${queryString}` : ""}`;

        return await axios
          .get(url, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          })
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
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
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

export const useGetGithubStats = () => {
  return useQuery({
    queryKey: ["repo-stats"],
    queryFn: async () => {
      return await axios
        .get(`https://api.github.com/repos/airlanggapradana/uploadxam`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN}`,
          },
          method: "GET",
        })
        .then((res) => res.data as GetRepoStatsType);
    },
  });
};

export const useGetPageViews = () => {
  return useQuery({
    queryKey: ["page-views"],
    queryFn: async () => {
      // Call internal Next.js API route (server-side proxy) to avoid CORS
      const res = await fetch("/api/page-views", {
        method: "GET",
      });

      if (!res.ok) return null;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const json = await res.json();

      // Response: { version, query, data: { pageviews: number, visitors: number } }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const pageviews: number | null = typeof json?.data?.pageviews === "number" ? (json.data.pageviews as number) : null;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const visitors: number | null = typeof json?.data?.visitors === "number" ? (json.data.visitors as number) : null;

      return { pageviews, visitors };
    },
    staleTime: 1000 * 60 * 5, // cache 5 minutes
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: async (userId: string) => {
      try {
        return await axios
          .delete(`${env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
            headers: {
              "Content-Type": "application/json",
            },
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
  });
};

export const useIncrementView = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (uploadId: string) => {
      try {
        return await axios
          .patch(`${env.NEXT_PUBLIC_API_URL}/users/uploads/${uploadId}/view`)
          .then((res) => res.data);
      } catch {
        // Silent failure for stats
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["exams"] });
      void queryClient.invalidateQueries({ queryKey: ["user-uploads"] });
      void queryClient.invalidateQueries({ queryKey: ["recent-uploads"] });
    },
  });
};

export const useIncrementDownload = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (uploadId: string) => {
      try {
        return await axios
          .patch(`${env.NEXT_PUBLIC_API_URL}/users/uploads/${uploadId}/download`)
          .then((res) => res.data);
      } catch {
        // Silent failure for stats
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["exams"] });
      void queryClient.invalidateQueries({ queryKey: ["user-uploads"] });
      void queryClient.invalidateQueries({ queryKey: ["recent-uploads"] });
    },
  });
};

export const useUpsertRating = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      uploadId,
      value,
    }: {
      userId: string;
      uploadId: string;
      value: number;
    }) => {
      try {
        return await axios
          .post(
            `${env.NEXT_PUBLIC_API_URL}/ratings`,
            { userId, uploadId, value },
            { headers: { "Content-Type": "application/json" } },
          )
          .then((res) => res.data as { message: string; data: { id: string; value: number } });
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
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["exams"] });
      void queryClient.invalidateQueries({ queryKey: ["user-rating"] });
    },
  });
};

export const useGetUserRating = (uploadId: string, userId: string | undefined) => {
  return useQuery<{ data: { id: string; value: number } | null }>({
    queryKey: ["user-rating", { uploadId, userId }],
    queryFn: async () => {
      try {
        return await axios
          .get(`${env.NEXT_PUBLIC_API_URL}/ratings/${uploadId}?userId=${userId}`)
          .then((res) => res.data as { data: { id: string; value: number } | null });
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
    enabled: !!uploadId && !!userId,
  });
};

// ============================================================================
// Report hooks
// ============================================================================

export const useCreateReport = () => {
  return useMutation({
    mutationFn: async (data: ReportInput) => {
      try {
        return await axios
          .post(
            `${env.NEXT_PUBLIC_API_URL}/reports`,
            data,
            { headers: { "Content-Type": "application/json" } },
          )
          .then((res) => res.data as { message: string; data: Report });
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

export const useGetAdminReports = ({
  page = 1,
  limit = 10,
  status,
  reason,
  search,
  sortBy = "createdAt",
  order = "desc",
}: {
  page?: number;
  limit?: number;
  status?: string;
  reason?: string;
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}) => {
  return useQuery<GetAdminReportsResponse>({
    queryKey: ["admin-reports", { page, limit, status, reason, search, sortBy, order }],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        params.append("page", String(page));
        params.append("limit", String(limit));
        if (status) params.append("status", status);
        if (reason) params.append("reason", reason);
        if (search) params.append("search", search);
        params.append("sortBy", sortBy);
        params.append("order", order);

        return await axios
          .get(`${env.NEXT_PUBLIC_API_URL}/reports/admin?${params.toString()}`, {
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => res.data as GetAdminReportsResponse);
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

export const useGetAdminReportById = (id: string) => {
  return useQuery<GetAdminReportByIdResponse>({
    queryKey: ["admin-report", { id }],
    queryFn: async () => {
      try {
        return await axios
          .get(`${env.NEXT_PUBLIC_API_URL}/reports/admin/${id}`, {
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => res.data as GetAdminReportByIdResponse);
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
    enabled: !!id,
  });
};

export const useUpdateReportStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      try {
        return await axios
          .patch(
            `${env.NEXT_PUBLIC_API_URL}/reports/admin/${id}`,
            { status },
            { headers: { "Content-Type": "application/json" } },
          )
          .then((res) => res.data as { message: string; data: Report });
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
      await queryClient.invalidateQueries({ queryKey: ["admin-reports"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-report"] });
    },
  });
};

export const useDeleteReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        return await axios
          .delete(`${env.NEXT_PUBLIC_API_URL}/reports/admin/${id}`, {
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => res.data as { message: string });
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
      await queryClient.invalidateQueries({ queryKey: ["admin-reports"] });
    },
  });
};
