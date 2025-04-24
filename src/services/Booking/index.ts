"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const createBooking = async (BookingData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/", BookingData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create booking");
  }
};

export const updateBooking = async (
  id: string,
  BookingData: any
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/${id}`, BookingData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update booking");
  }
};

export const deleteBooking = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete booking");
  }
};

export const getBooking = async () => {
  try {
    const { data } = await axiosInstance.get("/", {});

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
