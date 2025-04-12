import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createYear, getYears } from "../services/Years";

export const useCreateYear = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_YEAR"],
    mutationFn: async (yearData) => await createYear(yearData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetYears = () => {
  return useQuery({
    queryKey: ["GET_YEARS"],
    queryFn: async () => await getYears(),
  });
};
