import { useQuery, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type { CreateUserInput, LoginInput } from "@/zod/zod.validation";
import { env } from "@/env";
import type { GetExamsResponse } from "@/types/get-exams.type";

export const useRegister = () => {
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

export const useGetExams = (
  prodi?: "Informatika" | "Sistem_Informasi" | "Ilmu_Komunikasi" | "All",
) => {
  return useQuery<GetExamsResponse>({
    queryKey: ["exams", { prodi }],
    queryFn: async () => {
      try {
        return await axios
          .get(
            `${env.NEXT_PUBLIC_API_URL}/users/uploads${prodi !== "All" ? `?prodi=${prodi}` : ""}`,
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
