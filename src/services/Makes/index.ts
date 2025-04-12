"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createMake = async (makeData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/makes/create", makeData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create make");
  }
};

export const getMakes = async () => {
  try {
    const { data } = await axiosInstance.get("/makes");

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
