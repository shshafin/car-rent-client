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
import { useCreateMake, useDeleteMake, useGetMakes, useUpdateMake } from "@/src/hooks/makes.hook";
import MakesTable from "./MakesTable";
import { IMake } from "@/src/types";
import { useState } from "react";
import { DataEmpty, DataError, DataLoading } from "../../_components/DataFetchingStates";

export default function AdminMakePage() {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure(); // Modal open state
  const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange, onClose: onDeleteClose } = useDisclosure();
  const methods = useForm(); // Hook form methods
  const { handleSubmit } = methods;
  const [selectedMake, setSelectedMake] = useState<IMake | null>(null);

  const { mutate: handleCreateMake, isPending: createMakePending } =
    useCreateMake({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_MAKES"] });
        toast.success("Make created successfully");
        methods.reset();
        onClose();
      },
    }); // make creation handler
  const { mutate: handleUpdateMake, isPending: updateMakePending } =
    useUpdateMake({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_MAKES"] });
        toast.success("Make updated successfully");
        methods.reset();
        setSelectedMake(null);
        onEditClose();
      },
      id: selectedMake?._id,
    }); // make update handler
  const { mutate: handleDeleteMake, isPending: deleteMakePending } =
    useDeleteMake({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_MAKES"] });
        toast.success("Make deleted successfully");
        setSelectedMake(null);
        onDeleteClose();
      },
      id: selectedMake?._id,
    }); // make deletion handler
  const { data: makes, isLoading, isError } = useGetMakes(); // Get existing makes

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const makeData: any = {
      make: data.make,
      logo: data.logo,
    };

    handleCreateMake(makeData); // Send make data
  };
  const onEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    const makeData: any = {
      make: data.make,
      logo: data.logo,
    };
    handleUpdateMake(makeData); // update make data
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Make
        </h1>
        <Button
          color="primary"
          className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}>
          + Add Make
        </Button>
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {makes?.data?.length === 0 && <DataEmpty />}

      {!isLoading && makes?.data?.length > 0 && 
        <MakesTable 
          makes={makes} 
          onDeleteOpen={onDeleteOpen} 
          onEditOpen={onEditOpen}
          setSelectedMake={setSelectedMake} 
        />}

      {/* Modal for adding a new make */}
      <AddMakeModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createMakePending={createMakePending}
      />
      {/* Modal for editing a make */}
      <EditMakeModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        updateMakePending={updateMakePending}
        defaultValues={selectedMake}
      />
      {/* Modal for deleting a make */}
      <DeleteMakeModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteMake={handleDeleteMake}
        deleteMakePending={deleteMakePending}
      />
    </div>
  );
}

const AddMakeModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  createMakePending,
}: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Make</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* make & logo Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Make"
                          name="make"
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Logo"
                          name="logo"
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={createMakePending}>
                    {createMakePending ? "Creating..." : "Create Make"}
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

const EditMakeModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  updateMakePending,
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
              Edit Make
            </ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* make & logo Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Make"
                          name="make"
                          defaultValue={defaultValues.make}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Logo"
                          name="logo"
                          defaultValue={defaultValues.logo}
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={updateMakePending}>
                    {updateMakePending ? "Updating..." : "Update Make"}
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

const DeleteMakeModal = ({
  isOpen,
  onOpenChange,
  handleDeleteMake,
  deleteMakePending,
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
                ⚠️ Are you sure you want to delete this make? This action
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
                onPress={handleDeleteMake}
                disabled={deleteMakePending}
                className="rounded">
                {deleteMakePending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

