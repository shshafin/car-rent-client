import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../services/AuthService";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

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
    onSuccess: () => {
      toast.success("Login Successful!");
    },
    onError: (error) => {
      toast.error(error?.message || "Login Failed!");
    },
  });
};
