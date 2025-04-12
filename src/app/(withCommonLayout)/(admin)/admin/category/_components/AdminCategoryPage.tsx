"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "@heroui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableColumn,
} from "@heroui/table";
import { Trash2, Pencil, UploadCloud } from "lucide-react";
import { ICategory } from "@/src/types";
import {
  useCreateCategory,
  useGetCategories,
} from "@/src/hooks/categories.hook";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Divider } from "@heroui/divider";
import FXInput from "@/src/components/form/FXInput";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import FXTextArea from "@/src/components/form/FXTextArea";

import { toBase64 } from "@/src/helper/toBase64";
import CategoriesTable from "./AdminGetCategory";

export default function AdminCategoryPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Modal open state
  const [imageFiles, setImageFiles] = useState<File[] | []>([]); // Track selected images
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]); // Track image previews
  const methods = useForm(); // Hook form methods
  const { handleSubmit } = methods;

  const {
    mutate: handleCreateCategory,
    isPending: createCategoryPending,
    isSuccess: createCategorySuccess,
  } = useCreateCategory(); // Category creation handler
  const { data: categories, isLoading, isError } = useGetCategories(); // Get existing categories

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const categoryData: any = {
      name: data.name,
      slug: data.slug,
      description: data.description,
      images: [], // base64 strings for images
    };

    // Convert selected images to base64
    for (const file of imageFiles) {
      const base64 = await toBase64(file);
      categoryData.images.push(base64);
    }

    handleCreateCategory(categoryData); // Send category data
  };

  // Handle image file selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImageFiles = Array.from(files);
    setImageFiles((prev) => [...prev, ...newImageFiles]);

    // Generate image previews
    newImageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <Button
          color="primary"
          className="rounded"
          onPress={onOpen}>
          + Add Category
        </Button>
      </div>

      {isLoading && <p>Loading categories...</p>}
      {isError && <p>Failed to load categories.</p>}
      {categories && categories?.data?.length === 0 && (
        <p>No categories found.</p>
      )}

      {!isLoading && categories?.data?.length > 0 && <CategoriesTable />}

      {/* Modal for adding a new category */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Category
              </ModalHeader>
              <ModalBody className="mb-5">
                <FormProvider {...methods}>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="max-w-xl mx-auto space-y-6">
                    <div className="flex flex-wrap gap-4 py-2">
                      {/* Name & Slug Inputs */}
                      <div className="flex flex-wrap gap-2 w-full">
                        <div className="flex-1 min-w-[150px]">
                          <FXInput
                            label="Name"
                            name="name"
                          />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                          <FXInput
                            label="Slug"
                            name="slug"
                          />
                        </div>
                      </div>

                      {/* Description TextArea */}
                      <div className="flex w-full">
                        <div className="flex-1 min-w-[150px]">
                          <FXTextArea
                            label="Description"
                            name="description"
                          />
                        </div>
                      </div>

                      {/* Image Upload */}
                      <div className="w-full">
                        <label
                          htmlFor="image"
                          className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-default-200 bg-default-50 text-default-500 shadow-sm transition hover:border-default-400 hover:bg-default-100">
                          <span className="text-md font-medium">
                            Upload Images
                          </span>
                          <UploadCloud className="size-6" />
                        </label>
                        <input
                          multiple
                          className="hidden"
                          id="image"
                          type="file"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>

                    {/* Image previews */}
                    {imagePreviews.length > 0 && (
                      <div className="flex gap-5 my-5 flex-wrap">
                        {imagePreviews.map((imageDataUrl, index) => (
                          <div
                            key={index}
                            className="relative size-32 rounded-xl border-2 border-dashed border-default-300 p-2">
                            <img
                              alt={`Preview ${index}`}
                              className="h-full w-full object-cover rounded-md"
                              src={imageDataUrl}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <Divider className="my-6" />

                    <Button
                      type="submit"
                      className="w-full">
                      Create Category
                    </Button>
                  </form>
                </FormProvider>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
