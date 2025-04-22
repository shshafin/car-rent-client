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
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";

import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { IPackage } from "@/src/types";
import { useEffect, useState } from "react";
import { useGetLocations } from "@/src/hooks/location.hook";

import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../../_components/DataFetchingStates";
import {
  useCreatePackage,
  useDeletePackage,
  useGetPackages,
  useUpdatePackage,
} from "@/src/hooks/package.hook";

import PackageTable from "./PackageTable";
import { useGetCars } from "@/src/hooks/car.hook";

export default function AdminPackagePage() {
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
  const { control, handleSubmit } = methods;
  const [selectedPackage, setSelectedPackage] = useState<IPackage | null>(null);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "carPricing",
  });

  const { mutate: handleCreatePackage, isPending: createPackagePending } =
    useCreatePackage({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_PACKAGE"] });
        toast.success("Package created successfully");
        methods.reset();
        onClose();
      },
    }); // Package creation handler
  const { mutate: handleUpdatePackage, isPending: updatePackagePending } =
    useUpdatePackage({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_PACKAGE"] });
        toast.success("Package updated successfully");
        methods.reset();
        setSelectedPackage(null);
        onEditClose();
      },
      id: selectedPackage?._id,
    }); // Package update handler
  const { mutate: handleDeletePackage, isPending: deletePackagePending } =
    useDeletePackage({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_PACKAGE"] });
        toast.success("Package deleted successfully");
        setSelectedPackage(null);
        onDeleteClose();
      },
      id: selectedPackage?._id,
    }); // Package deletion handler
  const { data: Packages, isLoading, isError } = useGetPackages(); // Get existing Packages

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const packageData: any = {
      ...data,
      carPricing: data.carPricing.map((item: any) => ({
        car: item.car,
        fare: Number(item.fare),
      })),
    };

    handleCreatePackage(packageData);
  };

  const onEditSubmit: SubmitHandler<FieldValues> = async (data) => {
    const packageData: any = {
      ...data,
      carPricing: data.carPricing.map((item: any) => ({
        car: item.car,
        fare: Number(item.fare),
      })),
    };
    handleUpdatePackage(packageData);
  };
  console.log({ Packages });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Package
        </h1>
        <Button
          color="primary"
          className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}>
          + Add Package
        </Button>
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {Packages?.data?.length === 0 && <DataEmpty />}

      {Packages?.data && (
        <PackageTable
          packages={Packages}
          setSelectedPackages={setSelectedPackage}
          onEditOpen={onEditOpen}
          onDeleteOpen={onDeleteOpen}
        />
      )}

      {/* Modal for adding a new Package */}
      <AddPackageModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createPackagePending={createPackagePending}
        fields={fields}
        append={append}
        remove={remove}
      />
      {/* Modal for editing a Package */}
      <EditPackageModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        updatePackagePending={updatePackagePending}
        defaultValues={selectedPackage}
      />
      {/* Modal for deleting a Package */}
      <DeletePackageModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeletePackage={handleDeletePackage}
        deletePackagePending={deletePackagePending}
      />
    </div>
  );
}

const AddPackageModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  createPackagePending,
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
              Add Package
            </ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  {/* Pickup & Drop Locations */}
                  <div className="flex flex-wrap gap-2 w-full">
                    <div className="flex-1 min-w-[150px]">
                      <PickupLocationSelect
                        label="Pickup Location"
                        name="pickupLocation"
                        required={true}
                      />
                    </div>
                    <div className="flex-1 min-w-[150px]">
                      <DropLocationSelect
                        label="Drop Location"
                        name="dropLocation"
                        required={true}
                      />
                    </div>
                  </div>

                  {/* Car Pricing */}
                  <div className="space-y-4">
                    <label className="block font-medium">Car Pricing</label>
                    {fields.map((field: any, index: number) => (
                      <div
                        key={field.id}
                        className="flex flex-wrap gap-2 items-center">
                        <div className="flex-1 min-w-[150px]">
                          <CarSelect
                            name={`carPricing[${index}].car`}
                            required
                          />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                          <FXInput
                            label="Fare"
                            name={`carPricing[${index}].fare`}
                            type="number"
                            required
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-600 bg-red-200 px-2 py-1 rounded">
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => append({})}
                      className="text-white bg-rose-700 px-2 py-1 rounded">
                      Add Car
                    </button>
                  </div>

                  {/* Submit Button */}
                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={createPackagePending}>
                    {createPackagePending ? "Creating..." : "Create Package"}
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

const EditPackageModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  updatePackagePending,
  defaultValues,
}: any) => {
  const { control, register } = methods;

  // Initialize useFieldArray
  const { fields, append, remove } = useFieldArray({
    control,
    name: "carPricing",
  });

  if (!defaultValues) return null;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Package
            </ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-xl mx-auto space-y-6">
                  {/* Pickup & Drop Locations */}
                  <div className="flex flex-wrap gap-2 w-full">
                    <div className="flex-1 min-w-[150px]">
                      <PickupLocationSelect
                        label="Pickup Location"
                        name="pickupLocation"
                        defaultValue={defaultValues?.pickupLocation?.city}
                        register={register}
                        required
                      />
                    </div>
                    <div className="flex-1 min-w-[150px]">
                      <DropLocationSelect
                        label="Drop Location"
                        name="dropLocation"
                        defaultValue={defaultValues?.dropLocation}
                        register={register}
                        required
                      />
                    </div>
                  </div>

                  {/* Car Pricing */}
                  <div className="space-y-4">
                    <label className="block font-medium">Car Pricing</label>
                    {fields?.map((field: any, index: number) => (
                      <div
                        key={field.id}
                        className="flex flex-wrap gap-2 items-center">
                        <div className="flex-1 min-w-[150px]">
                          <CarSelect
                            name={`carPricing[${index}].car`}
                            defaultValue={field.car}
                            register={register}
                            required
                          />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                          <FXInput
                            label="Fare"
                            name={`carPricing[${index}].fare`}
                            defaultValue={field.fare}
                            type="number"
                            register={register}
                            required
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-600 bg-red-200 px-2 py-1 rounded">
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => append({ car: "", fare: "" })}
                      className="text-white bg-rose-700 px-2 py-1 rounded">
                      Add Car
                    </button>
                  </div>

                  {/* Submit Button */}
                  <Button
                    color="primary"
                    type="submit"
                    className="w-full rounded"
                    disabled={updatePackagePending}>
                    {updatePackagePending ? "Updating..." : "Update Package"}
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

const DeletePackageModal = ({
  isOpen,
  onOpenChange,
  handleDeletePackage,
  deletePackagePending,
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
                ⚠️ Are you sure you want to delete this package? This action
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
                onPress={handleDeletePackage}
                disabled={deletePackagePending}
                className="rounded">
                {deletePackagePending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const PickupLocationSelect = ({ label }: any) => {
  const { register } = useFormContext();
  const { data: locations, isLoading, isError } = useGetLocations();

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("pickupLocation")}
        required
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5">
        <option value="">Pickup Location</option>
        {isLoading && <option value="">Loading...</option>}
        {isError && <option value="">Failed to load</option>}
        {locations?.data?.length === 0 && (
          <option value="">No locations found</option>
        )}
        {locations?.data?.map((loc: any) => (
          <option
            key={loc._id}
            value={loc._id}>
            {loc.city}, {loc.state}
          </option>
        ))}
      </select>
    </div>
  );
};
const DropLocationSelect = () => {
  const { register } = useFormContext();
  const { data: locations, isLoading, isError } = useGetLocations();

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("dropLocation")}
        required
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5">
        <option value="">Drop Location</option>
        {isLoading && <option value="">Loading...</option>}
        {isError && <option value="">Failed to load</option>}
        {locations?.data?.length === 0 && (
          <option value="">No locations found</option>
        )}
        {locations?.data?.map((loc: any) => (
          <option
            key={loc._id}
            value={loc._id}>
            {loc.city}, {loc.state}
          </option>
        ))}
      </select>
    </div>
  );
};

const CarSelect = ({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string; // Optional default value prop
}) => {
  const { register } = useFormContext();
  const { data: cars, isLoading, isError } = useGetCars();

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register(name)}
        defaultValue={defaultValue} // Setting the default value
        required
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5">
        <option value="">Select Car</option>
        {isLoading && <option value="">Loading...</option>}
        {isError && <option value="">Failed to load</option>}
        {cars?.data?.length === 0 && <option value="">No cars found</option>}
        {cars?.data?.map((car: any) => (
          <option
            key={car._id}
            value={car._id}>
            {car.model}
          </option>
        ))}
      </select>
    </div>
  );
};
