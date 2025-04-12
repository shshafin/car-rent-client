"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createYear = async (YearData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/Years/create", YearData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Year");
  }
};

export const getYears = async () => {
  try {
    const { data } = await axiosInstance.get("/Years");

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
