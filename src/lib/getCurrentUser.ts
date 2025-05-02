"use server"

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function getCurrentUser() {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}
