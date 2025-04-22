import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createLocation,
  deleteLocation,
  getLocation,
  updateLocation,
} from "../services/Location";

export const useCreateLocation = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_LOCATION"],
    mutationFn: async (LocationData) => await createLocation(LocationData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateLocation = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_LOCATION"],
    mutationFn: async (LocationData) => await updateLocation(id, LocationData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteLocation = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_LOCATION"],
    mutationFn: async () => await deleteLocation(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetLocations = () => {
  return useQuery({
    queryKey: ["GET_LOCATION"],
    queryFn: async () => await getLocation(),
  });
};
