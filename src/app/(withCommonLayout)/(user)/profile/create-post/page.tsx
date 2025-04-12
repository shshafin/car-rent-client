"use client";

import FXDatePicker from "@/src/components/form/FXDatePicker";
import FXInput from "@/src/components/form/FXInput";
import FXSelect from "@/src/components/form/FXSelect";
import { dateToISO } from "@/src/utils/dateToISO";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { allDistict } from "@bangladeshi/bangladesh-address";
import { Trash2, UploadCloud } from "lucide-react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useGetCategories } from "@/src/hooks/categories.hook";
import { ChangeEvent, useState } from "react";
import FXTextArea from "@/src/components/form/FXTextArea";
import { useUser } from "@/src/context/user.provider";
import { useCreatePost } from "@/src/hooks/post.hook";
import Loading from "@/src/components/UI/Loading";
import { useRouter } from "next/navigation";

const cityOptions = allDistict()
  .sort()
  .map((city: string) => ({
    key: city,
    label: city,
  }));

export default function CreatePostPage() {
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isSuccess: categoriesSuccess,
  } = useGetCategories();

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const {
    mutate: handleCreatePost,
    isPending: createPostPending,
    isSuccess: createPostSuccess,
  } = useCreatePost();

  const { user } = useUser();

  const router = useRouter();

  let categoryOptions: { key: string; label: string }[] = [];

  if (categoriesData?.data && !categoriesLoading) {
    categoryOptions = categoriesData?.data
      ?.sort()
      .map((category: { _id: string; name: string }) => ({
        key: category._id,
        label: category.name,
      }));
  }

  const methods = useForm();
  const { control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const postData = {
      ...data,
      questions: data?.questions.map((que: { value: string }) => que.value),
      dateFound: dateToISO(data?.dateFound),
      user: user?._id,
    };

    formData.append("data", JSON.stringify(postData));

    for (let image of imageFiles) {
      formData.append("itemImages", image);
    }

    handleCreatePost(formData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFiles((prev) => [...prev, file]);

    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!createPostPending && createPostSuccess) {
    router.push("/");
  }

  return (
    <>
      {createPostPending && <Loading />}
      <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-4  py-12">
        <h1 className="text-2xl font-semibold text-center pb-8">
          Post a found item
        </h1>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl mx-auto space-y-6">
            <div className="flex flex-wrap gap-4 py-2">
              {/* Title & Found Date */}
              <div className="flex flex-wrap gap-2 w-full">
                <div className="flex-1 min-w-[150px]">
                  <FXInput
                    label="Title"
                    name="title"
                  />
                </div>
                <div className="flex-1 min-w-[150px]">
                  <FXDatePicker
                    label="Found date"
                    name="dateFound"
                  />
                </div>
              </div>

              {/* Location & City */}
              <div className="flex flex-wrap gap-2 w-full">
                <div className="flex-1 min-w-[150px]">
                  <FXInput
                    label="Location"
                    name="location"
                  />
                </div>
                <div className="flex-1 min-w-[150px]">
                  <FXSelect
                    label="City"
                    name="city"
                    options={cityOptions}
                  />
                </div>
              </div>

              {/* Category & Image */}
              <div className="flex flex-wrap gap-2 w-full">
                <div className="flex-1 min-w-[150px]">
                  <FXSelect
                    label="Category"
                    name="category"
                    options={categoryOptions}
                    disabled={!categoriesSuccess}
                  />
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label
                    htmlFor="image"
                    className="flex h-14 w-full cursor-pointer  items-center justify-center gap-2 rounded-xl border-2 border-default-200 bg-default-50 text-default-500 shadow-sm transition-all duration-150 hover:border-default-400 hover:bg-default-100">
                    <span className="text-md font-medium">Upload Image</span>
                    <UploadCloud className="size-6" />
                  </label>

                  <input
                    multiple
                    className="hidden"
                    id="image"
                    type="file"
                    onChange={(e) => handleImageChange(e)}
                  />
                </div>
              </div>
            </div>

            {imagePreviews.length > 0 && (
              <div className="flex gap-5 my-5 flex-wrap">
                {imagePreviews.map((imageDataUrl) => (
                  <div
                    key={imageDataUrl}
                    className="relative size-32 rounded-xl border-2 border-dashed border-default-300 p-2">
                    <img
                      alt="item"
                      className="h-full w-full object-cover object-center rounded-md"
                      src={imageDataUrl}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap-reverse gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXTextArea
                  label="Description"
                  name="description"
                />
              </div>
            </div>

            <Divider className="my-6" />

            <div>
              <h2 className="text-lg font-medium mb-3">
                Owner Verification Questions
              </h2>

              <div className="space-y-4 border p-4 rounded-xl bg-muted/30">
                {fields.length ? (
                  fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex gap-2 items-center">
                      <FXInput
                        label="Question"
                        name={`questions.${index}.value`}
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
                    No questions added yet.
                  </p>
                )}

                <Button
                  className="w-full"
                  onPress={() => append({ name: "questions" })}>
                  + Add Question
                </Button>
              </div>
            </div>

            <Divider className="my-6" />

            <Button
              type="submit"
              className="w-full">
              Publish Post
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
