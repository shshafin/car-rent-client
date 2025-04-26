import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPayment } from "@/src/services/Payment";

export const useCreatePayment = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_PAYMENT"],
    mutationFn: async (PackageData) => await createPayment(PackageData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};