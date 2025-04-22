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
import LocationTable from "./LocationTable";
import { ILocation } from "@/src/types";
import { useState } from "react";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../../_components/DataFetchingStates";
import {
  useCreateLocation,
  useDeleteLocation,
  useGetLocations,
  useUpdateLocation,
} from "@/src/hooks/location.hook";

export default function AdminLocationPage() {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure(); // Modal open state
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
  const methods = useForm(); // Hook form methods
  const { handleSubmit } = methods;
  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );

  const { mutate: handleCreateLocation, isPending: createLocationPending } =
    useCreateLocation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_LOCATION"] });
        toast.success("Location created successfully");
        methods.reset();
        onClose();
      },
    }); // Location creation handler
  const { mutate: handleUpdateLocation, isPending: updateLocationPending } =
    useUpdateLocation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_LOCATION"] });
        toast.success("Location updated successfully");
        methods.reset();
        setSelectedLocation(null);
        onEditClose();
      },
      id: selectedLocation?._id,
    }); // Location update handler
  const { mutate: handleDeleteLocation, isPending: deleteLocationPending } =
    useDeleteLocation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_LOCATION"] });
        toast.success("Location deleted successfully");
        setSelectedLocation(null);
        onDeleteClose();
      },
      id: selectedLocation?._id,
    }); // Location deletion handler
  const { data: Locations, isLoading, isError } = useGetLocations(); // Get existing Locations

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const LocationData: any = {
      ...data,
    };

    handleCreateLocation(LocationData); // Send Location data
  };
  const onEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    const LocationData: any = {
      ...data,
    };
    handleUpdateLocation(LocationData); // update Location data
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Location
        </h1>
        <Button
          color="primary"
          className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}>
          + Add Location
        </Button>
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {Locations?.data?.length === 0 && <DataEmpty />}

      {Locations?.data && (
        <LocationTable
          Locations={Locations.data}
          onDeleteOpen={onDeleteOpen}
          onEditOpen={onEditOpen}
          setSelectedLocation={setSelectedLocation}
        />
      )}

      {/* Modal for adding a new Location */}
      <AddLocationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createLocationPending={createLocationPending}
      />
      {/* Modal for editing a Location */}
      <EditLocationModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        updateLocationPending={updateLocationPending}
        defaultValues={selectedLocation}
      />
      {/* Modal for deleting a Location */}
      <DeleteLocationModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteLocation={handleDeleteLocation}
        deleteLocationPending={deleteLocationPending}
      />
    </div>
  );
}

const AddLocationModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  createLocationPending,
}: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Location
            </ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* Location & logo Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Location"
                          name="location"
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Country"
                          name="country"
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="State"
                          name="state"
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="City"
                          name="city"
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Zip Code"
                          name="zipCode"
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={createLocationPending}>
                    {createLocationPending ? "Creating..." : "Create Location"}
                  </Button>
                </form>
              </FormProvider>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const EditLocationModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  updateLocationPending,
  defaultValues,
}: any) => {
  if (!defaultValues) return null;
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        onOpenChange();
        methods.reset();
      }}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Location
            </ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* Location & logo Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Location"
                          name="location"
                          defaultValue={defaultValues?.location}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Country"
                          name="country"
                          defaultValue={defaultValues?.country}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="State"
                          name="state"
                          defaultValue={defaultValues?.state}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="City"
                          name="city"
                          defaultValue={defaultValues?.city}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Zip Code"
                          name="zipCode"
                          defaultValue={defaultValues?.zipCode}
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={updateLocationPending}>
                    {updateLocationPending ? "Updating..." : "Update Location"}
                  </Button>
                </form>
              </FormProvider>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const DeleteLocationModal = ({
  isOpen,
  onOpenChange,
  handleDeleteLocation,
  deleteLocationPending,
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
                ⚠️ Are you sure you want to delete this Location? This action
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
                onPress={handleDeleteLocation}
                disabled={deleteLocationPending}
                className="rounded">
                {deleteLocationPending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
