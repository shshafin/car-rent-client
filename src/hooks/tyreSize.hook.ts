import {
  createTyreSize,
  deleteTyreSize,
  getTyreSizes,
  updateTyreSize,
} from "@/src/services/TyreSize";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTyreSize = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_TYRE_SIZE"],
    mutationFn: async (tyreSizeData) => await createTyreSize(tyreSizeData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateTyreSize = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_TYRE_SIZE"],
    mutationFn: async (tyreSizeData) => await updateTyreSize(id, tyreSizeData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteTyreSize = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_TYRE_SIZE"],
    mutationFn: async () => await deleteTyreSize(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetTyreSizes = () => {
  return useQuery({
    queryKey: ["GET_TYRE_SIZES"],
    queryFn: async () => await getTyreSizes(),
  });
};
