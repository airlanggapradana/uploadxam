import { useQuery, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type { CreateUserInput } from "@/zod/zod.validation";
import { env } from "@/env";

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
