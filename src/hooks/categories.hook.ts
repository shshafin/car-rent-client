import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, getCategories } from "../services/Categories";
import { toast } from "sonner";

export const useCreateCategory = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_CATEGORY"],
    mutationFn: async (categoryData) => await createCategory(categoryData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["GET_CATEGORIES"],
    queryFn: async () => await getCategories(),
  });
};
