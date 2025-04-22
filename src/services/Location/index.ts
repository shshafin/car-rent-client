"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createLocation = async (locationData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/location/create",
      locationData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create location");
  }
};

export const updateLocation = async (
  id: string,
  locationData: any
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/location/${id}`,
      locationData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update location");
  }
};

export const deleteLocation = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/location/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete location");
  }
};

export const getLocation = async () => {
  try {
    const { data } = await axiosInstance.get("/location", {});

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
