"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const createPayment = async (PaymentData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/payment", PaymentData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create payment");
  }
};
