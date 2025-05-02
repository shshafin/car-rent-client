"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const createPackage = async (PackageData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/package/create", PackageData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create package");
  }
};

export const updatePackage = async (
  id: string,
  PackageData: any
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/package/${id}`, PackageData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update package");
  }
};

export const deletePackage = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/package/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete package");
  }
};

// export const getPackage = async () => {
//   try {
//     const { data } = await axiosInstance.get("/package", {});

//     return data;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

export const getPackage = async (pickupId: string, dropId: string) => {
  if (!pickupId || !dropId) return {}; // early return if params are missing

  try {
    const res = await axiosInstance.get(
      `/package?pickupLocation=${pickupId}&dropLocation=${dropId}`
    );
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.message || "Something went wrong while fetching packages."
    );
  }
};
