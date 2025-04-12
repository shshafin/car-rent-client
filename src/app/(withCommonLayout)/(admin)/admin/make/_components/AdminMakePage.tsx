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
  useForm,
} from "react-hook-form";

import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useCreateMake, useGetMakes } from "@/src/hooks/makes.hook";
import MakesTable from "./MakesTable";

export default function AdminMakePage() {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure(); // Modal open state
  const methods = useForm(); // Hook form methods
  const { handleSubmit } = methods;

  const { mutate: handleCreateMake, isPending: createMakePending } =
    useCreateMake({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_MAKES"] });
        toast.success("Make created successfully");
        methods.reset();
        onClose();
      },
    }); // make creation handler
  const { data: makes, isLoading, isError, refetch } = useGetMakes(); // Get existing makes

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const makeData: any = {
      make: data.make,
      logo: data.logo,
    };

    handleCreateMake(makeData); // Send DrivingType data
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Make</h1>
        <Button
          color="primary"
          className="rounded"
          onPress={onOpen}>
          + Add Make
        </Button>
      </div>

      {isLoading && <p>Loading makes...</p>}
      {isError && <p>Failed to load makes.</p>}
      {!makes && makes?.data?.length === 0 && <p>No makes found.</p>}

      {!isLoading && makes?.data?.length > 0 && <MakesTable makes={makes} />}

      {/* Modal for adding a new make */}
      <AddMakeModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createMakePending={createMakePending}
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
            <ModalHeader className="flex flex-col gap-1">Make</ModalHeader>
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
