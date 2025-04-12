"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createCategory = async (categoryData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/categories/create",
      categoryData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create category");
  }
};

export const getCategories = async () => {
  try {
    const { data } = await axiosInstance.get("/categories");

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
