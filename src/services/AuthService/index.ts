"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";
import { IUser } from "@/src/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// ! Register User
export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);
    if (data?.success) {
      (await cookies()).set("access_token", data?.data?.accessToken);
      (await cookies()).set("refresh_token", data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// ! Login User
export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);
    if (data?.success) {
      (await cookies()).set("access_token", data?.data?.accessToken);
      (await cookies()).set("refresh_token", data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// ! Logout User

export const logoutUser = async () => {
  (await cookies()).delete("access_token");
  (await cookies()).delete("refresh_token");
};

// get user by decoding the access token
export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("access_token")?.value;

  if (!accessToken) return null;

  const decodedToken = jwtDecode<IUser>(accessToken);
  // Fetch latest user data from DB
  const { data } = await axiosInstance.get(`/users/${decodedToken?._id}`);

  return data?.data;
};
