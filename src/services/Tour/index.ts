"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

// Existing functions
export const createTour = async (tourData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/", tourData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to create tour:", error);
    throw new Error("Failed to create tour");
  }
};

export const updateTour = async (id: string, tourData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/tour/${id}`, tourData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to update tour:", error);
    throw new Error("Failed to update tour");
  }
};

export const deleteTour = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/tour/${id}`);
    return data;
  } catch (error) {
    console.error("Failed to delete tour:", error);
    throw new Error("Failed to delete tour");
  }
};

export const getTour = async () => {
  try {
    const { data } = await axiosInstance.get("/tour");
    return data;
  } catch (error: any) {
    console.error("Failed to fetch tours:", error);
    throw new Error(error.message);
  }
};

// New status-related functions
export const getToursByStatus = async (status: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/status/${status}`);
    return data;
  } catch (error) {
    console.error("Failed to fetch tours by status:", error);
    throw new Error("Failed to fetch tours by status");
  }
};

export const updateTourStatus = async (
  id: string,
  status: string
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/${id}/status`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Failed to update tour status:", error);
    throw new Error("Failed to update tour status");
  }
};
