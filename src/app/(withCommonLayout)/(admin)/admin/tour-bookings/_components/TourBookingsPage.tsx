"use client";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import FXInput from "@/src/components/form/FXInput";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import TourBookingsTable from "./TourBookingsTable";
import { useState } from "react";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../../_components/DataFetchingStates";
import { useDeleteBooking, useGetBookings } from "@/src/hooks/booking.hook";
import { IBooking } from "@/src/types";
import { useDeleteTour, useGetTours } from "@/src/hooks/tour.hook";

export default function TourBookingsPage() {
  const queryClient = useQueryClient();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(
    null
  );

  const { mutate: handleDeleteBooking, isPending: deleteBookingPending } =
    useDeleteTour({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_TOURS"] });
        toast.success("Tour deleted successfully");
        setSelectedBooking(null);
        onDeleteClose();
      },
      id: selectedBooking?._id,
    }); // Booking deletion handler
  const { data: bookings, isLoading, isError } = useGetTours(); // Get existing Bookings

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Tour Bookings
        </h1>
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {bookings?.data?.length === 0 && <DataEmpty />}

      {bookings?.data && (
        <TourBookingsTable
          bookings={bookings.data}
          onDeleteOpen={onDeleteOpen}
          onEditOpen={onEditOpen}
          setSelectedBooking={setSelectedBooking}
        />
      )}

      {/* Modal for deleting a Booking */}
      <DeleteBookingModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteBooking={handleDeleteBooking}
        deleteBookingPending={deleteBookingPending}
      />
    </div>
  );
}

const DeleteBookingModal = ({
  isOpen,
  onOpenChange,
  handleDeleteBooking,
  deleteBookingPending,
}: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirm Delete
            </ModalHeader>

            <ModalBody>
              <p className="text-sm text-red-500">
                ⚠️ Are you sure you want to delete this Booking? This action
                cannot be undone.
              </p>
            </ModalBody>

            <ModalFooter className="flex justify-end gap-2">
              <Button
                variant="bordered"
                className="rounded"
                onPress={onOpenChange}>
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={handleDeleteBooking}
                disabled={deleteBookingPending}
                className="rounded">
                {deleteBookingPending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
