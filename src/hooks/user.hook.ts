import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteUser, getUsers } from "../services/Users";

export const useDeleteUser = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_USER"],
    mutationFn: async () => await deleteUser(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["GET_USER"],
    queryFn: async () => await getUsers(),
  });
};
