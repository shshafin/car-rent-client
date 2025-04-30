import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createTour,
  deleteTour,
  getTour,
  updateTour,
  getToursByStatus,
  updateTourStatus,
} from "../services/Tour";

interface TourHookProps {
  onSuccess?: any;
  id?: string;
}

export const useGetToursByStatus = (status: string) => {
  return useQuery({
    queryKey: ["GET_TOURS_BY_STATUS", status],
    queryFn: async () => await getToursByStatus(status),
    enabled: !!status, // Only fetch when status is available
  });
};

export const useUpdateTourStatus = ({ onSuccess }: TourHookProps) => {
  return useMutation<any, Error, { id: string; status: string }>({
    mutationKey: ["UPDATE_TOUR_STATUS"],
    mutationFn: async ({ id, status }) => await updateTourStatus(id, status),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Tour status updated successfully");
      onSuccess?.();
    },
  });
};

// Updated existing hooks with TypeScript improvements
export const useCreateTour = ({ onSuccess }: TourHookProps) => {
  return useMutation<any, Error, any>({
    mutationKey: ["CREATE_TOUR"],
    mutationFn: createTour,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Tour created successfully");
      onSuccess?.();
    },
  });
};

export const useUpdateTour = ({ onSuccess, id }: TourHookProps) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_TOUR"],
    mutationFn: async (tourData) => {
      if (!id) throw new Error("No tour ID provided");
      return await updateTour(id, tourData);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Tour updated successfully");
      onSuccess?.();
    },
  });
};

export const useDeleteTour = ({ onSuccess, id }: TourHookProps) => {
  return useMutation<any, Error>({
    mutationKey: ["DELETE_TOUR"],
    mutationFn: async () => {
      if (!id) throw new Error("No tour ID provided");
      return await deleteTour(id);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Tour deleted successfully");
      onSuccess?.();
    },
  });
};

export const useGetTours = () => {
  return useQuery({
    queryKey: ["GET_TOURS"],
    queryFn: getTour,
  });
};
