"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createCar = async (carData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/car/create", carData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error("failed to fetch cars:", error);
    throw new Error("Failed to create car");
  }
};

export const updateCar = async (id: string, carData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/car/${id}`, carData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update car");
  }
};

export const deleteCar = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/car/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete car");
  }
};

export const getCar = async () => {
  try {
    const { data } = await axiosInstance.get("/car");
    // console.log(data);
    return data;
  } catch (error: any) {
    console.log("car error:", error);
    throw new Error(error.message);
  }
};
