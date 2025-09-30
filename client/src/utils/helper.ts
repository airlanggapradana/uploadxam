export interface JWTPayload {
  id: string;
  name: string;
  nim: string;
  prodi: "Informatika" | "Sistem_Informasi" | "Ilmu_Komunikasi";
  iat: number;
  exp: number;
}

export function decodeJwtPayload<T = JWTPayload>(token: string): T | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2 || !parts[1]) {
      throw new Error("Invalid JWT format");
    }

    const payload = parts[1];
    // JWT pakai base64url, bukan base64 biasa
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "=",
    );

    // Browser: atob | Node: Buffer
    const decoded =
      typeof atob === "function"
        ? atob(padded)
        : Buffer.from(padded, "base64").toString("utf-8");

    return JSON.parse(decoded) as T;
  } catch (err) {
    console.error("Failed to decode JWT:", err);
    return null;
  }
}
