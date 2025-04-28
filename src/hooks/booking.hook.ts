import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createBooking,
  deleteBooking,
  getBooking,
  getUserAllBookings,
  updateBooking,
} from "../services/Booking";

export const useCreateBooking = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_BOOKING"],
    mutationFn: async (BookingData) => await createBooking(BookingData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateBooking = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_BOOKING"],
    mutationFn: async (BookingData) => await updateBooking(id, BookingData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteBooking = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_BOOKING"],
    mutationFn: async () => await deleteBooking(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetBookings = () => {
  return useQuery({
    queryKey: ["GET_BOOKING"],
    queryFn: async () => await getBooking(),
  });
};

export const useGetUserAllBookings = () => {
  return useQuery({
    queryKey: ["GET_USER_ALL_BOOKING"],
    queryFn: async () => await getUserAllBookings(),
  });
};
