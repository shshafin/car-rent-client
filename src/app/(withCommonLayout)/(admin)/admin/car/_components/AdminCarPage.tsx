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
import CarTable from "./CarTable";
import {
  useCreateCar,
  useGetCars,
  useUpdateCar,
  useDeleteCar,
} from "@/src/hooks/car.hook";
import { useState } from "react";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../../_components/DataFetchingStates";
import { ICar } from "@/src/types";

export default function AdminCarPage() {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
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
  const [selectedCar, setSelectedCar] = useState<ICar | null>(null);
  const methods = useForm(); // Hook form methods
  const { handleSubmit } = methods;

  const { mutate: handleDeleteCar, isPending: deleteCarPending } = useDeleteCar(
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_CAR"] });
        toast.success("Car deleted successfully");
        setSelectedCar(null);
        onDeleteClose();
      },
      id: selectedCar?._id,
    }
  ); // Car deletion handler
  const { mutate: handleCreateCar, isPending: createCarPending } = useCreateCar(
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_CAR"] });
        toast.success("Car created successfully");
        methods.reset();
        onClose();
      },
    }
  ); // Car creation handler
  const { mutate: handleUpdateCar, isPending: updateCarPending } = useUpdateCar(
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_CAR"] });
        toast.success("Car updated successfully");
        methods.reset();
        setSelectedCar(null);
        onEditClose();
      },
      id: selectedCar?._id,
    }
  ); // Car update handler
  // In your component
  const { data: Cars, isLoading, isError } = useGetCars();

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const CarData: any = {
      ...data,
      seats: Number(data?.seats),
      bags: Number(data?.bags),
    };

    handleCreateCar(CarData); // Send Car data
  };
  const onEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    const CarData: any = {
      ...data,
      seats: Number(data?.seats),
      bags: Number(data?.bags),
    };
    handleUpdateCar(CarData); // Send Car data
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Car Management
        </h1>
        <Button
          color="primary"
          className="px-7 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}>
          + Add Car
        </Button>
      </div>
      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {Cars?.data?.length === 0 && <DataEmpty />}

      {Cars?.data && (
        <CarTable
          cars={Cars.data}
          onEditOpen={onEditOpen}
          onDeleteOpen={onDeleteOpen}
          setSelectedCar={setSelectedCar}
        />
      )}

      {/* Modal for adding a new Car */}
      <AddCarModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createCarPending={createCarPending}
      />
      {/* Modal for editing a Car */}
      <EditCarModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        updateCarPending={updateCarPending}
        defaultValues={selectedCar}
      />
      {/* Modal for deleting a Car */}
      <DeleteCarModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteCar={handleDeleteCar}
        deleteCarPending={deleteCarPending}
      />
    </div>
  );
}

const AddCarModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  createCarPending,
  fields,
}: any) => {
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
            <ModalHeader className="flex flex-col gap-1">Add Car</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* Title & subTitle Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Name"
                          name="name"
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Model"
                          name="model"
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Seats"
                          name="seats"
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Bags"
                          name="bags"
                        />
                      </div>

                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Image"
                          name="image"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={createCarPending}>
                    {createCarPending ? "Creating..." : "Create Car"}
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

const EditCarModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  updateCarPending,
  defaultValues,
  setOptions,
}: any) => {
  if (!defaultValues) return null;
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        onOpenChange();
        methods.reset();
        setOptions([]);
      }}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Car</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* Title & subTitle Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Name"
                          name="name"
                          defaultValue={defaultValues?.name}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Model"
                          name="model"
                          defaultValue={defaultValues?.model}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Seats"
                          name="seats"
                          defaultValue={defaultValues?.seats}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Bags"
                          name="bags"
                          defaultValue={defaultValues?.bags}
                        />
                      </div>

                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Image"
                          name="image"
                          defaultValue={defaultValues?.image}
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={updateCarPending}>
                    {updateCarPending ? "Updating..." : "Update Car"}
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

const DeleteCarModal = ({
  isOpen,
  onOpenChange,
  handleDeleteCar,
  deleteCarPending,
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
                ⚠️ Are you sure you want to delete this Car? This action cannot
                be undone.
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
                onPress={handleDeleteCar}
                disabled={deleteCarPending}
                className="rounded">
                {deleteCarPending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
