"use server";

import  axiosInstance  from "@/src/lib/AxiosInstance";

export const deleteUser = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/users/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete User");
  }
};

export const getUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/users");

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
