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
import { useCreateYear, useGetYears } from "@/src/hooks/years.hook";
import { YearSelect } from "@/src/components/form/YearSelect";
import YearsTable from "./YearsTable";

export default function AdminYearPage() {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure(); // Modal open state
  const methods = useForm(); // Hook form methods
  const { handleSubmit } = methods;

  const { mutate: handleCreateYear, isPending: createYearPending } =
    useCreateYear({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_Years"] });
        toast.success("Year created successfully");
        methods.reset();
        onClose();
      },
    }); // Year creation handler
  const { data: Years, isLoading, isError, refetch } = useGetYears(); // Get existing Years

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const YearData = {
      year: {
        numeric: Number(data.year?.numeric),
        display: data.display,
      },
    };

    console.log(YearData);

    if (!YearData.year.numeric || isNaN(YearData.year.numeric)) {
      toast.error("Please select a valid year.");
      return;
    }

    handleCreateYear(YearData as any); // Send DrivingType data
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Year</h1>
        <Button
          color="primary"
          className="rounded"
          onPress={onOpen}>
          + Add Year
        </Button>
      </div>

      {isLoading && <p>Loading Years...</p>}
      {isError && <p>Failed to load Years.</p>}
      {!Years && Years?.data?.length === 0 && <p>No Years found.</p>}

      {!isLoading && Years?.data?.length > 0 && <YearsTable Years={Years} />}

      {/* Modal for adding a new Year */}
      <AddYearModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createYearPending={createYearPending}
      />
    </div>
  );
}

const AddYearModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  createYearPending,
}: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Year</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  <div className="flex flex-wrap gap-4 py-2">
                    {/* Year & logo Inputs */}
                    <div className="flex flex-wrap gap-2 w-full">
                      <div className="flex-1 min-w-[150px]">
                        <YearSelect />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput
                          label="Display"
                          name="display"
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={createYearPending}>
                    {createYearPending ? "Creating..." : "Create Year"}
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
