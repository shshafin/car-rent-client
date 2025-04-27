import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPayment } from "@/src/services/Payment";

export const useCreatePayment = ({ onSuccess }: any) => {
  return useMutation<any, Error, any>({
    mutationKey: ["CREATE_PAYMENT"],
    mutationFn: async (PaymentData) => await createPayment(PaymentData),
    onError: (error) => {
      console.log({error}, 'error payment')
      toast.error(error.message);
    },
    onSuccess,
  });
};