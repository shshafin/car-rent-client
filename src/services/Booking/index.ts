"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const createBooking = async (BookingData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/booking", BookingData, {
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
    const { data } = await axiosInstance.patch(`/booking/${id}`, BookingData, {
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
    const { data } = await axiosInstance.delete(`/booking/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete booking");
  }
};

export const getBooking = async () => {
  try {
    const { data } = await axiosInstance.get("/booking", {});

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
