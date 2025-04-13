"use client";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import FXInput from "@/src/components/form/FXInput";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import DrivingTypesTable from "./DrivingTypesTable";
import {
  useCreateDrivingType,
  useGetDrivingTypes,
} from "@/src/hooks/drivingTypes.hook";
import { Trash2 } from "lucide-react";

export default function AdminDrivingTypePage() {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure(); // Modal open state
  const methods = useForm(); // Hook form methods
  const { control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });
  const {
    mutate: handleCreateDrivingType,
    isPending: createDrivingTypePending,
  } = useCreateDrivingType({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_DRIVING_TYPES"] });
      toast.success("Driving type created successfully");
      methods.reset();
      onClose();
    },
  }); // DrivingType creation handler
  const {
    data: drivingTypes,
    isLoading,
    isError,
    refetch,
  } = useGetDrivingTypes(); // Get existing DrivingTypes

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const drivingTypeData: any = {
      ...data,
      options: data?.options.map((opt: { value: string }) => opt.value),
    };

    handleCreateDrivingType(drivingTypeData); // Send DrivingType data
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Driving Type Management
        </h1>
        <Button
          color="primary"
          className="px-7 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}>
          + Add Driving Type
        </Button>
      </div>
      {isLoading && <p>Loading driving-types...</p>}
      {isError && <p>Failed to load driving-types.</p>}
      {!drivingTypes && drivingTypes?.data?.length === 0 && (
        <p>No driving-types found.</p>
      )}

      {!isLoading && drivingTypes?.data?.length > 0 && (
        <DrivingTypesTable drivingTypes={drivingTypes} />
      )}

      {/* Modal for adding a new drivingType */}
      <AddDrivingTypeModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createDrivingTypePending={createDrivingTypePending}
        fields={fields}
        append={append}
        remove={remove}
      />
    </div>
  );
}

const AddDrivingTypeModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  createDrivingTypePending,
  fields,
  append,
  remove,
}: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Driving Type
            </ModalHeader>
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
                          label="Title"
                          name="title"
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Sub Title"
                          name="subTitle"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-4 border p-4 rounded-xl bg-muted/30">
                    {fields.length ? (
                      fields.map((field: any, index: number) => (
                        <div
                          key={field.id}
                          className="flex gap-2 items-center">
                          <FXInput
                            label="Option"
                            name={`options.${index}.value`}
                          />
                          <Button
                            isIconOnly
                            className="h-14 w-16"
                            onPress={() => remove(index)}>
                            <Trash2 />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No options added yet.
                      </p>
                    )}

                    <Button
                      className="w-full"
                      onPress={() => append({ name: "options" })}>
                      + Add Option
                    </Button>
                  </div>

                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={createDrivingTypePending}>
                    {createDrivingTypePending
                      ? "Creating..."
                      : "Create Driving Type"}
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
