import { useMutation } from "@tanstack/react-query";
import { changePassword, loginUser, registerUser } from "../services/AuthService";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import Cookies from "js-cookie";

// ! Register User Hook
export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["REGISTER_USER"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("Registration Successful!");
    },
    onError: (error) => {
      toast.error(error?.message || "Registration Failed!");
    },
  });
};

// ! Login User Hook
export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["LOGIN_USER"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: async (data) => {
      // Save tokens after login using js-cookie
      Cookies.set("access_token", data.accessToken, {
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("refresh_token", data.refreshToken, {
        secure: true,
        sameSite: "strict",
      });
      toast.success("Login Successful!");
    },
    onError: (error) => {
      toast.error(error?.message || "Login Failed!");
    },
  });
};

export const useChangePassword = ({ onSuccess }: any) => {
  return useMutation<any, Error, any>({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: async (passwordData) => await changePassword(passwordData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};
