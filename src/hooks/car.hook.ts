import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCar, deleteCar, getCar, updateCar } from "../services/Car";

export const useCreateCar = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_CAR"],
    mutationFn: async (CarData) => await createCar(CarData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateCar = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_CAR"],
    mutationFn: async (CarData) => await updateCar(id, CarData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteCar = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_CAR"],
    mutationFn: async () => await deleteCar(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetCars = () => {
  return useQuery({
    queryKey: ["GET_CAR"],
    queryFn: async () => await getCar(),
  });
};
