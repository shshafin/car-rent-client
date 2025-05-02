"use server";

import  axiosInstance  from "@/src/lib/AxiosInstance";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";

// ! Register User
export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/users/create", userData);
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
      // Save the tokens to cookies
      (await cookies()).set("access_token", data?.data?.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      (await cookies()).set("refresh_token", data?.data?.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
    }
    return data;
  } catch (error: any) {
    console.error("Login error: ", error);
    throw new Error(
      error?.response?.data?.message || "An error occurred during login."
    );
  }
};

// ! Logout User

// Updated logout function in your actions file
export const logoutUser = async () => {
  const cookieStore = await cookies();
  console.log(cookieStore.getAll(), 'all cookies');

  cookieStore.set("access_token", "", { expires: new Date(0) });
  cookieStore.set("refresh_token", "", { expires: new Date(0) });
  console.log(cookieStore.getAll(), 'all cookies');
  // Redirect to login page after logout
  redirect("/login");
};

export const clientLogout = async () => {
  try {
    // Call the server action to clear cookies
    await logoutUser();

    return { success: true };
  } catch (error) {
    console.error("Client logout error:", error);
    return { success: false, error };
  }
};

// ! Get Current User
// let cachedUser: any = null; // In-memory cache

export const getCurrentUser = async () => {
  // if (cachedUser) return cachedUser; // Return cached user data if available

  const accessToken = (await cookies()).get("access_token")?.value;

  if (!accessToken) return null;
  const decodedToken = jwtDecode<any>(accessToken);

  if (!decodedToken?.userEmail) {
    return null;
  }

  // Fetch the user data from API
  const { data } = await axiosInstance.get(`/users/${decodedToken.userEmail}`);

  // if (data?.data) {
  //   cachedUser = data.data; // Cache the user data
  // }

  return data?.data;
};

export const changePassword = async (passwordData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/auth/change-password", passwordData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to change password");
  }
};