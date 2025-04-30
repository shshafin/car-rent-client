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
import PackageBookingsTable from "./PackageBookingsTable";
import { useState } from "react";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../../_components/DataFetchingStates";
import { useDeleteBooking, useGetBookings } from "@/src/hooks/booking.hook";
import { IBooking } from "@/src/types";

export default function PackageBookingsPage() {
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
    useDeleteBooking({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_BOOKING"] });
        toast.success("Booking deleted successfully");
        setSelectedBooking(null);
        onDeleteClose();
      },
      id: selectedBooking?._id,
    }); // Booking deletion handler
  const { data: bookings, isLoading, isError } = useGetBookings(); // Get existing Bookings

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Package Bookings
        </h1>
        {/* <Button
          color="primary"
          className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}>
          + Add Booking
        </Button> */}
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {bookings?.data?.length === 0 && <DataEmpty />}

      {bookings?.data && (
        <PackageBookingsTable
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
