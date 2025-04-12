import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createMake, getMakes } from "../services/Makes";

export const useCreateMake = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_MAKE"],
    mutationFn: async (makeData) => await createMake(makeData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetMakes = () => {
  return useQuery({
    queryKey: ["GET_MAKES"],
    queryFn: async () => await getMakes(),
  });
};
