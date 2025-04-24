import {
  createPackage,
  deletePackage,
  getPackage,
  updatePackage,
} from "@/src/services/Package";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePackage = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_PACKAGE"],
    mutationFn: async (PackageData) => await createPackage(PackageData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdatePackage = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_PACKAGE"],
    mutationFn: async (PackageData) => await updatePackage(id, PackageData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeletePackage = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_PACKAGE"],
    mutationFn: async () => await deletePackage(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

// export const useGetPackages = () => {
//   return useQuery({
//     queryKey: ["GET_PACKAGE"],
//     queryFn: async () => await getPackage(),
//   });
// };

export const useGetPackages = (pickupId?: string, dropId?: string) => {
  return useQuery({
    queryKey: ["GET_PACKAGE", pickupId, dropId],
    queryFn: () => getPackage(pickupId!, dropId!), // Non-null because of `enabled`
    enabled: !!pickupId && !!dropId, // Only fetch when both IDs exist
  });
};
