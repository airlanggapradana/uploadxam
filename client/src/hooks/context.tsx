"use client";
import { createContext, useContext, type ReactNode } from "react";
import type { JWTPayload } from "@/utils/helper";
import type { GetExamsResponse } from "@/types/get-exams.type";

// Context
export const UserSessionContext = createContext<JWTPayload | undefined>(
  undefined,
);

export const ExamxSessionContext = createContext<GetExamsResponse | undefined>(
  undefined,
);

// Hook untuk konsumsi
export function useUserSession() {
  const context = useContext(UserSessionContext);
  if (context === undefined) {
    throw new Error("useUserSession must be used within a UserSessionProvider");
  }
  return context;
}

export function useExamSession() {
  const context = useContext(ExamxSessionContext);
  if (context === undefined) {
    throw new Error(
      "useExamxSession must be used within a ExamxSessionProvider",
    );
  }
  return context;
}

// Provider wrapper
interface UserSessionProviderProps {
  value: JWTPayload | undefined;
  children: ReactNode;
}

interface ExamSessionProviderProps {
  value: GetExamsResponse | undefined;
  children: ReactNode;
}

export function ExamSessionProvider({
  value,
  children,
}: ExamSessionProviderProps) {
  return (
    <ExamxSessionContext.Provider value={value}>
      {children}
    </ExamxSessionContext.Provider>
  );
}

export function UserSessionProvider({
  value,
  children,
}: UserSessionProviderProps) {
  return (
    <UserSessionContext.Provider value={value}>
      {children}
    </UserSessionContext.Provider>
  );
}
